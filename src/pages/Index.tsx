import { Button } from "@/components/ui/button";
import { BenefitCard } from "@/components/BenefitCard";
import { MysticBackground } from "@/components/MysticBackground";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-hidden bg-[#0a0a0f]">
      <MysticBackground />
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12">
        <div className="w-full max-w-md mx-auto space-y-8 box-border">
          {/* Header Section */}
          <div className="text-center space-y-4 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Анна, давай узнаем, кто ты в системе Таро?
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Пройди короткий тест, чтобы узнать свой архетип и понять, как тебя воспринимают другие
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Button 
              variant="mystic" 
              size="xl" 
              className="w-full font-semibold transition-all hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]"
              onClick={() => navigate('/quiz')}
            >
              🧿 Узнать свой архетип
            </Button>
          </div>

          {/* Benefits Cards */}
          <div className="space-y-6 pt-4">
            <BenefitCard
              icon="🌿"
              title="Личность"
              description="Узнай свой архетип в системе Таро — твои сильные стороны, точки роста и жизненный урок, который ты проходишь сейчас."
              delay={400}
            />
            
            <BenefitCard
              icon="👁"
              title="Взгляд со стороны"
              description="Посмотри, как тебя видят друзья через призму архетипов Таро — и насколько их мнение совпадает с твоим."
              delay={600}
            />
            
            <BenefitCard
              icon="✨"
              title="Инсайты от близких"
              description="Получай анонимные инсайты от друзей — что в тебе сильнее всего и над чем, по их мнению, стоит поработать."
              delay={800}
            />
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-muted-foreground/70 pt-4 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
            Займёт всего пару минут. А польза — на годы.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
