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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = tarotQuizQuestions[currentQuestionIndex];

  const handleSelectCard = (cardIndex: number) => {
    setSelectedCards(prev => {
      if (prev.includes(cardIndex)) {
        return prev.filter(i => i !== cardIndex);
      } else {
        return [...prev, cardIndex];
      }
    });
  };

  const handleNext = () => {
    const updatedAnswers = {
      ...answers,
      [currentQuestionIndex]: selectedCards
    };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < tarotQuizQuestions.length - 1) {
      // Start transition animation
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedCards([]);
        setIsTransitioning(false);
      }, 300);
    } else {
      console.log("Tarot quiz completed!", updatedAnswers);
      navigate("/2026_tarot_forecast_results");
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
      
      <main 
        className={`relative z-10 transition-all duration-300 ${
          isTransitioning 
            ? 'opacity-0 translate-x-8' 
            : 'opacity-100 translate-x-0'
        }`}
      >
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
