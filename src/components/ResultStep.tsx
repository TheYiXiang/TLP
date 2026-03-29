import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download, RefreshCw, Sparkles, Star } from "lucide-react";
import { toPng } from "html-to-image";
import { TarotCard, SpreadType } from "../types";

interface ResultStepProps {
  question: string;
  spread: SpreadType;
  cards: TarotCard[];
  onReset: () => void;
}

export const ResultStep: React.FC<ResultStepProps> = ({
  question,
  spread,
  cards,
  onReset,
}) => {
  const [revealed, setRevealed] = useState<boolean[]>(
    new Array(cards.length).fill(false),
  );
  const resultRef = useRef<HTMLDivElement>(null);

  const handleReveal = (index: number) => {
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
  };

  const exportAsImage = async () => {
    if (resultRef.current === null) return;

    try {
      // Small delay to ensure all DOM nodes and images are ready
      await new Promise((resolve) => setTimeout(resolve, 500));

      const dataUrl = await toPng(resultRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2, // Higher quality
        skipFonts: false,
      });

      const link = document.createElement("a");
      link.download = `tarot-reading-${new Date().getTime()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("oops, something went wrong!", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-start h-full flex-1 w-full pt-4 pb-0"
    >
      <div
        ref={resultRef}
        className="w-full bg-white border border-slate-200/60 rounded-[3.5rem] p-12 flex flex-col items-center gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.02)] overflow-hidden relative mb-2"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <Sparkles
            className="absolute top-12 left-12 text-slate-900"
            size={120}
          />
          <Sparkles
            className="absolute bottom-12 right-12 text-slate-900"
            size={140}
          />
        </div>

        <div className="text-center space-y-2 z-10 max-w-3xl">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-slate-200" />
            <span className="text-[10px] font-serif uppercase tracking-[0.4em] text-slate-400 font-medium">
              {spread.name}
            </span>
            <div className="h-px w-8 bg-slate-200" />
          </div>
          <h1 className="text-3xl font-serif text-slate-900 italic leading-snug px-10 drop-shadow-sm">
            “ {question} ”
          </h1>
        </div>

        <div
          className={`grid w-full place-items-center gap-x-8 gap-y-16 ${
            spread.cardCount === 10
              ? "grid-cols-2 md:grid-cols-5 max-w-6xl"
              : cards.length === 1
                ? "grid-cols-1 max-w-md"
                : cards.length > 3
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl"
                  : "grid-cols-1 md:grid-cols-3 max-w-5xl"
          }`}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-6 w-full group"
            >
              <div className="text-[11px] text-slate-400 uppercase tracking-[0.3em] text-center h-4 font-serif font-medium transition-colors group-hover:text-slate-900">
                {spread.positions[i]}
              </div>

              <div
                onClick={() => !revealed[i] && handleReveal(i)}
                className={`relative w-40 h-64 rounded-2xl cursor-pointer perspective-1000 transition-all duration-1000 preserve-3d ${
                  revealed[i]
                    ? "rotate-y-180 shadow-[0_10px_30px_rgba(0,0,0,0.06)] scale-105"
                    : "hover:scale-105 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
                }`}
              >
                {/* Back side */}
                <div className="absolute inset-0 backface-hidden bg-white border border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-slate-900">
                  <div className="absolute inset-0 border-2 border-slate-50 m-2 rounded-xl" />
                  <Star
                    size={40}
                    className="text-slate-200 fill-slate-50 transition-all duration-500 group-hover:text-slate-900/10 group-hover:fill-slate-900/5"
                  />
                </div>

                {/* Front side */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col ${
                    card.isReversed ? "rotate-180" : ""
                  }`}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover grayscale-[0.2] opacity-40 transition-all duration-700 group-hover:opacity-70 group-hover:grayscale-0"
                  />

                  {/* Meaning Text Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center bg-white/10 backdrop-blur-[2px]">
                    <div className="w-8 h-px bg-slate-300/60 mb-6" />
                    <p className="text-[13px] font-serif leading-[1.8] text-slate-900 tracking-wider font-medium px-1 line-clamp-6 drop-shadow-sm">
                      {card.isReversed ? card.reversedMeaning : card.meaning}
                    </p>
                    <div className="w-8 h-px bg-slate-300/60 mt-6" />
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-100">
                    <p className="text-[11px] font-serif font-medium text-center text-slate-900 tracking-widest uppercase">
                      {card.name} <span className="opacity-30 mx-1">|</span>{" "}
                      {card.isReversed ? "逆位" : "正位"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 mt-1 pb-0">
        <button
          onClick={exportAsImage}
          className="bg-slate-900 hover:bg-black text-white px-12 py-3.5 rounded-full transition-all flex items-center gap-3 text-xs tracking-[0.2em] uppercase shadow-xl active:scale-95 group"
        >
          <Download
            size={14}
            className="group-hover:translate-y-0.5 transition-transform"
          />
          保存结果
        </button>
        <button
          onClick={onReset}
          className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-medium"
        >
          <RefreshCw size={12} />
          重新占卜
        </button>
      </div>
    </motion.div>
  );
};
