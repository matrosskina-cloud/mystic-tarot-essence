import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuizQuestion } from "@/data/quizQuestions";
import { useState } from "react";

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
  const [showCardAnimation, setShowCardAnimation] = useState(false);
  
  const handleNext = () => {
    setShowCardAnimation(true);
    setTimeout(() => {
      onNext();
      setShowCardAnimation(false);
    }, 600);
  };

  const progress = (question.question_number / totalQuestions) * 100;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-8">
      {/* Card Animation Overlay */}
      {showCardAnimation && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 pointer-events-none">
          <div className="animate-card-drop">
            <div className="w-20 h-28 bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg border border-primary/50 shadow-[0_0_30px_hsl(var(--primary)/0.6)]" />
          </div>
        </div>
      )}

      <div className="w-full max-w-md space-y-6 animate-fade-in-up">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Вопрос {question.question_number} из {totalQuestions}
            </span>
            <span className="text-sm text-primary font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-[24px] p-8 shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center leading-tight">
            {question.question_text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onSelectOption(index)}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-300 border-2 ${
                  selectedOption === index
                    ? "bg-card/60 border-primary shadow-[0_0_20px_hsl(var(--primary)/0.5),0_4px_12px_hsl(var(--primary)/0.3)] scale-[1.02]"
                    : "bg-card/20 border-transparent hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.25)]"
                }`}
              >
                <span className="text-base text-foreground font-medium">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4">
          {showBack && (
            <Button
              variant="outline"
              size="lg"
              onClick={onBack}
              className="flex-1 border-border/50 hover:border-primary/50"
            >
              Назад
            </Button>
          )}
          <Button
            variant="mystic"
            size="lg"
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`${showBack ? 'flex-1' : 'w-full'}`}
          >
            {question.question_number === totalQuestions ? "Завершить" : "Далее"}
          </Button>
        </div>
      </div>
    </div>
  );
};
