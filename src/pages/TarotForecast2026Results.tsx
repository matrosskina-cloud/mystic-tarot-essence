import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data - will be replaced with real data
const mockUserData = {
  name: "Анна",
  avatarUrl: "",
};

const mockMainCard = {
  name: "Звезда",
  keywords: "Надежда • Вдохновение • Обновление",
  interpretation: [
    "2026 год станет для тебя временем глубокого внутреннего обновления и восстановления. Звезда указывает на период, когда после периода испытаний приходит ясность и новая надежда.",
    "Этот год откроет перед тобой новые горизонты — как в творчестве, так и в отношениях. Ты почувствуешь прилив вдохновения и желание двигаться к своим истинным целям.",
    "Главный урок года — доверие. Доверие себе, своей интуиции и процессу жизни. Звезда напоминает: даже в темноте всегда есть свет, который ведёт тебя вперёд.",
  ],
};

const monthsData = [
  { month: "Январь", icon: "❄️", card: "«Маг»", keywords: "Начало • Воля • Потенциал" },
  { month: "Февраль", icon: "❄️", card: "«Верховная Жрица»", keywords: "Интуиция • Тайна • Мудрость" },
  { month: "Март", icon: "🌿", card: "«Императрица»", keywords: "Рост • Забота • Изобилие" },
  { month: "Апрель", icon: "🌿", card: "«Император»", keywords: "Структура • Власть • Порядок" },
  { month: "Май", icon: "🌿", card: "«Иерофант»", keywords: "Традиции • Учение • Вера" },
  { month: "Июнь", icon: "☀️", card: "«Влюблённые»", keywords: "Выбор • Связь • Гармония" },
  { month: "Июль", icon: "☀️", card: "«Колесница»", keywords: "Движение • Победа • Воля" },
  { month: "Август", icon: "☀️", card: "«Сила»", keywords: "Мужество • Терпение • Страсть" },
  { month: "Сентябрь", icon: "🍂", card: "«Отшельник»", keywords: "Поиск • Уединение • Мудрость" },
  { month: "Октябрь", icon: "🍂", card: "«Колесо Фортуны»", keywords: "Судьба • Перемены • Цикл" },
  { month: "Ноябрь", icon: "🍂", card: "«Справедливость»", keywords: "Баланс • Карма • Истина" },
  { month: "Декабрь", icon: "🎇", card: "«Повешенный»", keywords: "Пауза • Жертва • Прозрение" },
];

const mockMonthInterpretations: Record<
  string,
  {
    theme: string;
    events: string;
    opportunities: string;
    warnings: string;
    advice: string;
    summary: string;
  }
