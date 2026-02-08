import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Play, Gift, Gamepad2, HelpCircle } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

type ActivityType = 'quiz1' | 'quiz2' | 'quiz3' | 'game1' | 'game2' | 'gift1' | 'gift2' | 'gift3';

interface DashboardProps {
  completed: ActivityType[];
  onSelect: (activity: ActivityType) => void;
}

const activities: { id: ActivityType; label: string; icon: React.ElementType; category: 'quiz' | 'game' | 'gift' }[] = [
  { id: 'quiz1', label: 'Love Quiz 1', icon: HelpCircle, category: 'quiz' },
  { id: 'quiz2', label: 'Love Quiz 2', icon: HelpCircle, category: 'quiz' },
  { id: 'quiz3', label: 'Love Quiz 3', icon: HelpCircle, category: 'quiz' },
  { id: 'game1', label: 'Memory Match', icon: Gamepad2, category: 'game' },
  { id: 'game2', label: 'Catch Hearts', icon: Gamepad2, category: 'game' },
  { id: 'gift1', label: 'Gift 1', icon: Gift, category: 'gift' },
  { id: 'gift2', label: 'Gift 2', icon: Gift, category: 'gift' },
  { id: 'gift3', label: 'Gift 3', icon: Gift, category: 'gift' },
];

const getUnlockOrder = (): ActivityType[] => [
  'quiz1', 'quiz2', 'quiz3', 'game1', 'game2', 'gift1', 'gift2', 'gift3'
];

const Dashboard: React.FC<DashboardProps> = ({ completed, onSelect }) => {
  const unlockOrder = getUnlockOrder();

  const isUnlocked = (id: ActivityType): boolean => {
    const idx = unlockOrder.indexOf(id);
    if (idx === 0) return true;
    const prev = unlockOrder[idx - 1];
    return completed.includes(prev);
  };

  const isCompleted = (id: ActivityType): boolean => completed.includes(id);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'quiz': return 'from-primary to-accent';
      case 'game': return 'from-valentine-gold to-primary';
      case 'gift': return 'from-valentine-pink to-valentine-crimson';
      default: return 'from-primary to-accent';
    }
  };

  const progress = (completed.length / activities.length) * 100;

  return (
    <div className="min-h-screen valentine-bg flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />

      <div className="w-full max-w-2xl relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display text-gradient mb-2">
            Valentine's Journey 💕
          </h1>
          <p className="text-muted-foreground font-body">
            Complete all activities to unlock the final surprise!
          </p>

          {/* Progress bar */}
          <div className="mt-4 max-w-md mx-auto">
            <div className="flex justify-between text-sm font-body text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{completed.length}/{activities.length}</span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full valentine-gradient rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Activity Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activities.map((activity, index) => {
            const unlocked = isUnlocked(activity.id);
            const done = isCompleted(activity.id);
            const Icon = activity.icon;

            return (
              <motion.button
                key={activity.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={unlocked ? { scale: 1.05, y: -5 } : {}}
                whileTap={unlocked ? { scale: 0.95 } : {}}
                onClick={() => unlocked && !done && onSelect(activity.id)}
                disabled={!unlocked || done}
                className={`glass-card p-4 flex flex-col items-center gap-2 transition-all relative overflow-hidden
                  ${unlocked && !done ? 'cursor-pointer hover:shadow-xl' : 'cursor-not-allowed opacity-60'}
                  ${done ? 'border-valentine-gold border-2' : ''}`}
              >
                {/* Category gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(activity.category)} opacity-10`} />

                <div className="relative">
                  {done ? (
                    <CheckCircle className="w-10 h-10 text-valentine-gold" />
                  ) : unlocked ? (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Icon className="w-10 h-10 text-primary" />
                    </motion.div>
                  ) : (
                    <Lock className="w-10 h-10 text-muted-foreground" />
                  )}
                </div>

                <span className="font-body text-sm font-medium text-foreground relative">
                  {activity.label}
                </span>

                {unlocked && !done && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-1 right-1"
                  >
                    <Play className="w-4 h-4 text-primary fill-primary" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Finale unlock hint */}
        {completed.length === activities.length && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-8 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect('gift3')}
              className="px-8 py-4 rounded-xl valentine-gradient text-primary-foreground font-body font-bold text-lg glow-primary"
            >
              🎉 Unlock Final Surprise! 🎉
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
