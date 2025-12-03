import { Button } from "@/components/ui/button";
import { BenefitCard } from "@/components/BenefitCard";
import tarotBg from "@/assets/tarot-2026-bg.png";

const TarotForecast2026 = () => {
  const handleGetForecast = () => {
    // TODO: Implement payment flow
    console.log("Get forecast clicked");
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
          <div className="text-center space-y-4 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Годовой расклад Таро<br />на 2026 год
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              Твой личный прогноз на весь год — по месяцам.
            </p>
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

          {/* Footer Text */}
          <p className="text-center text-sm text-white/60 pt-4 animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
            Расклад станет доступен после оплаты Новогоднего расклада или при активной подписке.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up pt-2" style={{ animationDelay: '1400ms' }}>
            <Button 
              variant="golden" 
              size="xl" 
              className="w-full font-semibold"
              onClick={handleGetForecast}
            >
              🎁 Получить расклад
            </Button>
            <p className="text-center text-sm text-white/50 mt-3">
              Покупка происходит через Telegram-бота
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TarotForecast2026;