> = {
  Январь: {
    theme: "Новые начинания и свежая энергия",
    events: "Важные встречи, новые проекты, переосмысление целей",
    opportunities: "Шанс начать что-то с нуля, поддержка от неожиданных людей",
    warnings: "Не торопись с решениями, дай себе время на адаптацию",
    advice: "Доверься своей интуиции и не бойся делать первый шаг",
    summary: "Месяц закладывает фундамент для всего года — используй его мудро",
  },
  Февраль: {
    theme: "Глубокое познание и интуиция",
    events: "Внутренние открытия, важные сны, тайные знания",
    opportunities: "Развитие интуиции, духовные практики",
    warnings: "Не игнорируй свои чувства и предчувствия",
    advice: "Прислушивайся к внутреннему голосу",
    summary: "Время для самопознания и развития внутренней мудрости",
  },
  Март: {
    theme: "Творчество и расцвет",
    events: "Творческие проекты, новые идеи, забота о близких",
    opportunities: "Материальное благополучие, творческая реализация",
    warnings: "Не забывай о себе, заботясь о других",
    advice: "Позволь себе творить и наслаждаться жизнью",
    summary: "Весна приносит изобилие во всех сферах",
  },
  Апрель: {
    theme: "Структура и организация",
    events: "Важные решения, построение планов, лидерство",
    opportunities: "Карьерный рост, признание авторитета",
    warnings: "Избегай чрезмерного контроля",
    advice: "Будь твёрдым, но справедливым",
    summary: "Время для создания прочного фундамента",
  },
  Май: {
    theme: "Обучение и традиции",
    events: "Получение знаний, важные наставники, ритуалы",
    opportunities: "Духовный рост, обучение новому",
    warnings: "Не следуй слепо за авторитетами",
    advice: "Найди баланс между традицией и личным путём",
    summary: "Месяц мудрости и духовного обогащения",
  },
  Июнь: {
    theme: "Любовь и выбор",
    events: "Романтические встречи, важные решения в отношениях",
    opportunities: "Глубокие связи, гармония в партнёрстве",
    warnings: "Будь честен с собой в своих чувствах",
    advice: "Следуй за сердцем, но слушай разум",
    summary: "Время для любви и важных жизненных выборов",
  },
  Июль: {
    theme: "Движение и победа",
    events: "Активные действия, путешествия, достижения",
    opportunities: "Преодоление препятствий, успех в начинаниях",
    warnings: "Не позволяй эго управлять тобой",
    advice: "Двигайся вперёд с уверенностью",
    summary: "Месяц активных действий и триумфа",
  },
  Август: {
    theme: "Внутренняя сила и мужество",
    events: "Испытания, проявление характера, страсть",
    opportunities: "Развитие силы духа, преодоление страхов",
    warnings: "Контролируй свои импульсы",
    advice: "Сила в мягкости и терпении",
    summary: "Время для проявления истинной силы",
  },
  Сентябрь: {
    theme: "Уединение и поиск",
    events: "Время для размышлений, внутренний поиск",
    opportunities: "Глубокое самопознание, мудрость",
    warnings: "Не изолируйся полностью от мира",
    advice: "Найди время для себя и своих мыслей",
    summary: "Месяц внутреннего путешествия",
  },
  Октябрь: {
    theme: "Перемены и судьба",
    events: "Неожиданные повороты, смена циклов",
    opportunities: "Новые возможности от перемен",
    warnings: "Будь готов к неожиданностям",
    advice: "Прими перемены как часть жизни",
    summary: "Время для принятия судьбоносных поворотов",
  },
  Ноябрь: {
    theme: "Баланс и справедливость",
    events: "Важные решения, кармические уроки",
    opportunities: "Восстановление баланса, честные отношения",
    warnings: "Будь честен во всём",
    advice: "Ищи справедливость, но начни с себя",
    summary: "Месяц кармического равновесия",
  },
  Декабрь: {
    theme: "Пауза и трансформация",
    events: "Время переосмысления, жертвы ради роста",
    opportunities: "Глубокое прозрение, духовная трансформация",
    warnings: "Не сопротивляйся необходимым переменам",
    advice: "Позволь старому уйти для нового",
    summary: "Завершение года с глубоким пониманием",
  },
};

