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
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={`${hover ? 'glass-card-hover' : 'glass-card'} p-4 sm:p-5 md:p-6 ${onClick ? 'cursor-pointer active:scale-95' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
