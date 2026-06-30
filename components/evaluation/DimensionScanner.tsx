import { ALL_DIMENSIONS } from "@/types";
import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  covered: string[];
  missing: string[];
}

export default function DimensionScanner({ covered, missing }: Props) {
  return (
    <div
      className="rounded-card p-5 flex flex-col gap-4"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-base" style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}>
          Dimension Coverage
        </h3>
        <div className="flex items-center gap-3 text-xs font-body">
          <span className="flex items-center gap-1" style={{ color: "#FFD700" }}>
            <CheckCircle2 size={12} />
            {covered.length} covered
          </span>
          <span className="flex items-center gap-1" style={{ color: "#555555" }}>
            <XCircle size={12} />
            {missing.length} missing
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${(covered.length / ALL_DIMENSIONS.length) * 100}%`,
            background: "linear-gradient(to right, rgba(255,215,0,0.6), #FFD700)",
            transition: "width 600ms cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      </div>

      {/* Dimension grid */}
      <div className="flex flex-wrap gap-2">
        {ALL_DIMENSIONS.map((dim) => {
          const isCovered = covered.includes(dim);
          return (
            <span
              key={dim}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-body"
              style={
                isCovered
                  ? {
                      background: "rgba(255,215,0,0.08)",
                      color: "#FFD700",
                      border: "1px solid rgba(255,215,0,0.2)",
                    }
                  : {
                      background: "rgba(255,255,255,0.03)",
                      color: "#333333",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }
              }
            >
              {isCovered ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
              {dim}
            </span>
          );
        })}
      </div>

      {missing.length > 0 && (
        <div
          className="rounded-lg px-4 py-3 text-xs font-body"
          style={{
            background: "rgba(255,215,0,0.06)",
            border: "1px solid rgba(255,215,0,0.15)",
            color: "#9b8b5a",
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: "#FFD700" }}>Tip:</strong> Try adding{" "}
          {missing.slice(0, 3).join(", ")} perspectives to your next version.
        </div>
      )}
    </div>
  );
}
