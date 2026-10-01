import { Router, Response } from 'express';
import { z } from 'zod';
import { db } from '../db.js';
import { optionalAuth, requireAuth, AuthRequest } from '../middleware/auth.js';
import { Order, OrderItem } from '../types.js';

const router = Router();

const OrderInputSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1, 'Product ID is required'),
      quantity: z.number().int().positive('Quantity must be greater than 0'),
    })
  ).min(1, 'At least one item is required in the order'),
  shipping: z.object({
    name: z.string().min(2, 'Full name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(5, 'Valid phone number is required'),
    address: z.string().min(5, 'Delivery street address is required'),
    city: z.string().min(2, 'City is required'),
    zipCode: z.string().min(2, 'Postal/Zip code is required'),
  }),
  paymentMethod: z
    .enum(['cash_on_delivery', 'stripe_card_test', 'bank_transfer'])
    .default('cash_on_delivery'),
});

// POST /order - Create order with server-side price recalculation & stock check
router.post('/', optionalAuth, (req: AuthRequest, res: Response) => {
  try {
    const parseResult = OrderInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: parseResult.error.errors[0]?.message || 'Invalid order data',
        errors: parseResult.error.errors,
      });
    }

    const { items: inputItems, shipping, paymentMethod } = parseResult.data;

    // Validate products and recalculate prices strictly from DB
    const verifiedItems: OrderItem[] = [];
    let subtotal = 0;

    for (const item of inputItems) {
      const product = db.getProductById(item.productId);
      if (!product) {
        return res.status(400).json({
          message: `Product '${item.productId}' does not exist in our catalog.`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for '${product.name}'. Only ${product.stock} available.`,
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      verifiedItems.push({
        productId: product._id,
        name: product.name,
        price: product.price, // STRICT: pulled from DB, not frontend
        quantity: item.quantity,
        image: product.image,
      });
    }

    subtotal = Number(subtotal.toFixed(2));
    // Shipping: Free on orders over $50, else $4.99
    const shippingFee = subtotal >= 50 ? 0 : 4.99;
    // Standard 8% tax calculation
    const tax = Number((subtotal * 0.08).toFixed(2));
    const total = Number((subtotal + shippingFee + tax).toFixed(2));

    // Deduct stock safely
    for (const item of verifiedItems) {
      const product = db.getProductById(item.productId)!;
      db.updateProductStock(product._id, product.stock - item.quantity);
    }

    // Associate with user if logged in, otherwise guest identifier
    const userId = req.user ? req.user.id : `guest-${Date.now()}`;

    const newOrder: Order = {
      _id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      items: verifiedItems,
      subtotal,
      shippingFee,
      tax,
      total,
      status: 'pending',
      paymentMethod,
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'pending',
      shipping,
      createdAt: new Date().toISOString(),
    };

    db.addOrder(newOrder);

    return res.status(201).json({
      message:
        paymentMethod === 'cash_on_delivery'
          ? 'Order created successfully with Cash on Delivery. Payment will be collected on delivery.'
          : 'Order created in test mode. No live payment gateway processed.',
      order: newOrder,
      recalculated: {
        subtotal,
        shippingFee,
        tax,
        total,
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Internal server error while creating order' });
  }
});

// GET /order - Get orders for the logged-in user only
router.get('/', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const userOrders = db.getOrdersByUserId(userId);
    return res.status(200).json(userOrders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return res.status(500).json({ message: 'Failed to retrieve orders' });
  }
});

// GET /order/:id - Get single order details with ownership verification
router.get('/:id', requireAuth, (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const order = db.getOrderById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Enforce ownership: only the buyer or an admin can access this order
    if (order.userId !== req.user!.id && req.user!.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: You do not own this order' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return res.status(500).json({ message: 'Failed to retrieve order details' });
  }
});

export default router;
