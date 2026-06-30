"use client";

import { Brain, GitCompare, History, Target, FileText, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "14-Dimension Analysis",
    description:
      "Every answer is scanned for Historical, Economic, Political, Ethical, Constitutional, Environmental, and 8 more critical UPSC dimensions.",
  },
  {
    icon: Target,
    title: "Mentor-Level Scoring",
    description:
      "Get a precise score out of 10 with the same rubric used by experienced UPSC mentors — specific, honest, and actionable.",
  },
  {
    icon: GitCompare,
    title: "Version Comparison",
    description:
      "Rewrite your answer and PRISM shows the exact delta — score improvement, newly covered dimensions, and resolved weaknesses.",
  },
  {
    icon: History,
    title: "Progress Tracking",
    description:
      "Your full evaluation history is stored and searchable. Watch your scores improve over time across topics.",
  },
  {
    icon: FileText,
    title: "Works for All Papers",
    description:
      "GS 1, GS 2, GS 3, GS 4 Ethics, Essay — PRISM understands the unique requirements of each UPSC paper.",
  },
  {
    icon: TrendingUp,
    title: "Specific Suggestions",
    description:
      "Not vague feedback — concrete, numbered improvement points you can act on before your next mock test.",
  },
];

export default function Features() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-body px-3 py-1.5 rounded-full mb-4"
            style={{
              background: "rgba(255,215,0,0.08)",
              color: "#FFD700",
              border: "1px solid rgba(255,215,0,0.2)",
            }}
          >
            FEATURES
          </span>
          <h2
            className="font-display font-bold text-4xl md:text-5xl"
            style={{ color: "#f0f0f0", letterSpacing: "-0.03em" }}
          >
            Everything you need to
            <br />
            <span style={{ color: "#FFD700" }}>improve your writing</span>
          </h2>
          <p
            className="mt-4 text-base font-body max-w-xl mx-auto"
            style={{ color: "#666666", lineHeight: 1.7 }}
          >
            PRISM is not another content platform. It is a precision instrument for improving how you think and write.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl p-6 flex flex-col gap-4"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.2)",
                  transition: "border-color 200ms ease, transform 200ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,215,0,0.25)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(255,215,0,0.1)" }}
                >
                  <Icon size={20} style={{ color: "#FFD700" }} />
                </div>

                <h3
                  className="font-display font-bold text-lg"
                  style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}
                >
                  {feature.title}
                </h3>

                <p className="text-sm font-body" style={{ color: "#666666", lineHeight: 1.7 }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
