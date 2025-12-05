import { useNavigate } from "react-router-dom";
import { BenefitCard } from "@/components/BenefitCard";
import tarotBg from "@/assets/tarot-2026-bg.png";
import { useEffect, useState } from "react";

// Mock data - in real app would come from URL params or API
const giftData = {
  recipientName: "Анна",
  recipientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
  senderName: "Мария",
  senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  wishMessage: "Пусть этот год принесёт тебе много радости, любви и исполнения желаний! 🌟",
};

const TarotForecast2026Gift = () => {
  const navigate = useNavigate();
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([]);

  useEffect(() => {
    // Generate snowflakes
    const flakes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 8 + 4,
    }));
    setSnowflakes(flakes);
  }, []);

  const handleStartForecast = () => {
    navigate("/2026_tarot_forecast_quiz");
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
      
      {/* Floating Snowflakes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute animate-fall opacity-40"
            style={{
              left: `${flake.left}%`,
              top: -20,
              width: flake.size,
              height: flake.size,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              filter: 'blur(1px)',
            }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 70%, transparent 100%)',
              }}
            />
          </div>
        ))}
      </div>
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12">
        <div className="w-full max-w-md mx-auto space-y-8 box-border">
          
          {/* Gift Block */}
          <div 
            className="relative rounded-[24px] p-6 animate-fade-in-up overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.08), 0 0 60px rgba(234,196,111,0.15)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {/* Decorative glow behind avatar */}
            <div 
              className="absolute top-4 left-4 w-20 h-20 rounded-full opacity-50"
              style={{
                background: 'radial-gradient(circle, rgba(234,196,111,0.4) 0%, transparent 70%)',
                filter: 'blur(15px)',
              }}
            />

            {/* Top row - Avatar + Decorations */}
            <div className="relative flex items-start justify-between mb-5">
              {/* Recipient Avatar */}
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-full overflow-hidden border-2"
                  style={{
                    borderColor: 'rgba(234,196,111,0.5)',
                    boxShadow: '0 0 20px rgba(234,196,111,0.3)',
                  }}
                >
                  <img 
                    src={giftData.recipientAvatar} 
                    alt="Recipient" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="flex items-center gap-2 opacity-80">
                <span className="text-2xl" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}>❄️</span>
                <span className="text-xl" style={{ filter: 'drop-shadow(0 0 10px rgba(234,196,111,0.8))' }}>⭐</span>
                <span className="text-lg" style={{ filter: 'drop-shadow(0 0 6px rgba(234,196,111,0.6))' }}>🎄</span>
              </div>
            </div>

            {/* Greeting Header */}
            <h2 
              className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 0 30px rgba(234,196,111,0.3)',
              }}
            >
              🎄 {giftData.recipientName}, открой скорее свой новогодний подарок!
            </h2>

            {/* Santa Info Block */}
            <div 
              className="flex items-center gap-3 rounded-[14px] px-4 py-3 mb-3"
              style={{
                background: 'rgba(0,0,0,0.25)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="text-white/80 text-sm">🎅 Твой Санта:</span>
              <div className="flex items-center gap-2">
                <div 
                  className="w-7 h-7 rounded-full overflow-hidden"
                  style={{
                    boxShadow: '0 0 12px rgba(234,196,111,0.4)',
                    border: '1px solid rgba(234,196,111,0.4)',
                  }}
                >
                  <img 
                    src={giftData.senderAvatar} 
                    alt="Sender" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white font-medium text-sm">{giftData.senderName}</span>
              </div>
            </div>

            {/* Wish Message from Sender */}
            <div 
              className="rounded-[12px] px-4 py-3 mb-5"
              style={{
                background: 'rgba(234,196,111,0.08)',
                border: '1px solid rgba(234,196,111,0.2)',
              }}
            >
              <p className="text-white/90 text-sm italic leading-relaxed">
                "{giftData.wishMessage}"
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleStartForecast}
              className="w-full py-4 px-6 rounded-[18px] font-semibold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #E8C860 0%, #D4A84B 100%)',
                color: '#1a3a2f',
                boxShadow: '0 8px 28px rgba(212,168,75,0.35), 0 0 40px rgba(212,168,75,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              ✨ Сделать годовой расклад
            </button>
          </div>

          {/* Header Section */}
          <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Твой личный прогноз на весь год — по месяцам.
            </h1>
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

      {/* Snowfall Animation Styles */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TarotForecast2026Gift;
