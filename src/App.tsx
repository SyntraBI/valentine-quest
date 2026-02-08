import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import QuizPage from "./pages/QuizPage";
import Quiz2 from "./pages/Quiz2";
import Quiz3 from "./pages/Quiz3";
import MemoryGame from "./pages/MemoryGame";
import CatchHeartsGame from "./pages/CatchHeartsGame";
import GiftReveal from "./pages/GiftReveal";
import ValentineFinale from "./pages/ValentineFinale";

const queryClient = new QueryClient();

type Screen = 'login' | 'dashboard' | 'quiz1' | 'quiz2' | 'quiz3' | 'game1' | 'game2' | 'gift1' | 'gift2' | 'gift3' | 'finale';
type ActivityType = 'quiz1' | 'quiz2' | 'quiz3' | 'game1' | 'game2' | 'gift1' | 'gift2' | 'gift3';

const App = () => {
  const [screen, setScreen] = useState<Screen>('login');
  const [completed, setCompleted] = useState<ActivityType[]>([]);

  const markComplete = (activity: ActivityType) => {
    if (!completed.includes(activity)) {
      setCompleted([...completed, activity]);
    }
    // Check if all activities are done
    const allActivities: ActivityType[] = ['quiz1', 'quiz2', 'quiz3', 'game1', 'game2', 'gift1', 'gift2', 'gift3'];
    if ([...completed, activity].length === allActivities.length) {
      setScreen('finale');
    } else {
      setScreen('dashboard');
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <LoginPage onSuccess={() => setScreen('dashboard')} />;
      case 'dashboard':
        return (
          <Dashboard 
            completed={completed} 
            onSelect={(activity) => setScreen(activity)} 
          />
        );
      case 'quiz1':
        return <QuizPage onComplete={() => markComplete('quiz1')} />;
      case 'quiz2':
        return <Quiz2 onComplete={() => markComplete('quiz2')} />;
      case 'quiz3':
        return <Quiz3 onComplete={() => markComplete('quiz3')} />;
      case 'game1':
        return <MemoryGame onComplete={() => markComplete('game1')} />;
      case 'game2':
        return <CatchHeartsGame onComplete={() => markComplete('game2')} />;
      case 'gift1':
        return <GiftReveal giftNumber={1} onComplete={() => markComplete('gift1')} />;
      case 'gift2':
        return <GiftReveal giftNumber={2} onComplete={() => markComplete('gift2')} />;
      case 'gift3':
        return <GiftReveal giftNumber={3} onComplete={() => markComplete('gift3')} />;
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
