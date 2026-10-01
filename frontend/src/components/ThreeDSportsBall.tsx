import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

interface ThreeDSportsBallProps {
  className?: string;
}

export const ThreeDSportsBall: React.FC<ThreeDSportsBallProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angleX = 0.2;
    let angleY = 0.2;
    let velX = 0.005;
    let velY = 0.008;

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Track mouse interaction
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      velY = dx * 0.005;
      velX = dy * 0.005;
      angleY += velY;
      angleX += velX;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Sphere point cloud / longitude-latitude rings projection
    const radius = 95;
    const numRings = 14;
    const pointsPerRing = 24;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);

      if (!prefersReducedMotion && !isDragging) {
        angleX += velX;
        angleY += velY;
        velX *= 0.985;
        velY *= 0.985;
        if (Math.abs(velX) < 0.003) velX = 0.003;
        if (Math.abs(velY) < 0.004) velY = 0.004;
      }

      // Draw glowing sphere ambient backdrop
      const radial = ctx.createRadialGradient(
        centerX - 25,
        centerY - 25,
        15,
        centerX,
        centerY,
        radius + 15
      );
      radial.addColorStop(0, 'rgba(235, 94, 40, 0.45)');
      radial.addColorStop(0.7, 'rgba(255, 120, 70, 0.15)');
      radial.addColorStop(1, 'rgba(20, 20, 25, 0)');

      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 15, 0, Math.PI * 2);
      ctx.fill();

      // Render 3D Latitude/Longitude Ribs with depth sorting
      for (let i = 0; i < numRings; i++) {
        const phi = (i / (numRings - 1)) * Math.PI;
        const ringRadius = radius * Math.sin(phi);
        const y0 = radius * Math.cos(phi);

        for (let j = 0; j < pointsPerRing; j++) {
          const theta = (j / pointsPerRing) * Math.PI * 2;
          const x0 = ringRadius * Math.cos(theta);
          const z0 = ringRadius * Math.sin(theta);

          // Rotate around X
          const y1 = y0 * Math.cos(angleX) - z0 * Math.sin(angleX);
          const z1 = y0 * Math.sin(angleX) + z0 * Math.cos(angleX);

          // Rotate around Y
          const x2 = x0 * Math.cos(angleY) + z1 * Math.sin(angleY);
          const z2 = -x0 * Math.sin(angleY) + z1 * Math.cos(angleY);

          // Perspective projection
          const fov = 300;
          const scale = fov / (fov + z2);
          const px = centerX + x2 * scale;
          const py = centerY + y1 * scale;

          // Depth based size and brightness
          const alpha = Math.max(0.1, (z2 + radius) / (2 * radius));
          const pointSize = Math.max(1, 2.5 * scale);

          ctx.fillStyle = `rgba(255, 130, 45, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(px, py, pointSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [prefersReducedMotion]);

  return (
    <div className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[280px] max-h-[280px]"
        aria-label="Interactive 3D sports sphere"
        role="img"
      />
    </div>
  );
};

export default ThreeDSportsBall;
