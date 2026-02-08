import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

const CORRECT_PASSWORD = 'ish@2909';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [onLogin, setOnLogin] = useState<(() => void) | null>(null);

  // We receive onLogin via props from App
  return null; // placeholder - actual component below
};

interface LoginPageProps {
  onSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setSuccess(true);
      setTimeout(onSuccess, 1500);
    } else {
      setError('Wrong password, my love! 💔');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="min-h-screen valentine-bg flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />
      
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="glass-card p-8 md:p-12 w-full max-w-md relative z-10"
      >
        <motion.div
          className="flex justify-center mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Heart className="w-16 h-16 text-primary fill-primary" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-display text-center text-gradient mb-2">
          Happy Valentine's Day
        </h1>
        <p className="text-center text-muted-foreground font-body mb-8">
          Enter the secret password to continue 💌
        </p>

        <AnimatePresence>
          {success ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center py-8"
            >
              <span className="text-6xl">💖</span>
              <p className="text-xl font-display text-primary mt-4">Welcome, my love!</p>
            </motion.div>
          ) : (
            <motion.form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/50 border border-border 
                    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                    font-body text-foreground placeholder:text-muted-foreground transition-all"
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-accent text-center font-body text-sm"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl valentine-gradient text-primary-foreground font-body 
                  font-semibold text-lg glow-primary transition-all"
              >
                Unlock My Heart 💕
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LoginPage;
