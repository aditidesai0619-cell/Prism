"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ChartPoint {
  date: string;
  score: number;
  type: "answer" | "essay";
}

interface Props {
  chartData: ChartPoint[];
  thisWeekAvg: number | null;
  lastWeekAvg: number | null;
  thisWeekCount: number;
  progressPct: number | null;
  dimensionCoverage: Record<string, number>;
  sortedDimensions: string[];
  dailyActivity: { day: string; count: number }[];
  weeklyBarData: { day: string; count: number }[];
  totalCovered: number;
  totalMissing: number;
  overallMasteryPct: number;
  totalEvaluations: number;
}

const CARD_SHADOW = "0 1px 4px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.07)";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScoreTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 8,
        padding: "6px 10px",
      }}
    >
      <p style={{ color: "#777", fontSize: 11, marginBottom: 2 }}>{label}</p>
      <p style={{ color: "#fff", fontSize: 12 }}>
        {payload[0].value}/10
      </p>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.75)",
        borderRadius: 6,
        padding: "5px 9px",
      }}
    >
      <p style={{ color: "#fff", fontSize: 12 }}>
        {label}: {payload[0].value} eval{payload[0].value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

export default function ProgressClient({
  chartData,
  thisWeekAvg,
  lastWeekAvg,
  thisWeekCount,
  progressPct,
  dimensionCoverage,
  sortedDimensions,
  dailyActivity,
  weeklyBarData,
  totalCovered,
  totalMissing,
  overallMasteryPct,
  totalEvaluations,
}: Props) {
  const progressLabel =
    progressPct !== null
      ? progressPct >= 0
        ? `↑${Math.abs(Math.round(progressPct))}%`
        : `↓${Math.abs(Math.round(progressPct))}%`
      : thisWeekAvg !== null
      ? `${thisWeekAvg.toFixed(1)}`
      : "—";

  const maxDailyCount = Math.max(...dailyActivity.map((d) => d.count), 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
      {/* Card 1 — Progress (lime green) */}
      <div
        className="rounded-2xl p-6 flex flex-col justify-between"
        style={{
          background: "#AAFF44",
          boxShadow: CARD_SHADOW,
          minHeight: 240,
        }}
      >
        <div>
          <p
            className="text-xs font-body uppercase tracking-widest font-semibold"
            style={{ color: "rgba(0,0,0,0.45)" }}
          >
            Progress
          </p>
          <p className="text-xs font-body mt-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>
            Week over week
          </p>
        </div>
        <div>
          <p
            className="font-display font-black"
            style={{
              fontSize: 58,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: progressPct !== null && progressPct < 0 ? "#c0392b" : "#0a0a0a",
            }}
          >
            {progressLabel}
          </p>
          <p className="text-sm font-body mt-2" style={{ color: "rgba(0,0,0,0.5)" }}>
            Current Direction
          </p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-body" style={{ color: "rgba(0,0,0,0.4)" }}>
            This week avg:{" "}
            <span style={{ fontWeight: 600 }}>
              {thisWeekAvg !== null ? `${thisWeekAvg.toFixed(1)}/10` : "—"}
            </span>
          </p>
          <p className="text-xs font-body" style={{ color: "rgba(0,0,0,0.4)" }}>
            Last week avg:{" "}
            <span style={{ fontWeight: 600 }}>
              {lastWeekAvg !== null ? `${lastWeekAvg.toFixed(1)}/10` : "—"}
            </span>
          </p>
        </div>
      </div>

      {/* Card 2 — Dimension Coverage (dark) */}
      <div
        className="rounded-2xl p-6 md:col-span-2"
        style={{
          background: "#111111",
          boxShadow: CARD_SHADOW,
          minHeight: 240,
        }}
      >
        <p
          className="text-xs font-body uppercase tracking-widest font-semibold mb-4"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Dimension Coverage
        </p>
        <div className="flex flex-col gap-2.5">
          {sortedDimensions.map((dim) => (
            <div key={dim} className="flex items-center gap-3">
              <span
                className="text-xs font-body flex-shrink-0"
                style={{ color: "rgba(255,255,255,0.55)", width: 96 }}
              >
                {dim}
              </span>
              <div
                className="flex-1 rounded-full"
                style={{ height: 5, background: "rgba(255,255,255,0.07)" }}
              >
                <div
                  className="rounded-full"
                  style={{
                    height: 5,
                    width: `${dimensionCoverage[dim]}%`,
                    background:
                      dimensionCoverage[dim] >= 70
                        ? "#AAFF44"
                        : dimensionCoverage[dim] >= 40
                        ? "#FFD700"
                        : "rgba(255,255,255,0.35)",
                    transition: "width 600ms ease",
                  }}
                />
              </div>
              <span
                className="text-xs font-body flex-shrink-0 text-right"
                style={{ color: "rgba(255,255,255,0.3)", width: 32 }}
              >
                {dimensionCoverage[dim]}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3 — Evaluations This Week (white) */}
      <div
        className="rounded-2xl p-6 flex flex-col justify-between"
        style={{
          background: "#FFFFFF",
          boxShadow: CARD_SHADOW,
          minHeight: 220,
        }}
      >
        <p
          className="text-xs font-body uppercase tracking-widest font-semibold"
          style={{ color: "rgba(0,0,0,0.35)" }}
        >
          Evaluations This Week
        </p>
        <div>
          <p
            className="font-display font-black"
            style={{ fontSize: 72, lineHeight: 1, letterSpacing: "-0.05em", color: "#0a0a0a" }}
          >
            {thisWeekCount}
          </p>
          <p className="text-xs font-body mt-1" style={{ color: "rgba(0,0,0,0.35)" }}>
            {totalEvaluations} total
          </p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 4,
              height: 40,
            }}
          >
            {dailyActivity.map(({ day, count }) => {
              const barH = count === 0 ? 3 : Math.max(8, (count / maxDailyCount) * 36);
              return (
                <div
                  key={day}
                  style={{
                    flex: 1,
                    height: barH,
                    borderRadius: 3,
                    background: count > 0 ? "#0a0a0a" : "rgba(0,0,0,0.1)",
                  }}
                />
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 5 }}>
            {dailyActivity.map(({ day }) => (
              <span
                key={day}
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 9,
                  color: "rgba(0,0,0,0.3)",
                  fontFamily: "sans-serif",
                }}
              >
                {day[0]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card 4 — Score Trend (white) */}
      <div
        className="rounded-2xl p-6 md:col-span-2"
        style={{
          background: "#FFFFFF",
          boxShadow: CARD_SHADOW,
          minHeight: 220,
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p
              className="text-xs font-body uppercase tracking-widest font-semibold"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              Score Trend
            </p>
            <p className="text-xs font-body mt-0.5" style={{ color: "rgba(0,0,0,0.25)" }}>
              Last 3 months
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-body" style={{ color: "rgba(0,0,0,0.35)" }}>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-4 rounded-full"
                style={{ height: 2, background: "#0a0a0a" }}
              />
              Answer
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-4 rounded-full"
                style={{ height: 2, background: "#aaaaaa" }}
              />
              Essay
            </span>
          </div>
        </div>
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center" style={{ height: 140 }}>
            <p className="text-sm font-body" style={{ color: "rgba(0,0,0,0.25)" }}>
              No data in the last 3 months
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={chartData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <XAxis
                dataKey="date"
                tick={{ fill: "rgba(0,0,0,0.3)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis domain={[0, 10]} ticks={[0, 5, 10]} tick={{ fill: "rgba(0,0,0,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ScoreTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#0a0a0a"
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  const color = payload.type === "essay" ? "#aaaaaa" : "#0a0a0a";
                  return (
                    <circle
                      key={`dot-${cx}-${cy}`}
                      cx={cx}
                      cy={cy}
                      r={3}
                      fill={color}
                      stroke={color}
                    />
                  );
                }}
                activeDot={{ r: 5, fill: "#0a0a0a", stroke: "rgba(0,0,0,0.2)", strokeWidth: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Card 5 — Weekly Activity bar chart (orange) */}
      <div
        className="rounded-2xl p-6 md:col-span-2"
        style={{
          background: "#FF6B35",
          boxShadow: CARD_SHADOW,
          minHeight: 220,
        }}
      >
        <p
          className="text-xs font-body uppercase tracking-widest font-semibold mb-1"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Dimension Mastery
        </p>
        <p className="text-xs font-body mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
          Evaluations per day — this week
        </p>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={weeklyBarData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <XAxis
              dataKey="day"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(255,255,255,0.08)" }} />
            <Bar
              dataKey="count"
              fill="rgba(255,255,255,0.9)"
              radius={[5, 5, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Card 6 — Overall Mastery donut (pale yellow) */}
      <div
        className="rounded-2xl p-6 flex flex-col items-center justify-between"
        style={{
          background: "#FFF3A0",
          boxShadow: CARD_SHADOW,
          minHeight: 220,
        }}
      >
        <p
          className="text-xs font-body uppercase tracking-widest font-semibold self-start"
          style={{ color: "rgba(0,0,0,0.4)" }}
        >
          Overall Mastery
        </p>
        <div className="relative flex items-center justify-center">
          <PieChart width={148} height={148}>
            <Pie
              data={[
                { name: "Covered", value: totalCovered || 1 },
                { name: "Missing", value: totalMissing || 0 },
              ]}
              cx={74}
              cy={74}
              innerRadius={46}
              outerRadius={66}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
            >
              <Cell fill="#0a0a0a" />
              <Cell fill="rgba(0,0,0,0.12)" />
            </Pie>
          </PieChart>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ pointerEvents: "none" }}
          >
            <span
              className="font-display font-black"
              style={{ fontSize: 26, color: "#0a0a0a", letterSpacing: "-0.04em" }}
            >
              {overallMasteryPct}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: "#0a0a0a" }}
            />
            <span className="text-xs font-body" style={{ color: "rgba(0,0,0,0.55)" }}>
              Covered
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: "rgba(0,0,0,0.15)" }}
            />
            <span className="text-xs font-body" style={{ color: "rgba(0,0,0,0.55)" }}>
              Missing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
