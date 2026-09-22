"use client";

import { motion } from "framer-motion";
import { Goal } from "@/lib/routines";

interface GoalCardProps {
  goal: Goal;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function GoalCard({ goal, selected, onSelect }: GoalCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(goal.id)}
      className="relative rounded-2xl p-5 text-left w-full overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        background: selected
          ? `linear-gradient(135deg, ${goal.colorFrom}22, ${goal.colorTo}33)`
          : "var(--bg-card)",
        border: selected
          ? `1px solid ${goal.colorFrom}66`
          : "1px solid var(--border-subtle)",
        boxShadow: selected
          ? `0 0 24px ${goal.colorFrom}30, 0 8px 32px rgba(0,0,0,0.3)`
          : "none",
      }}
    >
      {/* Background glow when selected */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, ${goal.colorFrom}18 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Check indicator */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-xs"
          style={{
            background: `linear-gradient(135deg, ${goal.colorFrom}, ${goal.colorTo})`,
          }}
        >
          ✓
        </motion.div>
      )}

      {/* Icon */}
      <div
        className="text-3xl mb-3 w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${goal.colorFrom}22, ${goal.colorTo}33)`,
        }}
      >
        {goal.icon}
      </div>

      {/* Title */}
      <h3
        className="font-display font-semibold text-base leading-tight mb-1"
        style={{ color: selected ? goal.textColor : "var(--text-primary)" }}
      >
        {goal.title}
      </h3>

      {/* Tagline */}
      <p
        className="text-xs leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {goal.tagline}
      </p>

      {/* Pose count */}
      <div
        className="mt-3 text-xs font-medium px-2 py-0.5 rounded-full inline-block"
        style={{
          background: `${goal.colorFrom}22`,
          color: goal.textColor,
        }}
      >
        {goal.poses.length} poses
      </div>
    </motion.button>
  );
}
