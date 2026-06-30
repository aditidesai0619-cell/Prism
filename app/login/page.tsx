import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(255,215,0,0.04) 0%, transparent 50%), #0a0a0a" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
            <span className="font-display font-bold text-3xl" style={{ color: "#FFD700", letterSpacing: "-0.03em" }}>
              PRISM
            </span>
          </Link>
          <h1 className="font-display font-bold text-2xl mb-2" style={{ color: "#f0f0f0", letterSpacing: "-0.03em" }}>
            Welcome back
          </h1>
          <p className="text-sm font-body" style={{ color: "#666666", lineHeight: 1.7 }}>
            Sign in to continue improving your answers
          </p>
        </div>

        <div
          className="rounded-card p-8"
          style={{
            background: "#111111",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
