import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BenefitCard } from "@/components/BenefitCard";
import tarotBg from "@/assets/tarot-2026-bg.png";

const TarotForecast2026Unlocked = () => {
  const navigate = useNavigate();

  const handleStartForecast = () => {
    navigate("/2026_tarot_forecast_quiz");
  };

  const handleGiftForecast = () => {
    // TODO: Navigate to gift flow
    console.log("Gift forecast clicked");
  };

  return (
    <div 
      className="relative min-h-screen overflow-x-hidden overflow-hidden"
      style={{
        backgroundImage: `url(${tarotBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12">
        <div className="w-full max-w-md mx-auto space-y-8 box-border">
          {/* Header Section */}
          <div className="text-center space-y-6 animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Твой личный прогноз на весь год — по месяцам.
            </h1>
            
            {/* CTA Buttons */}
            <div className="space-y-3 pt-2">
              <Button 
                variant="golden" 
                size="xl" 
                className="w-full font-semibold"
                onClick={handleStartForecast}
              >
                Сделать годовой расклад на 2026 год
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="w-full font-semibold border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-sm"
                onClick={handleGiftForecast}
              >
                🎁 Купить расклад в подарок
              </Button>
            </div>
          </div>

          {/* Benefits Cards */}
          <div className="space-y-6 pt-4">
            <BenefitCard
              icon="🃏"
              title="Сделай расклад"
              description="Выбери карту для каждого месяца. Прогноз станет по-настоящему личным."
              delay={200}
            />
            
            <BenefitCard
              icon="🔍"
              title="Получи ясные трактовки"
              description="Ключевые события каждого месяца, возможности, риски и совет от Таро."
              delay={400}
            />
            
            <BenefitCard
              icon="🌟"
              title="Узнай энергию своего года"
              description="Общее направление и настроение 2026 года лично для тебя."
              delay={600}
            />

            <BenefitCard
              icon="📕"
              title="Возвращайся к раскладу в любой момент"
              description="Можно перечитать прогноз на любой месяц тогда, когда это нужно."
              delay={800}
            />

            <BenefitCard
              icon="🎁"
              title="Подари расклад близкому человеку"
              description="Тёплый, внимательный и действительно особенный новогодний подарок."
              delay={1000}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TarotForecast2026Unlocked;
