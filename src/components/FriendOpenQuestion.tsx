import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";

interface FriendOpenQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  title: string;
  subtitle: string;
  username: string;
  value: string;
  onValueChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  showBack: boolean;
}

export const FriendOpenQuestion = ({
  questionNumber,
  totalQuestions,
  title,
  subtitle,
  value,
  onValueChange,
  onNext,
  onBack,
  showBack
}: FriendOpenQuestionProps) => {
  const progress = (questionNumber / totalQuestions) * 100;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFocus = () => {
      // Small delay to ensure keyboard is visible
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    };

    const handleBlur = () => {
      // Scroll back to top when keyboard dismisses
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('focus', handleFocus);
      textarea.addEventListener('blur', handleBlur);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener('focus', handleFocus);
        textarea.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-8"
      style={{ minHeight: '100dvh' }}>
      <div className="w-full max-w-2xl mx-auto flex flex-col space-y-4 sm:space-y-6 animate-fade-in">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-2 sm:mb-4" style={{ marginTop: 'max(16px, env(safe-area-inset-top))' }}>
          Опрос о друге
        </h1>
        
        {/* Progress Section */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs sm:text-sm text-muted-foreground/60">
              Вопрос {questionNumber} из {totalQuestions}
            </span>
            <span className="text-xs sm:text-sm text-primary/70 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>

        {/* Question Card */}
        <div className="bg-[#1a1a2e]/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-[0_0_60px_rgba(139,92,246,0.08)]">
          <h2 className="text-lg sm:text-xl font-normal text-foreground/90 mb-2 leading-relaxed">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
            {subtitle}
          </p>

          {/* Text Area */}
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="Напишите ваш ответ..."
            className="min-h-[120px] sm:min-h-[150px] bg-[#1a1a2e]/30 border-white/10 focus:border-primary/40 text-foreground/90 placeholder:text-muted-foreground/40 resize-none"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="fixed sm:relative bottom-0 left-0 right-0 flex gap-3 sm:gap-4 pt-4 sm:pt-6 pb-4 sm:pb-0 px-4 sm:px-0 bg-[#0a0a0f]/98 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-t sm:border-t-0 border-white/5 sm:border-0 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] sm:shadow-none z-50" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          {showBack && (
            <Button
              variant="ghost"
              size="lg"
              onClick={onBack}
              className="flex-1 text-muted-foreground/60 hover:text-foreground hover:bg-[#1a1a2e]/40 h-11 sm:h-12 min-h-[44px] border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              Назад
            </Button>
          )}
          <Button
            variant="mystic"
            size="lg"
            onClick={onNext}
            disabled={value.trim().length === 0}
            className={`${showBack ? 'flex-1' : 'w-full'} transition-all duration-300 h-11 sm:h-12 min-h-[44px] ${
              value.trim().length === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105'
            }`}
          >
            Далее →
          </Button>
        </div>
      </div>
    </div>
  );
};
