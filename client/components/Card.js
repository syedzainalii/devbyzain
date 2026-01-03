'use client';
import { motion } from 'framer-motion';

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  onClick = null,
  delay = 0
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`${hover ? 'glass-card-hover' : 'glass-card'} p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
