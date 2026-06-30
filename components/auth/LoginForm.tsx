"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/evaluate");
    router.refresh();
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-5">
      {error && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body"
          style={{
            background: "rgba(228,84,84,0.1)",
            border: "1px solid rgba(228,84,84,0.3)",
            color: "#e45454",
          }}
        >
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-body font-medium" style={{ color: "#999999" }}>
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 rounded-lg text-sm font-body outline-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#f0f0f0",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#FFD700";
            e.target.style.boxShadow = "0 0 0 3px rgba(255,215,0,0.08)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.1)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-body font-medium" style={{ color: "#999999" }}>
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 pr-12 rounded-lg text-sm font-body outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f0f0f0",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#FFD700";
              e.target.style.boxShadow = "0 0 0 3px rgba(255,215,0,0.08)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.1)";
              e.target.style.boxShadow = "none";
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
            style={{ color: "#666666" }}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        style={{
          background: "#FFD700",
          color: "#0a0a0a",
          fontWeight: 700,
          fontFamily: "'League Spartan', sans-serif",
          boxShadow: "0 0 24px rgba(255,215,0,0.2), 0 4px 12px rgba(255,215,0,0.1)",
          transition: "transform 200ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = "scale(1.01)";
            e.currentTarget.style.boxShadow = "0 0 32px rgba(255,215,0,0.3), 0 8px 24px rgba(255,215,0,0.15)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 0 24px rgba(255,215,0,0.2), 0 4px 12px rgba(255,215,0,0.1)";
        }}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {loading ? "Signing in…" : "Sign In"}
      </button>

      <p className="text-sm text-center font-body" style={{ color: "#666666" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium" style={{ color: "#FFD700" }}>
          Create one
        </Link>
      </p>
    </form>
  );
}
