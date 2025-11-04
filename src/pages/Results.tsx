import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MysticBackground } from "@/components/MysticBackground";
import { Button } from "@/components/ui/button";
import { Copy, Lock } from "lucide-react";
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
      
      <main className="relative z-10 container max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Твой архетип в системе Таро —
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            {archetype.name}
          </h2>
        </div>

        {/* Archetype Card */}
        <div className="mb-8 md:mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="bg-card/25 backdrop-blur-sm border border-border/5 rounded-2xl p-6 md:p-8 shadow-[0_0_40px_hsl(var(--primary)/0.15),0_0_80px_hsl(var(--primary)/0.08),inset_0_0_60px_hsl(var(--primary)/0.05)]">
            <div className="flex flex-col items-center">
              <div className="mb-6 rounded-xl overflow-hidden shadow-[0_0_40px_hsl(var(--primary)/0.3),0_0_60px_hsl(var(--primary)/0.15)]">
                <img 
                  src={archetype.imageUrl} 
                  alt={archetype.name}
                  className="w-48 h-72 md:w-64 md:h-96 object-cover"
                />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {archetype.name}
              </h3>
              
              <p className="text-lg md:text-xl text-muted-foreground italic mb-4 text-center">
                {archetype.subtitle}
              </p>
              
              <p className="text-base md:text-lg text-foreground/80 text-center leading-relaxed">
                {archetype.description}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 md:mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="bg-card/20 backdrop-blur-sm border border-border/5 rounded-xl p-6 text-center">
            <p className="text-lg md:text-xl text-foreground mb-2">
              Ответили: <span className="font-bold">{friendsCount} друзей</span>
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              Открой полное описание архетипа и узнай, как тебя видят другие — после{" "}
              <span className="text-primary font-semibold shadow-[0_0_15px_hsl(var(--primary)/0.4)]">
                3 ответов от друзей
              </span>
            </p>
          </div>
        </div>

        {/* Share Block */}
        <div className="mb-8 md:mb-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="bg-card/20 backdrop-blur-sm border border-border/5 rounded-xl p-6 text-center shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Поделись с друзьями
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Скопируй ссылку и отправь её, чтобы узнать, как тебя воспринимают другие
            </p>
            <Button
              onClick={handleCopyLink}
              size="lg"
              className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 backdrop-blur-sm shadow-[0_0_20px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all"
            >
              <Copy className="mr-2 h-4 w-4" />
              Скопировать ссылку
            </Button>
          </div>
        </div>

        {/* Locked Content */}
        <div className="animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="bg-card/15 backdrop-blur-sm border border-border/5 rounded-xl p-6 md:p-8 opacity-60">
            <div className="flex flex-col items-center text-center">
              <Lock className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mb-4" />
              <p className="text-base md:text-lg text-muted-foreground mb-4">
                После 3 ответов ты увидишь:
              </p>
              <ul className="text-sm md:text-base text-muted-foreground space-y-2">
                <li>💫 Полное описание архетипа</li>
                <li>🧭 Инсайты от друзей</li>
                <li>🔄 Совпадение ваших ответов</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
