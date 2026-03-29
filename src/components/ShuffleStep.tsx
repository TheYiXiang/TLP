import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, StopCircle, Star } from "lucide-react";
import { TarotCard, TAROT_DECK } from "../types";

interface ShuffleStepProps {
  onNext: (shuffledDeck: TarotCard[]) => void;
  useReversed: boolean;
}

interface CardState {
  id: number;
  x: number;
  y: number;
  rotate: number;
  vx: number; // Velocity X
  vy: number; // Velocity Y
}

export const ShuffleStep: React.FC<ShuffleStepProps> = ({
  onNext,
  useReversed,
}) => {
  const [shuffling, setShuffling] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);

  // High-performance physics state in Refs
  const cardsRef = useRef<CardState[]>(
    TAROT_DECK.map((card) => ({
      id: card.id,
      x: 0,
      y: 0,
      rotate: 0,
      vx: 0,
      vy: 0,
    })),
  );

  // DOM references for direct style updates
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    };
  };

  // Optimized Physics loop using direct DOM manipulation
  const updatePhysics = () => {
    const nextCards = cardsRef.current;
    const currentShuffling = shuffling;
    const currentIsFinished = isFinished;
    const currentIsMouseInside = isMouseInside;

    for (let i = 0; i < nextCards.length; i++) {
      let card = nextCards[i];
      let { x, y, vx, vy, rotate } = card;

      // 1. Mouse Interaction
      if (currentShuffling && currentIsMouseInside && !currentIsFinished) {
        const dx = x - mousePos.current.x;
        const dy = y - mousePos.current.y;
        const distSq = dx * dx + dy * dy;
        const interactionRadius = 250;

        if (distSq < interactionRadius * interactionRadius && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / interactionRadius) * 4;
          vx += (dx / dist) * force;
          vy += (dy / dist) * force;
          rotate += (Math.random() - 0.5) * 10;
        }
      }

      // 2. Separation Force (Spatial hashing would be better, but let's optimize the loop)
      // Only check a subset of nearby cards per frame to maintain 60fps
      if (currentShuffling) {
        for (let j = 0; j < nextCards.length; j += 3) {
          if (i === j) continue;
          const other = nextCards[j];
          const dx = x - other.x;
          const dy = y - other.y;
          const distSq = dx * dx + dy * dy;
          const minDist = 80;
          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq) || 1;
            const force = (minDist - dist) * 0.12;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }
        }
      }

      // 3. Center Gravity
      const distFromCenter = Math.sqrt(x * x + y * y) || 1;
      if (distFromCenter > (currentShuffling ? 50 : 0.1)) {
        const gravityStrength = currentShuffling ? 0.004 : 0.15;
        vx -=
          (x / distFromCenter) * gravityStrength * (distFromCenter / 100 + 0.5);
        vy -=
          (y / distFromCenter) * gravityStrength * (distFromCenter / 100 + 0.5);
      } else if (!currentShuffling) {
        vx = vy = x = y = rotate = 0;
      }

      // 4. Avoid Button
      if (currentShuffling) {
        const buttonAreaY = 220;
        const buttonAreaX = 200;
        if (y > buttonAreaY - 100 && Math.abs(x) < buttonAreaX) {
          vy -= 1.5;
          vx += x > 0 ? 1 : -1;
        }
      }

      // 5. Friction & Speed Limit
      const friction = 0.94;
      vx *= friction;
      vy *= friction;

      const maxSpeed = 25;
      const speedSq = vx * vx + vy * vy;
      if (speedSq > maxSpeed * maxSpeed) {
        const speed = Math.sqrt(speedSq);
        vx = (vx / speed) * maxSpeed;
        vy = (vy / speed) * maxSpeed;
      }

      x += vx;
      y += vy;

      // 6. Wrap around
      if (currentShuffling) {
        const marginX = 480;
        const marginY = 320;
        if (x > marginX) x = -marginX + 10;
        else if (x < -marginX) x = marginX - 10;
        if (y > marginY) y = -marginY + 10;
        else if (y < -marginY) y = marginY - 10;
      }

      // Save state
      card.x = x;
      card.y = y;
      card.vx = vx;
      card.vy = vy;
      card.rotate = rotate;

      // Direct DOM Update for max performance
      const el = cardElementsRef.current[i];
      if (el) {
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
        if (currentShuffling) {
          el.style.zIndex = `${Math.floor(Math.abs(rotate) % 100)}`;
        }
      }
    }
    requestRef.current = requestAnimationFrame(updatePhysics);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [shuffling, isMouseInside, isFinished]);

  const handleStartShuffle = () => {
    cardsRef.current.forEach((card) => {
      card.vx = (Math.random() - 0.5) * 60;
      card.vy = (Math.random() - 0.5) * 60;
      card.rotate = (Math.random() - 0.5) * 180;
    });
    setShuffling(true);
  };

  const handleStopShuffle = () => {
    setIsFinished(true);
    const finalDeck = [...TAROT_DECK]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        isReversed: useReversed ? Math.random() > 0.5 : false,
      }));
    setTimeout(() => onNext(finalDeck), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-between h-full flex-1 py-8 overflow-hidden select-none"
    >
      <div className="text-center space-y-2 z-20 pointer-events-none">
        <h2 className="text-3xl font-serif font-light tracking-wider text-slate-900">
          {isFinished ? "洗牌完成" : shuffling ? "洗牌中" : "准备洗牌"}
        </h2>
        <p className="text-slate-400 text-sm font-light italic h-5">
          {isFinished
            ? "感应指引，即将进入抽牌阶段..."
            : shuffling
              ? "在区域内拨弄纸牌，感受宇宙的律动..."
              : "深呼吸，点击下方按钮开始"}
        </p>
      </div>

      {/* Interaction Area */}
      <div
        ref={containerRef}
        className={`relative w-full flex-1 flex items-center justify-center transition-colors duration-500 ${
          shuffling && !isFinished ? "cursor-none" : "cursor-default"
        }`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMouseInside(true)}
        onMouseLeave={() => setIsMouseInside(false)}
      >
        {TAROT_DECK.map((card, idx) => (
          <div
            key={card.id}
            ref={(el) => (cardElementsRef.current[idx] = el)}
            className={`absolute w-24 h-36 bg-white border border-slate-200 rounded-xl flex items-center justify-center pointer-events-none will-change-transform transition-shadow duration-700 ${
              shuffling
                ? "shadow-sm"
                : idx >= TAROT_DECK.length - 3
                  ? "shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                  : "shadow-none"
            }`}
            style={{
              zIndex: idx,
              opacity: isFinished ? 0.6 : 1,
              transition: isFinished
                ? "opacity 0.8s ease-in-out, transform 0.8s ease-out"
                : "shadow 0.7s ease-in-out",
            }}
          >
            <Star size={16} className="text-slate-200 fill-slate-50" />
          </div>
        ))}

        {/* Custom Interactive Indicator */}
        {shuffling && isMouseInside && !isFinished && (
          <motion.div
            className="absolute z-50 w-32 h-32 bg-slate-900/[0.03] rounded-full blur-3xl pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate3d(${mousePos.current.x - 64}px, ${mousePos.current.y - 64}px, 0)`,
            }}
          />
        )}
      </div>

      <div className="z-20 pb-4">
        <AnimatePresence mode="wait">
          {isFinished ? (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="px-12 py-3.5 text-slate-400 text-xs tracking-[0.2em] font-medium"
            >
              正在同步...
            </motion.div>
          ) : !shuffling ? (
            <motion.button
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={handleStartShuffle}
              className="bg-slate-900 hover:bg-black text-white px-12 py-3.5 rounded-full flex items-center gap-3 transition-all shadow-xl tracking-[0.2em] uppercase text-xs font-medium group"
            >
              <Play
                size={14}
                className="group-hover:scale-110 transition-transform"
              />
              开始洗牌
            </motion.button>
          ) : (
            <motion.button
              key="stop"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={handleStopShuffle}
              className="bg-white/90 backdrop-blur-md border border-slate-200 text-slate-900 px-12 py-3.5 rounded-full flex items-center gap-3 transition-all shadow-lg tracking-[0.2em] uppercase text-xs font-medium hover:border-slate-900"
            >
              <StopCircle size={14} className="text-red-500 animate-pulse" />
              停止洗牌
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
