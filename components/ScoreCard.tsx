"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Goal, Pose, getTotalDuration } from "@/lib/routines";

interface ScoreCardProps {
  goal: Goal;
  completedPoses: number;
  totalPoses: number;
  timeElapsed: number;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function getScore(completed: number, total: number): number {
  return Math.round((completed / total) * 100);
}

function getMessage(score: number): { emoji: string; title: string; subtitle: string } {
  if (score === 100)
    return {
      emoji: "🏆",
      title: "Perfect Session!",
      subtitle: "You completed every pose. Your body thanks you.",
    };
  if (score >= 80)
    return {
      emoji: "🌟",
      title: "Outstanding Work!",
      subtitle: "Nearly there — consistency builds the practice.",
    };
  if (score >= 60)
    return {
      emoji: "🌿",
      title: "Great Effort!",
      subtitle: "Every breath, every pose — it all counts.",
    };
  return {
    emoji: "✨",
    title: "You Showed Up!",
    subtitle: "Showing up is the hardest part. Keep coming back.",
  };
}

export default function ScoreCard({
  goal,
  completedPoses,
  totalPoses,
  timeElapsed,
}: ScoreCardProps) {
  const score = getScore(completedPoses, totalPoses);
  const msg = getMessage(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl p-8 text-center max-w-sm w-full mx-auto"
      style={{
        background: `linear-gradient(135deg, ${goal.colorFrom}18, ${goal.colorTo}28)`,
        border: `1px solid ${goal.colorFrom}44`,
        boxShadow: `0 0 48px ${goal.colorFrom}20`,
      }}
    >
      {/* Emoji */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        className="text-6xl mb-4"
      >
        {msg.emoji}
      </motion.div>

      {/* Score ring */}
      <div className="relative w-28 h-28 mx-auto mb-6">
        <svg width="112" height="112" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="56" cy="56" r="46" fill="none" stroke="var(--border-subtle)" strokeWidth="8" />
          <motion.circle
            cx="56"
            cy="56"
            r="46"
            fill="none"
            stroke={goal.colorFrom}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 46}
            initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 46 * (1 - score / 100) }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display font-bold text-2xl"
            style={{ color: "var(--text-primary)" }}
          >
            {score}%
          </span>
        </div>
      </div>

      {/* Title */}
      <h2
        className="font-display font-bold text-2xl mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {msg.title}
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
        {msg.subtitle}
      </p>

      {/* Stats row */}
      <div
        className="grid grid-cols-3 gap-3 mb-6 rounded-xl p-3"
        style={{ background: "rgba(255,255,255,0.5)" }}
      >
        <div>
          <div
            className="font-display font-bold text-lg"
            style={{ color: goal.textColor }}
          >
            {completedPoses}
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            poses done
          </div>
        </div>
        <div>
          <div
            className="font-display font-bold text-lg"
            style={{ color: goal.textColor }}
          >
            {formatDuration(timeElapsed)}
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            time spent
          </div>
        </div>
        <div>
          <div
            className="font-display font-bold text-lg"
            style={{ color: goal.textColor }}
          >
            {goal.icon}
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            {goal.title}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link href="/practice" className="btn-glow px-6 py-3 rounded-xl text-sm font-display font-semibold text-center block">
          Practice Again
        </Link>
        <Link
          href="/"
          className="text-sm text-center"
          style={{ color: "var(--text-muted)" }}
        >
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
}
