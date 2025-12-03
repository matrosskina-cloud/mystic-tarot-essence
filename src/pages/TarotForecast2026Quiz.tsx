import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TarotCardSelection } from "@/components/TarotCardSelection";
import { tarotQuizQuestions } from "@/data/tarotQuizQuestions";
import tarotBg from "@/assets/tarot-2026-bg.png";

const TarotForecast2026Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const currentQuestion = tarotQuizQuestions[currentQuestionIndex];

  const handleSelectCard = (cardIndex: number) => {
    setSelectedCards(prev => {
      if (prev.includes(cardIndex)) {
        // Deselect
        return prev.filter(i => i !== cardIndex);
      } else {
        // Select
        return [...prev, cardIndex];
      }
    });
  };

  const handleNext = () => {
    // Save current selection
    const updatedAnswers = {
      ...answers,
      [currentQuestionIndex]: selectedCards
    };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < tarotQuizQuestions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedCards([]);
    } else {
      // Quiz completed
      console.log("Tarot quiz completed!", updatedAnswers);
      navigate("/2026_tarot_forecast_unlocked");
    }
  };

  return (
    <div 
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${tarotBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      <main className="relative z-10">
        <TarotCardSelection
          question={currentQuestion}
          currentQuestionNumber={currentQuestionIndex + 1}
          totalQuestions={tarotQuizQuestions.length}
          selectedCards={selectedCards}
          onSelectCard={handleSelectCard}
          onNext={handleNext}
        />
      </main>
    </div>
  );
};

export default TarotForecast2026Quiz;
