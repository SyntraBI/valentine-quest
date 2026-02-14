import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Edit3, Save, ChevronDown, ChevronUp, Play, LogOut, RotateCcw } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';
import { getQuizQuestions, saveQuizQuestions, getAllDefaults, Question } from '../lib/quizData';

type ActivityType = 'quiz1' | 'quiz2' | 'quiz3' | 'game1' | 'game2' | 'gift1' | 'gift2' | 'gift3';

interface AdminDashboardProps {
  onNavigate: (activity: ActivityType | 'finale') => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onLogout }) => {
  const [editingQuiz, setEditingQuiz] = useState<1 | 2 | 3 | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [saved, setSaved] = useState(false);

  const startEditing = (quizNum: 1 | 2 | 3) => {
    if (editingQuiz === quizNum) {
      setEditingQuiz(null);
      return;
    }
    setQuestions(getQuizQuestions(quizNum));
    setEditingQuiz(quizNum);
    setSaved(false);
  };

  const updateQuestion = (qIdx: number, field: 'question' | 'correct', value: string | number) => {
    const updated = [...questions];
    if (field === 'correct') updated[qIdx] = { ...updated[qIdx], correct: value as number };
    else updated[qIdx] = { ...updated[qIdx], question: value as string };
    setQuestions(updated);
  };

  const updateOption = (qIdx: number, optIdx: number, value: string) => {
    const updated = [...questions];
    const opts = [...updated[qIdx].options];
    opts[optIdx] = value;
    updated[qIdx] = { ...updated[qIdx], options: opts };
    setQuestions(updated);
  };

  const handleSave = () => {
    if (editingQuiz) {
      saveQuizQuestions(editingQuiz, questions);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleReset = (quizNum: 1 | 2 | 3) => {
    const defaults = getAllDefaults();
    const key = `quiz${quizNum}` as keyof typeof defaults;
    saveQuizQuestions(quizNum, defaults[key]);
    if (editingQuiz === quizNum) setQuestions(defaults[key]);
  };

  const activities: { id: ActivityType | 'finale'; label: string }[] = [
    { id: 'quiz1', label: '📝 Quiz 1' },
    { id: 'quiz2', label: '📝 Quiz 2' },
    { id: 'quiz3', label: '📝 Quiz 3' },
    { id: 'game1', label: '🎮 Memory Game' },
    { id: 'game2', label: '🎮 Catch Hearts' },
    { id: 'gift1', label: '🎁 Gift 1' },
    { id: 'gift2', label: '🎁 Gift 2' },
    { id: 'gift3', label: '🎁 Gift 3' },
    { id: 'finale', label: '🎉 Finale' },
  ];

  return (
    <div className="min-h-screen valentine-bg p-4 relative overflow-hidden">
      <FloatingParticles />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-display text-gradient">Admin Panel 🔧</h1>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onLogout}
            className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 font-body text-sm text-foreground">
            <LogOut className="w-4 h-4" /> Logout
          </motion.button>
        </motion.div>

        {/* Quick Jump */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-4 mb-6">
          <h2 className="font-display text-lg text-foreground mb-3">⚡ Quick Jump (Skip to any activity)</h2>
          <div className="flex flex-wrap gap-2">
            {activities.map((a) => (
              <motion.button key={a.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(a.id)}
                className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-foreground font-body text-sm hover:bg-primary/20 transition-colors flex items-center gap-1">
                <Play className="w-3 h-3 text-primary" /> {a.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Quiz Editors */}
        {([1, 2, 3] as const).map((quizNum) => (
          <motion.div key={quizNum} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * quizNum }}
            className="glass-card p-4 mb-4">
            <button onClick={() => startEditing(quizNum)}
              className="w-full flex items-center justify-between text-foreground font-display text-lg">
              <span className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-primary" /> Edit Quiz {quizNum}
              </span>
              <span className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); handleReset(quizNum); }}
                  className="p-1 rounded-lg bg-accent/10 text-accent hover:bg-accent/20"
                  title="Reset to defaults"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
                {editingQuiz === quizNum ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>

            <AnimatePresence>
              {editingQuiz === quizNum && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden">
                  <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {questions.map((q, qIdx) => (
                      <div key={qIdx} className="p-3 rounded-lg bg-secondary/30 border border-border space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-body text-muted-foreground font-semibold">Q{qIdx + 1}</span>
                          <input value={q.question} onChange={(e) => updateQuestion(qIdx, 'question', e.target.value)}
                            className="flex-1 px-2 py-1 rounded bg-background border border-border text-foreground font-body text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {q.options.map((opt, optIdx) => (
                            <div key={optIdx} className="flex items-center gap-1">
                              <input type="radio" name={`q${qIdx}-correct`} checked={q.correct === optIdx}
                                onChange={() => updateQuestion(qIdx, 'correct', optIdx)}
                                className="accent-primary" />
                              <input value={opt} onChange={(e) => updateOption(qIdx, optIdx, e.target.value)}
                                className={`flex-1 px-2 py-1 rounded text-sm font-body border focus:outline-none focus:ring-1 focus:ring-primary
                                  ${q.correct === optIdx ? 'bg-primary/10 border-primary text-foreground' : 'bg-background border-border text-foreground'}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave}
                    className="mt-4 w-full py-3 rounded-xl valentine-gradient text-primary-foreground font-body font-semibold flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> {saved ? '✅ Saved!' : 'Save Changes'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
