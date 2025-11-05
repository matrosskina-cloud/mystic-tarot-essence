import { MysticBackground } from "@/components/MysticBackground";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FriendQuizIntro = () => {
  const navigate = useNavigate();
  
  // Mock data - в реальности это будет приходить из Telegram или URL параметров
  const friendUsername = "Анна";
  const friendAvatar = ""; // пустая строка = будет использоваться fallback

  const benefits = [
    {
      icon: "🌟",
      text: "увидеть свою суперсилу глазами других"
    },
    {
      icon: "💬",
      text: "получить честную, но бережную обратную связь"
    },
    {
      icon: "🔮",
      text: "раскрыть архетип в системе Таро"
    },
    {
      icon: "🤍",
      text: "получить тёплое послание от тебя"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      <MysticBackground />
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          
          {/* Avatar Section */}
          <div className="flex justify-center animate-fade-in-up">
            <Avatar className="w-20 h-20 border-2 border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <AvatarImage src={friendAvatar} alt={friendUsername} />
              <AvatarFallback className="bg-primary/10 text-primary">
                <User className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Title */}
          <div className="text-center space-y-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Помоги @{friendUsername} узнать себя глубже
            </h1>
          </div>

          {/* Subtitle */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Пройди короткий опрос. Твои ответы станут важной частью самопознания — помогут @{friendUsername} лучше понять себя, увидеть сильные стороны и открыть неожиданные инсайты.
            </p>
          </div>

          {/* Benefits Card */}
          <div 
            className="bg-[#1a1a2e]/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🪷</span>
              <h2 className="text-xl font-semibold text-foreground">
                Это поможет @{friendUsername}…
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 transition-all duration-300 hover:bg-white/10 hover:border-primary/20"
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{benefit.icon}</span>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <Button 
              variant="mystic" 
              size="xl" 
              className="w-full font-semibold transition-all hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]"
              onClick={() => navigate('/friend-quiz')}
            >
              ✨ Принять участие
            </Button>
            
            <p className="text-center text-sm text-muted-foreground/70">
              Тест займёт пару минут, но может многое прояснить ✨
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FriendQuizIntro;
