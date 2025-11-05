import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MysticBackground } from "@/components/MysticBackground";
import { FriendOpenQuestion } from "@/components/FriendOpenQuestion";
import { QuizQuestionComponent } from "@/components/QuizQuestion";
import { quizQuestions } from "@/data/quizQuestions";

interface OpenQuestion {
  id: string;
  title: string;
  subtitle: string;
}

const openQuestions: OpenQuestion[] = [
  {
    id: "superpower",
    title: "🧿 В чём суперсила @Анна?",
    subtitle: "Напиши, что в ней особенно сильного. Что вдохновляет или вызывает уважение?"
  },
  {
    id: "growth",
    title: "🪞 Над чем, по-твоему, стоит поработать @Анна?",
    subtitle: "Если бы ты мог(-ла) подсказать что-то важное — что бы это было?"
  },
  {
    id: "message",
    title: "💌 Тёплое послание для @Анна",
    subtitle: "Передай что-то доброе и искреннее. Не обязательно серьёзно — главное, от души."
  }
];

interface ArchetypeScores {
  [key: string]: number;
}

interface QuizResult {
  result: string;
  score: ArchetypeScores;
  openAnswers: Record<string, string>;
}

const FriendQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [openAnswers, setOpenAnswers] = useState<Record<string, string>>({});
  const [closedAnswers, setClosedAnswers] = useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const username = "Анна"; // В реальности из Telegram или URL параметров
  const totalQuestions = openQuestions.length + quizQuestions.length;
  const isOpenQuestion = currentQuestionIndex < openQuestions.length;

  const calculateResults = (finalClosedAnswers: Record<number, number>): QuizResult => {
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

    Object.entries(finalClosedAnswers).forEach(([questionIndex, optionIndex]) => {
      const question = quizQuestions[parseInt(questionIndex)];
      const selectedOption = question.options[optionIndex];
      const archetype = selectedOption.archetype;
      
      if (archetypeScores.hasOwnProperty(archetype)) {
        archetypeScores[archetype]++;
      }
    });

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
      score: archetypeScores,
      openAnswers
    };
  };

  const handleOpenAnswerChange = (value: string) => {
    const currentQuestion = openQuestions[currentQuestionIndex];
    setOpenAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (isOpenQuestion) {
      // Validate open question answer
      const currentQuestion = openQuestions[currentQuestionIndex];
      const answer = openAnswers[currentQuestion.id] || "";
      if (answer.trim().length === 0) return;
      
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      
      // Pre-fill next question if it exists in answers
      if (currentQuestionIndex + 1 < openQuestions.length) {
        // Next is still an open question - no action needed
      } else if (currentQuestionIndex + 1 === openQuestions.length) {
        // Next is first closed question
        setSelectedOption(closedAnswers[0] ?? null);
      }
    } else {
      // Closed question logic
      if (selectedOption === null) return;

      const closedQuestionIndex = currentQuestionIndex - openQuestions.length;
      const updatedClosedAnswers = {
        ...closedAnswers,
        [closedQuestionIndex]: selectedOption
      };
      
      setClosedAnswers(updatedClosedAnswers);

      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        const nextClosedIndex = closedQuestionIndex + 1;
        setSelectedOption(closedAnswers[nextClosedIndex] ?? null);
      } else {
        // Quiz completed
        const results = calculateResults(updatedClosedAnswers);
        console.log("Friend quiz completed!", results);
        navigate("/results", { state: results });
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      
      if (currentQuestionIndex - 1 < openQuestions.length) {
        // Going back to an open question - no selectedOption needed
      } else {
        // Going back to a closed question
        const closedIndex = currentQuestionIndex - 1 - openQuestions.length;
        setSelectedOption(closedAnswers[closedIndex] ?? null);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <MysticBackground />
      
      <main className="relative z-10">
        {isOpenQuestion ? (
          <FriendOpenQuestion
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            title={openQuestions[currentQuestionIndex].title}
            subtitle={openQuestions[currentQuestionIndex].subtitle}
            username={username}
            value={openAnswers[openQuestions[currentQuestionIndex].id] || ""}
            onValueChange={handleOpenAnswerChange}
            onNext={handleNext}
            onBack={handleBack}
            showBack={currentQuestionIndex > 0}
          />
        ) : (
          <QuizQuestionComponent
            question={quizQuestions[currentQuestionIndex - openQuestions.length]}
            totalQuestions={totalQuestions}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onBack={handleBack}
            showBack={currentQuestionIndex > 0}
          />
        )}
      </main>
    </div>
  );
};

export default FriendQuiz;
