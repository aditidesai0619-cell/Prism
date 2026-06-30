"use client";

import { useState } from "react";
import { Evaluation } from "@/types";
import Link from "next/link";
import { ChevronDown, ChevronRight, Calendar, Target, CheckCircle2, ArrowRight } from "lucide-react";

interface Props {
  evaluations: Evaluation[];
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8 ? "#FFD700" : score >= 6.5 ? "#cccccc" : score >= 5 ? "#9b8b5a" : "#e45454";
  const bg =
    score >= 8
      ? "rgba(255,215,0,0.1)"
      : score >= 6.5
      ? "rgba(255,255,255,0.08)"
      : score >= 5
      ? "rgba(155,139,90,0.1)"
      : "rgba(228,84,84,0.1)";

  return (
    <span
      className="text-sm font-display font-bold px-2.5 py-1 rounded-full"
      style={{ background: bg, color, border: `1px solid ${color}40` }}
    >
      {score.toFixed(1)}
    </span>
  );
}

function EvaluationCard({ evaluation }: { evaluation: Evaluation }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(evaluation.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="rounded-card overflow-hidden"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        transition: "border-color 200ms ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
      }}
    >
      <button
        className="w-full text-left px-5 py-4 flex items-start gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <ScoreBadge score={evaluation.score} />
            <span
              className="text-xs px-2.5 py-1 rounded-full font-body"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#888888",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              v{evaluation.version_number}
            </span>
            <span className="text-xs font-body flex items-center gap-1" style={{ color: "#555555" }}>
              <Calendar size={10} />
              {date}
            </span>
            <span className="text-xs font-body" style={{ color: "#555555" }}>
              {evaluation.word_limit}w limit
            </span>
          </div>

          <p className="text-sm font-body font-medium line-clamp-2 text-left" style={{ color: "#999999", lineHeight: 1.6 }}>
            {evaluation.question}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {evaluation.covered_dimensions.slice(0, 4).map((d) => (
              <span
                key={d}
                className="text-xs px-2 py-0.5 rounded-full font-body flex items-center gap-1"
                style={{
                  background: "rgba(255,215,0,0.07)",
                  color: "#FFD700",
                  border: "1px solid rgba(255,215,0,0.15)",
                }}
              >
                <CheckCircle2 size={8} />
                {d}
              </span>
            ))}
            {evaluation.covered_dimensions.length > 4 && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-body"
                style={{ color: "#555555", background: "rgba(255,255,255,0.04)" }}
              >
                +{evaluation.covered_dimensions.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 mt-1" style={{ color: "#555555" }}>
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </button>

      {expanded && (
        <div
          className="px-5 pb-5 flex flex-col gap-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-body mb-2" style={{ color: "#555555" }}>STRENGTHS</p>
              <ul className="flex flex-col gap-1.5">
                {evaluation.strengths.map((s, i) => (
                  <li key={i} className="text-xs font-body flex items-start gap-1.5" style={{ color: "#999999", lineHeight: 1.6 }}>
                    <span style={{ color: "#FFD700" }}>+</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-body mb-2" style={{ color: "#555555" }}>AREAS TO IMPROVE</p>
              <ul className="flex flex-col gap-1.5">
                {evaluation.weaknesses.map((w, i) => (
                  <li key={i} className="text-xs font-body flex items-start gap-1.5" style={{ color: "#999999", lineHeight: 1.6 }}>
                    <span style={{ color: "#e45454" }}>−</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {evaluation.overall_feedback && (
            <div
              className="rounded-lg px-4 py-3 text-xs font-body italic"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#666666",
                lineHeight: 1.7,
              }}
            >
              &ldquo;{evaluation.overall_feedback}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function HistoryClient({ evaluations }: Props) {
  const [search, setSearch] = useState("");

  const filtered = evaluations.filter(
    (e) =>
      e.question.toLowerCase().includes(search.toLowerCase()) ||
      e.covered_dimensions.some((d) => d.toLowerCase().includes(search.toLowerCase()))
  );

  const avgScore =
    evaluations.length > 0
      ? evaluations.reduce((a, e) => a + e.score, 0) / evaluations.length
      : 0;

  if (evaluations.length === 0) {
    return (
      <div
        className="rounded-card p-16 flex flex-col items-center justify-center text-center gap-4"
        style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <Target size={40} style={{ color: "#333333" }} />
        <h3 className="font-display font-bold text-xl" style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}>
          No evaluations yet
        </h3>
        <p className="text-sm font-body" style={{ color: "#666666" }}>
          Submit your first UPSC answer to start tracking your progress.
        </p>
        <Link
          href="/evaluate"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-display font-bold mt-2"
          style={{
            background: "#FFD700",
            color: "#0a0a0a",
            boxShadow: "0 0 24px rgba(255,215,0,0.25)",
          }}
        >
          Start Evaluating
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Evaluations", value: evaluations.length },
          { label: "Average Score", value: `${avgScore.toFixed(1)}/10` },
          { label: "Best Score", value: `${Math.max(...evaluations.map((e) => e.score)).toFixed(1)}/10` },
          { label: "Questions Attempted", value: new Set(evaluations.map((e) => e.question)).size },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-card p-4 flex flex-col gap-1"
            style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span className="font-display font-black text-2xl" style={{ color: "#FFD700", letterSpacing: "-0.03em" }}>
              {stat.value}
            </span>
            <span className="text-xs font-body" style={{ color: "#555555" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by question or dimension..."
        className="w-full px-4 py-3 rounded-lg text-sm font-body outline-none"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#f0f0f0",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#FFD700";
          e.target.style.boxShadow = "0 0 0 3px rgba(255,215,0,0.08)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(255,255,255,0.1)";
          e.target.style.boxShadow = "none";
        }}
      />

      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <p className="text-sm font-body text-center py-8" style={{ color: "#555555" }}>
            No evaluations match your search.
          </p>
        ) : (
          filtered.map((evaluation) => (
            <EvaluationCard key={evaluation.id} evaluation={evaluation} />
          ))
        )}
      </div>
    </div>
  );
}
