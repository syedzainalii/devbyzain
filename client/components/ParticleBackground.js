'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ParticleBackground({ particleCount = 40 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Gradient - Updated Colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#380036] via-purple-900/40 to-[#0CBABA]"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-3000"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(12, 186, 186, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(12, 186, 186, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px'
      }}></div>
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.4) 100%)`
      }}></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {mounted && [...Array(particleCount)].map((_, i) => {
          const randomLeft = Math.random() * 100;
          const randomTop = Math.random() * 100;
          const randomSize = 2 + Math.random() * 3;
          const randomY = -40 - Math.random() * 30;
          const randomX = Math.random() * 20 - 10;
          const randomScale = 1.5 + Math.random() * 0.5;
          const randomDuration = 3 + Math.random() * 3;
          const randomDelay = Math.random() * 3;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${randomLeft}%`,
                top: `${randomTop}%`,
                width: `${randomSize}px`,
                height: `${randomSize}px`,
                background: i % 3 === 0 ? '#0CBABA' : i % 3 === 1 ? '#8b5cf6' : '#ec4899',
              }}
              animate={{
                y: [0, randomY, 0],
                x: [0, randomX, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, randomScale, 1]
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "easeInOut",
                repeatType: "loop"
              }}
            />
          );
        })}
      </div>
      
      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#0CBABA" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,100 Q250,50 500,100 T1000,100"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M0,300 Q250,250 500,300 T1000,300"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
        <motion.path
          d="M0,500 Q250,450 500,500 T1000,500"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
      </svg>
    </div>
  );
}
