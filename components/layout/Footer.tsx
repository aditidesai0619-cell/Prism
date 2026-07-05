"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t py-12 px-6"
      style={{ borderColor: "rgba(255,255,255,0.07)", background: "#0a0a0a" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span
            className="font-display font-bold text-lg"
            style={{ color: "#FFD700", letterSpacing: "-0.03em" }}
          >
            PRISM
          </span>
          <p className="text-sm font-body" style={{ color: "#555555" }}>
            AI-powered UPSC answer writing coach
          </p>
        </div>

        <div className="flex items-center gap-8 text-sm font-body" style={{ color: "#555555" }}>
          <Link
            href="/evaluate"
            style={{ color: "#555555", transition: "color 150ms ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#f0f0f0"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#555555"; }}
          >
            Evaluate
          </Link>
          <Link
            href="/history"
            style={{ color: "#555555", transition: "color 150ms ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#f0f0f0"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#555555"; }}
          >
            History
          </Link>
          <Link
            href="/progress"
            style={{ color: "#555555", transition: "color 150ms ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#f0f0f0"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#555555"; }}
          >
            Progress
          </Link>
        </div>

        <p className="text-xs font-body" style={{ color: "#333333" }}>
          &copy; {new Date().getFullYear()} PRISM. Built to help India&apos;s next civil servants.
        </p>
      </div>
    </footer>
  );
}
