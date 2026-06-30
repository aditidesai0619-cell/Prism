import { Evaluation } from "@/types";
import { ArrowUp, ArrowDown, Minus, CheckCircle2, XCircle } from "lucide-react";

interface Props {
  v1: Evaluation;
  v2: Evaluation;
}

export default function ComparisonView({ v1, v2 }: Props) {
  const scoreDiff = v2.score - v1.score;
  const newlyCovered = v2.covered_dimensions.filter((d) => !v1.covered_dimensions.includes(d));
  const stillMissing = v2.missing_dimensions.filter((d) => v1.missing_dimensions.includes(d));
  const resolvedWeaknesses = v1.weaknesses.filter(
    (w) => !v2.weaknesses.some((w2) => w2.toLowerCase().includes(w.toLowerCase().slice(0, 20)))
  );

  const ScoreArrow = () => {
    if (scoreDiff > 0) return <ArrowUp size={16} style={{ color: "#5dc78e" }} />;
    if (scoreDiff < 0) return <ArrowDown size={16} style={{ color: "#e45454" }} />;
    return <Minus size={16} style={{ color: "#555555" }} />;
  };

  const scoreColor = scoreDiff > 0 ? "#5dc78e" : scoreDiff < 0 ? "#e45454" : "#555555";

  return (
    <div className="flex flex-col gap-4">
      <div
        className="rounded-card p-4 flex items-center gap-4"
        style={{
          background: "#111111",
          border: `1px solid ${scoreDiff > 0 ? "rgba(93,199,142,0.2)" : "rgba(255,255,255,0.08)"}`,
        }}
      >
        <div className="text-center flex flex-col gap-1">
          <span className="text-xs font-body" style={{ color: "#555555" }}>V1</span>
          <span className="font-display font-black text-2xl" style={{ color: "#f0f0f0" }}>
            {v1.score.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-center">
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="flex items-center gap-1">
            <ScoreArrow />
            <span className="font-display font-bold text-lg" style={{ color: scoreColor }}>
              {scoreDiff > 0 ? "+" : ""}{scoreDiff.toFixed(1)}
            </span>
          </div>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.1)" }} />
        </div>

        <div className="text-center flex flex-col gap-1">
          <span className="text-xs font-body" style={{ color: "#555555" }}>V2</span>
          <span className="font-display font-black text-2xl" style={{ color: scoreDiff >= 0 ? "#FFD700" : "#e45454" }}>
            {v2.score.toFixed(1)}
          </span>
        </div>
      </div>

      {newlyCovered.length > 0 && (
        <div
          className="rounded-card p-4"
          style={{ background: "rgba(93,199,142,0.06)", border: "1px solid rgba(93,199,142,0.15)" }}
        >
          <p className="text-xs font-body mb-3" style={{ color: "#5dc78e" }}>
            ✓ NEWLY COVERED DIMENSIONS
          </p>
          <div className="flex flex-wrap gap-2">
            {newlyCovered.map((d) => (
              <span
                key={d}
                className="text-xs px-2.5 py-1 rounded-full font-body flex items-center gap-1"
                style={{ background: "rgba(93,199,142,0.1)", color: "#5dc78e", border: "1px solid rgba(93,199,142,0.2)" }}
              >
                <CheckCircle2 size={10} />
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {stillMissing.length > 0 && (
        <div
          className="rounded-card p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs font-body mb-3" style={{ color: "#555555" }}>
            ✗ STILL MISSING
          </p>
          <div className="flex flex-wrap gap-2">
            {stillMissing.map((d) => (
              <span
                key={d}
                className="text-xs px-2.5 py-1 rounded-full font-body flex items-center gap-1"
                style={{ background: "rgba(255,255,255,0.03)", color: "#444444", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <XCircle size={10} />
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {resolvedWeaknesses.length > 0 && (
        <div
          className="rounded-card p-4"
          style={{ background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.1)" }}
        >
          <p className="text-xs font-body mb-3" style={{ color: "#FFD700" }}>
            IMPROVEMENTS FROM V1
          </p>
          <ul className="flex flex-col gap-1.5">
            {resolvedWeaknesses.map((w, i) => (
              <li key={i} className="text-xs font-body flex items-start gap-1.5" style={{ color: "#666666" }}>
                <CheckCircle2 size={10} style={{ color: "#FFD700", marginTop: 2 }} />
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
