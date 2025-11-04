import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MysticBackground } from "@/components/MysticBackground";
import { QuizQuestionComponent } from "@/components/QuizQuestion";
import { quizQuestions } from "@/data/quizQuestions";

interface ArchetypeScores {
  [key: string]: number;
}

interface QuizResult {
  result: string;
  score: ArchetypeScores;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const calculateResults = (finalAnswers: Record<number, number>): QuizResult => {
    const archetypeScores: ArchetypeScores = {
      "empress": 0,
      "emperor": 0,
      "magician": 0,
      "priestess": 0,
      "fool": 0,
      "death": 0,
      "lovers": 0,
      "hermit": 0
    };

    // Count scores for each archetype
    Object.entries(finalAnswers).forEach(([questionIndex, optionIndex]) => {
      const question = quizQuestions[parseInt(questionIndex)];
      const selectedOption = question.options[optionIndex];
      const archetype = selectedOption.archetype;
      
      if (archetypeScores.hasOwnProperty(archetype)) {
        archetypeScores[archetype]++;
      }
    });

    // Find the archetype with the highest score
    let maxScore = 0;
    let resultArchetype = "empress";

    Object.entries(archetypeScores).forEach(([archetype, score]) => {
      if (score > maxScore) {
        maxScore = score;
        resultArchetype = archetype;
      }
    });

    return {
      result: resultArchetype,
      score: archetypeScores
    };
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    // Save answer
    const updatedAnswers = {
      ...answers,
      [currentQuestionIndex]: selectedOption
    };
    
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(answers[currentQuestionIndex + 1] ?? null);
    } else {
      // Test completed - calculate results
      const results = calculateResults(updatedAnswers);
      console.log("Test completed!", results);
      
      // Navigate to results page with results data
      navigate("/results", { state: results });
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
