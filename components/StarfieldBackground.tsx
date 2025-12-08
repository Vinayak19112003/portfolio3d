import React, { useEffect, useRef } from 'react';

export const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // Internal state for particles
    let stars: Array<{x: number, y: number, size: number, speed: number, opacity: number}> = [];
    let comets: Array<{x: number, y: number, length: number, speed: number, opacity: number, dying: boolean}> = [];

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
      }
    };

    const initStars = () => {
      stars = [];
      const width = window.innerWidth;
      const height = window.innerHeight;
      const numStars = Math.floor((width * height) / 10000); // Efficient density
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Draw Stars
      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn Comets occasionally
      if (Math.random() < 0.005) { 
        comets.push({
            x: Math.random() * width,
            y: -100,
            length: Math.random() * 80 + 20,
            speed: Math.random() * 8 + 4,
            opacity: 0,
            dying: false
        });
      }

      // Draw Comets
      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        comet.y += comet.speed;
        
        // Fade in logic
        if (comet.y < 100 && comet.opacity < 1) {
            comet.opacity += 0.05;
        }

        // Check if out of bounds
        if (comet.y > height + comet.length) {
          comet.dying = true;
        }

        if (comet.dying) {
          comets.splice(i, 1);
          continue;
        }

        // Draw Comet Tail
        const gradient = ctx.createLinearGradient(comet.x, comet.y, comet.x, comet.y - comet.length);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x, comet.y - comet.length);
        ctx.stroke();
        
        // Draw Comet Head
        ctx.fillStyle = `rgba(255, 255, 255, ${comet.opacity})`;
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen"
    />
  );
};