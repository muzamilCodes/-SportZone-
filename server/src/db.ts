import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabaseSchema, Product, User, Order } from './types.js';
import { initialProducts } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

class Database {
  private data: DatabaseSchema = {
    users: [],
    products: [],
    orders: [],
  };

  constructor() {
    this.init();
  }

  private init() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // Ensure products are seeded if empty
        if (!this.data.products || this.data.products.length === 0) {
          this.data.products = [...initialProducts];
          this.save();
        }
      } catch (e) {
        console.warn('Corrupt DB file encountered, re-initializing with seed data...');
        this.seedInitial();
      }
    } else {
      this.seedInitial();
    }
  }

  public seedInitial() {
    this.data = {
      users: [],
      products: [...initialProducts],
      orders: [],
    };
    this.save();
  }

  private save() {
    try {
      const tempPath = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE);
    } catch (e) {
      console.error('Failed to persist database file:', e);
    }
  }

  // Users
  getUsers(): User[] {
    return this.data.users;
  }

  getUserById(id: string): User | undefined {
    return this.data.users.find((u) => u._id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.data.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
  }

  addUser(user: User): User {
    this.data.users.push(user);
    this.save();
    return user;
  }

  // Products
  getProducts(): Product[] {
    return this.data.products;
  }

  getProductById(id: string): Product | undefined {
    return this.data.products.find((p) => p._id === id);
  }

  updateProductStock(id: string, newStock: number): Product | undefined {
    const prod = this.getProductById(id);
    if (prod) {
      prod.stock = newStock;
      this.save();
    }
    return prod;
  }

  // Orders
  getOrders(): Order[] {
    return this.data.orders;
  }

  getOrdersByUserId(userId: string): Order[] {
    return this.data.orders.filter((o) => o.userId === userId);
  }

  getOrderById(id: string): Order | undefined {
    return this.data.orders.find((o) => o._id === id);
  }

  addOrder(order: Order): Order {
    this.data.orders.unshift(order);
    this.save();
    return order;
  }

  resetForTests() {
    this.seedInitial();
  }
}

export const db = new Database();
