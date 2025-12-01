import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MysticBackground } from "@/components/MysticBackground";
import { FriendOpenQuestion } from "@/components/FriendOpenQuestion";
import { FriendQuizQuestion } from "@/components/FriendQuizQuestion";
import FriendQuizThankYou from "./FriendQuizThankYou";
import { quizQuestions } from "@/data/quizQuestions";

interface ArchetypeScores {
  [key: string]: number;
}

interface QuizResult {
  result: string;
  score: ArchetypeScores;
  openAnswer: string;
}

const FriendQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [openAnswer, setOpenAnswer] = useState("");
  const [closedAnswers, setClosedAnswers] = useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const username = "Анна"; // В реальности из Telegram или URL параметров
  // Total = quiz questions + 1 open question at the end
  const totalQuestions = quizQuestions.length + 1;
  const isOpenQuestion = currentQuestionIndex === quizQuestions.length;

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
      openAnswer
    };
  };

  const handleOpenAnswerChange = (value: string) => {
    setOpenAnswer(value);
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (isOpenQuestion) {
      // Open question (last question) - validate and complete quiz
      if (openAnswer.trim().length === 0) return;
      
      const results = calculateResults(closedAnswers);
      console.log("Friend quiz completed!", results);
      setQuizCompleted(true);
    } else {
      // Closed question logic
      if (selectedOption === null) return;

      const updatedClosedAnswers = {
        ...closedAnswers,
        [currentQuestionIndex]: selectedOption
      };
      
      setClosedAnswers(updatedClosedAnswers);
      setCurrentQuestionIndex(prev => prev + 1);
      
      // If next is still a closed question, pre-fill selection
      if (currentQuestionIndex + 1 < quizQuestions.length) {
        setSelectedOption(closedAnswers[currentQuestionIndex + 1] ?? null);
      } else {
        // Next is the open question
        setSelectedOption(null);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      
      // Going back to a closed question
      setSelectedOption(closedAnswers[currentQuestionIndex - 1] ?? null);
    }
  };

  if (quizCompleted) {
    return <FriendQuizThankYou username={username} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <MysticBackground />
      
      <main className="relative z-10">
        {isOpenQuestion ? (
          <FriendOpenQuestion
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            title={`Вспомни первое впечатление о @${username}`}
            subtitle="Что запомнилось? Что почувствовалось в этом человеке сразу? Поделись откровенно — даже пара слов могут многое рассказать 💌"
            username={username}
            value={openAnswer}
            onValueChange={handleOpenAnswerChange}
            onNext={handleNext}
            onBack={handleBack}
            showBack={currentQuestionIndex > 0}
          />
        ) : (
          <FriendQuizQuestion
            question={quizQuestions[currentQuestionIndex]}
            currentQuestionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onBack={handleBack}
            showBack={currentQuestionIndex > 0}
            username={username}
          />
        )}
      </main>
    </div>
  );
};

export default FriendQuiz;