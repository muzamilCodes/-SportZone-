import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ThreeDTilt } from '@/components/ThreeDTilt';

const Cart = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center container mx-auto px-4">
        <ThreeDTilt depth="subtle">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 glass p-10 rounded-3xl border border-border/50 max-w-md shadow-xl"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold mb-2">Your Cart is Empty</h2>
              <p className="text-sm text-muted-foreground">
                Your athletic gear bag is waiting for champions. Discover our performance products!
              </p>
            </div>
            <Link to="/products" className="block">
              <Button variant="gradient" size="lg" className="w-full gap-2 shadow-md">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </ThreeDTilt>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Your Cart Bag
          </h1>
          <p className="text-muted-foreground">
            {items.length} unique gear item{items.length !== 1 ? 's' : ''} ready for checkout
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-5 border border-border/50 hover:border-primary/30 transition-all shadow-sm"
                >
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <div className="w-full md:w-28 h-28 rounded-xl overflow-hidden bg-muted border border-border/40">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-base font-bold text-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-input rounded-xl bg-background overflow-hidden shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2.5 hover:bg-muted transition-colors text-foreground"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2.5 hover:bg-muted transition-colors text-foreground"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2.5 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right min-w-[90px]">
                      <p className="font-extrabold text-foreground text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-between items-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs"
                onClick={clearCart}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Clear Cart
              </Button>
              <Link to="/products">
                <Button variant="outline" size="sm" className="text-xs">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* 3D Order Summary */}
          <div className="lg:col-span-4 sticky top-24">
            <ThreeDTilt depth="subtle">
              <div className="glass rounded-3xl p-6 space-y-6 border border-border/60 shadow-xl">
                <h2 className="text-xl font-display font-bold">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>
                      {total >= 50 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Free Delivery</span>
                      ) : (
                        '$4.99'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-semibold text-foreground">${(total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-border/60" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="gradient-text font-extrabold text-xl">
                      ${(total + (total >= 50 ? 0 : 4.99) + total * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link to="/checkout" className="block">
                  <Button variant="gradient" size="xl" className="w-full gap-2 shadow-lg">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <div className="space-y-2 pt-2 border-t border-border/40 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary shrink-0" />
                    <span>Free shipping on all athletic orders over $50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Verified checkout guarantee</span>
                  </div>
                </div>
              </div>
            </ThreeDTilt>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
