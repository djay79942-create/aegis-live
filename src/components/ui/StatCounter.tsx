import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatCounterProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
  delay?: number;
  variant?: 'default' | 'danger' | 'success' | 'warning';
}

export default function StatCounter({ value, label, icon, suffix = '', delay = 0, variant = 'default' }: StatCounterProps) {
  const iconColor = variant === 'danger' ? 'text-destructive' : variant === 'success' ? 'text-success' : variant === 'warning' ? 'text-warning' : 'text-primary';
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className="glass-card p-6 rounded-xl relative overflow-hidden group"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon */}
      <div className={`${iconColor} mb-3 relative z-10 flex items-center justify-between`}>
        {icon}
        {variant === 'danger' && <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />}
      </div>
      
      {/* Counter */}
      <div className="relative z-10">
        <div className="font-display text-4xl font-bold text-foreground mb-1 text-glow">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-sm text-muted-foreground uppercase tracking-widest">
          {label}
        </div>
      </div>

      {/* Decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </motion.div>
  );
}
