import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Trophy, Home } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';
import PlaneBanner from '../components/PlaneBanner';

const emojiPairs = ['❤️', '💕', '🌹', '🧸', '💖', '💝', '🦋', '🍫'];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

interface MemoryGameProps {
  onComplete: () => void;
  onGoHome: () => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete, onGoHome }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const initGame = () => {
    const pairs = [...emojiPairs, ...emojiPairs];
    const shuffled = pairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    setCards(shuffled);
    setFlippedIds([]);
    setMoves(0);
    setWon(false);
  };

  useEffect(() => { initGame(); }, []);

  const handleFlip = (id: number) => {
    if (flippedIds.length === 2) return;
    const card = cards[id];
    if (card.flipped || card.matched) return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      if (newCards[a].emoji === newCards[b].emoji) {
        newCards[a].matched = true;
        newCards[b].matched = true;
        setCards([...newCards]);
        setFlippedIds([]);
        if (newCards.every((c) => c.matched)) setWon(true);
      } else {
        setTimeout(() => {
          newCards[a].flipped = false;
          newCards[b].flipped = false;
          setCards([...newCards]);
          setFlippedIds([]);
        }, 800);
      }
    }
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
        <div className="text-center mb-6">
          <h1 className="text-3xl font-display text-gradient mb-2">Memory Match 💕</h1>
          <p className="text-muted-foreground font-body">Find all matching pairs!</p>
          <p className="text-sm font-body text-foreground mt-1">Moves: {moves}</p>
        </div>

        <AnimatePresence>
          {won ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="glass-card p-8 text-center">
              <Trophy className="w-16 h-16 mx-auto text-valentine-gold" />
              <h2 className="text-2xl font-display text-gradient mt-4">You Won! 🎉</h2>
              <p className="font-body text-muted-foreground mt-2">Completed in {moves} moves</p>
              <div className="flex gap-3 mt-6 justify-center">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={initGame} className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-body font-semibold flex items-center gap-2">
                  <Shuffle className="w-4 h-4" /> Play Again
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onComplete} className="px-6 py-3 rounded-xl valentine-gradient text-primary-foreground font-body font-semibold">
                  Continue 💖
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {cards.map((card) => (
                <motion.button
                  key={card.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFlip(card.id)}
                  className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all duration-300
                    ${card.flipped || card.matched ? 'bg-card border-2 border-primary/30 shadow-lg' : 'valentine-gradient cursor-pointer glow-primary'}
                    ${card.matched ? 'opacity-60' : ''}`}
                >
                  {card.flipped || card.matched ? card.emoji : '💌'}
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoryGame;
