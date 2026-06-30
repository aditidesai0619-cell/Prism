"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const GRID_CARDS = [
  { text: "Discuss the constitutional provisions related to environmental protection in India.", score: "8.5", dim: "Constitutional · Environmental" },
  { text: "Analyze India's foreign policy shifts in the post-Cold War era.", score: "7.0", dim: "Political · International" },
  { text: "Critically examine the role of civil society in strengthening democracy.", score: "9.0", dim: "Governance · Social" },
  { text: "The Green Revolution solved India's food crisis but created new problems. Examine.", score: "6.5", dim: "Economic · Environmental" },
  { text: "Women's political participation: challenges and opportunities in India.", score: "8.0", dim: "Gender · Governance" },
  { text: "Explain how ethical leadership can transform public administration.", score: "7.5", dim: "Ethical · Governance" },
  { text: "Digital India: opportunities, challenges, and the way forward.", score: "8.5", dim: "Technological · Economic" },
  { text: "Naxalism in India: socio-economic roots and policy responses.", score: "7.0", dim: "Security · Social" },
  { text: "Globalization and its impact on Indian culture and values.", score: "6.5", dim: "Cultural · International" },
  { text: "Discuss the significance of the Preamble of the Indian Constitution.", score: "9.0", dim: "Constitutional · Historical" },
  { text: "Role of media in shaping public opinion — a double-edged sword.", score: "7.5", dim: "Social · Political" },
  { text: "India's renewable energy goals: progress and challenges.", score: "8.0", dim: "Environmental · Economic" },
];

function GridCard({ card }: { card: typeof GRID_CARDS[0] }) {
  return (
    <div
      className="rounded-xl p-4 min-w-[240px] max-w-[240px] flex flex-col gap-3"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        opacity: 0.75,
      }}
    >
      <p
        className="text-xs font-body leading-relaxed line-clamp-3"
        style={{ color: "#888888", lineHeight: 1.6 }}
      >
        {card.text}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-body"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#666666",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {card.dim}
        </span>
        <span
          className="text-sm font-display font-bold"
          style={{ color: "#FFD700" }}
        >
          {card.score}
        </span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const row1 = [...GRID_CARDS.slice(0, 6), ...GRID_CARDS.slice(0, 6)];
  const row2 = [...GRID_CARDS.slice(6), ...GRID_CARDS.slice(6)];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      style={{ background: "#0a0a0a" }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Row 1 — scrolls right */}
        <div
          className="absolute top-[10%] flex gap-4"
          style={{ animation: "scrollX 50s linear infinite", willChange: "transform" }}
        >
          {row1.map((card, i) => (
            <GridCard key={`r1-${i}`} card={card} />
          ))}
        </div>

        {/* Row 2 — scrolls left */}
        <div
          className="absolute top-[38%] flex gap-4"
          style={{ animation: "scrollX 65s linear infinite reverse", willChange: "transform" }}
        >
          {row2.map((card, i) => (
            <GridCard key={`r2-${i}`} card={card} />
          ))}
        </div>

        {/* Row 3 — scrolls right */}
        <div
          className="absolute top-[66%] flex gap-4"
          style={{ animation: "scrollX 45s linear infinite", willChange: "transform" }}
        >
          {row1.map((card, i) => (
            <GridCard key={`r3-${i}`} card={card} />
          ))}
        </div>

        {/* Gradient fade overlays — edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0a0a0a 0%, transparent 20%, transparent 80%, #0a0a0a 100%), linear-gradient(to right, #0a0a0a 0%, transparent 10%, transparent 90%, #0a0a0a 100%)",
          }}
        />
        {/* Center fade for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0.88) 25%, transparent 70%)",
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto gap-8">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body"
          style={{
            background: "rgba(255,215,0,0.08)",
            border: "1px solid rgba(255,215,0,0.2)",
            color: "#FFD700",
            animation: "fadeUp 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}
        >
          <Sparkles size={12} />
          AI-Powered · Mentor-Level Feedback · 14 Dimensions
        </div>

        {/* Headline */}
        <h1
          className="font-display font-black text-5xl md:text-7xl text-balance"
          style={{
            color: "#f0f0f0",
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            animation: "fadeUp 0.5s 80ms cubic-bezier(0.34,1.56,0.64,1) forwards",
            opacity: 0,
          }}
        >
          Write Better.{" "}
          <span style={{ color: "#FFD700" }}>Think Better.</span>{" "}
          Score Higher.
        </h1>

        {/* Subheadline */}
        <p
          className="text-base md:text-lg font-body max-w-2xl text-balance"
          style={{
            color: "#888888",
            lineHeight: 1.7,
            animation: "fadeUp 0.5s 160ms cubic-bezier(0.34,1.56,0.64,1) forwards",
            opacity: 0,
          }}
        >
          AI-powered UPSC answer evaluation with mentor-level feedback, dimension analysis, and improvement tracking.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4"
          style={{
            animation: "fadeUp 0.5s 240ms cubic-bezier(0.34,1.56,0.64,1) forwards",
            opacity: 0,
          }}
        >
          <Link
            href="/evaluate"
            className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-display font-bold"
            style={{
              background: "#FFD700",
              color: "#0a0a0a",
              boxShadow: "0 0 32px rgba(255,215,0,0.35), 0 4px 12px rgba(255,215,0,0.15)",
              transition: "transform 200ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 48px rgba(255,215,0,0.45), 0 8px 24px rgba(255,215,0,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(255,215,0,0.35), 0 4px 12px rgba(255,215,0,0.15)";
            }}
          >
            Start Evaluating
            <ArrowRight size={18} />
          </Link>

          <Link
            href="#sample"
            className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-body font-medium"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "#999999",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "background 200ms ease, color 200ms ease, border-color 200ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLElement).style.color = "#f0f0f0";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLElement).style.color = "#999999";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            View Demo
          </Link>
        </div>

        {/* Stats bar */}
        <div
          className="flex items-center gap-8 pt-4"
          style={{
            animation: "fadeUp 0.5s 320ms cubic-bezier(0.34,1.56,0.64,1) forwards",
            opacity: 0,
          }}
        >
          {[
            { value: "14", label: "Dimensions Analyzed" },
            { value: "AI", label: "Mentor-Level" },
            { value: "∞", label: "Rewrites & Tracking" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span
                className="font-display font-bold text-2xl"
                style={{ color: "#FFD700", letterSpacing: "-0.03em" }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-body" style={{ color: "#666666" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0a0a0a)" }}
      />
    </section>
  );
}
