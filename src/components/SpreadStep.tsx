import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, Info } from "lucide-react";
import { SPREADS, SpreadType } from "../types";

interface SpreadStepProps {
  onNext: (spread: SpreadType, useReversed: boolean) => void;
}

export const SpreadStep: React.FC<SpreadStepProps> = ({ onNext }) => {
  const [selectedSpread, setSelectedSpread] = useState<SpreadType | null>(null);
  const [useReversed, setUseReversed] = useState(false);

  const handleNext = () => {
    if (selectedSpread) {
      onNext(selectedSpread, useReversed);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center justify-center h-full flex-1"
    >
      <div className="w-full max-w-3xl space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-serif font-light tracking-wider text-slate-900">
            选择一个牌阵
          </h2>
          <p className="text-slate-400 text-sm font-light">
            不同的牌阵适用于不同深度的问题。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPREADS.map((spread) => (
            <motion.button
              key={spread.id}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSpread(spread)}
              className={`p-7 rounded-3xl text-left transition-all border flex flex-col justify-between h-52 relative overflow-hidden group ${
                selectedSpread?.id === spread.id
                  ? "bg-slate-900 border-slate-900 shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Decorative background element */}
              <div
                className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl transition-opacity duration-500 ${
                  selectedSpread?.id === spread.id
                    ? "bg-white/10 opacity-100"
                    : "bg-slate-50 opacity-0 group-hover:opacity-100"
                }`}
              />

              <div className="relative z-10 flex justify-between items-start">
                <div className="space-y-1">
                  <h3
                    className={`text-xl font-serif font-medium tracking-tight ${selectedSpread?.id === spread.id ? "text-white" : "text-slate-900"}`}
                  >
                    {spread.name}
                  </h3>
                  <div
                    className={`h-0.5 w-8 transition-all duration-500 ${selectedSpread?.id === spread.id ? "bg-white w-12" : "bg-slate-300 group-hover:w-12 group-hover:bg-slate-400"}`}
                  />
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    selectedSpread?.id === spread.id
                      ? "bg-white border-white"
                      : "border-slate-200 group-hover:border-slate-300"
                  }`}
                >
                  {selectedSpread?.id === spread.id && (
                    <Check size={14} className="text-slate-900" />
                  )}
                </div>
              </div>

              <div className="relative z-10">
                <p
                  className={`text-sm line-clamp-2 leading-relaxed font-light ${selectedSpread?.id === spread.id ? "text-slate-300" : "text-slate-600"}`}
                >
                  {spread.description}
                </p>
                <div
                  className={`mt-5 flex items-center gap-2 text-[10px] font-medium tracking-[0.2em] uppercase ${selectedSpread?.id === spread.id ? "text-slate-400" : "text-slate-500"}`}
                >
                  <div
                    className={`w-1 h-1 rounded-full ${selectedSpread?.id === spread.id ? "bg-slate-400" : "bg-slate-300"}`}
                  />
                  {spread.cardCount} Cards
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div
          className="bg-white border border-slate-200 p-6 rounded-[2rem] flex items-center justify-between group cursor-pointer select-none transition-all hover:border-slate-300 shadow-sm"
          onClick={() => setUseReversed(!useReversed)}
        >
          <div className="flex items-center gap-5">
            <div
              className={`w-14 h-7 rounded-full transition-colors relative ${useReversed ? "bg-slate-900" : "bg-slate-200"}`}
            >
              <motion.div
                animate={{ x: useReversed ? 32 : 4 }}
                className="absolute top-1.5 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                启用逆位含义
                <Info size={14} className="text-slate-400" />
              </p>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                {useReversed
                  ? "包含逆位解读，含义更丰富但也更具挑战。"
                  : "仅使用正位，适合新手或直接的建议。"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedSpread}
          className="w-full bg-slate-900 hover:bg-black disabled:opacity-20 disabled:cursor-not-allowed text-white font-medium py-4 rounded-[2rem] flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl group tracking-[0.2em] uppercase text-sm"
        >
          确认并开始洗牌
          <ChevronRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </motion.div>
  );
};
