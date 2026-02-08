import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

const ValentineFinale: React.FC = () => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);

  const funnyTexts = [
    "Will you be my Valentine? 💕",
    "Are you sure you want to say no? 🥺",
    "Think again, sweetheart! 💗",
    "You can't escape love! 💘",
    "The No button is shy! 🙈",
    "Love always wins! 💖",
  ];

  const moveNoButton = useCallback(() => {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;
    setNoPos({ x, y });
    setHoverCount((c) => c + 1);
  }, []);

  if (accepted) {
    return (
      <div className="min-h-screen valentine-bg flex items-center justify-center p-4 relative overflow-hidden">
        <FloatingParticles />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 150 }}
          className="text-center relative z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-8xl mb-6"
          >
            💖
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-display text-gradient mb-4">
            Yayyy! 🎉
          </h1>
          <p className="text-xl md:text-2xl font-body text-foreground">
            I knew you'd say yes! Happy Valentine's Day, my love! 🌹
          </p>
          <div className="flex justify-center gap-4 mt-8 text-4xl">
            {['🧸', '❤️', '🌹', '💕', '🍫', '💖'].map((e, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              >
                {e}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen valentine-bg flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />

      <div className="text-center relative z-10">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-7xl mb-6"
        >
          🧸
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-display text-gradient mb-8">
          {funnyTexts[Math.min(hoverCount, funnyTexts.length - 1)]}
        </h1>

        <div className="flex items-center justify-center gap-8 relative" style={{ minHeight: '120px' }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setAccepted(true)}
            className="px-10 py-5 rounded-2xl valentine-gradient text-primary-foreground 
              font-body font-bold text-xl glow-primary z-10"
            style={{ fontSize: `${Math.min(20 + hoverCount * 2, 36)}px` }}
          >
            Yes! 💖
          </motion.button>

          <motion.button
            animate={{ x: noPos.x, y: noPos.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            className="px-6 py-3 rounded-2xl bg-secondary text-secondary-foreground 
              font-body font-semibold text-sm border border-border"
            style={{ fontSize: `${Math.max(14 - hoverCount, 8)}px` }}
          >
            No 😢
          </motion.button>
        </div>

        {hoverCount > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-muted-foreground font-body italic"
          >
            {hoverCount >= 5
              ? "Just click Yes already! 😄💕"
              : `The No button ran away ${hoverCount} time${hoverCount > 1 ? 's' : ''}! 🏃‍♂️`}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default ValentineFinale;
