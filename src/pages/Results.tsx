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
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      <MysticBackground />
      
      <main className="relative z-10 container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-5">
        {/* Block 1: Мини-профиль архетипа (2 колонки) */}
        <section className="animate-fade-in">
          <div className="bg-[#1a1a2e]/60 backdrop-blur-md border border-primary/10 rounded-[28px] p-6 md:p-8 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
              {/* Tarot Card - cropped top */}
              <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.3)] ring-1 ring-primary/30">
                <img 
                  src={archetype.imageUrl} 
                  alt={archetype.name}
                  className="w-32 h-48 md:w-40 md:h-60 object-cover object-[center_20%]"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
              
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Мой архетип: {archetype.name}
                </h2>
                
                <p className="text-base md:text-lg text-primary/90 italic mb-4">
                  {archetype.subtitle}
                </p>
                
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {archetype.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Block 2: Пригласи друзей */}
        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="bg-[#1a1a2e]/60 backdrop-blur-md border border-primary/10 rounded-[28px] p-6 md:p-8 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Поделись с друзьями
            </h2>
            
            <p className="text-sm md:text-base text-gray-400 mb-6">
              Отправь ссылку друзьям, чтобы они ответили на те же вопросы о тебе
            </p>

            {/* What You'll Unlock */}
            <div className="bg-[#0f0f1a]/80 backdrop-blur-sm border border-primary/20 rounded-[20px] p-5 md:p-6 mb-6 shadow-[0_0_40px_rgba(139,92,246,0.2)]">
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-xl opacity-50">
                  🔒
                </div>
                
                <div className="flex-1">
                  <p className="text-sm md:text-base text-gray-400 font-medium mb-3">
                    После 3 ответов ты увидишь:
                  </p>
                  
                  <div className="space-y-2 text-sm md:text-base text-gray-300">
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
              <p className="text-base md:text-lg font-semibold text-white mb-4">
                Ответили: {friendsCount} / {maxFriends} друзей
              </p>

              <div className="flex justify-start mb-4">
                <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-6 py-2 shadow-[0_0_35px_rgba(139,92,246,0.3)]">
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    {friendsCount}
                  </span>
                  <span className="text-lg md:text-xl text-gray-400">
                    / {maxFriends}
                  </span>
                </div>
              </div>
            </div>

            {/* Copy Button */}
            <Button
              onClick={handleCopyLink}
              size="lg"
              className="w-full md:w-auto bg-gradient-to-r from-primary/40 to-primary/30 hover:from-primary/50 hover:to-primary/40 text-white border border-primary/60 backdrop-blur-sm shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all font-medium px-8 rounded-full"
            >
              <Copy className="mr-2 h-5 w-5" />
              Скопировать ссылку
            </Button>
          </div>
        </section>

        {/* Block 3: Полное описание архетипа */}
        <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="bg-[#1a1a2e]/60 backdrop-blur-md border border-primary/10 rounded-[28px] p-6 md:p-8 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 text-xl opacity-40">
                🔒
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Сила твоего архетипа
              </h2>
            </div>
            
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Здесь появится подробное описание твоего архетипа — сильные стороны, точки роста и жизненный урок, который ты проходишь сейчас.
              Откроется после того, как 3 друга пройдут тест о тебе.
            </p>
          </div>
        </section>

        {/* Block 4: Инсайты от друзей */}
        <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="bg-[#1a1a2e]/60 backdrop-blur-md border border-primary/10 rounded-[28px] p-6 md:p-8 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 text-xl opacity-40">
                💬
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Как тебя видят другие
              </h2>
            </div>
            
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4">
              Здесь появятся комментарии друзей и их взгляд на твои качества.
              Это поможет тебе увидеть себя со стороны.
            </p>
            
            <div className="bg-[#0f0f1a]/80 backdrop-blur-sm border border-primary/20 rounded-[20px] p-4 text-center">
              <p className="text-sm text-gray-500 italic">
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
