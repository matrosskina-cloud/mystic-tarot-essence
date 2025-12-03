import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  { month: "Январь", icon: "❄️", card: "Маг", season: "winter" },
  { month: "Февраль", icon: "❄️", card: "Верховная Жрица", season: "winter" },
  { month: "Март", icon: "🌿", card: "Императрица", season: "spring" },
  { month: "Апрель", icon: "🌿", card: "Император", season: "spring" },
  { month: "Май", icon: "🌿", card: "Иерофант", season: "spring" },
  { month: "Июнь", icon: "☀️", card: "Влюблённые", season: "summer" },
  { month: "Июль", icon: "☀️", card: "Колесница", season: "summer" },
  { month: "Август", icon: "☀️", card: "Сила", season: "summer" },
  { month: "Сентябрь", icon: "🍂", card: "Отшельник", season: "autumn" },
  { month: "Октябрь", icon: "🍂", card: "Колесо Фортуны", season: "autumn" },
  { month: "Ноябрь", icon: "🎇", card: "Справедливость", season: "final" },
  { month: "Декабрь", icon: "🎇", card: "Повешенный", season: "final" },
];

const mockMonthInterpretation = {
  theme: "Новые начинания и свежая энергия",
  events: "Важные встречи, новые проекты, переосмысление целей",
  opportunities: "Шанс начать что-то с нуля, поддержка от неожиданных людей",
  warnings: "Не торопись с решениями, дай себе время на адаптацию",
  advice: "Доверься своей интуиции и не бойся делать первый шаг",
  summary: "Месяц закладывает фундамент для всего года — используй его мудро",
};

const TarotForecast2026Results = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: "#1a3a2f" }}>
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(234,196,111,0.08) 0%, transparent 60%)"
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
              
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Твой годовой расклад готов ✨
              </h1>
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
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Энергия 2026 года: {mockMainCard.name}
              </h2>
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
            <p className="text-center text-amber-400/90 font-medium mb-6 text-lg">
              {mockMainCard.keywords}
            </p>
            
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

        {/* Block 4: Monthly Dropdowns */}
        <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="bg-[#0f1f1a]/60 backdrop-blur-md border border-amber-500/20 rounded-[28px] p-6 md:p-8 shadow-[0_0_60px_rgba(234,196,111,0.1)]">
            <div className="flex items-start gap-3 mb-6">
              <div className="flex-shrink-0 text-2xl">📅</div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Твой год по месяцам
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-3">
              {monthsData.map((monthData, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`month-${idx}`} 
                  className="bg-[#0a1512]/60 border border-amber-500/10 rounded-2xl overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <span className="text-xl" style={{ color: "#EAC46F" }}>
                        {monthData.icon}
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {monthData.month} — {monthData.card}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 space-y-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-amber-400/90 font-medium text-sm mb-1">🎯 Тема месяца</p>
                        <p className="text-sm text-gray-300">{mockMonthInterpretation.theme}</p>
                      </div>
                      <div>
                        <p className="text-amber-400/90 font-medium text-sm mb-1">📍 Главные события</p>
                        <p className="text-sm text-gray-300">{mockMonthInterpretation.events}</p>
                      </div>
                      <div>
                        <p className="text-amber-400/90 font-medium text-sm mb-1">✨ Возможности</p>
                        <p className="text-sm text-gray-300">{mockMonthInterpretation.opportunities}</p>
                      </div>
                      <div>
                        <p className="text-amber-400/90 font-medium text-sm mb-1">⚠️ Риски / предупреждения</p>
                        <p className="text-sm text-gray-300">{mockMonthInterpretation.warnings}</p>
                      </div>
                      <div>
                        <p className="text-amber-400/90 font-medium text-sm mb-1">💡 Совет</p>
                        <p className="text-sm text-gray-300">{mockMonthInterpretation.advice}</p>
                      </div>
                      <div>
                        <p className="text-amber-400/90 font-medium text-sm mb-1">🌟 Итог месяца</p>
                        <p className="text-sm text-gray-300">{mockMonthInterpretation.summary}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TarotForecast2026Results;
