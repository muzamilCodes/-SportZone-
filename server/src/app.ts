import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

export const app = express();

// Middlewares
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'SportZone API', timestamp: new Date().toISOString() });
});

// Auth Routes - support /user, /auth, and /api/auth
app.use('/user', authRoutes);
app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes);

// Product Routes - support /product and /api/products
app.use('/product', productRoutes);
app.use('/products', productRoutes);
app.use('/api/products', productRoutes);

// Order Routes - support /order and /api/orders
app.use('/order', orderRoutes);
app.use('/orders', orderRoutes);
app.use('/api/orders', orderRoutes);

// 404 Handler for API
app.use((req, res) => {
  res.status(404).json({ message: `API route '${req.method} ${req.originalUrl}' not found.` });
});

export default app;
