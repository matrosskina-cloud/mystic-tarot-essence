import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MysticBackground } from "@/components/MysticBackground";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { archetypeData } from "@/data/archetypeData";
import { useToast } from "@/hooks/use-toast";

interface LocationState {
  result: string;
  score: Record<string, number>;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [friendsCount] = useState(0);
  const maxFriends = 3;
  
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state || !state.result) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state || !state.result) {
    return null;
  }

  const archetype = archetypeData[state.result];

  const handleCopyLink = () => {
    const link = window.location.origin;
    navigator.clipboard.writeText(link);
    toast({
      title: "Ссылка скопирована",
      description: "Теперь можешь поделиться ей с друзьями",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <MysticBackground />
      
      <main className="relative z-10 container max-w-2xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Section 1: Мой Архетип */}
        <section className="animate-fade-in">
          <div className="bg-card/20 backdrop-blur-sm border border-border/5 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_hsl(var(--primary)/0.12)]">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Мой архетип: {archetype.name}
            </h2>
            
            <div className="flex flex-col items-center">
              {/* Tarot Card - cropped top */}
              <div className="mb-6 rounded-2xl overflow-hidden shadow-[0_0_50px_hsl(var(--primary)/0.25),0_0_30px_hsl(var(--primary)/0.15)] ring-1 ring-primary/20">
                <img 
                  src={archetype.imageUrl} 
                  alt={archetype.name}
                  className="w-40 h-64 md:w-48 md:h-72 object-cover object-[center_20%]"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
              
              {/* Subtitle */}
              <p className="text-base md:text-lg text-primary/90 italic mb-4 text-center">
                {archetype.subtitle}
              </p>
              
              {/* Description */}
              <p className="text-sm md:text-base text-foreground/70 text-center leading-relaxed max-w-lg">
                {archetype.description}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Поделись с друзьями */}
        <section className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <div className="bg-card/15 backdrop-blur-sm border border-border/5 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_hsl(var(--primary)/0.08)]">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 text-center">
              Поделись с друзьями
            </h2>
            
            <p className="text-sm md:text-base text-muted-foreground text-center mb-6">
              Отправь ссылку друзьям, чтобы они ответили на те же вопросы о тебе
            </p>

            {/* What You'll Unlock - with lock icon */}
            <div className="bg-card/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-5 md:p-6 mb-6 shadow-[0_0_25px_hsl(var(--primary)/0.15)]">
              <div className="flex gap-4">
                {/* Lock Icon */}
                <div className="flex-shrink-0 text-2xl opacity-60">
                  🔒
                </div>
                
                <div className="flex-1">
                  <p className="text-sm md:text-base text-muted-foreground/70 font-medium mb-3">
                    После 3 ответов ты увидишь:
                  </p>
                  
                  <div className="space-y-2 text-sm md:text-base text-muted-foreground/80">
                    <p className="flex items-center gap-2">
                      <span>🪐</span>
                      <span>Полное описание архетипа</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>📌</span>
                      <span>Инсайты от друзей</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>🎭</span>
                      <span>Совпадение ваших ответов</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Прогресс */}
        <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="bg-card/15 backdrop-blur-sm border border-border/5 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_hsl(var(--primary)/0.08)]">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 text-center">
              Ответили: {friendsCount} / {maxFriends} друзей
            </h3>

            {/* Progress Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-6 py-3 shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {friendsCount}
                </span>
                <span className="text-xl md:text-2xl text-muted-foreground/80">
                  / {maxFriends}
                </span>
              </div>
            </div>

            {/* Copy Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleCopyLink}
                size="lg"
                className="bg-gradient-to-r from-primary/30 to-primary/20 hover:from-primary/40 hover:to-primary/30 text-white border border-primary/50 backdrop-blur-sm shadow-[0_0_35px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_45px_hsl(var(--primary)/0.4)] transition-all font-medium px-8 rounded-full"
              >
                <Copy className="mr-2 h-5 w-5" />
                Скопировать ссылку
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Results;
