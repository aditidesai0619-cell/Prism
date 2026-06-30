"use client";

import { EssayEvaluation } from "@/types";
import DimensionScanner from "@/components/evaluation/DimensionScanner";
import { TrendingUp, TrendingDown, Lightbulb, AlignLeft } from "lucide-react";

interface Props {
  evaluation: EssayEvaluation;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 10) * circumference;
  const scoreColor =
    score >= 8 ? "#FFD700" : score >= 6 ? "#aaaaaa" : score >= 4 ? "#9b8b5a" : "#e45454";

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg width="112" height="112" className="absolute inset-0 -rotate-90">
        <circle cx="56" cy="56" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke={scoreColor}
          strokeWidth="8"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 6px ${scoreColor}60)`,
            transition: "stroke-dasharray 800ms cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      </svg>
      <div className="text-center">
        <span className="font-display font-black text-3xl block" style={{ color: scoreColor, letterSpacing: "-0.05em" }}>
          {score.toFixed(1)}
        </span>
        <span className="text-xs font-body" style={{ color: "#555555" }}>/10</span>
      </div>
    </div>
  );
}

function ScoreLabel({ score }: { score: number }) {
  if (score >= 8) return <span style={{ color: "#FFD700" }}>Excellent</span>;
  if (score >= 6.5) return <span style={{ color: "#cccccc" }}>Good</span>;
  if (score >= 5) return <span style={{ color: "#9b8b5a" }}>Average</span>;
  return <span style={{ color: "#e45454" }}>Needs Improvement</span>;
}

export default function EssayResultsPanel({ evaluation }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Score card */}
      <div
        className="rounded-card p-6 flex items-center gap-6"
        style={{
          background: "#111111",
          border: "1px solid rgba(255,215,0,0.15)",
          boxShadow: "0 0 24px rgba(255,215,0,0.05), 0 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        <ScoreRing score={evaluation.score} />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-body mb-1" style={{ color: "#555555" }}>
            ESSAY SCORE
          </p>
          <div className="font-display font-bold text-2xl" style={{ color: "#f0f0f0", letterSpacing: "-0.03em" }}>
            <ScoreLabel score={evaluation.score} />
          </div>
          <p className="text-xs font-body mt-1" style={{ color: "#555555" }}>
            {evaluation.topic}
          </p>
        </div>
      </div>

      {/* Structure Feedback */}
      {evaluation.structure_feedback && (
        <div
          className="rounded-card p-5"
          style={{ background: "#111111", border: "1px solid rgba(255,215,0,0.1)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AlignLeft size={14} style={{ color: "#FFD700" }} />
            <h3 className="text-xs font-body font-medium uppercase tracking-wide" style={{ color: "#555555" }}>
              Structure & Coherence
            </h3>
          </div>
          <p className="text-sm font-body" style={{ color: "#999999", lineHeight: 1.8 }}>
            {evaluation.structure_feedback}
          </p>
        </div>
      )}

      {/* Strengths */}
      <div
        className="rounded-card p-5"
        style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} style={{ color: "#FFD700" }} />
          <h3 className="text-xs font-body font-medium uppercase tracking-wide" style={{ color: "#555555" }}>
            Strengths
          </h3>
        </div>
        <ul className="flex flex-col gap-2.5">
          {evaluation.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm font-body" style={{ color: "#999999", lineHeight: 1.7 }}>
              <span
                className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-display font-bold"
                style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700" }}
              >
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div
        className="rounded-card p-5"
        style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown size={14} style={{ color: "#e45454" }} />
          <h3 className="text-xs font-body font-medium uppercase tracking-wide" style={{ color: "#555555" }}>
            Areas to Improve
          </h3>
        </div>
        <ul className="flex flex-col gap-2.5">
          {evaluation.weaknesses.map((w, i) => (
            <li key={i} className="flex items-start gap-2 text-sm font-body" style={{ color: "#999999", lineHeight: 1.7 }}>
              <span
                className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-display font-bold"
                style={{ background: "rgba(228,84,84,0.1)", color: "#e45454" }}
              >
                {i + 1}
              </span>
              {w}
            </li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div
        className="rounded-card p-5"
        style={{ background: "#111111", border: "1px solid rgba(255,215,0,0.1)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} style={{ color: "#FFD700" }} />
          <h3 className="text-xs font-body font-medium uppercase tracking-wide" style={{ color: "#555555" }}>
            Improvement Suggestions
          </h3>
        </div>
        <ul className="flex flex-col gap-2.5">
          {evaluation.suggestions.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm font-body" style={{ color: "#999999", lineHeight: 1.7 }}>
              <span
                className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-display font-bold"
                style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700" }}
              >
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Dimension scanner */}
      <DimensionScanner
        covered={evaluation.covered_dimensions}
        missing={evaluation.missing_dimensions}
      />
    </div>
  );
}
