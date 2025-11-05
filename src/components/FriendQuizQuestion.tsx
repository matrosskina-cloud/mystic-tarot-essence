import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuizQuestion } from "@/data/quizQuestions";

interface FriendQuizQuestionProps {
  question: QuizQuestion;
  totalQuestions: number;
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
  showBack: boolean;
  username: string;
  quote: string;
}

export const FriendQuizQuestion = ({
  question,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNext,
  onBack,
  showBack,
  username,
  quote
}: FriendQuizQuestionProps) => {
  const progress = (question.question_number / totalQuestions) * 100;

  return (
    <div className="relative min-h-screen flex flex-col px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-8">
      <div className="w-full max-w-2xl mx-auto flex flex-col space-y-4 sm:space-y-6 animate-fade-in">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-2 sm:mb-4" style={{ marginTop: 'max(16px, env(safe-area-inset-top))' }}>
          Помоги @{username} узнать себя глубже
        </h1>
        
        {/* Progress Section */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs sm:text-sm text-muted-foreground/60">
              Вопрос {question.question_number} из {totalQuestions}
            </span>
            <span className="text-xs sm:text-sm text-primary/70 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-1 transition-all duration-500" />
        </div>

        {/* Question Card */}
        <div className="bg-[#1a1a2e]/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-[0_0_60px_rgba(139,92,246,0.08)]">
          <h2 className="text-lg sm:text-xl font-normal text-foreground/90 mb-4 sm:mb-5 leading-relaxed">
            {question.question_text}
          </h2>

          {/* Options */}
          <div className="space-y-2.5 sm:space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onSelectOption(index)}
                className={`w-full p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 min-h-[44px] flex items-center border hover-scale ${
                  selectedOption === index
                    ? "bg-[#1a1a2e]/60 border-primary/40 shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-[1.02]"
                    : "bg-[#1a1a2e]/30 border-white/10 hover:border-primary/30 hover:bg-[#1a1a2e]/50"
                }`}
              >
                <span className="text-sm sm:text-base text-foreground/90 font-normal leading-relaxed">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Inspiring Quote */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
          <p className="text-sm sm:text-base text-foreground/80 italic leading-relaxed text-center">
            {quote.replace('@username', `@${username}`)}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="fixed sm:relative bottom-0 left-0 right-0 flex gap-3 sm:gap-4 pt-4 sm:pt-6 pb-4 sm:pb-0 px-4 sm:px-0 bg-[#0a0a0f]/98 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-t sm:border-t-0 border-white/5 sm:border-0 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] sm:shadow-none" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
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
            disabled={selectedOption === null}
            className={`${showBack ? 'flex-1' : 'w-full'} transition-all duration-300 h-11 sm:h-12 min-h-[44px] ${
              selectedOption === null ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105'
            }`}
          >
            {question.question_number === totalQuestions ? "Завершить" : "Далее →"}
          </Button>
        </div>
      </div>
    </div>
  );
};