import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Truck, Shield, Headphones, Trophy, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/Loader';
import { ThreeDTilt } from '@/components/ThreeDTilt';
import { ThreeDSportsBall } from '@/components/ThreeDSportsBall';
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

const features = [
  {
    icon: Truck,
    title: 'Free Shipping Over $50',
    description: 'Fast, trackable express delivery on athletic orders',
  },
  {
    icon: Shield,
    title: 'Verified Equipment',
    description: '100% genuine pro-grade sports merchandise',
  },
  {
    icon: Headphones,
    title: '24/7 Athlete Support',
    description: 'Dedicated team for fit, gear, and order queries',
  },
];

const categories = [
  { name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop' },
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&h=500&fit=crop' },
  { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop' },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product');
        setFeaturedProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Depth */}
      <section className="relative overflow-hidden py-16 lg:py-28">
        {/* Ambient 3D Depth Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold border border-primary/20 text-primary">
                <Flame className="w-4 h-4 fill-primary animate-pulse" />
                <span>2026 Pro Athlete Gear Lineup</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.1]">
                Unleash Your <br />
                <span className="gradient-text">Championship</span> Potential
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Step into superior athletic performance. Engineered sports apparel, cutting-edge fitness trackers, and tournament-grade gear built to push your limits.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/products">
                  <Button variant="gradient" size="xl" className="gap-2 shadow-lg hover:shadow-primary/25">
                    Explore Gear
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/products?category=Sports">
                  <Button variant="outline" size="xl" className="border-border/60 hover:bg-muted/50">
                    Pro Collection
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 border-t border-border/40 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <div className="text-2xl font-bold font-display text-foreground">100%</div>
                  <div className="text-xs text-muted-foreground">Original Brands</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-display text-foreground">50k+</div>
                  <div className="text-xs text-muted-foreground">Happy Athletes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-display text-foreground">4.9/5</div>
                  <div className="text-xs text-muted-foreground">Store Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Right 3D Visual Stage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <ThreeDTilt depth="deep" glow className="max-w-md mx-auto">
                <div className="relative aspect-square rounded-3xl overflow-hidden glass p-4 border border-white/10 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&h=700&fit=crop"
                    alt="SportZone Pro Gear"
                    className="w-full h-full object-cover rounded-2xl"
                  />

                  {/* Floating 3D Sports Ball Canvas Widget */}
                  <div className="absolute -bottom-4 -right-4 p-3 glass rounded-2xl border border-primary/30 shadow-xl backdrop-blur-xl">
                    <div className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-primary" /> 3D SportSphere
                    </div>
                    <ThreeDSportsBall className="w-32 h-32" />
                    <p className="text-[10px] text-muted-foreground text-center mt-1">Drag to rotate 3D sphere</p>
                  </div>
                </div>
              </ThreeDTilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section with 3D Card Depth */}
      <section className="py-12 border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <ThreeDTilt key={feature.title} depth="subtle">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 glass rounded-2xl h-full border border-border/40 hover:border-primary/30 transition-all"
                >
                  <div className="p-3.5 rounded-xl bg-primary/10 shrink-0 text-primary border border-primary/20">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              </ThreeDTilt>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold mb-3">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Find gear tailored specifically for your sport and training regimen.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <ThreeDTilt key={category.name} depth="medium">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/products?category=${category.name}`}
                    className="block group relative aspect-square rounded-2xl overflow-hidden shadow-card border border-border/40"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-background group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <span className="text-xs text-background/80 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore Gear <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </ThreeDTilt>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Handpicked Excellence
              </div>
              <h2 className="text-3xl font-display font-bold">
                Featured Gear
              </h2>
            </div>
            <Link to="/products">
              <Button variant="outline" className="gap-2">
                View All Gear
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
