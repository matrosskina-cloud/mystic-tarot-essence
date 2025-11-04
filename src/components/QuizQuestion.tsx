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
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-8 bg-[#0a0a0f]">
      <div className="w-full max-w-2xl space-y-4 sm:space-y-6 max-h-[calc(100vh-80px)] flex flex-col justify-center">
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
          <Progress value={progress} className="h-1" />
        </div>

        {/* Question Card */}
        <div className="bg-[#1a1a2e]/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-normal text-foreground/90 mb-5 sm:mb-6 leading-relaxed">
            {question.question_text}
          </h2>

          {/* Options */}
          <div className="space-y-3 sm:space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onSelectOption(index)}
                className={`w-full p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 min-h-[44px] flex items-center border ${
                  selectedOption === index
                    ? "bg-[#1a1a2e]/60 border-primary/40 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
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

        {/* Navigation Buttons */}
        <div className="fixed sm:relative bottom-0 left-0 right-0 flex gap-3 sm:gap-4 pt-3 sm:pt-4 pb-3 sm:pb-0 px-4 sm:px-0 bg-[#0a0a0f]/95 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none border-t sm:border-t-0 border-white/5 sm:border-0" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          {showBack && (
            <Button
              variant="ghost"
              size="lg"
              onClick={onBack}
              className="flex-1 text-muted-foreground/60 hover:text-foreground hover:bg-[#1a1a2e]/40 h-11 sm:h-12 min-h-[44px] border border-white/10 hover:border-white/20"
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
              selectedOption === null ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]'
            }`}
          >
            {question.question_number === totalQuestions ? "Завершить" : "Далее →"}
          </Button>
        </div>
      </div>
    </div>
  );
};
