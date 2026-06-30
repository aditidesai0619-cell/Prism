"use client";

import { useState } from "react";
import { EvaluationInput, Evaluation } from "@/types";
import { Loader2, Zap, FileText, ChevronDown, Wand2 } from "lucide-react";

const WORD_LIMITS = [100, 150, 200, 250, 300, 400, 500, 750, 1000, 1500];

interface Props {
  onResult: (evaluation: Evaluation) => void;
  parentEvaluation?: Evaluation | null;
  onClearParent?: () => void;
}

export default function EvaluatorForm({ onResult, parentEvaluation, onClearParent }: Props) {
  const [question, setQuestion] = useState(parentEvaluation?.question ?? "");
  const [wordLimit, setWordLimit] = useState(parentEvaluation?.word_limit ?? 200);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatingQuestion, setGeneratingQuestion] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generateToast, setGenerateToast] = useState<string | null>(null);

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const isOverLimit = wordCount > wordLimit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    setLoading(true);
    setError(null);

    const payload: EvaluationInput = {
      question: question.trim(),
      word_limit: wordLimit,
      answer_text: answer.trim(),
      parent_id: parentEvaluation?.id ?? null,
      version_number: parentEvaluation ? (parentEvaluation.version_number + 1) : 1,
    };

    try {
      const res = await fetch("/api/evaluate", {
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
      setAnswer("");
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const generateQuestion = async () => {
    setGeneratingQuestion(true);
    try {
      const res = await fetch("/api/generate-question", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.question) {
        setQuestion(data.question);
      } else {
        setGenerateToast("Failed to generate question, try again");
        setTimeout(() => setGenerateToast(null), 3500);
      }
    } catch {
      setGenerateToast("Failed to generate question, try again");
      setTimeout(() => setGenerateToast(null), 3500);
    } finally {
      setGeneratingQuestion(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Rewrite banner */}
      {parentEvaluation && (
        <div
          className="rounded-lg px-4 py-3 flex items-center justify-between text-sm font-body"
          style={{
            background: "rgba(255,215,0,0.06)",
            border: "1px solid rgba(255,215,0,0.15)",
            color: "#999999",
          }}
        >
          <span>
            Rewriting Version {parentEvaluation.version_number} →{" "}
            <strong style={{ color: "#FFD700" }}>Version {parentEvaluation.version_number + 1}</strong>
          </span>
          {onClearParent && (
            <button type="button" onClick={onClearParent} className="text-xs" style={{ color: "#666666" }}>
              New question
            </button>
          )}
        </div>
      )}

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

      {/* Question */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-body font-medium flex items-center gap-2" style={{ color: "#999999" }}>
            <FileText size={14} />
            UPSC Question
          </label>
          <button
            type="button"
            onClick={generateQuestion}
            disabled={generatingQuestion || loading}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-body font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "rgba(255,215,0,0.08)",
              border: "1px solid rgba(255,215,0,0.2)",
              color: "#FFD700",
              transition: "background 150ms ease, border-color 150ms ease",
            }}
            onMouseEnter={(e) => {
              if (!generatingQuestion && !loading) {
                e.currentTarget.style.background = "rgba(255,215,0,0.14)";
                e.currentTarget.style.borderColor = "rgba(255,215,0,0.4)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,215,0,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,215,0,0.2)";
            }}
          >
            {generatingQuestion ? (
              <Loader2 size={11} className="animate-spin" />
            ) : (
              <Wand2 size={11} />
            )}
            {generatingQuestion ? "Generating…" : "Generate Question"}
          </button>
        </div>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Paste the UPSC question here..."
          rows={3}
          required
          className="w-full px-4 py-3 rounded-lg text-sm font-body outline-none resize-none"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#f0f0f0",
            lineHeight: 1.7,
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

      {/* Answer */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-body font-medium" style={{ color: "#999999" }}>
            Your Answer
          </label>
          <span
            className="text-xs font-body"
            style={{ color: isOverLimit ? "#e45454" : "#666666" }}
          >
            {wordCount} / {wordLimit} words
          </span>
        </div>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write or paste your answer here. Be as complete as possible..."
          rows={14}
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
        disabled={loading || !question.trim() || !answer.trim()}
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
            Analyzing answer…
          </>
        ) : (
          <>
            <Zap size={18} />
            Evaluate Answer
          </>
        )}
      </button>

      {loading && (
        <p className="text-center text-xs font-body" style={{ color: "#666666" }}>
          This may take 10–20 seconds. AI is reviewing your answer across 14 dimensions…
        </p>
      )}

      {generateToast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-body font-medium shadow-xl"
          style={{
            background: "#1a1a1a",
            border: "1px solid rgba(228,84,84,0.3)",
            color: "#e45454",
            boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
            animation: "fadeInUp 200ms ease",
          }}
        >
          {generateToast}
        </div>
      )}
    </form>
  );
}
