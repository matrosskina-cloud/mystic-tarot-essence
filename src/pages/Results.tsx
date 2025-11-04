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
      
      <main className="relative z-10 container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-6">
        {/* Block 1: Мини-профиль архетипа (2 колонки) */}
        <section className="animate-fade-in">
          <div className="bg-card/20 backdrop-blur-sm border border-border/5 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_hsl(var(--primary)/0.12)]">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
              {/* Tarot Card - cropped top */}
              <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-[0_0_50px_hsl(var(--primary)/0.25),0_0_30px_hsl(var(--primary)/0.15)] ring-1 ring-primary/20">
                <img 
                  src={archetype.imageUrl} 
                  alt={archetype.name}
                  className="w-32 h-48 md:w-40 md:h-60 object-cover object-[center_20%]"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
              
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Мой архетип: {archetype.name}
                </h2>
                
                <p className="text-base md:text-lg text-primary/90 italic mb-4">
                  {archetype.subtitle}
                </p>
                
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  {archetype.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Block 2: Пригласи друзей */}
        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="bg-card/20 backdrop-blur-sm border border-border/5 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_hsl(var(--primary)/0.08)]">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Поделись с друзьями
            </h2>
            
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Отправь ссылку друзьям, чтобы они ответили на те же вопросы о тебе
            </p>

            {/* What You'll Unlock */}
            <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-5 md:p-6 mb-6 shadow-[0_0_25px_hsl(var(--primary)/0.15)]">
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-xl opacity-60">
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

            {/* Progress */}
            <div className="mb-6">
              <p className="text-base md:text-lg font-semibold text-foreground mb-4">
                Ответили: {friendsCount} / {maxFriends} друзей
              </p>

              <div className="flex justify-start mb-4">
                <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-6 py-2 shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    {friendsCount}
                  </span>
                  <span className="text-lg md:text-xl text-muted-foreground/80">
                    / {maxFriends}
                  </span>
                </div>
              </div>
            </div>

            {/* Copy Button */}
            <Button
              onClick={handleCopyLink}
              size="lg"
              className="w-full md:w-auto bg-gradient-to-r from-primary/30 to-primary/20 hover:from-primary/40 hover:to-primary/30 text-white border border-primary/50 backdrop-blur-sm shadow-[0_0_35px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_45px_hsl(var(--primary)/0.4)] transition-all font-medium px-8 rounded-full"
            >
              <Copy className="mr-2 h-5 w-5" />
              Скопировать ссылку
            </Button>
          </div>
        </section>

        {/* Block 3: Полное описание архетипа */}
        <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="bg-card/20 backdrop-blur-sm border border-border/5 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_hsl(var(--primary)/0.08)]">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 text-2xl opacity-50">
                🔒
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Сила твоего архетипа
              </h2>
            </div>
            
            <p className="text-sm md:text-base text-muted-foreground/70 leading-relaxed">
              Здесь появится подробное описание твоего архетипа — сильные стороны, точки роста и жизненный урок, который ты проходишь сейчас.
              Откроется после того, как 3 друга пройдут тест о тебе.
            </p>
          </div>
        </section>

        {/* Block 4: Инсайты от друзей */}
        <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="bg-card/20 backdrop-blur-sm border border-border/5 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_hsl(var(--primary)/0.08)]">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 text-2xl opacity-50">
                💬
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Как тебя видят другие
              </h2>
            </div>
            
            <p className="text-sm md:text-base text-muted-foreground/70 leading-relaxed mb-4">
              Здесь появятся комментарии друзей и их взгляд на твои качества.
              Это поможет тебе увидеть себя со стороны.
            </p>
            
            <div className="bg-card/30 backdrop-blur-sm border border-border/5 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground/60 italic">
                Инсайты появятся здесь после 3 ответов
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Results;