const TarotForecast2026Results = () => {
  const [activeMonth, setActiveMonth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const touchStartX = useRef(0);

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (card && scrollRef.current) {
      isScrollingRef.current = true;
      const container = scrollRef.current;
      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scrollLeft = card.offsetLeft - containerRect.width / 2 + cardRect.width / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 300);
    }
  };

  // Handle scroll to detect active card
  const handleScroll = () => {
    if (isScrollingRef.current || !scrollRef.current) return;

    const container = scrollRef.current;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (card) {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      }
    });

    if (closestIndex !== activeMonth) {
      setActiveMonth(closestIndex);
    }
  };

  // Content swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeMonth < 11) {
        const newIndex = activeMonth + 1;
        setActiveMonth(newIndex);
        scrollToCard(newIndex);
      } else if (diff < 0 && activeMonth > 0) {
        const newIndex = activeMonth - 1;
        setActiveMonth(newIndex);
        scrollToCard(newIndex);
      }
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [activeMonth]);

  const handleMonthClick = (index: number) => {
    setActiveMonth(index);
    scrollToCard(index);
  };

  const goToPrevMonth = () => {
    if (activeMonth > 0) {
      const newIndex = activeMonth - 1;
      setActiveMonth(newIndex);
      scrollToCard(newIndex);
    }
  };

  const goToNextMonth = () => {
    if (activeMonth < 11) {
      const newIndex = activeMonth + 1;
      setActiveMonth(newIndex);
      scrollToCard(newIndex);
    }
  };

  const currentMonth = monthsData[activeMonth];
  const currentInterpretation = mockMonthInterpretations[currentMonth.month];

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: "#1a3a2f" }}>
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(234,196,111,0.08) 0%, transparent 60%)",
        }}
      />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-5 box-border">
        {/* Block 1: User Avatar & Welcome */}
        <section className="animate-fade-in">
          <div className="bg-[#0f1f1a]/60 backdrop-blur-md border border-amber-500/20 rounded-[28px] p-6 md:p-8 shadow-[0_0_60px_rgba(234,196,111,0.1)]">
            <div className="flex flex-col items-center text-center">
              {/* Avatar with glow */}
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl scale-150" />
                <Avatar className="relative w-20 h-20 md:w-22 md:h-22 ring-2 ring-amber-400/50 shadow-[0_0_30px_rgba(234,196,111,0.3)]">
                  <AvatarImage src={mockUserData.avatarUrl} alt={mockUserData.name} />
                  <AvatarFallback className="bg-gradient-to-br from-amber-600 to-amber-800 text-white text-2xl font-bold">
                    {mockUserData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Твой годовой расклад готов ✨</h1>
            </div>
          </div>
        </section>

        {/* Block 2: Inspiring Message */}
        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="bg-[#0f1f1a]/60 backdrop-blur-md border border-amber-500/20 rounded-[28px] p-6 md:p-8 shadow-[0_0_60px_rgba(234,196,111,0.1)]">
            <p className="text-base md:text-lg text-amber-100/90 leading-relaxed text-center">
              Перед тобой карта твоего года — энергия, которая будет вести тебя вперёд месяц за месяцем.
            </p>
            <p className="text-sm md:text-base text-amber-100/70 leading-relaxed text-center mt-3">
              Все трактовки собраны по каждому месяцу, чтобы ты могла возвращаться к ним в любой момент.
            </p>
          </div>
        </section>

        {/* Block 3: Main Energy of the Year */}
        <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="bg-[#0f1f1a]/60 backdrop-blur-md border border-amber-500/20 rounded-[28px] p-6 md:p-8 shadow-[0_0_60px_rgba(234,196,111,0.1)]">
            <div className="flex items-start gap-3 mb-6">
              <div className="flex-shrink-0 text-2xl">✨</div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Энергия 2026 года: {mockMainCard.name}</h2>
            </div>

            {/* Main card image placeholder */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-2xl scale-110" />
                <div className="relative w-40 h-56 md:w-48 md:h-68 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(234,196,111,0.3)] ring-2 ring-amber-400/40">
                  <span className="text-6xl">⭐</span>
                </div>
              </div>
            </div>

            {/* Keywords */}
            <p className="text-center text-amber-400/90 font-medium mb-6 text-lg">{mockMainCard.keywords}</p>

            {/* Interpretation */}
            <div className="space-y-4">
              {mockMainCard.interpretation.map((paragraph, idx) => (
                <p key={idx} className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Block 4: Monthly Slider */}
        <section className="animate-fade-in space-y-4" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-3 px-2">
            <div className="flex-shrink-0 text-2xl">📅</div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Твой год по месяцам</h2>
          </div>

          {/* Horizontal Month Slider with Arrows */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={goToPrevMonth}
              disabled={activeMonth === 0}
              className={`
                absolute left-0 top-1/2 -translate-y-1/2 z-10
                w-8 h-8 md:w-10 md:h-10 rounded-full
                flex items-center justify-center
                transition-all duration-200
                ${activeMonth === 0 ? "opacity-30 cursor-not-allowed" : "opacity-80 hover:opacity-100 hover:scale-110"}
              `}
              style={{
                background: "linear-gradient(135deg, rgba(234,196,111,0.3), rgba(234,196,111,0.1))",
                border: "1px solid rgba(234,196,111,0.4)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-amber-200" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={goToNextMonth}
              disabled={activeMonth === 11}
              className={`
                absolute right-0 top-1/2 -translate-y-1/2 z-10
                w-8 h-8 md:w-10 md:h-10 rounded-full
                flex items-center justify-center
                transition-all duration-200
                ${activeMonth === 11 ? "opacity-30 cursor-not-allowed" : "opacity-80 hover:opacity-100 hover:scale-110"}
              `}
              style={{
                background: "linear-gradient(135deg, rgba(234,196,111,0.3), rgba(234,196,111,0.1))",
                border: "1px solid rgba(234,196,111,0.4)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-amber-200" />
            </button>

            {/* Month Cards */}
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory px-10 md:px-12"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {monthsData.map((monthData, idx) => (
                <button
                  key={idx}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  onClick={() => handleMonthClick(idx)}
                  className={`
                    flex-shrink-0 snap-center
                    w-[90px] h-[110px] md:w-[100px] md:h-[120px]
                    rounded-[20px] p-3
                    flex flex-col items-center justify-center gap-1
                    transition-all duration-200 ease-out
                    cursor-pointer
                    ${
                      activeMonth === idx
                        ? "scale-[1.06] border-2 border-[#EAC46F]"
                        : "border border-white/[0.12] hover:border-white/25"
                    }
                  `}
                  style={{
                    background:
                      activeMonth === idx
                        ? "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))"
                        : "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                    boxShadow:
                      activeMonth === idx
                        ? "0 0 12px rgba(234,196,111,0.4), 0 6px 12px rgba(0,0,0,0.25)"
                        : "0 6px 12px rgba(0,0,0,0.25)",
                  }}
                >
                  <span className="text-xl" style={{ color: "#EAC46F" }}>
                    {monthData.icon}
                  </span>
                  <span className="text-white text-xs font-medium">{monthData.month}</span>
                  <span className="text-white/70 text-[10px] font-semibold text-center leading-tight">
                    {monthData.card}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Month Interpretation - single card without extra nesting */}
          <div
            ref={contentRef}
            key={activeMonth}
            className="rounded-[24px] p-6"
            style={{
              background: "rgba(15,31,26,0.8)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(234,196,111,0.2)",
              boxShadow: "0 20px 40px rgba(234,196,111,0.08)",
              animation: "slideIn 280ms ease-out",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Month Header */}
            <h3 className="text-xl md:text-[22px] font-semibold text-white mb-2">
              {currentMonth.month} — {currentMonth.card}
            </h3>
            <p className="text-sm md:text-[15px] font-medium mb-6" style={{ color: "#EAC46F" }}>
              {currentMonth.keywords}
            </p>

            {/* Interpretation Sections */}
            <div className="space-y-5">
              <div>
                <p className="text-white font-semibold text-sm mb-1">🎯 Тема месяца</p>
                <p className="text-gray-300/90 text-sm leading-relaxed">{currentInterpretation.theme}</p>
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">📍 Главные события</p>
                <p className="text-gray-300/90 text-sm leading-relaxed">{currentInterpretation.events}</p>
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">✨ Возможности</p>
                <p className="text-gray-300/90 text-sm leading-relaxed">{currentInterpretation.opportunities}</p>
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">⚠️ Риски / предупреждения</p>
                <p className="text-gray-300/90 text-sm leading-relaxed">{currentInterpretation.warnings}</p>
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">💡 Совет</p>
                <p className="text-gray-300/90 text-sm leading-relaxed">{currentInterpretation.advice}</p>
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">🌟 Итог месяца</p>
                <p className="text-gray-300/90 text-sm leading-relaxed">{currentInterpretation.summary}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Hide scrollbar styles and animations */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TarotForecast2026Results;
