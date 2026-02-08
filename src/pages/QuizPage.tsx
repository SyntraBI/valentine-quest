import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  { question: "What flower is most associated with Valentine's Day?", options: ["Tulip", "Rose", "Lily", "Daisy"], correct: 1 },
  { question: "Which Greek god is associated with love?", options: ["Zeus", "Apollo", "Eros", "Hermes"], correct: 2 },
  { question: "What does a red heart emoji symbolize?", options: ["Friendship", "Deep love", "Sadness", "Anger"], correct: 1 },
  { question: "In which month is Valentine's Day celebrated?", options: ["January", "February", "March", "April"], correct: 1 },
  { question: "What animal is a symbol of love and peace?", options: ["Eagle", "Dove", "Swan", "Parrot"], correct: 1 },
  { question: "What shape is most associated with love?", options: ["Circle", "Star", "Heart", "Diamond"], correct: 2 },
  { question: "Which color symbolizes love and passion?", options: ["Blue", "Green", "Red", "Yellow"], correct: 2 },
  { question: "Who shoots arrows of love?", options: ["Cupid", "Santa", "Fairy", "Angel"], correct: 0 },
  { question: "What do couples exchange on Valentine's Day?", options: ["Books", "Gifts & chocolates", "Tools", "Tickets"], correct: 1 },
  { question: "Love is patient, love is... ?", options: ["Fast", "Kind", "Loud", "Shy"], correct: 1 },
];

interface QuizPageProps {
  onComplete: (score: number) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === questions[current].correct) {
      setScore((s) => s + 1);
    }
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const q = questions[current];

  return (
    <div className="min-h-screen valentine-bg flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />

      <div className="w-full max-w-lg relative z-10">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-body text-muted-foreground mb-2">
            <span>Question {current + 1} of {questions.length}</span>
            <span>Score: {score} 💖</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full valentine-gradient rounded-full"
              animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass-card p-6 md:p-8"
            >
              <h2 className="text-xl md:text-2xl font-display text-foreground mb-6">
                {q.question}
              </h2>

              <div className="space-y-3">
                {q.options.map((opt, idx) => {
                  let classes = "w-full p-4 rounded-xl border-2 text-left font-body transition-all ";
                  if (showResult) {
                    if (idx === q.correct) classes += "border-valentine-gold bg-valentine-warm text-foreground ";
                    else if (idx === selected) classes += "border-accent bg-accent/10 text-accent ";
                    else classes += "border-border bg-secondary/30 text-muted-foreground ";
                  } else {
                    classes += "border-border bg-secondary/30 hover:border-primary hover:bg-primary/5 text-foreground cursor-pointer ";
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={!showResult ? { scale: 1.02 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      onClick={() => handleSelect(idx)}
                      className={classes}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {opt}
                        {showResult && idx === q.correct && <CheckCircle className="ml-auto w-5 h-5 text-valentine-gold" />}
                        {showResult && idx === selected && idx !== q.correct && <XCircle className="ml-auto w-5 h-5 text-accent" />}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {showResult && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={next}
                  className="mt-6 w-full py-3 rounded-xl valentine-gradient text-primary-foreground 
                    font-body font-semibold flex items-center justify-center gap-2"
                >
                  {current < questions.length - 1 ? 'Next Question' : 'See Results'} <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card p-8 text-center"
            >
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <Heart className="w-20 h-20 mx-auto text-primary fill-primary" />
              </motion.div>
              <h2 className="text-3xl font-display text-gradient mt-4">Quiz Complete!</h2>
              <p className="text-xl font-body text-foreground mt-2">
                You scored {score}/{questions.length} 💕
              </p>
              <p className="text-muted-foreground font-body mt-2">
                {score >= 8 ? "You're a love expert! 🌹" : score >= 5 ? "Not bad, sweetheart! 💖" : "Keep learning about love! 💗"}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onComplete(score)}
                className="mt-6 px-8 py-3 rounded-xl valentine-gradient text-primary-foreground 
                  font-body font-semibold glow-primary"
              >
                Continue to Games 🎮
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;
