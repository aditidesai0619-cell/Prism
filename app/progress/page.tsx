import { prisma } from "@/lib/prisma";
import { ALL_DIMENSIONS } from "@/types";
import ProgressClient from "@/components/progress/ProgressClient";
import { TrendingUp } from "lucide-react";

export default async function ProgressPage() {
  const now = new Date();
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const thisWeekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastWeekStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const [evaluations, essayEvaluations] = await Promise.all([
    prisma.evaluation.findMany({
      orderBy: { createdAt: "asc" },
      select: { score: true, coveredDimensions: true, missingDimensions: true, createdAt: true },
    }),
    prisma.essayEvaluation.findMany({
      orderBy: { createdAt: "asc" },
      select: { score: true, coveredDimensions: true, missingDimensions: true, createdAt: true },
    }),
  ]);

  const allEvals = [
    ...evaluations.map((e) => ({ ...e, type: "answer" as const })),
    ...essayEvaluations.map((e) => ({ ...e, type: "essay" as const })),
  ].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  // Chart data — last 90 days
  const chartData = allEvals
    .filter((e) => e.createdAt >= ninetyDaysAgo)
    .map((e) => ({
      date: e.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      score: e.score,
      type: e.type,
    }));

  // Week stats
  const thisWeekEvals = allEvals.filter((e) => e.createdAt >= thisWeekStart);
  const lastWeekEvals = allEvals.filter(
    (e) => e.createdAt >= lastWeekStart && e.createdAt < thisWeekStart
  );
  const thisWeekCount = thisWeekEvals.length;
  const thisWeekAvg =
    thisWeekEvals.length > 0
      ? thisWeekEvals.reduce((a, e) => a + e.score, 0) / thisWeekEvals.length
      : null;
  const lastWeekAvg =
    lastWeekEvals.length > 0
      ? lastWeekEvals.reduce((a, e) => a + e.score, 0) / lastWeekEvals.length
      : null;

  // Progress % (week-over-week)
  const progressPct =
    thisWeekAvg !== null && lastWeekAvg !== null && lastWeekAvg > 0
      ? ((thisWeekAvg - lastWeekAvg) / lastWeekAvg) * 100
      : null;

  // Dimension coverage percentages
  const total = allEvals.length || 1;
  const coveredCounts: Record<string, number> = {};
  const missingCounts: Record<string, number> = {};
  ALL_DIMENSIONS.forEach((d) => {
    coveredCounts[d] = 0;
    missingCounts[d] = 0;
  });
  allEvals.forEach((e) => {
    e.coveredDimensions.forEach((d) => { coveredCounts[d] = (coveredCounts[d] ?? 0) + 1; });
    e.missingDimensions.forEach((d) => { missingCounts[d] = (missingCounts[d] ?? 0) + 1; });
  });
  const dimensionCoverage: Record<string, number> = {};
  ALL_DIMENSIONS.forEach((d) => {
    dimensionCoverage[d] = Math.round((coveredCounts[d] / total) * 100);
  });
  const sortedDimensions = ALL_DIMENSIONS.slice().sort(
    (a, b) => dimensionCoverage[b] - dimensionCoverage[a]
  );

  // Daily activity — last 7 days
  const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dailyActivity: { day: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const dayStart = new Date(now);
    dayStart.setDate(now.getDate() - i);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);
    const count = allEvals.filter((e) => e.createdAt >= dayStart && e.createdAt <= dayEnd).length;
    dailyActivity.push({ day: DAY_LABELS[dayStart.getDay()], count });
  }

  // Weekly bar chart — current Sun-Sat week
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);
  const weeklyBarData: { day: string; count: number }[] = DAY_LABELS.map((label, i) => {
    const dayStart = new Date(weekStart);
    dayStart.setDate(weekStart.getDate() + i);
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);
    const count = allEvals.filter((e) => e.createdAt >= dayStart && e.createdAt <= dayEnd).length;
    return { day: label, count };
  });

  // Overall mastery — covered vs missing mentions
  let totalCovered = 0;
  let totalMissing = 0;
  allEvals.forEach((e) => {
    totalCovered += e.coveredDimensions.length;
    totalMissing += e.missingDimensions.length;
  });
  const overallMasteryPct =
    totalCovered + totalMissing > 0
      ? Math.round((totalCovered / (totalCovered + totalMissing)) * 100)
      : 0;

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: "#f2f2f2" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="py-8 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} style={{ color: "#666666" }} />
            <span className="text-xs font-body uppercase tracking-widest" style={{ color: "#999999" }}>
              Analytics
            </span>
          </div>
          <h1
            className="font-display font-black text-3xl md:text-4xl"
            style={{ color: "#0a0a0a", letterSpacing: "-0.04em" }}
          >
            Your Dashboard
          </h1>
          <p className="text-sm font-body" style={{ color: "#888888" }}>
            UPSC prep stats at a glance
          </p>
        </div>

        {allEvals.length === 0 ? (
          <div
            className="rounded-2xl p-16 flex flex-col items-center justify-center text-center gap-4 bg-white"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
          >
            <TrendingUp size={40} style={{ color: "#cccccc" }} />
            <h3 className="font-display font-bold text-xl" style={{ color: "#0a0a0a" }}>
              No data yet
            </h3>
            <p className="text-sm font-body" style={{ color: "#888888" }}>
              Complete at least one evaluation or essay to see your dashboard.
            </p>
          </div>
        ) : (
          <ProgressClient
            chartData={chartData}
            thisWeekAvg={thisWeekAvg}
            lastWeekAvg={lastWeekAvg}
            thisWeekCount={thisWeekCount}
            progressPct={progressPct}
            dimensionCoverage={dimensionCoverage}
            sortedDimensions={sortedDimensions}
            dailyActivity={dailyActivity}
            weeklyBarData={weeklyBarData}
            totalCovered={totalCovered}
            totalMissing={totalMissing}
            overallMasteryPct={overallMasteryPct}
            totalEvaluations={allEvals.length}
          />
        )}
      </div>
    </div>
  );
}
