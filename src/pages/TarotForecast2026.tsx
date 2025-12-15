import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import tarotBg from "@/assets/tarot-2026-bg.png";

const TarotForecast2026 = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calculate time until January 15, 2026
  useEffect(() => {
    const targetDate = new Date('2026-01-15T23:59:59');
    
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartForecast = () => {
    navigate("/2026_tarot_forecast_quiz");
  };

  const handleGiftForecast = () => {
    // TODO: Implement gift flow
    console.log("Gift forecast clicked");
  };

  return (
    <div 
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: `url(${tarotBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      <main className="relative z-10 flex flex-col items-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-lg mx-auto space-y-8 box-border">
          
          {/* 1️⃣ HERO Block */}
          <section className="text-center space-y-5 animate-fade-in-up pt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Твоя персональная навигация<br />на весь 2026 год
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              Пойми, с чем ты входишь в этот год,<br />
              где будут ключевые повороты<br />
              и на что стоит опираться, чтобы прожить его осознанно.
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              Индивидуальный годовой разбор на основе Таро —<br />
              не предсказание, а ориентир и поддержка.
            </p>
            <Button 
              variant="golden" 
              size="xl" 
              className="w-full font-semibold mt-4"
              onClick={handleStartForecast}
            >
              Начать персональный разбор года
            </Button>
          </section>

          {/* 2️⃣ "This is not a prediction" Block */}
          <section 
            className="bg-[#0f1f1a]/70 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6 animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              ✨ Это не предсказание будущего
            </h2>
            <div className="text-white/80 text-[15px] leading-relaxed space-y-4">
              <p>
                Годовой разбор — это не приговор и не обещание событий.<br />
                Он не говорит, что обязательно случится.
              </p>
              <p>Он помогает:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>лучше понять общее направление в каждом месяце года</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>увидеть периоды напряжения и роста</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>принимать решения спокойнее и увереннее</span>
                </li>
              </ul>
              <p className="text-white/70 italic">
                Ты остаёшься в точке выбора —<br />
                разбор лишь подсвечивает возможные маршруты.
              </p>
            </div>
          </section>

          {/* 3️⃣ "What you'll get" Block */}
          <section 
            className="space-y-4 animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            <h2 className="text-xl font-bold text-white text-center mb-5">
              Что даёт годовой разбор
            </h2>
            
            <div className="space-y-4">
              <div className="bg-[#0f1f1a]/60 backdrop-blur-md border border-amber-500/15 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🃏</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Личный фокус на год</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Ты формулируешь главный запрос — не абстрактный «что будет», а то, что действительно важно именно тебе.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f1f1a]/60 backdrop-blur-md border border-amber-500/15 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔍</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Ясные ориентиры по периодам года</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Ключевые темы, возможности и риски каждого этапа — без перегруза и лишней эзотерики.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f1f1a]/60 backdrop-blur-md border border-amber-500/15 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Общую энергию и настроение года</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Главное направление, которое будет возвращаться снова и снова и задавать тон происходящему.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f1f1a]/60 backdrop-blur-md border border-amber-500/15 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📘</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Опору, к которой можно возвращаться</h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Ты сможешь перечитывать разбор в любой момент, когда потребуется ясность или подтверждение своих решений.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4️⃣ "How the yearly reading works" Block */}
          <section 
            className="bg-[#0f1f1a]/70 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6 animate-fade-in-up"
            style={{ animationDelay: '600ms' }}
          >
            <h2 className="text-xl font-bold text-white mb-5 text-center">
              Как проходит годовой разбор
            </h2>
            
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(234,196,111,0.3)]">
                  1
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Формулировка запроса</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Ты задаёшь главный вопрос или фокус на год (работа, отношения, деньги или общее направление).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(234,196,111,0.3)]">
                  2
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Персональный расклад</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Ты выбираешь карты, и расклад формируется индивидуально — по месяцам или ключевым периодам года.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(234,196,111,0.3)]">
                  3
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Итоговый вывод</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Ты получаешь связную картину года: смысл, риски, точки роста и рекомендации.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5️⃣ "Return to reading" Block */}
          <section 
            className="bg-[#0f1f1a]/60 backdrop-blur-md border border-amber-500/15 rounded-2xl p-6 animate-fade-in-up"
            style={{ animationDelay: '800ms' }}
          >
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              📖 К этому разбору можно возвращаться
            </h2>
            <div className="text-white/80 text-[15px] leading-relaxed space-y-3 text-center">
              <p>
                Годовой разбор — не одноразовый текст.<br />
                Его можно перечитывать в течение года —<br />
                в моменты сомнений, выбора или усталости.
              </p>
              <p className="text-white/60 italic">
                Иногда одно предложение, прочитанное вовремя,<br />
                меняет восприятие ситуации.
              </p>
            </div>
          </section>

          {/* 6️⃣ "Gift" Block */}
          <section 
            className="bg-[#0f1f1a]/70 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6 animate-fade-in-up"
            style={{ animationDelay: '1000ms' }}
          >
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              🎁 Можно подарить близкому человеку
            </h2>
            <p className="text-white/80 text-[15px] leading-relaxed text-center mb-5">
              Годовой разбор можно оформить в подарок.<br />
              Это тёплый, внимательный и по-настоящему личный жест —<br />
              поддержка и забота в начале нового этапа.
            </p>
            <Button 
              variant="outline" 
              className="w-full border-amber-500/40 text-amber-200 hover:bg-amber-500/10 hover:border-amber-400/60"
              onClick={handleGiftForecast}
            >
              Оформить в подарок
            </Button>
          </section>

          {/* 7️⃣ Limitation Block with Timer */}
          <section 
            className="text-center animate-fade-in-up"
            style={{ animationDelay: '1200ms' }}
          >
            <p className="text-white/70 text-sm mb-3">
              Набор на годовой разбор открыт до 15 января
            </p>
            <div className="flex justify-center gap-3">
              <div className="bg-[#0f1f1a]/80 backdrop-blur-md border border-amber-500/20 rounded-xl px-4 py-3 min-w-[60px]">
                <div className="text-2xl font-bold text-amber-300">{timeLeft.days}</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">дней</div>
              </div>
              <div className="bg-[#0f1f1a]/80 backdrop-blur-md border border-amber-500/20 rounded-xl px-4 py-3 min-w-[60px]">
                <div className="text-2xl font-bold text-amber-300">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">часов</div>
              </div>
              <div className="bg-[#0f1f1a]/80 backdrop-blur-md border border-amber-500/20 rounded-xl px-4 py-3 min-w-[60px]">
                <div className="text-2xl font-bold text-amber-300">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">минут</div>
              </div>
              <div className="bg-[#0f1f1a]/80 backdrop-blur-md border border-amber-500/20 rounded-xl px-4 py-3 min-w-[60px]">
                <div className="text-2xl font-bold text-amber-300">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider">секунд</div>
              </div>
            </div>
          </section>

          {/* 8️⃣ Final CTA */}
          <section 
            className="text-center space-y-5 pb-8 animate-fade-in-up"
            style={{ animationDelay: '1400ms' }}
          >
            <p className="text-white/80 text-[15px] leading-relaxed">
              Если тебе важно начать год с ясностью и опорой —<br />
              годовой разбор может стать хорошей точкой входа.
            </p>
            <Button 
              variant="golden" 
              size="xl" 
              className="w-full font-semibold"
              onClick={handleStartForecast}
            >
              Пройти годовой разбор
            </Button>
          </section>

        </div>
      </main>
    </div>
  );
};

export default TarotForecast2026;
