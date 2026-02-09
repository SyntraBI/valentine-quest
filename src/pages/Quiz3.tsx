import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle, XCircle, ArrowRight, Home } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';
import RomanticArrow from '../components/RomanticArrow';
import PlaneBanner from '../components/PlaneBanner';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  { question: "What's the sweetest thing to say?", options: ["Hello", "Goodbye", "I love you", "Thanks"], correct: 2 },
  { question: "Best place for a date?", options: ["Library", "Beach sunset", "Gym", "Office"], correct: 1 },
  { question: "What makes a heart skip?", options: ["Coffee", "Love", "Exercise", "Fear"], correct: 1 },
  { question: "Symbol of eternal love?", options: ["Ring", "Necklace", "Bracelet", "Watch"], correct: 0 },
  { question: "What's the love hormone?", options: ["Adrenaline", "Dopamine", "Oxytocin", "Serotonin"], correct: 2 },
  { question: "Best love song era?", options: ["60s", "80s", "90s", "2000s"], correct: 1 },
  { question: "True love is...?", options: ["Easy", "Patient", "Fast", "Loud"], correct: 1 },
  { question: "Romantic movie classic?", options: ["Titanic", "Jaws", "Matrix", "Terminator"], correct: 0 },
  { question: "Love at first...?", options: ["Word", "Touch", "Sight", "Song"], correct: 2 },
  { question: "What heals all wounds?", options: ["Medicine", "Time", "Love", "Sleep"], correct: 2 },
];

const hindiMessages = [
  "जब तुम मुस्कुराती हो तो दिल खुश हो जाता है 😊",
  "तुम मेरी ज़िन्दगी का सबसे हसीन तोहफा हो 🎁",
  "तुम्हारे बिना ये दिल बेचैन है 💓",
  "तुम मेरा चाँद हो, मेरी रात की रौशनी 🌙",
  "तुमसे प्यार करना ही मेरी मंज़िल है 🏔️💕",
  "तुम्हारी हर बात दिल को छू जाती है 🥺",
  "काश ये पल ठहर जाए तुम्हारे साथ ⏳💖",
  "तुम हो तो सब कुछ है, तुम नहीं तो कुछ नहीं 🌍",
  "मेरी दुआओं में हमेशा तुम हो 🤲💗",
  "तुम मेरी सबसे प्यारी ख्वाहिश हो 🌠",
];

interface Quiz3Props {
  onComplete: () => void;
  onGoHome: () => void;
}

const Quiz3: React.FC<Quiz3Props> = ({ onComplete, onGoHome }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [arrowIndex, setArrowIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowArrow(true), 2000);
    return () => clearTimeout(timer);
  }, [current]);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === questions[current].correct) setScore((s) => s + 1);
  };

  const next = () => {
    setShowArrow(false);
    setArrowIndex((i) => (i + 1) % hindiMessages.length);
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const percentage = Math.round(((current + (showResult ? 1 : 0)) / questions.length) * 100);
  const q = questions[current];

  return (
    <div className="min-h-screen valentine-bg flex items-center justify-center p-4 pt-24 relative overflow-hidden">
      <FloatingParticles />
      <PlaneBanner />
      
      {showArrow && (
        <RomanticArrow message={hindiMessages[arrowIndex]} onComplete={() => setShowArrow(false)} />
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onGoHome}
        className="fixed top-24 left-4 z-50 glass-card p-3 rounded-full shadow-lg"
      >
        <Home className="w-5 h-5 text-primary" />
      </motion.button>

      <div className="w-full max-w-lg relative z-10">
        <div className="mb-6">
          <div className="flex justify-between text-sm font-body text-muted-foreground mb-2">
            <span>Question {current + 1} of {questions.length}</span>
            <span className="flex items-center gap-2">
              <span className="text-primary font-semibold">{percentage}%</span>
              <span>Score: {score} 💖</span>
            </span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div className="h-full valentine-gradient rounded-full" animate={{ width: `${percentage}%` }} transition={{ duration: 0.5 }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="glass-card p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-display text-foreground mb-6">{q.question}</h2>
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
                    <motion.button key={idx} whileHover={!showResult ? { scale: 1.02 } : {}} whileTap={!showResult ? { scale: 0.98 } : {}} onClick={() => handleSelect(idx)} className={classes}>
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">{String.fromCharCode(65 + idx)}</span>
                        {opt}
                        {showResult && idx === q.correct && <CheckCircle className="ml-auto w-5 h-5 text-valentine-gold" />}
                        {showResult && idx === selected && idx !== q.correct && <XCircle className="ml-auto w-5 h-5 text-accent" />}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
              {showResult && (
                <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={next} className="mt-6 w-full py-3 rounded-xl valentine-gradient text-primary-foreground font-body font-semibold flex items-center justify-center gap-2">
                  {current < questions.length - 1 ? 'Next Question' : 'See Results'} <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-8 text-center">
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <Heart className="w-20 h-20 mx-auto text-primary fill-primary" />
              </motion.div>
              <h2 className="text-3xl font-display text-gradient mt-4">Quiz 3 Complete!</h2>
              <p className="text-xl font-body text-foreground mt-2">You scored {score}/{questions.length} 💕</p>
              <p className="text-lg font-body text-primary font-semibold mt-1">100% Completed ✅</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onComplete} className="mt-6 px-8 py-3 rounded-xl valentine-gradient text-primary-foreground font-body font-semibold glow-primary">
                Back to Dashboard 🏠
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz3;
