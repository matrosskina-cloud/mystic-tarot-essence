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

          {/* Invitation to take own quiz */}
          <div className="bg-[#1a1a2e]/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 mt-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                ✨ Хочешь узнать свой архетип?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground/80">
                Пройди короткий тест — и узнай, кем ты являешься в системе Таро
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center space-y-2 transition-all duration-300 hover:bg-white/10 hover:border-primary/20">
                <div className="text-3xl">🌿</div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">Личность</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Узнай свои сильные стороны, точки роста и жизненный урок.
                </p>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center space-y-2 transition-all duration-300 hover:bg-white/10 hover:border-primary/20">
                <div className="text-3xl">👁</div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">Взгляд со стороны</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Посмотри, как тебя видят друзья — и насколько совпадают ваши ответы.
                </p>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center space-y-2 transition-all duration-300 hover:bg-white/10 hover:border-primary/20">
                <div className="text-3xl">✨</div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">Инсайты от близких</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Получи анонимную, бережную обратную связь — что в тебе особенно ценно.
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                variant="mystic"
                size="lg"
                onClick={() => window.location.href = '/'}
                className="min-w-[200px] h-12 sm:h-14 text-base sm:text-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105 transition-all duration-300"
              >
                Узнать свой архетип
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FriendQuizThankYou;