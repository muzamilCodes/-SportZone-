import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  description?: string;
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
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product._id}`}>
        <div className="glass rounded-2xl overflow-hidden card-hover shadow-card">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
            
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Button
                variant="glass"
                size="icon"
                className="flex-1 h-10"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
              <Button variant="glass" size="icon" className="h-10">
                <Eye className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Category Badge */}
            {product.category && (
              <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full">
                {product.category}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            )}
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-semibold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              <Button
                size="sm"
                variant="gradient"
                onClick={handleAddToCart}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
