"use client";

import { useState } from "react";
import { Evaluation } from "@/types";
import EvaluatorForm from "@/components/evaluation/EvaluatorForm";
import ResultsPanel from "@/components/evaluation/ResultsPanel";
import ComparisonView from "@/components/evaluation/ComparisonView";
import { Sparkles } from "lucide-react";

export default function EvaluatePage() {
  const [currentEvaluation, setCurrentEvaluation] = useState<Evaluation | null>(null);
  const [previousEvaluation, setPreviousEvaluation] = useState<Evaluation | null>(null);
  const [isRewriting, setIsRewriting] = useState(false);

  const handleResult = (evaluation: Evaluation) => {
    if (isRewriting && currentEvaluation) {
      setPreviousEvaluation(currentEvaluation);
    }
    setCurrentEvaluation(evaluation);
    setIsRewriting(false);
  };

  const handleRewrite = () => {
    setIsRewriting(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearParent = () => {
    setIsRewriting(false);
    setPreviousEvaluation(null);
    setCurrentEvaluation(null);
  };

  return (
    <div
      className="min-h-screen pt-20 pb-16"
      style={{ background: "radial-gradient(ellipse at 10% 20%, rgba(255,215,0,0.04) 0%, transparent 50%), #0a0a0a" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Sparkles size={16} style={{ color: "#FFD700" }} />
            <span className="text-xs font-body" style={{ color: "#666666" }}>
              PRISM EVALUATOR
            </span>
          </div>
          <h1
            className="font-display font-black text-4xl md:text-5xl"
            style={{ color: "#f0f0f0", letterSpacing: "-0.04em" }}
          >
            {isRewriting ? "Rewrite Your Answer" : "Evaluate Your Answer"}
          </h1>
          <p className="text-sm font-body" style={{ color: "#666666", lineHeight: 1.7 }}>
            {isRewriting
              ? "Submit an improved version to see your progress."
              : "Paste your UPSC question and answer for AI-powered mentor feedback."}
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
              <EvaluatorForm
                onResult={handleResult}
                parentEvaluation={isRewriting ? currentEvaluation : null}
                onClearParent={isRewriting ? handleClearParent : undefined}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {currentEvaluation && !isRewriting ? (
              <>
                {previousEvaluation && (
                  <div
                    className="rounded-card p-5 mb-2"
                    style={{
                      background: "#111111",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <h3
                      className="font-display font-bold text-base mb-4"
                      style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}
                    >
                      Version Comparison
                    </h3>
                    <ComparisonView v1={previousEvaluation} v2={currentEvaluation} />
                  </div>
                )}
                <ResultsPanel
                  evaluation={currentEvaluation}
                  onRewrite={handleRewrite}
                />
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
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
        <Sparkles size={28} style={{ color: "#FFD700" }} />
      </div>
      <div className="flex flex-col gap-2">
        <h3
          className="font-display font-bold text-xl"
          style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}
        >
          Your evaluation will appear here
        </h3>
        <p className="text-sm font-body max-w-sm" style={{ color: "#666666", lineHeight: 1.7 }}>
          Submit a question and answer on the left to receive mentor-level feedback across 14 UPSC dimensions.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {["Score /10", "Strengths", "Weaknesses", "Dimensions", "Suggestions"].map((label) => (
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
