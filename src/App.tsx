import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import ArchetypeUnlocked from "./pages/ArchetypeUnlocked";
import FriendQuiz from "./pages/FriendQuiz";
import FriendQuizIntro from "./pages/FriendQuizIntro";
import TarotForecast2026 from "./pages/TarotForecast2026";
import TarotForecast2026Unlocked from "./pages/TarotForecast2026Unlocked";
import TarotForecast2026Quiz from "./pages/TarotForecast2026Quiz";
import TarotForecast2026Results from "./pages/TarotForecast2026Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/archetype-unlocked" element={<ArchetypeUnlocked />} />
          <Route path="/friend-quiz-intro" element={<FriendQuizIntro />} />
          <Route path="/friend-quiz" element={<FriendQuiz />} />
          <Route path="/2026_tarot_forecast" element={<TarotForecast2026 />} />
          <Route path="/2026_tarot_forecast_unlocked" element={<TarotForecast2026Unlocked />} />
          <Route path="/2026_tarot_forecast_quiz" element={<TarotForecast2026Quiz />} />
          <Route path="/2026_tarot_forecast_results" element={<TarotForecast2026Results />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
