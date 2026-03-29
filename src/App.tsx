import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QuestionStep } from "./components/QuestionStep";
import { SpreadStep } from "./components/SpreadStep";
import { ShuffleStep } from "./components/ShuffleStep";
import { LayoutStep } from "./components/LayoutStep";
import { ResultStep } from "./components/ResultStep";
import { TarotCard, SpreadType } from "./types";

export type Step = "question" | "spread" | "shuffle" | "layout" | "result";

export default function App() {
  const [step, setStep] = useState<Step>("question");
  const [question, setQuestion] = useState("");
  const [spread, setSpread] = useState<SpreadType | null>(null);
  const [useReversed, setUseReversed] = useState(false);
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [isQuestionStarted, setIsQuestionStarted] = useState(false);

  const nextStep = () => {
    const steps: Step[] = ["question", "spread", "shuffle", "layout", "result"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const reset = () => {
    setStep("question");
    setQuestion("");
    setSpread(null);
    setSelectedCards([]);
    setIsQuestionStarted(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden flex flex-col items-center justify-center p-4 transition-colors duration-1000">
      <AnimatePresence>
        {(step !== "question" || isQuestionStarted) && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center space-y-4"
          >
            <h1 className="text-4xl font-serif font-light tracking-[0.3em] text-slate-900 mb-2">
              MYSTIC TAROT
            </h1>
            <div className="flex gap-4 justify-center items-center">
              {["问题", "牌阵", "洗牌", "抽牌", "揭晓"].map((s, i) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <div
                    className={`h-[1px] transition-all duration-700 ${
                      i <=
                      [
                        "question",
                        "spread",
                        "shuffle",
                        "layout",
                        "result",
                      ].indexOf(step)
                        ? "w-10 bg-slate-900"
                        : "w-6 bg-slate-200"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-light tracking-widest transition-colors ${
                      i <=
                      [
                        "question",
                        "spread",
                        "shuffle",
                        "layout",
                        "result",
                      ].indexOf(step)
                        ? "text-slate-900"
                        : "text-slate-300"
                    }`}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <main
        className={`w-full max-w-5xl rounded-[3rem] transition-all duration-1000 flex flex-col ${
          step === "question" && !isQuestionStarted
            ? "bg-transparent border-transparent"
            : "bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-[0_20px_60px_rgba(0,0,0,0.02)] px-10 pt-10 pb-6 min-h-[650px]"
        }`}
      >
        <AnimatePresence mode="wait">
          {step === "question" && (
            <QuestionStep
              key="question"
              onNext={(q) => {
                setQuestion(q);
                nextStep();
              }}
              onStart={() => setIsQuestionStarted(true)}
              isStarted={isQuestionStarted}
            />
          )}
          {step === "spread" && (
            <SpreadStep
              key="spread"
              onNext={(s, reversed) => {
                setSpread(s);
                setUseReversed(reversed);
                nextStep();
              }}
            />
          )}
          {step === "shuffle" && (
            <ShuffleStep
              key="shuffle"
              useReversed={useReversed}
              onNext={(shuffledDeck) => {
                setDeck(shuffledDeck);
                nextStep();
              }}
            />
          )}
          {step === "layout" && spread && (
            <LayoutStep
              key="layout"
              deck={deck}
              spread={spread}
              onNext={(cards) => {
                setSelectedCards(cards);
                nextStep();
              }}
            />
          )}
          {step === "result" && spread && (
            <ResultStep
              key="result"
              question={question}
              spread={spread}
              cards={selectedCards}
              onReset={reset}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-8 text-slate-500 text-sm">
        静心凝神，感受宇宙的指引
      </footer>
    </div>
  );
}
