import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import MemoryGame from "./pages/MemoryGame";
import ValentineFinale from "./pages/ValentineFinale";

const queryClient = new QueryClient();

type Screen = 'login' | 'quiz' | 'memory' | 'finale';

const App = () => {
  const [screen, setScreen] = useState<Screen>('login');

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <LoginPage onSuccess={() => setScreen('quiz')} />;
      case 'quiz':
        return <QuizPage onComplete={() => setScreen('memory')} />;
      case 'memory':
        return <MemoryGame onComplete={() => setScreen('finale')} />;
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
