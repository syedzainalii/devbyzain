'use client';
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  className = '',
  disabled = false,
  icon = null
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} flex items-center gap-2`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}
