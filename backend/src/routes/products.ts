import { Router, Request, Response } from 'express';
import { db } from '../db.js';

const router = Router();

// GET all products with filtering & search
router.get('/', (req: Request, res: Response) => {
  try {
    let products = db.getProducts();
    const { category, search, featured, limit } = req.query;

    if (category && typeof category === 'string' && category.toLowerCase() !== 'all') {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search && typeof search === 'string' && search.trim().length > 0) {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (featured === 'true') {
      products = products.filter((p) => p.featured);
    }

    if (limit && !isNaN(Number(limit))) {
      products = products.slice(0, Number(limit));
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// GET single product by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = db.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: `Product with ID '${id}' not found` });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by id:', error);
    return res.status(500).json({ message: 'Failed to fetch product details' });
  }
});

export default router;
