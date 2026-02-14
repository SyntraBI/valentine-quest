import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Home } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';
import PlaneBanner from '../components/PlaneBanner';

interface GiftRevealProps {
  giftNumber: 1 | 2 | 3;
  onComplete: () => void;
  onGoHome: () => void;
}

const giftData = {
  1: {
    title: "Kaise Shuru Hua ❤️",
    message: "Ek din bas maine uski Instagram story pe ek simple sa reply kiya — \"Nice Food👌\"\n\nUsne rudely \"Thank you\" likha… fir thodi baat hui… fir thodi aur.\n\nKaun jaanta tha ki ek chota sa reply itna bada connection ban jayega. 💖",
    emoji: "💌",
    color: "from-valentine-rose to-valentine-pink",
    story: "Pehle sirf random chats thi, phir good morning texts, phir late night calls. Dheere dheere hum ek dusre ki aadat ban gaye. Din bhar ka har chota update ek dusre ko batana normal ho gaya.\n\nInternet pe mile the… par feelings bilkul real thi. 💕",
  },
  2: {
    title: "Ups & Downs 🌹",
    message: "Phir dating start hui. Sab perfect nahi tha.\nKabhi misunderstandings, kabhi ego, kabhi fights.\nKabhi din bhar baat nahi hoti thi, kabhi raat bhar ro kar soye.\n\nUps and downs aaye. Emotional lows aaye.\nKabhi laga chhod dena chahiye…\nPar har baar humne choose kiya — ek dusre ko. 💗",
    emoji: "📸",
    color: "from-valentine-gold to-valentine-rose",
    story: "Kaun soch sakta tha ki ek simple si Instagram story pe reply se start hui baat, aaj meri har subah aur har raat ka part ban jayegi. Ab tum sirf chat list ka naam nahi, meri daily life ka sabse important hissa ho. 🌟",
  },
  3: {
    title: "Forever Yours 💍",
    message: "Aaj bhi perfect nahi hai.\nPar sach hai. Real hai. Aur hum dono ki hai.\n\nKabhi kabhi life ke sabse important log kisi planned meeting se nahi, ek simple \"story reply\" se milte hain.\n\nAur relationship perfect hone se nahi, saath rehne ki choice se strong hota hai. 💝",
    emoji: "💍",
    color: "from-valentine-crimson to-valentine-rose",
    story: "My heart, my soul, my everything belongs to you. Today, tomorrow, and always. You complete me. Happy Valentine's Day, my love. ✨❤️",
  },
};

const GiftReveal: React.FC<GiftRevealProps> = ({ giftNumber, onComplete, onGoHome }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const gift = giftData[giftNumber];

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => setIsOpened(true), 1500);
  };

  return (
    <div className="min-h-screen valentine-bg flex items-center justify-center p-4 pt-24 relative overflow-hidden">
      <FloatingParticles />
      <PlaneBanner />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onGoHome}
        className="fixed top-24 left-4 z-50 glass-card p-3 rounded-full shadow-lg"
      >
        <Home className="w-5 h-5 text-primary" />
      </motion.button>

      <div className="w-full max-w-md relative z-10">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div key="gift-box" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0, rotate: 360 }} className="text-center">
              <h1 className="text-3xl font-display text-gradient mb-8">Gift #{giftNumber} 🎁</h1>
              <motion.div
                animate={isOpening ? { scale: [1, 1.2, 0.8, 1.5, 0], rotate: [0, -10, 10, -10, 0], y: [0, -20, 0, -30, -100] } : { y: [0, -10, 0], scale: [1, 1.05, 1] }}
                transition={isOpening ? { duration: 1.5 } : { repeat: Infinity, duration: 2 }}
                className="inline-block cursor-pointer"
                onClick={!isOpening ? handleOpen : undefined}
              >
                <div className={`w-40 h-40 mx-auto rounded-2xl bg-gradient-to-br ${gift.color} flex items-center justify-center shadow-2xl relative overflow-hidden`}>
                  <Gift className="w-20 h-20 text-white" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-full h-4 bg-valentine-gold/80" />
                    <div className="absolute h-full w-4 bg-valentine-gold/80" />
                  </div>
                  {!isOpening && (
                    <>
                      <motion.div animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-2 -right-2">
                        <Sparkles className="w-6 h-6 text-valentine-gold" />
                      </motion.div>
                      <motion.div animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.7 }} className="absolute -bottom-2 -left-2">
                        <Sparkles className="w-6 h-6 text-valentine-gold" />
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
              {!isOpening && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-muted-foreground font-body">Tap the gift to open! ✨</motion.p>}
            </motion.div>
          ) : (
            <motion.div key="gift-content" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 15 }} className="glass-card p-8 text-center relative overflow-hidden">
              {/* Background romantic overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-valentine-rose via-valentine-pink to-valentine-crimson" />
                <div className="absolute top-4 left-4 text-6xl">💑</div>
                <div className="absolute bottom-4 right-4 text-6xl">💏</div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-20">❤️</div>
              </div>
              <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-6xl mb-4 relative z-10">{gift.emoji}</motion.div>
              <h2 className="text-2xl font-display text-gradient mb-4 relative z-10">{gift.title}</h2>
              <p className="font-body text-foreground text-base leading-relaxed mb-4 whitespace-pre-line relative z-10">{gift.message}</p>
              {gift.story && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative z-10 mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="font-body text-muted-foreground text-sm leading-relaxed whitespace-pre-line italic">{gift.story}</p>
                </motion.div>
              )}
              <div className="flex justify-center gap-2 mb-6 mt-4 relative z-10">
                {['❤️', '💕', '💖', '💗', '💝'].map((heart, i) => (
                  <motion.span key={i} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }} className="text-2xl">{heart}</motion.span>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onComplete} className="px-8 py-3 rounded-xl valentine-gradient text-primary-foreground font-body font-semibold glow-primary flex items-center gap-2 mx-auto relative z-10">
                Back to Dashboard 🏠
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GiftReveal;
