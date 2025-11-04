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
      
      <main className="relative z-10 container max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-xl md:text-2xl text-foreground/80 mb-3">
            Твой архетип в системе Таро —
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-2">
            {archetype.name}
          </h2>
        </div>

        {/* Archetype Card */}
        <div className="mb-8 md:mb-10 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <div className="bg-card/20 backdrop-blur-sm border border-border/5 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_hsl(var(--primary)/0.12),0_0_80px_hsl(var(--primary)/0.06)]">
            <div className="flex flex-col items-center">
              {/* Card Image */}
              <div className="mb-6 rounded-2xl overflow-hidden shadow-[0_0_50px_hsl(var(--primary)/0.25),0_0_80px_hsl(var(--primary)/0.12)] ring-1 ring-primary/10">
                <img 
                  src={archetype.imageUrl} 
                  alt={archetype.name}
                  className="w-52 h-80 md:w-64 md:h-96 object-cover"
                />
              </div>
              
              {/* Subtitle */}
              <p className="text-base md:text-lg text-primary/90 font-medium mb-4 text-center">
                {archetype.subtitle}
              </p>
              
              {/* Description */}
              <p className="text-sm md:text-base text-foreground/70 text-center leading-relaxed max-w-lg">
                {archetype.description}
              </p>
            </div>
          </div>
        </div>

        {/* Unlock Section */}
        <div className="mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="bg-card/15 backdrop-blur-sm border border-border/5 rounded-2xl p-6 md:p-7 shadow-[0_0_30px_hsl(var(--primary)/0.08)]">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 text-center">
              Открой глубже свой архетип
            </h3>
            
            <p className="text-sm md:text-base text-muted-foreground text-center mb-4">
              Пригласи 3 друзей, чтобы увидеть, как они тебя воспринимают
            </p>

            {/* Progress Badge */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 shadow-[0_0_20px_hsl(var(--primary)/0.15)]">
                <span className="text-2xl md:text-3xl font-bold text-primary">
                  {friendsCount}
                </span>
                <span className="text-lg md:text-xl text-muted-foreground">
                  / {maxFriends} друзей
                </span>
              </div>
            </div>

            {/* Copy Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleCopyLink}
                size="lg"
                className="bg-primary/20 hover:bg-primary/30 text-white border border-primary/40 backdrop-blur-sm shadow-[0_0_30px_hsl(var(--primary)/0.25)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.35)] transition-all font-medium px-8"
              >
                <Copy className="mr-2 h-5 w-5" />
                Скопировать ссылку
              </Button>
            </div>
          </div>
        </div>

        {/* What You'll Unlock */}
        <div className="animate-fade-in" style={{ animationDelay: "0.45s" }}>
          <div className="bg-card/10 backdrop-blur-sm border border-border/5 rounded-2xl p-6 md:p-7 opacity-70">
            <div className="text-center space-y-3">
              <p className="text-base md:text-lg text-muted-foreground font-medium mb-4">
                После 3 ответов ты увидишь:
              </p>
              <div className="space-y-2.5 text-sm md:text-base text-muted-foreground">
                <p className="flex items-center justify-center gap-2">
                  <span className="text-lg">💫</span>
                  <span>Полное описание архетипа</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="text-lg">🧭</span>
                  <span>Инсайты от друзей</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="text-lg">🔄</span>
                  <span>Совпадение ваших ответов</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
