import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { db } from '../db.js';

describe('SportZone Backend API Characterization & Security Tests', () => {
  beforeEach(() => {
    db.resetForTests();
  });

  describe('1. Authentication & Session Verification', () => {
    it('should register a new user and securely hash the password', async () => {
      const res = await request(app)
        .post('/user/register')
        .send({
          name: 'Ahmed Khan',
          email: 'ahmed@example.com',
          password: 'Password123!',
        });

      expect(res.status).toBe(201);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('ahmed@example.com');

      // Verify in DB that raw password is NOT stored
      const savedUser = db.getUserByEmail('ahmed@example.com');
      expect(savedUser).toBeDefined();
      expect(savedUser?.passwordHash).not.toBe('Password123!');
      expect(savedUser?.passwordHash.startsWith('$2')).toBe(true);
    });

    it('should reject duplicate email registrations', async () => {
      await request(app)
        .post('/user/register')
        .send({
          name: 'Ahmed Khan',
          email: 'duplicate@example.com',
          password: 'Password123!',
        });

      const duplicateRes = await request(app)
        .post('/user/register')
        .send({
          name: 'Another Name',
          email: 'duplicate@example.com',
          password: 'AnotherPassword!',
        });

      expect(duplicateRes.status).toBe(409);
    });

    it('should login an existing user with correct credentials', async () => {
      await request(app)
        .post('/user/register')
        .send({
          name: 'Sana Malik',
          email: 'sana@example.com',
          password: 'SecretPassword99',
        });

      const loginRes = await request(app)
        .post('/user/login')
        .send({
          email: 'sana@example.com',
          password: 'SecretPassword99',
        });

      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeDefined();
      expect(loginRes.body.user.name).toBe('Sana Malik');
    });

    it('should reject login with wrong password', async () => {
      await request(app)
        .post('/user/register')
        .send({
          name: 'Sana Malik',
          email: 'sana2@example.com',
          password: 'CorrectPassword',
        });

      const loginRes = await request(app)
        .post('/user/login')
        .send({
          email: 'sana2@example.com',
          password: 'WrongPassword',
        });

      expect(loginRes.status).toBe(401);
    });

    it('should verify session on /auth/me with valid Bearer token', async () => {
      const reg = await request(app)
        .post('/user/register')
        .send({
          name: 'Verified User',
          email: 'verified@example.com',
          password: 'PassWord123',
        });

      const token = reg.body.token;

      const meRes = await request(app)
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(meRes.status).toBe(200);
      expect(meRes.body.email).toBe('verified@example.com');
    });

    it('should reject unauthenticated requests to protected endpoints', async () => {
      const res = await request(app).get('/auth/me');
      expect(res.status).toBe(401);
    });
  });

  describe('2. Products Catalog & Filtering', () => {
    it('should return all products on GET /product', async () => {
      const res = await request(app).get('/product');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should filter products by category', async () => {
      const res = await request(app).get('/product?category=Sports');
      expect(res.status).toBe(200);
      for (const item of res.body) {
        expect(item.category).toBe('Sports');
      }
    });

    it('should fetch single product by id', async () => {
      const res = await request(app).get('/product/prod-001');
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Nike Air Zoom Pegasus 40');
    });

    it('should return 404 for non-existent product', async () => {
      const res = await request(app).get('/product/does-not-exist');
      expect(res.status).toBe(404);
    });
  });

  describe('3. Pricing Recalculation, Stock Validation & Order Security', () => {
    it('should recalculate price from DB and ignore forged client prices', async () => {
      // Product prod-002 has DB price 64.99
      const orderData = {
        items: [
          {
            productId: 'prod-002',
            quantity: 2,
            price: 1.0, // FORGED client price! Must be ignored!
          },
        ],
        shipping: {
          name: 'Buyer',
          email: 'buyer@example.com',
          phone: '1234567890',
          address: '123 Main St',
          city: 'Karachi',
          zipCode: '74000',
        },
      };

      const res = await request(app).post('/order').send(orderData);
      expect(res.status).toBe(201);

      // Server recalculation:
      // Subtotal = 64.99 * 2 = 129.98
      // Subtotal >= 50 so shippingFee = 0
      // Tax = 129.98 * 0.08 = 10.40
      // Total = 129.98 + 0 + 10.40 = 140.38
      const order = res.body.order;
      expect(order.items[0].price).toBe(64.99); // Genuine DB price
      expect(order.subtotal).toBe(129.98);
      expect(order.shippingFee).toBe(0);
      expect(order.tax).toBe(10.4);
      expect(order.total).toBe(140.38);
    });

    it('should calculate shipping fee when subtotal is under $50', async () => {
      // Hydro Flask prod-008 is $44.95 (under $50)
      const orderData = {
        items: [{ productId: 'prod-008', quantity: 1 }],
        shipping: {
          name: 'Buyer',
          email: 'buyer@example.com',
          phone: '1234567890',
          address: '456 Street',
          city: 'Lahore',
          zipCode: '54000',
        },
      };

      const res = await request(app).post('/order').send(orderData);
      expect(res.status).toBe(201);
      expect(res.body.order.shippingFee).toBe(4.99);
    });

    it('should reject orders exceeding available stock', async () => {
      const orderData = {
        items: [
          {
            productId: 'prod-007', // Stock is 12
            quantity: 999, // Exceeds stock
          },
        ],
        shipping: {
          name: 'Greedy Buyer',
          email: 'greedy@example.com',
          phone: '1234567890',
          address: '789 Road',
          city: 'Islamabad',
          zipCode: '44000',
        },
      };

      const res = await request(app).post('/order').send(orderData);
      expect(res.status).toBe(400);
      expect(res.body.message).toContain('Insufficient stock');
    });
  });

  describe('4. Order Ownership & User Isolation', () => {
    it('should isolate orders so user A cannot see user B orders', async () => {
      // Register User A
      const userARes = await request(app)
        .post('/user/register')
        .send({ name: 'User A', email: 'userA@test.com', password: 'PasswordA1' });
      const tokenA = userARes.body.token;

      // Register User B
      const userBRes = await request(app)
        .post('/user/register')
        .send({ name: 'User B', email: 'userB@test.com', password: 'PasswordB1' });
      const tokenB = userBRes.body.token;

      // User A places an order
      const orderRes = await request(app)
        .post('/order')
        .set('Authorization', `Bearer ${tokenA}`)
        .send({
          items: [{ productId: 'prod-001', quantity: 1 }],
          shipping: {
            name: 'User A',
            email: 'userA@test.com',
            phone: '123456789',
            address: 'A Street',
            city: 'City A',
            zipCode: '10001',
          },
        });

      const orderAId = orderRes.body.order._id;

      // User A gets their orders
      const userAOrders = await request(app)
        .get('/order')
        .set('Authorization', `Bearer ${tokenA}`);
      expect(userAOrders.status).toBe(200);
      expect(userAOrders.body.length).toBe(1);

      // User B gets their orders (should be empty!)
      const userBOrders = await request(app)
        .get('/order')
        .set('Authorization', `Bearer ${tokenB}`);
      expect(userBOrders.status).toBe(200);
      expect(userBOrders.body.length).toBe(0);

      // User B tries to directly fetch User A's order by ID -> must be 403 Forbidden
      const forbiddenRes = await request(app)
        .get(`/order/${orderAId}`)
        .set('Authorization', `Bearer ${tokenB}`);
      expect(forbiddenRes.status).toBe(403);
    });
  });
});
