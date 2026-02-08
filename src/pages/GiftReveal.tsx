import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, ArrowLeft } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

interface GiftRevealProps {
  giftNumber: 1 | 2 | 3;
  onComplete: () => void;
}

const giftData = {
  1: {
    title: "My Promise",
    message: "I promise to always be there for you, through every laugh and every tear. You're my forever person. 💖",
    emoji: "💌",
    color: "from-valentine-rose to-valentine-pink",
  },
  2: {
    title: "Our Memories",
    message: "Every moment with you becomes a treasured memory. From our first hello to our millionth 'I love you'. 🌹",
    emoji: "📸",
    color: "from-valentine-gold to-valentine-rose",
  },
  3: {
    title: "Forever Yours",
    message: "My heart, my soul, my everything belongs to you. Today, tomorrow, and always. You complete me. 💝",
    emoji: "💍",
    color: "from-valentine-crimson to-valentine-rose",
  },
};

const GiftReveal: React.FC<GiftRevealProps> = ({ giftNumber, onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const gift = giftData[giftNumber];

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => setIsOpened(true), 1500);
  };

  return (
    <div className="min-h-screen valentine-bg flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />

      <div className="w-full max-w-md relative z-10">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="gift-box"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, rotate: 360 }}
              className="text-center"
            >
              <h1 className="text-3xl font-display text-gradient mb-8">
                Gift #{giftNumber} 🎁
              </h1>

              <motion.div
                animate={isOpening ? { 
                  scale: [1, 1.2, 0.8, 1.5, 0],
                  rotate: [0, -10, 10, -10, 0],
                  y: [0, -20, 0, -30, -100]
                } : { 
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={isOpening ? { duration: 1.5 } : { repeat: Infinity, duration: 2 }}
                className="inline-block cursor-pointer"
                onClick={!isOpening ? handleOpen : undefined}
              >
                <div className={`w-40 h-40 mx-auto rounded-2xl bg-gradient-to-br ${gift.color} 
                  flex items-center justify-center shadow-2xl relative overflow-hidden`}>
                  <Gift className="w-20 h-20 text-white" />
                  
                  {/* Ribbon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-full h-4 bg-valentine-gold/80" />
                    <div className="absolute h-full w-4 bg-valentine-gold/80" />
                  </div>

                  {/* Sparkles */}
                  {!isOpening && (
                    <>
                      <motion.div
                        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                        className="absolute -top-2 -right-2"
                      >
                        <Sparkles className="w-6 h-6 text-valentine-gold" />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.7 }}
                        className="absolute -bottom-2 -left-2"
                      >
                        <Sparkles className="w-6 h-6 text-valentine-gold" />
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>

              {!isOpening && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 text-muted-foreground font-body"
                >
                  Tap the gift to open! ✨
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="gift-content"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="glass-card p-8 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-4"
              >
                {gift.emoji}
              </motion.div>

              <h2 className="text-2xl font-display text-gradient mb-4">
                {gift.title}
              </h2>

              <p className="font-body text-foreground text-lg leading-relaxed mb-6">
                {gift.message}
              </p>

              {/* Decorative hearts */}
              <div className="flex justify-center gap-2 mb-6">
                {['❤️', '💕', '💖', '💗', '💝'].map((heart, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                    className="text-2xl"
                  >
                    {heart}
                  </motion.span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="px-8 py-3 rounded-xl valentine-gradient text-primary-foreground 
                  font-body font-semibold glow-primary flex items-center gap-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GiftReveal;
