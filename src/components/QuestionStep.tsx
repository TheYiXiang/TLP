import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

interface CardProps {
  index: number;
  total: number;
  isHovered: boolean;
  isStarted: boolean;
}

const Card: React.FC<CardProps> = ({ index, total, isHovered, isStarted }) => {
  const orbitRadius = 450;
  const initialAngle = (index / total) * Math.PI * 2;
  const rotationDuration = 60; // Extra slow for mystic feel

  // Define fan-out style for pre-start state
  const getFanStyle = () => {
    if (isHovered) {
      const angleStep = 15;
      const mid = (total - 1) / 2;
      const angle = (index - mid) * angleStep;
      const x = (index - mid) * 30;
      return {
        x,
        y: -20,
        rotate: angle,
        scale: 1.1,
        opacity: 1,
      };
    }
    return { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 };
  };

  // Define orbit keyframes for started state
  const orbitAnimate = {
    x: [
      Math.cos(initialAngle) * orbitRadius,
      Math.cos(initialAngle + Math.PI * 0.5) * orbitRadius,
      Math.cos(initialAngle + Math.PI) * orbitRadius,
      Math.cos(initialAngle + Math.PI * 1.5) * orbitRadius,
      Math.cos(initialAngle + Math.PI * 2) * orbitRadius,
    ],
    y: [
      Math.sin(initialAngle) * orbitRadius,
      Math.sin(initialAngle + Math.PI * 0.5) * orbitRadius,
      Math.sin(initialAngle + Math.PI) * orbitRadius,
      Math.sin(initialAngle + Math.PI * 1.5) * orbitRadius,
      Math.sin(initialAngle + Math.PI * 2) * orbitRadius,
    ],
    rotate: [index * 60, index * 60 + 360],
    scale: 0.8,
    opacity: 0.4,
  };

  return (
    <motion.div
      animate={isStarted ? orbitAnimate : getFanStyle()}
      transition={
        isStarted
          ? {
              duration: rotationDuration,
              repeat: Infinity,
              ease: "linear",
              // When transitioning to orbit, use a spring for a nice kick-off
              x: {
                duration: isStarted ? 2 : rotationDuration,
                type: isStarted ? "spring" : "tween",
              },
              y: {
                duration: isStarted ? 2 : rotationDuration,
                type: isStarted ? "spring" : "tween",
              },
            }
          : { type: "spring", stiffness: 100, damping: 20 }
      }
      className="absolute w-40 h-60 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center pointer-events-none"
      style={{
        zIndex: 50 - index,
      }}
    >
      <Star size={32} className="text-slate-900 fill-slate-900/5" />
    </motion.div>
  );
};

interface QuestionStepProps {
  onNext: (question: string) => void;
  onStart: () => void;
  isStarted: boolean;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({
  onNext,
  onStart,
  isStarted,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    if (!isStarted) {
      onStart();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.length < 2) {
      setError("请输入您想问的问题");
      return;
    }
    onNext(question);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[600px] w-full overflow-hidden">
      {/* Cards Layer */}
      <div
        className="relative w-48 h-72 flex items-center justify-center cursor-pointer z-0"
        onMouseEnter={() => !isStarted && setIsHovered(true)}
        onMouseLeave={() => !isStarted && setIsHovered(false)}
        onClick={handleStart}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            index={i}
            total={6}
            isHovered={isHovered}
            isStarted={isStarted}
          />
        ))}
      </div>

      {/* Question UI Layer */}
      <AnimatePresence>
        {isStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute z-20 flex flex-col items-center justify-center space-y-12 max-w-md w-full px-4"
          >
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-serif font-light tracking-[0.2em] text-slate-900">
                你想问
              </h2>
              <p className="text-5xl font-light text-slate-300">?</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center space-y-10"
            >
              <div className="w-full relative">
                <input
                  autoFocus
                  type="text"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    setError("");
                  }}
                  className="w-full bg-transparent border-b border-slate-200 py-4 px-4 text-slate-900 text-center text-3xl font-light focus:outline-none focus:border-slate-900 transition-all placeholder:text-slate-100"
                  placeholder=""
                />
                <div className="mt-4 text-center space-y-1.5">
                  <p className="text-[10px] text-slate-400 font-light tracking-wider leading-relaxed">
                    建议聚焦具体问题（如：“本周感情运势？”“这份工作适合我吗？”）
                  </p>
                  <p className="text-[10px] text-slate-300 font-light italic tracking-wider">
                    避免模糊提问（如：“我的未来怎样？”）
                  </p>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-8 left-0 right-0 text-center text-sm text-red-400 font-light"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                className="bg-slate-900 text-white px-10 py-2.5 text-xs tracking-[0.2em] uppercase rounded-full shadow-lg hover:bg-black transition-all active:scale-95"
              >
                确定
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
