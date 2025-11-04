import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MysticBackground } from "@/components/MysticBackground";
import { QuizQuestionComponent } from "@/components/QuizQuestion";
import { quizQuestions } from "@/data/quizQuestions";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    // Save answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: selectedOption
    }));

    if (currentQuestionIndex < quizQuestions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(answers[currentQuestionIndex + 1] ?? null);
    } else {
      // Test completed - navigate to results
      // TODO: Create results page
      console.log("Test completed!", answers);
      navigate("/");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOption(answers[currentQuestionIndex - 1] ?? null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <MysticBackground />
      
      <main className="relative z-10">
        <QuizQuestionComponent
          question={currentQuestion}
          totalQuestions={quizQuestions.length}
          selectedOption={selectedOption}
          onSelectOption={handleSelectOption}
          onNext={handleNext}
          onBack={handleBack}
          showBack={currentQuestionIndex > 0}
        />
      </main>
    </div>
  );
};

export default Quiz;
