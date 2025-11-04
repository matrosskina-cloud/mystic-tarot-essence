import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuizQuestion } from "@/data/quizQuestions";

interface QuizQuestionProps {
  question: QuizQuestion;
  totalQuestions: number;
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
  showBack: boolean;
}

export const QuizQuestionComponent = ({
  question,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNext,
  onBack,
  showBack
}: QuizQuestionProps) => {
  const progress = (question.question_number / totalQuestions) * 100;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-8">
      <div className="w-full max-w-lg space-y-3 sm:space-y-8 max-h-[calc(100vh-80px)] flex flex-col justify-center">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs sm:text-sm text-muted-foreground/80">
              Вопрос {question.question_number} из {totalQuestions}
            </span>
            <span className="text-xs sm:text-sm text-primary/80 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>

        {/* Question Card */}
        <div className="bg-card/25 backdrop-blur-sm border border-border/5 rounded-3xl p-5 sm:p-10 shadow-[0_0_40px_hsl(var(--primary)/0.15),0_0_80px_hsl(var(--primary)/0.08),inset_0_0_60px_hsl(var(--primary)/0.05)]">
          <h2 className="text-lg sm:text-2xl font-normal text-foreground mb-4 sm:mb-10 leading-snug sm:leading-relaxed">
            {question.question_text}
          </h2>

          {/* Options */}
          <div className="space-y-2 sm:space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onSelectOption(index)}
                className={`w-full p-3 sm:p-5 rounded-2xl text-left transition-all duration-200 min-h-[44px] flex items-center ${
                  selectedOption === index
                    ? "bg-card/30 border-2 border-white/80 shadow-[0_0_25px_hsl(var(--primary)/0.3),0_0_40px_hsl(var(--primary)/0.15),inset_0_0_30px_hsl(var(--primary)/0.08)]"
                    : "bg-card/20 border-2 border-transparent hover:border-white/60 hover:bg-card/25 shadow-[0_0_20px_hsl(var(--primary)/0.12),inset_0_0_25px_hsl(var(--primary)/0.06)]"
                }`}
              >
                <span className="text-sm sm:text-base text-foreground/90 font-normal leading-snug sm:leading-relaxed">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="fixed sm:relative bottom-0 left-0 right-0 flex gap-2 sm:gap-4 pt-2 sm:pt-4 pb-2 sm:pb-0 px-4 sm:px-0 bg-background/95 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none border-t sm:border-t-0 border-border/10 sm:border-0" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
          {showBack && (
            <Button
              variant="ghost"
              size="lg"
              onClick={onBack}
              className="flex-1 text-muted-foreground/70 hover:text-foreground hover:bg-card/20 h-11 sm:h-12 min-h-[44px]"
            >
              Назад
            </Button>
          )}
          <Button
            variant="mystic"
            size="lg"
            onClick={onNext}
            disabled={selectedOption === null}
            className={`${showBack ? 'flex-1' : 'w-full'} transition-opacity duration-200 h-11 sm:h-12 min-h-[44px] ${
              selectedOption === null ? 'opacity-40' : 'opacity-100'
            }`}
          >
            {question.question_number === totalQuestions ? "Завершить" : "Далее →"}
          </Button>
        </div>
      </div>
    </div>
  );
};
