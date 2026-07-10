import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
  amount?: number | "some" | "all";
}

export const FadeIn = ({ 
  children, 
  delay = 0, 
  direction = 'up', 
  duration = 0.8,
  className = "",
  amount = 0.2
}: FadeInProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: amount === "some" ? 0.2 : amount === "all" ? 1 : amount,
  });

  const getInitialY = () => {
    if (direction === 'up') return 40;
    if (direction === 'down') return -40;
    return 0;
  };

  const getInitialX = () => {
    if (direction === 'left') return 40;
    if (direction === 'right') return -40;
    return 0;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: getInitialY(), 
        x: getInitialX() 
      }}
      animate={{ 
        opacity: inView ? 1 : 0, 
        y: inView ? 0 : getInitialY(), 
        x: inView ? 0 : getInitialX() 
      }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
