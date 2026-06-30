"use client";

import { useState } from "react";
import { EssayEvaluation, EssayEvaluationInput } from "@/types";
import { Loader2, BookOpen, ChevronDown } from "lucide-react";

const WORD_LIMITS = [500, 750, 1000, 1200, 1500, 2000, 2500];

interface Props {
  onResult: (evaluation: EssayEvaluation) => void;
}

export default function EssayForm({ onResult }: Props) {
  const [topic, setTopic] = useState("");
  const [wordLimit, setWordLimit] = useState(1000);
  const [essayText, setEssayText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
  const isOverLimit = wordCount > wordLimit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !essayText.trim()) return;

    setLoading(true);
    setError(null);

    const payload: EssayEvaluationInput = {
      topic: topic.trim(),
      word_limit: wordLimit,
      essay_text: essayText.trim(),
    };

    try {
      const res = await fetch("/api/essay-evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Evaluation failed. Please try again.");
        return;
      }

      onResult(data.evaluation);
      setEssayText("");
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div
          className="px-4 py-3 rounded-lg text-sm font-body"
          style={{
            background: "rgba(228,84,84,0.1)",
            border: "1px solid rgba(228,84,84,0.3)",
            color: "#e45454",
          }}
        >
          {error}
        </div>
      )}

      {/* Essay Topic */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-body font-medium flex items-center gap-2" style={{ color: "#999999" }}>
          <BookOpen size={14} />
          Essay Topic
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Cooperative federalism is the need of the hour"
          required
          className="w-full px-4 py-3 rounded-lg text-sm font-body outline-none"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#f0f0f0",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#FFD700";
            e.target.style.boxShadow = "0 0 0 3px rgba(255,215,0,0.07)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.1)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Word limit */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-body font-medium" style={{ color: "#999999" }}>
          Word Limit
        </label>
        <div className="relative">
          <select
            value={wordLimit}
            onChange={(e) => setWordLimit(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg text-sm font-body outline-none appearance-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f0f0f0",
            }}
            onFocus={(e) => { e.target.style.borderColor = "#FFD700"; }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            {WORD_LIMITS.map((w) => (
              <option key={w} value={w} style={{ background: "#111111" }}>
                {w} words
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "#666666" }}
          />
        </div>
      </div>

      {/* Essay text */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-body font-medium" style={{ color: "#999999" }}>
            Your Essay
          </label>
          <span
            className="text-xs font-body"
            style={{ color: isOverLimit ? "#e45454" : "#666666" }}
          >
            {wordCount} / {wordLimit} words
          </span>
        </div>
        <textarea
          value={essayText}
          onChange={(e) => setEssayText(e.target.value)}
          placeholder="Write or paste your essay here. Structure it with a clear introduction, developed body paragraphs, and a meaningful conclusion..."
          rows={18}
          required
          className="w-full px-4 py-3 rounded-lg text-sm font-body outline-none resize-none"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${isOverLimit ? "rgba(228,84,84,0.4)" : "rgba(255,255,255,0.1)"}`,
            color: "#f0f0f0",
            lineHeight: 1.8,
          }}
          onFocus={(e) => {
            if (!isOverLimit) {
              e.target.style.borderColor = "#FFD700";
              e.target.style.boxShadow = "0 0 0 3px rgba(255,215,0,0.07)";
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = isOverLimit ? "rgba(228,84,84,0.4)" : "rgba(255,255,255,0.1)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !topic.trim() || !essayText.trim()}
        className="w-full py-4 rounded-xl text-base font-display font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "#FFD700",
          color: "#0a0a0a",
          boxShadow: "0 0 32px rgba(255,215,0,0.2), 0 4px 12px rgba(255,215,0,0.1)",
          transition: "transform 200ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease, opacity 150ms ease",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = "scale(1.01)";
            e.currentTarget.style.boxShadow = "0 0 48px rgba(255,215,0,0.3), 0 8px 24px rgba(255,215,0,0.15)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 0 32px rgba(255,215,0,0.2), 0 4px 12px rgba(255,215,0,0.1)";
        }}
        onMouseDown={(e) => { if (!loading) e.currentTarget.style.transform = "scale(0.98)"; }}
        onMouseUp={(e) => { if (!loading) e.currentTarget.style.transform = "scale(1)"; }}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Evaluating essay…
          </>
        ) : (
          <>
            <BookOpen size={18} />
            Evaluate Essay
          </>
        )}
      </button>

      {loading && (
        <p className="text-center text-xs font-body" style={{ color: "#666666" }}>
          This may take 15–25 seconds. AI is reviewing structure, coherence, and 14 dimensions…
        </p>
      )}
    </form>
  );
}
