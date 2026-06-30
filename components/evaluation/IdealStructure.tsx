"use client";

import { useState } from "react";
import { ChevronDown, Layers } from "lucide-react";

interface Props {
  idealStructure: string;
}

export default function IdealStructure({ idealStructure }: Props) {
  const [open, setOpen] = useState(false);

  if (!idealStructure) return null;

  // Parse pipe-separated sections into structured display
  const sections = idealStructure.split("|").map((s) => s.trim()).filter(Boolean);

  return (
    <div
      className="rounded-card overflow-hidden"
      style={{ background: "#111111", border: "1px solid rgba(255,215,0,0.1)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
        style={{ transition: "background 150ms ease" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,215,0,0.03)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      >
        <div className="flex items-center gap-2">
          <Layers size={14} style={{ color: "#FFD700" }} />
          <span className="text-sm font-display font-bold" style={{ color: "#f0f0f0", letterSpacing: "-0.01em" }}>
            View Ideal Answer Structure
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-body"
            style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.2)" }}
          >
            Framework
          </span>
        </div>
        <ChevronDown
          size={16}
          style={{
            color: "#555555",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 200ms ease",
          }}
        />
      </button>

      {open && (
        <div
          className="px-5 pb-5 flex flex-col gap-3 border-t"
          style={{ borderColor: "rgba(255,215,0,0.08)" }}
        >
          <p className="text-xs font-body pt-4" style={{ color: "#555555" }}>
            This is a structural skeleton — not a full answer. Use it as a writing blueprint.
          </p>

          {sections.length > 1 ? (
            <div className="flex flex-col gap-3">
              {sections.map((section, i) => {
                const colonIdx = section.indexOf(":");
                const label = colonIdx > -1 ? section.slice(0, colonIdx).trim() : null;
                const content = colonIdx > -1 ? section.slice(colonIdx + 1).trim() : section;
                const bullets = content.split("•").map((b) => b.trim()).filter(Boolean);

                return (
                  <div key={i} className="flex flex-col gap-1.5">
                    {label && (
                      <span className="text-xs font-body font-medium uppercase tracking-wide" style={{ color: "#FFD700" }}>
                        {label}
                      </span>
                    )}
                    {bullets.length > 1 ? (
                      <ul className="flex flex-col gap-1">
                        {bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs font-body" style={{ color: "#999999", lineHeight: 1.7 }}>
                            <span style={{ color: "rgba(255,215,0,0.5)", marginTop: 2 }}>▸</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs font-body" style={{ color: "#999999", lineHeight: 1.7 }}>
                        {content}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm font-body" style={{ color: "#999999", lineHeight: 1.7 }}>
              {idealStructure}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
