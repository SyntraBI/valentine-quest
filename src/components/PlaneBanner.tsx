import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bannerMessages = [
  "You're closer to your achievement! 🌟",
  "Keep going, love! Almost there! 💕",
  "Every step brings you closer! 💖",
  "You're doing amazing, sweetheart! 🌹",
  "Love conquers all! Keep going! 💗",
  "The surprise awaits you! ✨",
  "You're unstoppable! 💝",
  "Almost at the finish line! 🎉",
  "Love is in the air! 🦋",
  "The best is yet to come! 💫",
  "Tere bina kuch bhi nahi lagta 💔🔥",
  "Tu meri neend hai, tu meri subah hai 🌙☀️",
  "Tera chehra dekhe bina chain nahi aata 😍",
  "Tujhpe marna meri aadat ban gayi hai 💀❤️",
  "Teri baahon mein duniya bhool jaata hoon 🤗💕",
  "Tu hasi toh lagta hai jannat mil gayi 😊🌹",
  "Tere bina sab adhoora lagta hai 💔✨",
  "Meri har dhadkan tera naam leti hai 💓",
  "Tu meri zindagi ka sabse pyaara chapter hai 📖💖",
  "Tera saath ho toh har rasta aasan hai 🛤️❤️",
  "Tujhe dekh ke dil mein bijli si daudti hai ⚡💗",
  "Tu meri favourite notification hai 📱😘",
  "Tera ek msg aur din ban jaata hai 💌🔥",
  "Meri playlist mein bas tu hai 🎵💝",
  "Tujhse milke lagta hai kismat chamak gayi ✨😍",
];

const photoEmojis = ['💑', '👫', '💏', '🥰', '😍', '🤗', '💃🕺', '🧸❤️', '🌹💕', '💌'];

const PlaneBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % bannerMessages.length);
        setIsVisible(true);
      }, 1000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none overflow-hidden h-20">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={currentIndex}
            initial={{ x: '110%' }}
            animate={{ x: '-110%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 8, ease: 'linear' }}
            className="absolute top-2 flex items-center whitespace-nowrap"
          >
            {/* Plane */}
            <span className="text-3xl md:text-4xl transform -scale-x-100">✈️</span>

            {/* Banner rope */}
            <div className="w-6 h-0.5 bg-valentine-gold/60" />

            {/* Banner with photo + message */}
            <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-primary/30 
              rounded-lg px-4 py-2 shadow-lg">
              {/* Photo placeholder */}
              <span className="text-2xl">{photoEmojis[currentIndex]}</span>
              
              <span className="font-body text-sm md:text-base text-foreground font-medium">
                {bannerMessages[currentIndex]}
              </span>

              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-xl"
              >
                💖
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlaneBanner;
