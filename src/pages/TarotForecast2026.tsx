import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import tarotBg from "@/assets/tarot-2026-bg.png";

const TarotForecast2026 = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

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

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setVisibleSections((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleStartForecast = () => {
    navigate("/2026_tarot_forecast_quiz");
  };

  const handleGiftForecast = () => {
    navigate("/2026_tarot_forecast_gift");
  };

  const getSectionClass = (index: number) => {
    return visibleSections.has(index)
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8";
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
      {/* Base overlay */}
      <div className="absolute inset-0 bg-[#0a1612]/60" />
      
      {/* Radial gradient overlays for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_#0a1612_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#0f1f1a_0%,_transparent_50%)]" />
      
      <main className="relative z-10 flex flex-col items-center px-5 sm:px-6 py-14">
        <div className="w-full max-w-lg mx-auto space-y-16 box-border">
          
          {/* 1️⃣ HERO Block - Light section, text only */}
          <section 
            ref={(el) => (sectionRefs.current[0] = el)}
            className={`text-center space-y-6 pt-6 transition-all duration-700 ease-out ${getSectionClass(0)}`}
          >
            <h1 className="text-[28px] sm:text-[34px] font-bold text-white leading-[1.25] tracking-tight">
              <span className="relative inline-block">
                Твоя персональная навигация
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
              </span>
              <br />на весь 2026 год
            </h1>
            <p className="text-[17px] sm:text-lg text-white/90 leading-[1.7] max-w-[95%] mx-auto">
              Пойми, с чем ты входишь в этот год,
              где будут ключевые повороты
              и на что стоит опираться, чтобы прожить его осознанно.
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              Индивидуальный годовой разбор на основе Таро —<br />
              не предсказание, а ориентир и поддержка.
            </p>
            <Button 
              variant="golden" 
              size="xl" 
              className="w-full font-semibold mt-6 shadow-[0_0_30px_rgba(234,196,111,0.25)] hover:shadow-[0_0_40px_rgba(234,196,111,0.4)] transition-shadow duration-300"
              onClick={handleStartForecast}
            >
              Получить годовой разбор · 499 ₽
            </Button>
          </section>

          {/* Highlight phrase - subscription badge */}
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-amber-500/10 rounded-full px-5 py-2.5 border border-amber-400/20 shadow-[0_0_20px_rgba(234,196,111,0.1)]">
            <span className="text-amber-400 text-sm">✨</span>
            <p className="text-amber-200/80 text-sm font-medium">
              Бесплатно с подпиской на 3 или 6 месяцев
            </p>
          </div>

          {/* 2️⃣ "What you'll get" Block - Cards with accent */}
          <section 
            ref={(el) => (sectionRefs.current[1] = el)}
            className={`space-y-5 transition-all duration-700 ease-out ${getSectionClass(1)}`}
          >
            <h2 className="text-[22px] sm:text-2xl font-bold text-white text-center leading-tight mb-6">
              <span className="relative">
                Что даёт годовой разбор
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
              </span>
            </h2>
            
            <div className="space-y-4">
              {[
                { icon: "🃏", title: "Фокус на год", text: "Понимание, с какой темой ты входишь в год и на что стоит обращать внимание в ключевых решениях." },
                { icon: "📅", title: "Подсказки по месяцам", text: "Отдельный расклад на каждый месяц года — с темами, возможностями и моментами, где важно быть внимательнее." },
                { icon: "🔍", title: "Понятные трактовки", text: "Без сложных формулировок и эзотерики — только то, что помогает разобраться в происходящем." },
                { icon: "📘", title: "Результат, который остаётся с тобой", text: "Годовой разбор сохраняется — к нему можно вернуться в любой момент и посмотреть прогноз на нужный месяц." }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="bg-[#0f1f1a]/75 backdrop-blur-sm rounded-lg p-5 shadow-[0_2px_20px_rgba(0,0,0,0.2)] border-t border-amber-500/10"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold text-[15px] mb-1.5">{item.title}</h3>
                      <p className="text-white/65 text-[14px] leading-[1.65]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3️⃣ "This is not a prediction" Block - Horizontal callout style */}
          <section 
            ref={(el) => (sectionRefs.current[2] = el)}
            className={`transition-all duration-700 ease-out ${getSectionClass(2)}`}
          >
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a2f28]/90 to-[#0f1f1a]/90 p-[1px]">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/10 opacity-50" />
              <div className="relative bg-[#12251f]/95 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center">
                    <span className="text-amber-400 text-lg">💡</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-white/95 font-semibold text-[15px]">
                      Это не предсказание
                    </h3>
                    <p className="text-white/60 text-[13px] leading-[1.7]">
                      Разбор не говорит, что случится. Он помогает увидеть направления, периоды роста и принимать решения осознаннее.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Highlight phrase */}
          <p className="text-center text-white/40 text-sm italic py-2">
            Ты остаёшься в точке выбора — разбор лишь подсвечивает маршруты.
          </p>

          {/* 4️⃣ "How the yearly reading works" Block - Timeline format */}
          <section 
            ref={(el) => (sectionRefs.current[3] = el)}
            className={`space-y-6 transition-all duration-700 ease-out ${getSectionClass(3)}`}
          >
            <h2 className="text-[22px] sm:text-2xl font-bold text-white text-center leading-tight">
              <span className="relative">
                Как проходит разбор
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
              </span>
            </h2>
            
            {/* Example image */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-400/20 shadow-[0_12px_48px_rgba(0,0,0,0.5),0_0_60px_rgba(234,196,111,0.15)] animate-fade-in transition-all duration-500 hover:shadow-[0_16px_56px_rgba(0,0,0,0.6),0_0_80px_rgba(234,196,111,0.25)] hover:scale-[1.02] group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-transparent to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <img 
                src="/tarot-spread-example.png" 
                alt="Пример расклада на месяц" 
                className="w-full h-auto transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1612]/80 via-transparent to-transparent pointer-events-none" />
            </div>
            
            <div className="space-y-8 pt-2">
              {[
                { num: 1, title: "Выбор карт", text: "Ты выбираешь карты для каждого месяца — так формируется индивидуальный прогноз на весь год. И одну дополнительную — эта карта покажет энергию твоего года." },
                { num: 2, title: "Расклад по месяцам", text: "Каждый месяц раскроется по ключевым аспектам жизни: дела и проекты, деньги, отношения, внешние обстоятельства и точки роста." },
                { num: 3, title: "Итог и навигация на год", text: "Ты получаешь целостную картину года: понимаешь общее направление, возможные риски и ориентиры, которые помогают принимать решения в течение года." }
              ].map((step, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(234,196,111,0.35)]">
                      {step.num}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold text-[15px] mb-1.5">{step.title}</h3>
                    <p className="text-white/65 text-[14px] leading-[1.65]">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5️⃣ "Return to reading" Block - Text only, no card */}
          <section 
            ref={(el) => (sectionRefs.current[4] = el)}
            className={`text-center space-y-4 py-4 transition-all duration-700 ease-out ${getSectionClass(4)}`}
          >
            <h2 className="text-lg font-semibold text-white/90 flex items-center justify-center gap-2">
              <span className="text-amber-400/70">📖</span>
              К разбору можно возвращаться
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.7] max-w-[90%] mx-auto">
              Годовой разбор — не одноразовый текст.
              Его можно перечитывать в моменты сомнений, выбора или усталости.
            </p>
            <p className="text-white/40 text-sm italic">
              Иногда одно предложение, прочитанное вовремя, меняет всё.
            </p>
          </section>

          {/* 6️⃣ Combined Timer + CTA Block */}
          <section 
            ref={(el) => (sectionRefs.current[5] = el)}
            className={`relative text-center -mx-5 px-5 py-12 transition-all duration-700 ease-out ${getSectionClass(5)}`}
          >
            {/* Dark backdrop */}
            <div className="absolute inset-0 bg-[#0a1612]/85 -z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,196,111,0.04)_0%,_transparent_60%)] -z-10" />
            
            <div className="space-y-8">
              {/* Timer */}
              <div className="space-y-4">
                <p className="text-white/55 text-sm">
                  Набор на годовой разбор открыт до 15 января
                </p>
                <div className="flex justify-center gap-3">
                  {[
                    { value: timeLeft.days, label: "дней" },
                    { value: String(timeLeft.hours).padStart(2, '0'), label: "часов" },
                    { value: String(timeLeft.minutes).padStart(2, '0'), label: "минут" },
                    { value: String(timeLeft.seconds).padStart(2, '0'), label: "секунд" }
                  ].map((item, i) => (
                    <div key={i} className="bg-[#1a2f28]/60 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[62px] shadow-[0_2px_20px_rgba(0,0,0,0.25)]">
                      <div className="text-2xl font-bold text-amber-300">{item.value}</div>
                      <div className="text-[10px] text-white/45 uppercase tracking-wider mt-0.5">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4 pt-2">
                <p className="text-white/70 text-[15px] leading-[1.7]">
                  Если тебе важно начать год с ясностью и опорой
                </p>
              <Button 
                  variant="golden" 
                  size="xl" 
                  className="w-full font-semibold text-[17px] py-6 shadow-[0_0_35px_rgba(234,196,111,0.3)] hover:shadow-[0_0_50px_rgba(234,196,111,0.45)] transition-all duration-300"
                  onClick={handleStartForecast}
                >
                  Получить годовой разбор · 499 ₽
                </Button>
              </div>
            </div>
          </section>

          {/* 7️⃣ "Gift" Block - After main CTA */}
          <section 
            ref={(el) => (sectionRefs.current[6] = el)}
            className={`bg-[#1a3029]/85 backdrop-blur-sm rounded-xl p-7 shadow-[0_4px_30px_rgba(0,0,0,0.25)] transition-all duration-700 ease-out ${getSectionClass(6)}`}
          >
            <div className="text-center space-y-4">
              <span className="text-4xl block mb-2">🎁</span>
              <h2 className="text-lg font-semibold text-white">
                Можно подарить близкому человеку
              </h2>
              <p className="text-white/65 text-[14px] leading-[1.7] max-w-[95%] mx-auto">
                Годовой разбор можно оформить в подарок —
                тёплый, внимательный и по-настоящему личный жест
                в начале нового этапа.
              </p>
              <Button 
                variant="outline" 
                className="mt-2 border-amber-500/30 text-amber-200/90 hover:bg-amber-500/10 hover:border-amber-400/50 transition-all duration-200"
                onClick={handleGiftForecast}
              >
                Оформить в подарок
              </Button>
            </div>
          </section>

          {/* Bottom spacing */}
          <div className="h-8" />

        </div>
      </main>
    </div>
  );
};

export default TarotForecast2026;
