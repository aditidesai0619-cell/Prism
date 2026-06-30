"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogOut, History, Zap, BookOpen, TrendingUp } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user ?? null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      style={{
        background: scrolled ? "rgba(10,10,10,0.96)" : "rgba(10,10,10,0.7)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        transition: "background 300ms ease, border-color 300ms ease",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="relative w-9 h-9 rounded-full overflow-hidden"
            style={{
              boxShadow: "0 0 12px rgba(255,215,0,0.25)",
              transition: "box-shadow 200ms ease",
            }}
          >
            <Image src="/logo.png" alt="PRISM Logo" fill className="object-cover" />
          </div>
          <span
            className="font-display font-800 text-xl tracking-tight"
            style={{ color: "#FFD700", letterSpacing: "-0.03em" }}
          >
            PRISM
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              <NavLink href="/evaluate" active={isActive("/evaluate")} icon={<Zap size={14} />}>
                Evaluate
              </NavLink>
              <NavLink href="/essay-evaluator" active={isActive("/essay-evaluator")} icon={<BookOpen size={14} />}>
                Essay
              </NavLink>
              <NavLink href="/history" active={isActive("/history")} icon={<History size={14} />}>
                History
              </NavLink>
              <NavLink href="/progress" active={isActive("/progress")} icon={<TrendingUp size={14} />}>
                Progress
              </NavLink>
              <div className="w-px h-5 mx-2" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span className="text-sm font-body mr-3" style={{ color: "#666666" }}>
                {user.email?.split("@")[0]}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body"
                style={{ color: "#666666", transition: "color 150ms ease, background 150ms ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#f0f0f0";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#666666";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink href="/login" active={isActive("/login")}>Login</NavLink>
              <Link
                href="/signup"
                className="ml-2 px-5 py-2 rounded-lg text-sm inline-flex items-center gap-2"
                style={{
                  background: "#FFD700",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  fontFamily: "'League Spartan', sans-serif",
                  transition: "transform 200ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(255,215,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: "#f0f0f0" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-2"
          style={{ background: "rgba(10,10,10,0.98)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          {user ? (
            <>
              <MobileNavLink href="/evaluate" onClick={() => setMenuOpen(false)}>Evaluate</MobileNavLink>
              <MobileNavLink href="/essay-evaluator" onClick={() => setMenuOpen(false)}>Essay Evaluator</MobileNavLink>
              <MobileNavLink href="/history" onClick={() => setMenuOpen(false)}>History</MobileNavLink>
              <MobileNavLink href="/progress" onClick={() => setMenuOpen(false)}>Progress</MobileNavLink>
              <button
                onClick={handleSignOut}
                className="text-left px-4 py-3 rounded-lg text-sm font-body"
                style={{ color: "#e45454" }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <MobileNavLink href="/login" onClick={() => setMenuOpen(false)}>Login</MobileNavLink>
              <MobileNavLink href="/signup" onClick={() => setMenuOpen(false)}>Sign Up</MobileNavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, active, icon }: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-body"
      style={{
        color: active ? "#FFD700" : "#888888",
        background: active ? "rgba(255,215,0,0.08)" : "transparent",
        fontWeight: active ? 500 : 400,
      }}
    >
      {icon}
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-3 rounded-lg text-sm font-body"
      style={{ color: "#f0f0f0", background: "rgba(255,255,255,0.05)" }}
    >
      {children}
    </Link>
  );
}
