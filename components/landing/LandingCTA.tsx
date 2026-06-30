"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingCTA() {
  return (
    <section
      className="py-24 px-6 text-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(255,215,0,0.04) 0%, transparent 60%), #0a0a0a",
      }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
        <h2
          className="font-display font-black text-5xl md:text-6xl"
          style={{ color: "#f0f0f0", letterSpacing: "-0.04em", lineHeight: 1.05 }}
        >
          Ready to write like a topper?
        </h2>
        <p
          className="text-base font-body"
          style={{ color: "#666666", lineHeight: 1.7 }}
        >
          Join PRISM and get AI-powered mentor feedback on your UPSC answers.
          No fluff. Just precise, actionable improvement.
        </p>
        <Link
          href="/signup"
          className="flex items-center gap-2 px-10 py-4 rounded-xl text-base font-display font-bold"
          style={{
            background: "#FFD700",
            color: "#0a0a0a",
            boxShadow: "0 0 48px rgba(255,215,0,0.3), 0 8px 24px rgba(255,215,0,0.15)",
            transition: "transform 200ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 64px rgba(255,215,0,0.4), 0 12px 32px rgba(255,215,0,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 48px rgba(255,215,0,0.3), 0 8px 24px rgba(255,215,0,0.15)";
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(0.98)";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
          }}
        >
          Start for Free
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
