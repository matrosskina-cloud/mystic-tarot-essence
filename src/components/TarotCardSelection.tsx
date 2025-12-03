import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { TarotCard } from "@/components/TarotCard";
import { TarotQuizQuestion } from "@/data/tarotQuizQuestions";

interface TarotCardSelectionProps {
  question: TarotQuizQuestion;
  currentQuestionNumber: number;
  totalQuestions: number;
  selectedCards: number[];
  onSelectCard: (cardIndex: number) => void;
  onNext: () => void;
}

export const TarotCardSelection = ({
  question,
  currentQuestionNumber,
  totalQuestions,
  selectedCards,
  onSelectCard,
  onNext
}: TarotCardSelectionProps) => {
  const progress = (currentQuestionNumber / totalQuestions) * 100;
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  
  const canSelectMore = selectedCards.length < question.cardsToSelect;

  const handleCardClick = (index: number) => {
    const isCurrentlySelected = selectedCards.includes(index);
    
    if (isCurrentlySelected) {
      return; // Can't deselect once selected
    } else if (canSelectMore) {
      // Select: flip and add to selection
      setFlippedCards(prev => [...prev, index]);
      onSelectCard(index);
      
      // Auto-advance when selection is complete
      if (selectedCards.length + 1 === question.cardsToSelect) {
        setTimeout(() => {
          onNext();
        }, 800); // Small delay to show the flip animation
      }
    }
  };

  // Reset flipped cards when question changes
  useEffect(() => {
    setFlippedCards([]);
  }, [question.id]);

  return (
    <div className="relative min-h-screen flex flex-col px-4 sm:px-6 pt-6 sm:pt-8 pb-24 sm:pb-8">
      <div className="w-full max-w-2xl mx-auto flex flex-col space-y-4 sm:space-y-6 animate-fade-in">
        {/* Progress Section */}
        <div className="space-y-2 sm:space-y-3" style={{ marginTop: 'max(16px, env(safe-area-inset-top))' }}>
          <div className="flex justify-between items-center px-1">
            <span className="text-xs sm:text-sm text-white/60">
              Шаг {currentQuestionNumber} из {totalQuestions}
            </span>
            <span className="text-xs sm:text-sm text-amber-400/70 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-1 transition-all duration-500 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-yellow-500" />
        </div>

        {/* Question Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-[0_0_60px_rgba(251,191,36,0.08)]">
          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-center text-white mb-2">
            {question.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/70 text-center mb-4 leading-relaxed">
            {question.subtitle}
          </p>
          
          {/* Selection instruction */}
          <p className="text-xs sm:text-sm text-amber-400 text-center mb-6">
            Выбери {question.cardsToSelect} {question.cardsToSelect === 1 ? 'карту' : question.cardsToSelect < 5 ? 'карты' : 'карт'} из 5 
            {question.cardsToSelect > 1 && ' — по одной карте на каждый месяц'}
          </p>

          {/* Cards Grid - 2 rows: 3 + 2 */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 py-4">
            {/* First row - 3 cards */}
            <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-5">
              {[0, 1, 2].map((index) => (
                <TarotCard
                  key={index}
                  index={index}
                  isSelected={selectedCards.includes(index)}
                  isFlipped={flippedCards.includes(index)}
                  onClick={() => handleCardClick(index)}
                  disabled={!canSelectMore}
                />
              ))}
            </div>
            {/* Second row - 2 cards */}
            <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-5">
              {[3, 4].map((index) => (
                <TarotCard
                  key={index}
                  index={index}
                  isSelected={selectedCards.includes(index)}
                  isFlipped={flippedCards.includes(index)}
                  onClick={() => handleCardClick(index)}
                  disabled={!canSelectMore}
                />
              ))}
            </div>
          </div>
          
          {/* Selection status */}
          <p className="text-center text-white/50 text-sm mt-4">
            Выбрано: {selectedCards.length} / {question.cardsToSelect}
          </p>
        </div>
      </div>
    </div>
  );
};
