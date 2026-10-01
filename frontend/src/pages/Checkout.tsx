import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, CheckCircle, Truck, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { ThreeDTilt } from '@/components/ThreeDTilt';
import api from '@/api/axios';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

interface PlacedOrderInfo {
  _id: string;
  total: number;
  paymentMethod: string;
  shippingFee: number;
  tax: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrderInfo | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'stripe_card_test'>('cash_on_delivery');
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add items to your cart before checkout.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Security: Backend recalculates unit prices and totals from database
      const orderPayload = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        shipping: formData,
        paymentMethod,
      };

      const response = await api.post('/order', orderPayload);
      const createdOrder = response.data.order;

      setPlacedOrder({
        _id: createdOrder._id,
        total: createdOrder.total,
        paymentMethod: createdOrder.paymentMethod,
        shippingFee: createdOrder.shippingFee,
        tax: createdOrder.tax,
      });

      clearCart();

      toast({
        title: 'Order Confirmed!',
        description:
          paymentMethod === 'cash_on_delivery'
            ? 'Order registered for Cash on Delivery.'
            : 'Order registered in Test Sandbox mode.',
      });
    } catch (error: unknown) {
      console.error('Checkout failed:', error);
      const serverMessage =
        typeof error === 'object' && error !== null && 'response' in error && (error as { response?: { data?: { message?: string } } }).response?.data?.message
          ? (error as { response?: { data?: { message?: string } } }).response!.data!.message!
          : 'Checkout failed. Please verify your details.';
      toast({
        title: 'Checkout Unsuccessful',
        description: serverMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center container mx-auto px-4">
        <ThreeDTilt depth="medium">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 max-w-lg glass p-8 rounded-3xl border border-primary/20 shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>

            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Order Confirmed!</h2>
              <p className="text-sm text-muted-foreground">
                Order ID: <span className="font-mono font-semibold text-foreground">{placedOrder._id}</span>
              </p>
            </div>

            {/* Honest Payment Notice */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border/60 text-left text-sm space-y-2">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <Truck className="w-4 h-4 text-primary" />
                <span>
                  {placedOrder.paymentMethod === 'cash_on_delivery'
                    ? 'Payment Method: Cash on Delivery'
                    : 'Payment Method: Test Card (Sandbox)'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {placedOrder.paymentMethod === 'cash_on_delivery'
                  ? 'Your order has been recorded. Exact amount of $' +
                    placedOrder.total.toFixed(2) +
                    ' will be collected upon parcel handover.'
                  : 'Notice: No live payment gateway was charged. Set VITE_STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY to enable live card transactions.'}
              </p>
              <div className="pt-2 border-t border-border/40 flex justify-between font-bold text-foreground">
                <span>Verified Server Total:</span>
                <span>${placedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                variant="gradient"
                size="lg"
                className="flex-1"
                onClick={() => navigate('/dashboard')}
              >
                Track In Dashboard
              </Button>
              <Button variant="outline" size="lg" className="flex-1" onClick={() => navigate('/products')}>
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        </ThreeDTilt>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </motion.button>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <h1 className="text-3xl font-display font-bold mb-6">Complete Your Order</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="glass rounded-2xl p-6 space-y-4 border border-border/50">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">1</span>
                  Recipient & Contact
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 text-muted-foreground">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full h-11 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                      placeholder="e.g. Alex Morgan"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 text-muted-foreground">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full h-11 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                      placeholder="alex@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 text-muted-foreground">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full h-11 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                    placeholder="+1 (555) 234-5678"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="glass rounded-2xl p-6 space-y-4 border border-border/50">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">2</span>
                  Delivery Address
                </h2>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 text-muted-foreground">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full h-11 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                    placeholder="123 Athlete Boulevard, Suite 4"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 text-muted-foreground">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full h-11 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5 text-muted-foreground">
                      ZIP / Postal Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full h-11 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection - Transparent & Honest */}
              <div className="glass rounded-2xl p-6 space-y-4 border border-border/50">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">3</span>
                  Payment Option
                </h2>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    onClick={() => setPaymentMethod('cash_on_delivery')}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cash_on_delivery'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border/60 hover:bg-muted/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cash_on_delivery'}
                      onChange={() => setPaymentMethod('cash_on_delivery')}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-2">
                        <Truck className="w-4 h-4 text-primary" />
                        Cash on Delivery (Pay on Arrival)
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Pay cash or card directly to courier upon package inspection at your doorstep.
                      </p>
                    </div>
                  </label>

                  {/* Sandbox Card */}
                  <label
                    onClick={() => setPaymentMethod('stripe_card_test')}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'stripe_card_test'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border/60 hover:bg-muted/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'stripe_card_test'}
                      onChange={() => setPaymentMethod('stripe_card_test')}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-primary" />
                        Card Payment (Sandbox Simulation)
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Test flow simulation. Configure Stripe environment keys to activate live credit card processing.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="xl"
                className="w-full gap-2 shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Verifying Order with Server...'
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Place Order (${(total + (total >= 50 ? 0 : 4.99) + total * 0.08).toFixed(2)})
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
                <Info className="w-3.5 h-3.5" />
                <span>Final price, tax, and stock verified securely by backend.</span>
              </div>
            </form>
          </motion.div>

          {/* Order Summary with 3D Depth Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 sticky top-24"
          >
            <ThreeDTilt depth="subtle">
              <div className="glass rounded-3xl p-6 space-y-6 border border-border/60 shadow-xl">
                <h2 className="text-xl font-display font-bold">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate text-foreground">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-bold text-sm text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-border/60" />

                {/* Calculation breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-medium text-foreground">
                      {total >= 50 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Free</span>
                      ) : (
                        '$4.99'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-medium text-foreground">${(total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-border/60" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Estimated Total</span>
                    <span className="gradient-text font-extrabold text-xl">
                      ${(total + (total >= 50 ? 0 : 4.99) + total * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </ThreeDTilt>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
