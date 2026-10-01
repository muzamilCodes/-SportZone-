import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ThreeDTiltProps {
  children: React.ReactNode;
  className?: string;
  depth?: 'subtle' | 'medium' | 'deep';
  glow?: boolean;
}

export const ThreeDTilt: React.FC<ThreeDTiltProps> = ({
  children,
  className = '',
  depth = 'medium',
  glow = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const depthMultiplier = depth === 'subtle' ? 6 : depth === 'deep' ? 16 : 10;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -depthMultiplier;
    const rY = ((x - centerX) / centerX) * depthMultiplier;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion && !isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Accessible fallback for reduced motion or mobile devices
  if (prefersReducedMotion || isTouchDevice) {
    return (
      <div className={`transition-transform duration-200 hover:-translate-y-1 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: 1000 }}
      className={`transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          mass: 0.5,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative"
      >
        {children}
        {glow && isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl opacity-20 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, hsl(var(--primary)) 0%, transparent 70%)',
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ThreeDTilt;
