import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trophy, Timer } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

interface FallingHeart {
  id: number;
  x: number;
  emoji: string;
  speed: number;
  points: number;
}

const heartEmojis = [
  { emoji: '❤️', points: 10 },
  { emoji: '💖', points: 15 },
  { emoji: '💕', points: 20 },
  { emoji: '💗', points: 25 },
  { emoji: '🌹', points: 30 },
  { emoji: '💝', points: 50 },
];

interface CatchHeartsGameProps {
  onComplete: () => void;
}

const CatchHeartsGame: React.FC<CatchHeartsGameProps> = ({ onComplete }) => {
  const [hearts, setHearts] = useState<FallingHeart[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const spawnHeart = useCallback(() => {
    const heartType = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    const newHeart: FallingHeart = {
      id: Date.now() + Math.random(),
      x: 10 + Math.random() * 80,
      emoji: heartType.emoji,
      speed: 2 + Math.random() * 3,
      points: heartType.points,
    };
    setHearts((prev) => [...prev, newHeart]);
  }, []);

  const catchHeart = (id: number, points: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setScore((s) => s + points);
  };

  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  // Spawn hearts
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const spawner = setInterval(spawnHeart, 800);
    return () => clearInterval(spawner);
  }, [gameStarted, gameOver, spawnHeart]);

  // Remove hearts that fall off screen
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const cleaner = setInterval(() => {
      setHearts((prev) => prev.filter((h) => Date.now() - h.id < 5000));
    }, 1000);
    return () => clearInterval(cleaner);
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setHearts([]);
  };

  return (
    <div className="min-h-screen valentine-bg flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />

      <div className="w-full max-w-lg relative z-10">
        {!gameStarted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="glass-card p-8 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-6xl mb-4"
            >
              💖
            </motion.div>
            <h1 className="text-3xl font-display text-gradient mb-4">Catch the Hearts!</h1>
            <p className="text-muted-foreground font-body mb-6">
              Tap/click the falling hearts to catch them. Each heart gives different points!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-8 py-4 rounded-xl valentine-gradient text-primary-foreground font-body font-bold text-lg glow-primary"
            >
              Start Game! 🎮
            </motion.button>
          </motion.div>
        ) : gameOver ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="glass-card p-8 text-center"
          >
            <Trophy className="w-16 h-16 mx-auto text-valentine-gold" />
            <h2 className="text-3xl font-display text-gradient mt-4">Time's Up!</h2>
            <p className="text-xl font-body text-foreground mt-2">
              You caught {score} points worth of love! 💕
            </p>
            <p className="text-muted-foreground font-body mt-2">
              {score >= 300 ? "Amazing! You're a love catcher! 🌟" : 
               score >= 150 ? "Great job, sweetheart! 💖" : 
               "Keep practicing! 💗"}
            </p>
            <div className="flex gap-3 mt-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-body font-semibold"
              >
                Play Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="px-6 py-3 rounded-xl valentine-gradient text-primary-foreground font-body font-semibold"
              >
                Continue 💖
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Score and Timer */}
            <div className="glass-card p-4 mb-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary fill-primary" />
                <span className="font-body font-bold text-foreground">{score}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary" />
                <span className="font-body font-bold text-foreground">{timeLeft}s</span>
              </div>
            </div>

            {/* Game Area */}
            <div className="glass-card relative h-96 overflow-hidden">
              <AnimatePresence>
                {hearts.map((heart) => (
                  <motion.button
                    key={heart.id}
                    initial={{ y: -50, x: `${heart.x}%` }}
                    animate={{ y: 400 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: heart.speed, ease: 'linear' }}
                    onClick={() => catchHeart(heart.id, heart.points)}
                    className="absolute text-3xl cursor-pointer hover:scale-125 transition-transform"
                    style={{ left: `${heart.x}%` }}
                  >
                    {heart.emoji}
                  </motion.button>
                ))}
              </AnimatePresence>

              {/* Instructions */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-muted-foreground font-body text-sm">
                  Tap the hearts before they fall! 💕
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatchHeartsGame;
