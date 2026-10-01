import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Share2, Minus, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/Loader';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import api from '@/api/axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  description?: string;
  stock?: number;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const isInCart = items.some((item) => item.id === id);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast({
          title: 'Error',
          description: 'Failed to load product details',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAdding(true);
    
    // Add the item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image || '/placeholder.svg',
      });
    }
    
    toast({
      title: 'Added to cart',
      description: `${quantity}x ${product.name} added to your cart.`,
    });
    
    setTimeout(() => setIsAdding(false), 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden glass shadow-xl">
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.category && (
                <span className="absolute top-4 left-4 px-4 py-2 text-sm font-medium bg-background/90 backdrop-blur-sm rounded-full">
                  {product.category}
                </span>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-semibold gradient-text">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="h-px bg-border" />

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description ||
                  'This premium product is crafted with the highest quality materials, designed to deliver exceptional performance and style. Perfect for those who appreciate the finer things in life.'}
              </p>
            </div>

            <div className="h-px bg-border" />

            {/* Quantity Selector */}
            <div className="space-y-2">
              <h3 className="font-semibold">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center glass rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.stock && (
                  <span className="text-sm text-muted-foreground">
                    {product.stock} in stock
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="gradient"
                size="xl"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <ShoppingCart className="w-5 h-5" />
                )}
                {isInCart ? 'Add More' : 'Add to Cart'}
              </Button>
              <Button variant="outline" size="xl" className="gap-2">
                <Heart className="w-5 h-5" />
                Wishlist
              </Button>
              <Button variant="ghost" size="icon" className="h-14 w-14">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                { label: 'Free Shipping', value: 'Orders over $50' },
                { label: 'Easy Returns', value: '30-day return policy' },
                { label: 'Secure Payment', value: '100% protected' },
                { label: 'Quality Guarantee', value: '1 year warranty' },
              ].map((feature) => (
                <div key={feature.label} className="glass p-4 rounded-xl">
                  <h4 className="font-medium text-sm">{feature.label}</h4>
                  <p className="text-xs text-muted-foreground">{feature.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
