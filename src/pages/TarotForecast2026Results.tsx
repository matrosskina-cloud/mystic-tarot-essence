import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { StarfieldCanvas } from "@/components/StarfieldCanvas";

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

// Decorative sparkle component
const Sparkle = ({ style, size = 8 }: { style?: React.CSSProperties; size?: number }) => (
  <div
    className="absolute pointer-events-none animate-pulse"
    style={{
      width: size,
      height: size,
      background: "radial-gradient(circle, rgba(234,196,111,0.6) 0%, transparent 70%)",
      borderRadius: "50%",
      ...style,
    }}
  />
);

const TarotForecast2026Results = () => {
  const [activeMonth, setActiveMonth] = useState(0);
  const [showFullInterpretation, setShowFullInterpretation] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0.35);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0, 1]));
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const touchStartX = useRef(0);
  const mainCardRef = useRef<HTMLDivElement>(null);

  // Parallax and glow effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Parallax: max 8px offset
      const newOffset = Math.min(scrollY * 0.05, 8);
      setParallaxOffset(newOffset);
      // Glow intensity increases with scroll (base 0.35, max 0.45)
      const newGlow = Math.min(0.35 + scrollY * 0.0003, 0.45);
      setGlowIntensity(newGlow);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute("data-section") || "0");
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
  const handleSliderScroll = () => {
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
      container.addEventListener("scroll", handleSliderScroll);
      return () => container.removeEventListener("scroll", handleSliderScroll);
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
      {/* Starfield canvas animation */}
      <StarfieldCanvas />
      
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(234,196,111,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Floating decorative sparkles */}
      <Sparkle style={{ top: "15%", left: "8%", animationDelay: "0s" }} size={6} />
      <Sparkle style={{ top: "25%", right: "12%", animationDelay: "0.5s" }} size={4} />
      <Sparkle style={{ top: "45%", left: "5%", animationDelay: "1s" }} size={5} />
      <Sparkle style={{ top: "60%", right: "8%", animationDelay: "1.5s" }} size={7} />
      <Sparkle style={{ top: "75%", left: "15%", animationDelay: "2s" }} size={4} />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-5 box-border">
        {/* Block: Main Energy of the Year - Premium Card */}
        <section
          data-section="1"
          className={`transition-all duration-500 delay-100 ${visibleSections.has(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div
            ref={mainCardRef}
            className="relative rounded-[26px] p-6 md:p-8"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
              backdropFilter: "blur(14px)",
              boxShadow: `inset 0 0 18px rgba(255,255,255,0.08), 0 10px 30px rgba(0,0,0,0.4)`,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Decorative corner sparkles */}
            <Sparkle style={{ top: 16, right: 20 }} size={6} />
            <Sparkle style={{ bottom: 20, left: 16 }} size={5} />

            {/* Header */}
            <h2 className="text-[20px] md:text-[24px] font-bold text-white mb-6 text-center leading-snug">
              ✨ @{mockUserData.name}, энергия твоего 2026 года: {mockMainCard.name}
            </h2>

            {/* Main card image with parallax and glow */}
            <div className="flex justify-center mb-6">
              <div
                className="relative transition-transform duration-300"
                style={{ transform: `translateY(${parallaxOffset}px)` }}
              >
                {/* Golden glow */}
                <div
                  className="absolute inset-0 rounded-2xl blur-2xl scale-125 transition-opacity duration-300"
                  style={{
                    background: `rgba(234,196,111,${glowIntensity})`,
                    boxShadow: `0 0 28px rgba(234,196,111,${glowIntensity})`,
                  }}
                />
                <div className="relative w-44 h-60 md:w-52 md:h-72 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center ring-2 ring-amber-400/40">
                  <span className="text-7xl">⭐</span>
                </div>
              </div>
            </div>

            {/* Keywords - golden */}
            <p className="text-center font-medium mb-5 text-[16px] md:text-[17px]" style={{ color: "#EAC46F" }}>
              {mockMainCard.keywords}
            </p>

            {/* Collapsible interpretation */}
            <div className="mt-4">
              <button
                onClick={() => setShowFullInterpretation(!showFullInterpretation)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-200 hover:bg-white/5"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <span className="text-sm font-medium">
                  {showFullInterpretation ? "Скрыть трактовку" : "Показать полную трактовку"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${showFullInterpretation ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showFullInterpretation ? "max-h-[500px] opacity-100 mt-5" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-4">
                  {mockMainCard.interpretation.map((paragraph, idx) => (
                    <p key={idx} className="text-sm md:text-base text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Decorative Separator */}
        <div
          data-section="2"
          className={`flex items-center justify-center gap-3 py-2 transition-all duration-500 delay-150 ${
            visibleSections.has(2) ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-white/30" />
          <span style={{ color: "#EAC46F" }} className="text-lg">
            ✨
          </span>
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-white/30" />
        </div>

        {/* Block 4: Monthly Slider */}
        <section
          data-section="3"
          className={`space-y-4 transition-all duration-500 delay-200 ${
            visibleSections.has(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* New header with description */}
          <div className="text-center px-2">
            <div className="relative inline-block">
              <h2 className="text-[20px] font-semibold text-white">📅 Твой год по месяцам</h2>
              {/* Golden glow under title */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-2 blur-lg"
                style={{ background: "rgba(234,196,111,0.25)" }}
              />
            </div>
            <p className="text-sm text-white/60 mt-2">Выбери месяц, чтобы увидеть трактовку</p>
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
                        ? "scale-[1.08] border-2 border-[#EAC46F]"
                        : "border border-white/[0.12] hover:border-white/25 hover:scale-[1.03] hover:shadow-lg"
                    }
                  `}
                  style={{
                    background:
                      activeMonth === idx
                        ? "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))"
                        : "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                    boxShadow:
                      activeMonth === idx
                        ? "0 0 14px rgba(234,196,111,0.45), 0 6px 12px rgba(0,0,0,0.25)"
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

          {/* Detailed Month Interpretation */}
          <div
            ref={contentRef}
            key={activeMonth}
            className="relative rounded-[24px] p-6"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 6px 22px rgba(0,0,0,0.35), 0 20px 40px rgba(234,196,111,0.12)",
              animation: "monthSlideIn 280ms ease-out",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Decorative sparkle */}
            <Sparkle style={{ top: 12, right: 16 }} size={5} />

            {/* Month Header */}
            <h3 className="text-xl md:text-[22px] font-semibold text-white mb-2">
              {currentMonth.month} — {currentMonth.card}
            </h3>
            <p className="text-[14px] md:text-[15px] font-medium mb-6" style={{ color: "#EAC46F" }}>
              {currentMonth.keywords}
            </p>

            {/* Interpretation Sections */}
            <div className="space-y-5">
              <div className="interpretation-item" style={{ animationDelay: "50ms" }}>
                <p className="text-white font-semibold text-sm mb-1">🎯 Тема месяца</p>
                <p className="text-gray-300/90 text-sm leading-relaxed">{currentInterpretation.theme}</p>
              </div>
              <div className="interpretation-item" style={{ animationDelay: "100ms" }}>
                <p className="text-white font-semibold text-sm mb-1">📍 Главные события</p>
                <p className="text-gray-300/90 text-sm leading-relaxed">{currentInterpretation.events}</p>
              </div>
              <div className="interpretation-item" style={{ animationDelay: "150ms" }}>
                <p className="text-white font-semibold text-sm mb-1">✨ Возможности</p>
                <p className="text-gray-300/90 text-sm leading-relaxed">{currentInterpretation.opportunities}</p>
              </div>
              <div className="interpretation-item" style={{ animationDelay: "200ms" }}>
                <p className="text-white font-semibold text-sm mb-1">⚠️ Риски / предупреждения</p>
                <p className="text-gray-300/90 text-sm leading-relaxed">{currentInterpretation.warnings}</p>
              </div>
              <div className="interpretation-item" style={{ animationDelay: "250ms" }}>
                <p className="text-white font-semibold text-sm mb-1">💡 Совет</p>
                <p className="text-gray-300/90 text-sm leading-relaxed">{currentInterpretation.advice}</p>
              </div>
              <div className="interpretation-item" style={{ animationDelay: "300ms" }}>
                <p className="text-white font-semibold text-sm mb-1">🌟 Итог месяца</p>
                <p className="text-gray-300/90 text-sm leading-relaxed">{currentInterpretation.summary}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Buttons Section */}
        <section
          data-section="5"
          className={`mt-10 mb-8 space-y-4 px-4 transition-all duration-500 delay-300 ${
            visibleSections.has(5) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Primary Button - Gift Reading */}
          <button
            onClick={() => window.open("https://t.me/your_bot?start=gift", "_blank")}
            className="w-full py-4 px-6 rounded-[20px] font-semibold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #EAC46F 0%, #D4A84B 100%)",
              color: "#1a3a2f",
              boxShadow: "0 8px 24px rgba(234, 196, 111, 0.35), 0 0 40px rgba(234, 196, 111, 0.15)",
            }}
          >
            🎁 Подарить расклад другу
          </button>

          {/* Secondary Button - Return to Bot */}
          <button
            onClick={() => window.open("https://t.me/your_bot", "_blank")}
            className="w-full py-4 px-6 rounded-[20px] font-medium text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.9)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            ← Вернуться в бота
          </button>
        </section>
      </main>

      {/* Hide scrollbar styles and animations */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
        @keyframes monthSlideIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .interpretation-item {
          animation: itemFadeIn 260ms ease-out both;
        }
        @keyframes itemFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
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
