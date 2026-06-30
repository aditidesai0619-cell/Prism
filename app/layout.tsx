export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { League_Spartan, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/components/layout/Providers";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRISM — AI-Powered UPSC Answer Writing Coach",
  description:
    "Write better. Think better. Score higher. AI-powered UPSC answer evaluation with mentor-level feedback, dimension analysis, and improvement tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${roboto.variable}`}>
      <body className="antialiased font-body" style={{ background: "#0a0a0a", color: "#f0f0f0" }}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
