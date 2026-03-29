import { useState } from "react";
import { motion } from "framer-motion";
import { TarotCard, SpreadType } from "../types";
import {
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

interface LayoutStepProps {
  deck: TarotCard[];
  spread: SpreadType;
  onNext: (selectedCards: TarotCard[]) => void;
}

export const LayoutStep: React.FC<LayoutStepProps> = ({
  deck,
  spread,
  onNext,
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [rotationOffset, setRotationOffset] = useState(0); // New state for rotation
  const [placedCards, setPlacedCards] = useState<(number | null)[]>(
    new Array(spread.cardCount).fill(null),
  );

  const handleRotate = (direction: "left" | "right") => {
    const step = 30; // degrees to rotate per click
    setRotationOffset((prev) => prev + (direction === "left" ? step : -step));
  };

  const handlePickCard = (index: number) => {
    if (selectedIndices.includes(index)) return;
    if (selectedIndices.length >= spread.cardCount) return;

    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    // Find the first empty position in the spread
    const emptyPos = placedCards.findIndex((pos) => pos === null);
    if (emptyPos !== -1) {
      const newPlaced = [...placedCards];
      newPlaced[emptyPos] = index;
      setPlacedCards(newPlaced);
    }

    if (newSelected.length === spread.cardCount) {
      setTimeout(() => {
        const finalCards = newSelected.map((idx) => deck[idx]);
        onNext(finalCards);
      }, 1500);
    }
  };

  // Calculate position in the fan with infinite scroll logic
  const getFanStyle = (i: number, total: number) => {
    const angleRange = 160; // degrees
    const angleStep = angleRange / 15; // Fixed density regardless of deck size

    // Base angle with rotation offset
    let angle = i * angleStep - angleRange / 2 + rotationOffset;

    // Infinite wrap-around logic
    // We want the cards to stay within a reasonable view range
    const totalSpan = total * angleStep;
    const halfSpan = totalSpan / 2;

    // Normalize angle to be within [-halfSpan, halfSpan]
    angle =
      ((((angle + halfSpan) % totalSpan) + totalSpan) % totalSpan) - halfSpan;

    const radius = 350;
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const y = -Math.cos((angle * Math.PI) / 180) * radius + radius;

    // Calculate opacity based on distance from center to fade out side cards
    const opacity = Math.max(0, 1 - Math.abs(angle) / (angleRange * 0.7));

    return { x, y, rotate: angle, opacity };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-start h-full flex-1 min-h-[600px] py-4"
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-serif font-light tracking-wider text-slate-900">
          请抽取 {spread.cardCount} 张牌
        </h2>
        <p className="text-slate-400 text-xs font-light italic">
          凭直觉，在扇形展开的牌中选出对应的牌。
          <span className="ml-3 text-slate-900 font-medium font-mono not-italic">
            {selectedIndices.length} / {spread.cardCount}
          </span>
        </p>
      </div>

      {/* Spread Layout Display */}
      <div
        className={`mt-6 grid gap-x-6 gap-y-4 justify-items-center items-center max-w-5xl px-8 py-8 bg-white/90 backdrop-blur-md rounded-[2.5rem] border border-slate-200/60 shadow-[0_10px_40px_rgba(0,0,0,0.02)] relative overflow-hidden group ${
          spread.cardCount === 10
            ? "grid-cols-5"
            : spread.cardCount === 3
              ? "grid-cols-3"
              : "flex flex-wrap justify-center"
        }`}
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.8)_0%,rgba(255,255,255,0)_100%)] pointer-events-none" />

        {spread.positions.map((pos, i) => (
          <div
            key={i}
            className="relative z-10 flex flex-col items-center gap-3"
          >
            <div
              className={`w-24 h-36 rounded-xl border flex flex-col items-center justify-center transition-all duration-700 relative overflow-hidden ${
                placedCards[i] !== null
                  ? "bg-white border-slate-900 shadow-[0_15px_35px_rgba(0,0,0,0.08)] scale-105"
                  : "bg-slate-50/50 border-slate-300 border-dashed hover:border-slate-400"
              }`}
            >
              {placedCards[i] !== null ? (
                <>
                  <Star
                    size={24}
                    className="text-slate-900/10 fill-slate-900/5"
                  />
                  <span className="mt-3 text-[10px] font-serif italic text-slate-500 tracking-tighter italic">
                    Card {i + 1}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[11px] text-slate-400 font-serif italic mb-0.5 opacity-80 italic">
                    Pos
                  </span>
                  <span className="text-2xl text-slate-400 font-light tracking-tighter">
                    {i + 1}
                  </span>
                </>
              )}
            </div>
            <div className="space-y-1.5 text-center max-w-[100px]">
              <span
                className={`block text-[11px] font-serif tracking-[0.12em] uppercase transition-colors duration-500 leading-tight ${
                  placedCards[i] !== null
                    ? "text-slate-900 font-medium"
                    : "text-slate-600"
                }`}
              >
                {pos}
              </span>
              <div
                className={`h-[1px] w-4 mx-auto transition-all duration-500 ${
                  placedCards[i] !== null ? "bg-slate-900 w-8" : "bg-slate-300"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Fan-out Deck with Navigation Arrows */}
      <div className="relative w-full h-80 mt-4 flex justify-center items-end overflow-hidden group/deck">
        {/* Left Arrow */}
        <button
          onClick={() => handleRotate("left")}
          className="absolute left-10 bottom-24 z-50 w-12 h-12 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all shadow-sm hover:shadow-md group"
          aria-label="Rotate Left"
        >
          <ChevronLeft
            size={24}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => handleRotate("right")}
          className="absolute right-10 bottom-24 z-50 w-12 h-12 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all shadow-sm hover:shadow-md group"
          aria-label="Rotate Right"
        >
          <ChevronRight
            size={24}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>

        {deck.map((_, i) => {
          const { x, y, rotate, opacity } = getFanStyle(i, deck.length);
          const isSelected = selectedIndices.includes(i);

          return (
            <motion.div
              key={i}
              initial={{ y: 300, opacity: 0 }}
              animate={{
                x: isSelected ? 0 : x,
                y: isSelected ? -500 : y - 40,
                rotate: isSelected
                  ? 0
                  : [rotate - 0.5, rotate + 0.5, rotate - 0.5],
                opacity: isSelected ? 0 : opacity,
                scale: isSelected ? 0.5 : 1,
              }}
              transition={{
                rotate: {
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.05,
                },
                default: { type: "spring", damping: 25, stiffness: 120 }, // Slightly snappier for infinite scroll
              }}
              whileHover={
                !isSelected && opacity > 0.5 // Only hover active cards
                  ? {
                      y: y - 50,
                      scale: 1.1,
                      rotate: rotate,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }
                  : {}
              }
              onClick={() => opacity > 0.5 && handlePickCard(i)}
              className="absolute w-24 h-36 bg-white border-[1.5px] border-slate-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer preserve-3d origin-bottom hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-shadow duration-300"
              style={{
                zIndex: Math.round(100 - Math.abs(rotate)), // Dynamic z-index based on center proximity
                pointerEvents: opacity < 0.2 ? "none" : "auto", // Disable clicks on faded cards
              }}
            >
              {/* Enhanced edge with a subtle inner ring */}
              <div className="absolute inset-0 border border-slate-100/50 m-[1px] rounded-[10px]" />
              <div className="absolute inset-0 border border-slate-50 m-1.5 rounded-lg" />

              <div className="absolute inset-0 flex items-center justify-center">
                <Star size={24} className="text-slate-100/80 fill-white/10" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
