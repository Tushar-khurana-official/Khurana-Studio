import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-studio-dark"
        >
          <div className="text-center flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-serif font-bold tracking-[0.25em] text-studio-silver"
                  style={{ fontSize: 'clamp(48px, 10vw, 80px)' }}>
                KS
              </h1>
              <p className="font-sans text-[0.55rem] tracking-[0.42em] uppercase text-white/30 mt-2">
                Khurana Studio
              </p>
            </motion.div>

            {/* Loading bar */}
            <div className="w-24 h-px bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-studio-silver"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
