import { prisma } from "@/lib/prisma";
import { Evaluation } from "@/types";
import HistoryClient from "@/components/evaluation/HistoryClient";

export default async function HistoryPage() {
  const rows = await prisma.evaluation.findMany({
    orderBy: { createdAt: "desc" },
  });

  const evaluations: Evaluation[] = rows.map((e) => ({
    id: e.id,
    question: e.question,
    answer_text: e.answerText,
    word_limit: e.wordLimit,
    score: e.score,
    strengths: e.strengths,
    weaknesses: e.weaknesses,
    suggestions: e.suggestions,
    overall_feedback: e.overallFeedback,
    covered_dimensions: e.coveredDimensions,
    missing_dimensions: e.missingDimensions,
    ideal_structure: e.idealStructure,
    word_economy: e.wordEconomy,
    version_number: e.versionNumber,
    parent_id: e.parentId,
    created_at: e.createdAt.toISOString(),
  }));

  return (
    <div
      className="min-h-screen pt-20 pb-16"
      style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(255,215,0,0.03) 0%, transparent 50%), #0a0a0a" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="py-10 flex flex-col gap-2">
          <span className="text-xs font-body" style={{ color: "#666666" }}>
            EVALUATION HISTORY
          </span>
          <h1
            className="font-display font-black text-4xl md:text-5xl"
            style={{ color: "#f0f0f0", letterSpacing: "-0.04em" }}
          >
            Your Progress
          </h1>
          <p className="text-sm font-body" style={{ color: "#666666" }}>
            Track your improvement across questions and answer versions.
          </p>
        </div>

        <HistoryClient evaluations={evaluations} />
      </div>
    </div>
  );
}
