import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MysticBackground } from "@/components/MysticBackground";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { archetypeData } from "@/data/archetypeData";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface LocationState {
  result: string;
  score: Record<string, number>;
}

// Mock data for friends' answers - in real app this would come from backend
const mockFriendAnswers = {
  superpower: [
    "Умение вдохновлять и поддерживать, даже когда самой тяжело",
    "Ты создаёшь вокруг себя тепло и уют",
    "Твоя мягкость не мешает тебе быть сильной — в этом твоя магия"
  ],
  growthArea: [
    "Перестать всё тянуть на себе и делиться нагрузкой",
    "Иногда нужно говорить \"нет\" без чувства вины",
    "Проси больше, не жди, что все сами догадаются"
  ],
  warmMessage: [
    "Ты — моё безопасное место, спасибо тебе за это",
    "Не забывай заботиться о себе так же, как ты заботишься обо мне",
    "Ты даёшь любовь, которая лечит"
  ]
};

const ArchetypeUnlocked = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [friendsCount] = useState(3); // 3 friends completed
  const [invitedCount] = useState(5); // 5 friends invited
  const [compatibility] = useState(87); // 87% compatibility
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
    <div className="relative min-h-screen overflow-x-hidden overflow-hidden">
      <MysticBackground />
      
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-5 box-border">
        {/* Block 1: Мини-профиль архетипа */}
        <section className="animate-fade-in">
          <div className="bg-[#1a1a2e]/60 backdrop-blur-md border border-primary/10 rounded-[28px] p-6 md:p-8 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
              {/* Avatar-style Tarot Card */}
              <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.3)] ring-1 ring-primary/30">
                <img 
                  src={archetype.imageUrl} 
                  alt={archetype.name}
                  className="w-24 h-32 md:w-32 md:h-44 object-cover object-center"
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

        {/* Block 2: Статистика */}
        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="bg-[#1a1a2e]/60 backdrop-blur-md border border-primary/10 rounded-[28px] p-6 md:p-8 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
            {/* Progress Block */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-[20px] p-4 sm:p-5 mb-6">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-center justify-center">
                <div className="inline-flex items-center gap-2 bg-[#0f0f1a]/80 border border-primary/40 rounded-full px-5 py-2 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                  <span className="text-sm text-gray-400">Ответили:</span>
                  <span className="text-xl font-bold text-primary">{friendsCount}</span>
                  <span className="text-sm text-gray-400">/ {maxFriends} друзей</span>
                </div>
                
                <div className="inline-flex items-center gap-2 bg-[#0f0f1a]/80 border border-primary/40 rounded-full px-5 py-2 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                  <span className="text-sm text-gray-400">Приглашено:</span>
                  <span className="text-xl font-bold text-primary">{invitedCount}</span>
                  <span className="text-sm text-gray-400">друзей</span>
                </div>
              </div>
            </div>

            {/* Copy Button */}
            <Button
              onClick={handleCopyLink}
              size="lg"
              className="w-full bg-gradient-to-r from-primary/40 to-primary/30 hover:from-primary/50 hover:to-primary/40 text-white border border-primary/60 backdrop-blur-sm shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all duration-300 font-medium px-8 rounded-full"
            >
              <Copy className="mr-2 h-5 w-5" />
              Скопировать ссылку
            </Button>
          </div>
        </section>

        {/* Block 3: Сила твоего архетипа */}
        <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="bg-[#1a1a2e]/60 backdrop-blur-md border border-primary/10 rounded-[28px] p-6 md:p-8 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
            <div className="flex items-start gap-3 mb-6">
              <div className="flex-shrink-0 text-2xl">
                🪷
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Сила твоего архетипа
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Intro */}
              <div className="text-center space-y-2 pb-4 border-b border-white/10">
                <p className="text-lg font-semibold text-primary">
                  🪷 Архетип: {archetype.name}
                </p>
                <p className="text-base text-gray-400 italic">
                  {archetype.subtitle}
                </p>
              </div>

              {/* 1. Описание личности */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-primary">1.</span> Описание личности по архетипу
                </h3>
                <div className="bg-[#0f0f1a]/60 border border-primary/10 rounded-2xl p-5 space-y-3">
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    Ты — воплощение материнской энергии, тепла и жизни. Императрица символизирует изобилие, творческую силу и способность создавать — будь то любовь, дом, проект или отношения.
                  </p>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    Ты умеешь любить безусловно, вдохновлять, поддерживать и питать. Люди рядом с тобой чувствуют себя в безопасности и словно «растут» в твоём поле. У тебя природный дар создавать уют, гармонию и излучать чувственное присутствие.
                  </p>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    Ты глубоко связана с телом, природой, ощущениями. Умеешь замечать красоту в мелочах и превращать обычное в особенное. Иногда тебе трудно переключиться с заботы о других на заботу о себе, но именно в этом — твоя внутренняя сила.
                  </p>
                </div>
              </div>

              {/* 2. Сильные стороны */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-primary">2.</span> Сильные стороны
                </h3>
                <div className="bg-[#0f0f1a]/60 border border-primary/10 rounded-2xl p-5 space-y-2">
                  <p className="text-sm md:text-base text-gray-300">🌿 Способность любить, поддерживать и вдохновлять других.</p>
                  <p className="text-sm md:text-base text-gray-300">💫 Творческое мышление и умение воплощать идеи в реальность.</p>
                  <p className="text-sm md:text-base text-gray-300">🌸 Глубокая чувственность, контакт с телом и природой.</p>
                  <p className="text-sm md:text-base text-gray-300">🌷 Энергия изобилия: всё, к чему ты прикасаешься, расцветает.</p>
                  <p className="text-sm md:text-base text-gray-300">🕊 Умение создавать пространство любви, уюта и принятия.</p>
                </div>
              </div>

              {/* 3. Точки роста */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-primary">3.</span> Точки роста
                </h3>
                <div className="bg-[#0f0f1a]/60 border border-primary/10 rounded-2xl p-5 space-y-2">
                  <p className="text-sm md:text-base text-gray-300">💧 Склонность отдавать больше, чем получаешь — риск выгорания.</p>
                  <p className="text-sm md:text-base text-gray-300">🌪 Трудность в выражении собственных потребностей.</p>
                  <p className="text-sm md:text-base text-gray-300">🪞 Зависимость от признания и одобрения других.</p>
                  <p className="text-sm md:text-base text-gray-300">🌻 Страх быть неидеальной — стремление быть «всегда сильной».</p>
                  <p className="text-sm md:text-base text-gray-300">🔥 Переизбыток заботы может превращаться в контроль.</p>
                </div>
              </div>

              {/* 4. Подходящий партнёр */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-primary">4.</span> Подходящий партнёр в отношениях
                </h3>
                <div className="bg-[#0f0f1a]/60 border border-primary/10 rounded-2xl p-5 space-y-3">
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    Императрице нужен партнёр, который уважает её мягкость и не воспринимает её щедрость как должное.
                  </p>
                  <p className="text-sm md:text-base text-gray-300 font-semibold">Тебе подойдёт тот, кто:</p>
                  <div className="space-y-2 pl-2">
                    <p className="text-sm md:text-base text-gray-300">🪵 Ценит твою заботу и отвечает стабильностью.</p>
                    <p className="text-sm md:text-base text-gray-300">☀️ Умеет вдохновлять, поддерживать и создавать вместе.</p>
                    <p className="text-sm md:text-base text-gray-300">🌙 Принимает твою эмоциональность, не обесценивая.</p>
                    <p className="text-sm md:text-base text-gray-300">⚖️ Готов к глубокой, надёжной связи, в которой есть баланс — не только давать, но и получать.</p>
                  </div>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed italic">
                    Это партнёр, с которым можно строить не зависимость, а союз роста и любви.
                  </p>
                </div>
              </div>

              {/* 5. Кармические уроки */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-primary">5.</span> Кармические уроки архетипа {archetype.name}
                </h3>
                <div className="bg-[#0f0f1a]/60 border border-primary/10 rounded-2xl p-5 space-y-4">
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-primary">1. Урок заботы о себе</p>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      Ты можешь растворяться в других, забывая, что заслуживаешь того же тепла и внимания. Жизнь учит тебя наполняться прежде, чем делиться.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-primary">2. Урок внутренней опоры</p>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      Иногда ты ищешь подтверждение своей ценности через то, что делаешь для других. Но настоящая сила Императрицы — в уверенности, что ты уже достаточна просто потому, что есть.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-primary">3. Урок здоровых границ</p>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      Ты не обязана быть источником для всех. Научись говорить "нет" без чувства вины — это акт любви к себе, а не отказ другим.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Block 4: Как тебя видят другие */}
        <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="bg-[#1a1a2e]/60 backdrop-blur-md border border-primary/10 rounded-[28px] p-6 md:p-8 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
            <div className="flex items-start gap-3 mb-6">
              <div className="flex-shrink-0 text-2xl">
                💬
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Как тебя видят другие
              </h2>
            </div>
            
            {/* Compatibility Progress */}
            <div className="mb-8 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base text-gray-300">Совместимость ваших ответов</span>
                <span className="text-lg font-bold text-primary">{compatibility}%</span>
              </div>
              <Progress value={compatibility} className="h-3 bg-[#0f0f1a]/80" />
            </div>

            {/* Friends' Answers */}
            <div className="space-y-8">
              {/* Question 1: Superpower */}
              <div className="space-y-4">
                <h3 className="text-base md:text-lg font-semibold text-white border-b border-primary/20 pb-2">
                  Вопрос: В чём твоя суперсила?
                </h3>
                <div className="space-y-3">
                  {mockFriendAnswers.superpower.map((answer, index) => (
                    <div 
                      key={index}
                      className="bg-[#0f0f1a]/60 border border-primary/10 rounded-xl p-4 hover:border-primary/30 transition-all"
                    >
                      <p className="text-sm md:text-base text-gray-300 italic leading-relaxed">
                        "{answer}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 2: Growth Area */}
              <div className="space-y-4">
                <h3 className="text-base md:text-lg font-semibold text-white border-b border-primary/20 pb-2">
                  Вопрос: Над чем тебе стоит поработать?
                </h3>
                <div className="space-y-3">
                  {mockFriendAnswers.growthArea.map((answer, index) => (
                    <div 
                      key={index}
                      className="bg-[#0f0f1a]/60 border border-primary/10 rounded-xl p-4 hover:border-primary/30 transition-all"
                    >
                      <p className="text-sm md:text-base text-gray-300 italic leading-relaxed">
                        "{answer}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 3: Warm Message */}
              <div className="space-y-4">
                <h3 className="text-base md:text-lg font-semibold text-white border-b border-primary/20 pb-2">
                  Вопрос: Тёплое послание
                </h3>
                <div className="space-y-3">
                  {mockFriendAnswers.warmMessage.map((answer, index) => (
                    <div 
                      key={index}
                      className="bg-[#0f0f1a]/60 border border-primary/10 rounded-xl p-4 hover:border-primary/30 transition-all"
                    >
                      <p className="text-sm md:text-base text-gray-300 italic leading-relaxed">
                        "{answer}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ArchetypeUnlocked;
