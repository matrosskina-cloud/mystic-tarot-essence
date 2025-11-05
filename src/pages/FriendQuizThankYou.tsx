import { Button } from "@/components/ui/button";
import { MysticBackground } from "@/components/MysticBackground";
import { Heart, Sparkles } from "lucide-react";

interface FriendQuizThankYouProps {
  username: string;
}

const FriendQuizThankYou = ({ username }: FriendQuizThankYouProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <MysticBackground />
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="w-full max-w-2xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
              <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-6 sm:p-8 rounded-full border border-primary/30 backdrop-blur-sm">
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-primary" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Спасибо за участие! ✨
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground/80 leading-relaxed max-w-xl mx-auto">
              Твои ответы помогут @{username} лучше узнать себя и увидеть то, что не всегда заметно изнутри
            </p>
          </div>

          {/* Card with message */}
          <div className="bg-[#1a1a2e]/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(139,92,246,0.08)] space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary/80">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm sm:text-base font-medium">Что дальше?</span>
            </div>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
              @{username} получит твои ответы вместе с результатами теста. Это станет частью глубокого анализа архетипа и поможет увидеть себя по-новому
            </p>
          </div>

          {/* Quote */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
            <p className="text-sm sm:text-base text-foreground/80 italic leading-relaxed">
              "Иногда зеркало, которое держат другие, показывает то, что мы сами не видим. Твой вклад бесценен."
            </p>
          </div>

          {/* Optional: Button to return or close */}
          <div className="pt-4">
            <Button
              variant="mystic"
              size="lg"
              onClick={() => window.close()}
              className="min-w-[200px] h-12 sm:h-14 text-base sm:text-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105 transition-all duration-300"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FriendQuizThankYou;