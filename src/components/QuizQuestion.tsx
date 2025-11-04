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
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-sm text-muted-foreground/80">
              Вопрос {question.question_number} из {totalQuestions}
            </span>
            <span className="text-sm text-primary/80 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>

        {/* Question Card */}
        <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-3xl p-10">
          <h2 className="text-2xl font-normal text-foreground mb-10 leading-relaxed">
            {question.question_text}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onSelectOption(index)}
                className={`w-full p-5 rounded-2xl text-left transition-all duration-200 border ${
                  selectedOption === index
                    ? "bg-card/40 border-primary/60 shadow-[0_0_0_1px_hsl(var(--primary)/0.3)]"
                    : "bg-card/20 border-border/20 hover:border-primary/30 hover:bg-card/30"
                }`}
              >
                <span className="text-base text-foreground/90 font-normal leading-relaxed">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-4">
          {showBack && (
            <Button
              variant="ghost"
              size="lg"
              onClick={onBack}
              className="flex-1 text-muted-foreground/70 hover:text-foreground hover:bg-card/20"
            >
              Назад
            </Button>
          )}
          <Button
            variant="mystic"
            size="lg"
            onClick={onNext}
            disabled={selectedOption === null}
            className={`${showBack ? 'flex-1' : 'w-full'} transition-opacity duration-200 ${
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
