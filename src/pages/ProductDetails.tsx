import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Share2, Minus, Plus, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/Loader';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { ThreeDTilt } from '@/components/ThreeDTilt';
import api from '@/api/axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  description?: string;
  stock?: number;
  rating?: number;
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

    if (product.stock !== undefined && product.stock < quantity) {
      toast({
        title: 'Insufficient stock',
        description: `Only ${product.stock} items available in stock.`,
        variant: 'destructive',
      });
      return;
    }

    setIsAdding(true);

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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 3D Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ThreeDTilt depth="deep" glow>
              <div className="relative aspect-square rounded-3xl overflow-hidden glass shadow-2xl border border-border/60 p-4">
                <img
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
                {product.category && (
                  <span className="absolute top-6 left-6 px-4 py-1.5 text-xs font-semibold bg-background/90 backdrop-blur-md rounded-full border border-border/40 shadow-md">
                    {product.category}
                  </span>
                )}
                {product.stock !== undefined && (
                  <span
                    className={`absolute top-6 right-6 px-3 py-1 text-xs font-medium rounded-full backdrop-blur-md border ${
                      product.stock > 0
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                        : 'bg-destructive/20 text-destructive border-destructive/30'
                    }`}
                  >
                    {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                  </span>
                )}
              </div>
            </ThreeDTilt>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-3xl font-extrabold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                {product.rating && (
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    ★ {product.rating} Rating
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-base">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-input rounded-xl bg-background shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-muted rounded-l-xl transition-colors disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={product.stock !== undefined && quantity >= product.stock}
                    className="p-3 hover:bg-muted rounded-r-xl transition-colors disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.stock !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    Max: {product.stock} available
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="gradient"
                size="xl"
                className="flex-1 gap-2 shadow-lg"
                onClick={handleAddToCart}
                disabled={isAdding || product.stock === 0}
              >
                {isInCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Add More ({quantity})
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart ({quantity})
                  </>
                )}
              </Button>
            </div>

            {/* Trust Assurances */}
            <div className="pt-6 border-t border-border/50 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 text-sm">
                <Truck className="w-5 h-5 text-primary shrink-0" />
                <span>Fast express delivery</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 text-sm">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <span>Genuine sports warranty</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 text-sm">
                <RotateCcw className="w-5 h-5 text-primary shrink-0" />
                <span>30-Day returns guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
