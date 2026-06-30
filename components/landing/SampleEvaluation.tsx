const SAMPLE = {
  question:
    "Critically examine the role of technology in improving governance and reducing corruption in India.",
  answer_excerpt:
    "Technology has emerged as a powerful tool in transforming governance in India. Initiatives like JAM trinity (Jan Dhan-Aadhaar-Mobile), PFMS, and GeM portal have reduced leakages and improved direct benefit transfers...",
  score: 7.5,
  strengths: [
    "Good use of contemporary examples (JAM Trinity, GeM)",
    "Clear structure with logical flow",
    "Balanced perspective on both opportunities and challenges",
  ],
  weaknesses: [
    "Missing constitutional dimension — Article 19 (right to information)",
    "No mention of ethical concerns around surveillance and data privacy",
    "Lacks international comparisons (Estonia, Rwanda)",
  ],
  covered: ["Economic", "Governance", "Technological", "Political"],
  missing: ["Constitutional", "Ethical", "International", "Social"],
};

export default function SampleEvaluation() {
  return (
    <section id="sample" className="py-24 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-body px-3 py-1.5 rounded-full mb-4"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#999999",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            SAMPLE EVALUATION
          </span>
          <h2
            className="font-display font-bold text-4xl md:text-5xl"
            style={{ color: "#f0f0f0", letterSpacing: "-0.03em" }}
          >
            See PRISM in action
          </h2>
          <p
            className="mt-4 text-base font-body"
            style={{ color: "#666666", lineHeight: 1.7 }}
          >
            This is what a real PRISM evaluation looks like.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Input */}
          <div
            className="rounded-xl p-6 flex flex-col gap-4"
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ background: "#FFD700" }} />
              <span className="text-xs font-body font-medium" style={{ color: "#666666" }}>
                QUESTION
              </span>
            </div>
            <p className="text-sm font-body" style={{ color: "#f0f0f0", lineHeight: 1.7 }}>
              {SAMPLE.question}
            </p>

            <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }} />

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: "#888888" }} />
              <span className="text-xs font-body font-medium" style={{ color: "#666666" }}>
                ANSWER EXCERPT
              </span>
            </div>
            <p className="text-sm font-body italic" style={{ color: "#888888", lineHeight: 1.7 }}>
              &ldquo;{SAMPLE.answer_excerpt}&rdquo;
            </p>
          </div>

          {/* Right: Results */}
          <div className="flex flex-col gap-4">
            {/* Score */}
            <div
              className="rounded-xl p-6 flex items-center justify-between"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,215,0,0.2)",
                boxShadow: "0 0 24px rgba(255,215,0,0.05), 0 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              <div>
                <p className="text-xs font-body mb-1" style={{ color: "#666666" }}>
                  OVERALL SCORE
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-display font-black text-5xl"
                    style={{ color: "#FFD700", letterSpacing: "-0.05em" }}
                  >
                    {SAMPLE.score}
                  </span>
                  <span className="font-display font-bold text-xl" style={{ color: "rgba(255,215,0,0.35)" }}>
                    /10
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 w-32">
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(SAMPLE.score / 10) * 100}%`,
                      background: "linear-gradient(to right, #FFD700, #ffe033)",
                    }}
                  />
                </div>
                <span className="text-xs font-body" style={{ color: "#666666" }}>Good</span>
              </div>
            </div>

            {/* Dimensions */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-xs font-body mb-3" style={{ color: "#666666" }}>
                DIMENSION COVERAGE
              </p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE.covered.map((d) => (
                  <span
                    key={d}
                    className="text-xs px-2.5 py-1 rounded-full font-body"
                    style={{
                      background: "rgba(255,215,0,0.08)",
                      color: "#FFD700",
                      border: "1px solid rgba(255,215,0,0.2)",
                    }}
                  >
                    ✓ {d}
                  </span>
                ))}
                {SAMPLE.missing.map((d) => (
                  <span
                    key={d}
                    className="text-xs px-2.5 py-1 rounded-full font-body"
                    style={{
                      background: "rgba(228,84,84,0.08)",
                      color: "#9b6b6b",
                      border: "1px solid rgba(228,84,84,0.15)",
                    }}
                  >
                    ✗ {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-xl p-4"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p className="text-xs font-body mb-3" style={{ color: "#666666" }}>STRENGTHS</p>
                <ul className="flex flex-col gap-2">
                  {SAMPLE.strengths.map((s) => (
                    <li
                      key={s}
                      className="text-xs font-body flex items-start gap-1.5"
                      style={{ color: "#888888", lineHeight: 1.6 }}
                    >
                      <span style={{ color: "#FFD700", marginTop: 2 }}>+</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-xl p-4"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p className="text-xs font-body mb-3" style={{ color: "#666666" }}>WEAKNESSES</p>
                <ul className="flex flex-col gap-2">
                  {SAMPLE.weaknesses.map((w) => (
                    <li
                      key={w}
                      className="text-xs font-body flex items-start gap-1.5"
                      style={{ color: "#888888", lineHeight: 1.6 }}
                    >
                      <span style={{ color: "#e45454", marginTop: 2 }}>−</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
