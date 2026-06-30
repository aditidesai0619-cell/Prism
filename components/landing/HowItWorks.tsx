"use client";

const steps = [
  {
    number: "01",
    title: "Write Your Answer",
    description:
      "Paste your UPSC answer along with the question and word limit. Works for GS, ethics, essay — any paper.",
    icon: "✍️",
  },
  {
    number: "02",
    title: "AI Analyzes",
    description:
      "PRISM evaluates your answer across 14 UPSC dimensions: historical, ethical, governance, environmental, and more.",
    icon: "🔬",
  },
  {
    number: "03",
    title: "Get Mentor Feedback",
    description:
      "Receive a score, strengths, weaknesses, and specific suggestions — just like a senior IAS officer reviewing your answer.",
    icon: "📋",
  },
  {
    number: "04",
    title: "Rewrite & Compare",
    description:
      "Submit an improved version. PRISM shows you the delta: new score, newly covered dimensions, resolved weaknesses.",
    icon: "📈",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6" style={{ background: "#0a0a0a" }}>
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
            HOW IT WORKS
          </span>
          <h2
            className="font-display font-bold text-4xl md:text-5xl"
            style={{ color: "#f0f0f0", letterSpacing: "-0.03em" }}
          >
            From answer to insight
            <br />
            <span style={{ color: "#FFD700" }}>in under a minute</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative rounded-xl p-6 flex flex-col gap-4"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3)",
                transition: "border-color 200ms ease, box-shadow 200ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,215,0,0.2)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 16px rgba(255,215,0,0.06), 0 16px 48px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 8px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3)";
              }}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{step.icon}</span>
                <span
                  className="font-display font-black text-5xl"
                  style={{ color: "rgba(255,255,255,0.05)", letterSpacing: "-0.05em" }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                className="font-display font-bold text-xl"
                style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}
              >
                {step.title}
              </h3>
              <p className="text-sm font-body" style={{ color: "#666666", lineHeight: 1.7 }}>
                {step.description}
              </p>

              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
