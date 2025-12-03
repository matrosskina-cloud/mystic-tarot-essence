import { cn } from "@/lib/utils";
import cardBack from "@/assets/tarot-card-back.png";

interface TarotCardProps {
  index: number;
  isSelected: boolean;
  isFlipped: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const TarotCard = ({ index, isSelected, isFlipped, onClick, disabled }: TarotCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled && !isSelected}
      className={cn(
        "relative w-16 sm:w-20 md:w-24 aspect-[2/3] perspective-1000 transition-all duration-300",
        isSelected && "scale-110 z-10",
        disabled && !isSelected && "opacity-50 cursor-not-allowed"
      )}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-700 transform-style-3d",
          isFlipped && "rotate-y-180"
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Card Back */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={cardBack}
            alt={`Карта ${index + 1}`}
            className={cn(
              "w-full h-full object-cover rounded-lg border-2 transition-all duration-300",
              isSelected
                ? "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                : "border-amber-600/30 hover:border-amber-400/60 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]"
            )}
          />
        </div>
        
        {/* Card Front (placeholder for now) */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <span className="text-amber-800 font-bold text-lg">✨</span>
        </div>
      </div>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
      )}
    </button>
  );
};
