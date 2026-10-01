import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { ThreeDTilt } from './ThreeDTilt';

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  description?: string;
  stock?: number;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image || '/placeholder.svg',
    });

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group"
    >
      <ThreeDTilt depth="subtle" glow className="h-full">
        <Link to={`/product/${product._id}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
          <div className="glass rounded-2xl overflow-hidden card-hover shadow-card h-full flex flex-col justify-between border border-border/50 hover:border-primary/40 transition-all duration-300">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />

              {/* Category Badge */}
              {product.category && (
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-background/90 backdrop-blur-md rounded-full shadow-sm text-foreground/90">
                  {product.category}
                </span>
              )}

              {/* Stock Indicator */}
              {product.stock !== undefined && (
                <span
                  className={`absolute top-3 right-3 px-2 py-0.5 text-[11px] font-medium rounded-md backdrop-blur-sm ${
                    product.stock > 0
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-destructive/20 text-destructive border border-destructive/30'
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors text-base">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {product.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-2">
                <span className="text-lg font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                <Button
                  size="sm"
                  variant="gradient"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="gap-1.5 shadow-sm active:scale-95"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </ThreeDTilt>
    </motion.div>
  );
};
