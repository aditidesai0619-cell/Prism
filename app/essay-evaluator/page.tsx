"use client";

import { useState } from "react";
import { EssayEvaluation } from "@/types";
import EssayForm from "@/components/essay/EssayForm";
import EssayResultsPanel from "@/components/essay/EssayResultsPanel";
import { BookOpen } from "lucide-react";

export default function EssayEvaluatorPage() {
  const [currentEvaluation, setCurrentEvaluation] = useState<EssayEvaluation | null>(null);

  const handleResult = (evaluation: EssayEvaluation) => {
    setCurrentEvaluation(evaluation);
  };

  return (
    <div
      className="min-h-screen pt-20 pb-16"
      style={{ background: "radial-gradient(ellipse at 10% 20%, rgba(255,215,0,0.04) 0%, transparent 50%), #0a0a0a" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <BookOpen size={16} style={{ color: "#FFD700" }} />
            <span className="text-xs font-body" style={{ color: "#666666" }}>
              PRISM ESSAY EVALUATOR
            </span>
          </div>
          <h1
            className="font-display font-black text-4xl md:text-5xl"
            style={{ color: "#f0f0f0", letterSpacing: "-0.04em" }}
          >
            Evaluate Your Essay
          </h1>
          <p className="text-sm font-body" style={{ color: "#666666", lineHeight: 1.7 }}>
            Get detailed feedback on structure, coherence, balance, and multidimensional coverage for UPSC essay paper.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-4">
            <div
              className="rounded-card p-6"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <EssayForm onResult={handleResult} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {currentEvaluation ? (
              <EssayResultsPanel evaluation={currentEvaluation} />
            ) : (
              <EssayEmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EssayEmptyState() {
  return (
    <div
      className="rounded-card p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[400px]"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: "rgba(255,215,0,0.08)" }}
      >
        <BookOpen size={28} style={{ color: "#FFD700" }} />
      </div>
      <div className="flex flex-col gap-2">
        <h3
          className="font-display font-bold text-xl"
          style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}
        >
          Essay feedback will appear here
        </h3>
        <p className="text-sm font-body max-w-sm" style={{ color: "#666666", lineHeight: 1.7 }}>
          Submit your essay topic and text on the left to receive structured feedback across structure, balance, and 14 UPSC dimensions.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {["Score /10", "Structure", "Coherence", "Balance", "Dimensions"].map((label) => (
          <span
            key={label}
            className="text-xs px-3 py-1.5 rounded-full font-body"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "#444444",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
