import React from 'react';
import { motion } from 'framer-motion';

interface RomanticArrowProps {
  message: string;
  onComplete: () => void;
}

const RomanticArrow: React.FC<RomanticArrowProps> = ({ message, onComplete }) => {
  return (
    <motion.div
      initial={{ x: '-100vw', y: '50%', rotate: -15 }}
      animate={{ 
        x: ['100vw', '0vw', '0vw', '-100vw'],
        rotate: [-15, 0, 0, 15],
      }}
      transition={{ 
        duration: 7,
        times: [0, 0.25, 0.7, 1],
        ease: 'easeInOut'
      }}
      onAnimationComplete={onComplete}
      className="fixed top-1/2 -translate-y-1/2 z-50 flex items-center pointer-events-none"
    >
      {/* Arrow shaft with letter */}
      <div className="relative flex items-center">
        {/* Arrow tail feathers */}
        <div className="flex flex-col items-end -mr-1">
          <motion.div 
            className="w-8 h-2 bg-valentine-crimson rounded-l-full -rotate-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <motion.div 
            className="w-10 h-2 bg-primary rounded-l-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <motion.div 
            className="w-8 h-2 bg-valentine-crimson rounded-l-full rotate-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        </div>

        {/* Main shaft */}
        <div className="w-32 md:w-48 h-3 bg-gradient-to-r from-valentine-gold via-valentine-rose to-valentine-gold rounded-full relative">
          {/* Letter attached to arrow */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute left-1/2 -translate-x-1/2 -top-16 glass-card px-4 py-3 shadow-xl"
          >
            <div className="text-sm md:text-base font-body text-foreground whitespace-nowrap">
              {message}
            </div>
            {/* Little triangle pointer */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 
              border-l-8 border-r-8 border-t-8 
              border-l-transparent border-r-transparent border-t-card" />
          </motion.div>
        </div>

        {/* Arrow head (heart shaped) */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="text-4xl -ml-2"
        >
          💘
        </motion.div>
      </div>

      {/* Trailing sparkles */}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.3 }}
        className="absolute -left-8 text-2xl"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.4, delay: 0.1 }}
        className="absolute -left-16 text-xl"
      >
        💕
      </motion.div>
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.35, delay: 0.2 }}
        className="absolute -left-24 text-lg"
      >
        ✨
      </motion.div>
    </motion.div>
  );
};

export default RomanticArrow;
