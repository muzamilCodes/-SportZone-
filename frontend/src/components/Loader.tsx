import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loader = ({ size = 'md', className = '' }: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-2 border-primary/20 border-t-primary`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="skeleton-shimmer aspect-square" />
      <div className="p-4 space-y-3">
        <div className="skeleton-shimmer h-4 rounded w-3/4" />
        <div className="skeleton-shimmer h-3 rounded w-1/2" />
        <div className="skeleton-shimmer h-6 rounded w-1/3" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};
