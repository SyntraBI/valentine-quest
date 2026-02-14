import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import QuizPage from "./pages/QuizPage";
import Quiz2 from "./pages/Quiz2";
import Quiz3 from "./pages/Quiz3";
import MemoryGame from "./pages/MemoryGame";
import CatchHeartsGame from "./pages/CatchHeartsGame";
import GiftReveal from "./pages/GiftReveal";
import ValentineFinale from "./pages/ValentineFinale";

const queryClient = new QueryClient();

type Screen = 'login' | 'dashboard' | 'admin' | 'quiz1' | 'quiz2' | 'quiz3' | 'game1' | 'game2' | 'gift1' | 'gift2' | 'gift3' | 'finale';
type ActivityType = 'quiz1' | 'quiz2' | 'quiz3' | 'game1' | 'game2' | 'gift1' | 'gift2' | 'gift3';

const App = () => {
  const [screen, setScreen] = useState<Screen>('login');
  const [completed, setCompleted] = useState<ActivityType[]>([]);
  const [role, setRole] = useState<'user' | 'admin'>('user');

  const goHome = () => setScreen(role === 'admin' ? 'admin' : 'dashboard');

  const markComplete = (activity: ActivityType) => {
    if (!completed.includes(activity)) {
      setCompleted([...completed, activity]);
    }
    const allActivities: ActivityType[] = ['quiz1', 'quiz2', 'quiz3', 'game1', 'game2', 'gift1', 'gift2', 'gift3'];
    if ([...completed, activity].length === allActivities.length) {
      setScreen('finale');
    } else {
      setScreen(role === 'admin' ? 'admin' : 'dashboard');
    }
  };

  const handleLogin = (loginRole: 'user' | 'admin') => {
    setRole(loginRole);
    setScreen(loginRole === 'admin' ? 'admin' : 'dashboard');
  };

  const handleLogout = () => {
    setRole('user');
    setScreen('login');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <LoginPage onSuccess={handleLogin} />;
      case 'dashboard':
        return <Dashboard completed={completed} onSelect={(activity) => setScreen(activity)} />;
      case 'admin':
        return <AdminDashboard onNavigate={(s) => setScreen(s as Screen)} onLogout={handleLogout} />;
      case 'quiz1':
        return <QuizPage onComplete={() => markComplete('quiz1')} onGoHome={goHome} />;
      case 'quiz2':
        return <Quiz2 onComplete={() => markComplete('quiz2')} onGoHome={goHome} />;
      case 'quiz3':
        return <Quiz3 onComplete={() => markComplete('quiz3')} onGoHome={goHome} />;
      case 'game1':
        return <MemoryGame onComplete={() => markComplete('game1')} onGoHome={goHome} />;
      case 'game2':
        return <CatchHeartsGame onComplete={() => markComplete('game2')} onGoHome={goHome} />;
      case 'gift1':
        return <GiftReveal giftNumber={1} onComplete={() => markComplete('gift1')} onGoHome={goHome} />;
      case 'gift2':
        return <GiftReveal giftNumber={2} onComplete={() => markComplete('gift2')} onGoHome={goHome} />;
      case 'gift3':
        return <GiftReveal giftNumber={3} onComplete={() => markComplete('gift3')} onGoHome={goHome} />;
      case 'finale':
        return <ValentineFinale />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {renderScreen()}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
