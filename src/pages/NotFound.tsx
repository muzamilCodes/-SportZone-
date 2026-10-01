import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThreeDTilt } from '@/components/ThreeDTilt';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 container mx-auto px-4">
      <ThreeDTilt depth="deep" glow className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center glass p-10 rounded-3xl border border-border/60 shadow-2xl space-y-6"
        >
          {/* 404 Number with 3D Glow */}
          <div className="relative">
            <span className="text-[120px] md:text-[140px] font-display font-extrabold gradient-text leading-none select-none block">
              404
            </span>
            <div className="absolute inset-0 blur-3xl opacity-25 bg-gradient-to-br from-primary to-accent pointer-events-none" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold text-foreground">Play Out of Bounds</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Looks like you drifted outside the arena. The page you are looking for has been moved or doesn't exist.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/" className="flex-1">
              <Button variant="gradient" size="lg" className="gap-2 w-full shadow-md">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/products" className="flex-1">
              <Button variant="outline" size="lg" className="gap-2 w-full border-border/60">
                <Search className="w-4 h-4" />
                Browse Gear
              </Button>
            </Link>
          </div>
        </motion.div>
      </ThreeDTilt>
    </div>
  );
};

export default NotFound;
