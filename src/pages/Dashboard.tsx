import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, Truck, User, LogOut, ShoppingBag, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/Loader';
import { useAuth } from '@/context/AuthContext';
import { ThreeDTilt } from '@/components/ThreeDTilt';
import api from '@/api/axios';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  subtotal?: number;
  shippingFee?: number;
  tax?: number;
  total: number;
  status?: string;
  paymentMethod?: string;
  createdAt: string;
  shipping?: {
    name: string;
    address: string;
    city: string;
    zipCode?: string;
  };
}

const statusIcons: Record<string, typeof Package> = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
};

const statusColors: Record<string, string> = {
  pending: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
  processing: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
  shipped: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
  delivered: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await api.get('/order');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
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
            Athlete Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your verified orders, delivery status, and sports account settings.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* User Profile Card with 3D Depth */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <ThreeDTilt depth="subtle">
              <div className="glass rounded-3xl p-6 space-y-6 sticky top-24 border border-border/50 shadow-lg">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                    <User className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground truncate">{user?.name || 'Athlete'}</h3>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-primary/10 text-primary border border-primary/20">
                      {user?.role || 'Customer'}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-border/60" />

                {/* Quick Account Metrics */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Total Orders</span>
                    <span className="font-bold text-foreground">{orders.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Account Status</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 text-xs">
                      <Shield className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>
                </div>

                <div className="h-px bg-border/60" />

                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-border/60"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </Button>
              </div>
            </ThreeDTilt>
          </motion.div>

          {/* Orders Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold">Recent Orders ({orders.length})</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/products')} className="text-xs gap-1">
                <ShoppingBag className="w-3.5 h-3.5" /> Shop More
              </Button>
            </div>

            {isLoading ? (
              <div className="py-12 flex justify-center">
                <Loader size="md" />
              </div>
            ) : orders.length === 0 ? (
              <div className="glass rounded-3xl p-12 text-center space-y-4 border border-border/50">
                <div className="w-16 h-16 rounded-2xl bg-muted mx-auto flex items-center justify-center">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No orders yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Looks like you haven't placed an order yet. Check out our high-performance sports lineup!
                </p>
                <Button variant="gradient" onClick={() => navigate('/products')}>
                  Explore Products
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const StatusIcon = statusIcons[order.status || 'pending'] || Clock;
                  const statusStyle = statusColors[order.status || 'pending'] || statusColors.pending;

                  return (
                    <ThreeDTilt key={order._id} depth="subtle">
                      <div className="glass rounded-2xl p-6 space-y-4 border border-border/50 hover:border-primary/30 transition-all">
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/50">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-bold text-foreground">
                                {order._id}
                              </span>
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${statusStyle}`}>
                                <StatusIcon className="w-3 h-3" />
                                {order.status || 'pending'}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="text-xs text-muted-foreground block">Verified Total</span>
                            <span className="text-xl font-extrabold gradient-text">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm py-1">
                              <div className="flex items-center gap-3">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 rounded-lg object-cover bg-muted border border-border/40 shrink-0"
                                  />
                                )}
                                <div>
                                  <p className="font-medium text-foreground line-clamp-1">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <span className="font-semibold text-foreground">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer & Shipping info */}
                        {order.shipping && (
                          <div className="pt-3 border-t border-border/40 text-xs text-muted-foreground flex flex-wrap justify-between items-center gap-2">
                            <span>
                              Shipping to: <strong className="text-foreground">{order.shipping.name}</strong>, {order.shipping.address}, {order.shipping.city}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-muted">
                              Payment: {order.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Card (Sandbox)'}
                            </span>
                          </div>
                        )}
                      </div>
                    </ThreeDTilt>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
