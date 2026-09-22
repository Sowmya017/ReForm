"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { goals, Goal, getTotalDuration } from "@/lib/routines";
import GoalCard from "@/components/GoalCard";
import PoseStep from "@/components/PoseStep";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

export default function PracticeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  // Pre-select goal from URL param
  useEffect(() => {
    const goalId = searchParams.get("goal");
    if (goalId) {
      const found = goals.find((g) => g.id === goalId);
      if (found) setSelectedGoal(found);
    }
  }, [searchParams]);

  function handleSelect(id: string) {
    const found = goals.find((g) => g.id === id) ?? null;
    setSelectedGoal((prev) => (prev?.id === id ? null : found));
    // Update URL without navigation
    if (found) {
      window.history.replaceState({}, "", `/practice?goal=${id}`);
    } else {
      window.history.replaceState({}, "", `/practice`);
    }
  }

  return (
    <>
      {/* Orb bg */}
      <div
        className="orb w-96 h-96 -top-24 -right-24 opacity-20"
        style={{ background: selectedGoal ? selectedGoal.colorFrom : "var(--accent-primary)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--accent-primary)" }}
          >
            Step 1 of 2
          </p>
          <h1
            className="font-display font-black text-4xl sm:text-5xl mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            What&apos;s your{" "}
            <span className="gradient-text">intention today?</span>
          </h1>
          <p className="text-base max-w-lg" style={{ color: "var(--text-secondary)" }}>
            Choose a wellness goal and we&apos;ll build your personalized practice for you.
          </p>
        </motion.div>

        {/* Goal grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {goals.map((goal, i) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <GoalCard
                goal={goal}
                selected={selectedGoal?.id === goal.id}
                onSelect={handleSelect}
              />
            </motion.div>
          ))}
        </div>

        {/* Routine Panel */}
        <AnimatePresence mode="wait">
          {selectedGoal && (
            <motion.div
              key={selectedGoal.id}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${selectedGoal.colorFrom}12, ${selectedGoal.colorTo}20)`,
                border: `1px solid ${selectedGoal.colorFrom}33`,
              }}
            >
              {/* Routine header */}
              <div
                className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{
                  borderBottom: `1px solid ${selectedGoal.colorFrom}22`,
                  background: `linear-gradient(135deg, ${selectedGoal.colorFrom}20, ${selectedGoal.colorTo}30)`,
                }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{selectedGoal.icon}</span>
                    <h2
                      className="font-display font-bold text-xl"
                      style={{ color: selectedGoal.textColor }}
                    >
                      {selectedGoal.title} Routine
                    </h2>
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {selectedGoal.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div
                    className="text-sm px-3 py-1 rounded-full"
                    style={{
                      background: `${selectedGoal.colorFrom}22`,
                      color: selectedGoal.textColor,
                    }}
                  >
                    {selectedGoal.poses.length} poses
                  </div>
                  <div
                    className="text-sm px-3 py-1 rounded-full"
                    style={{
                      background: `${selectedGoal.colorFrom}22`,
                      color: selectedGoal.textColor,
                    }}
                  >
                    ⏱ {formatDuration(getTotalDuration(selectedGoal.poses))}
                  </div>
                </div>
              </div>

              {/* Poses */}
              <div className="p-6">
                <div className="mb-6">
                  {selectedGoal.poses.map((pose, i) => (
                    <PoseStep
                      key={pose.id}
                      pose={pose}
                      index={i}
                      isLast={i === selectedGoal.poses.length - 1}
                      accentColor={selectedGoal.colorFrom}
                      accentText={selectedGoal.textColor}
                    />
                  ))}
                </div>

                {/* Start button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 items-center"
                >
                  <Link
                    href={`/session?goal=${selectedGoal.id}`}
                    id="start-session-btn"
                    className="btn-glow px-8 py-4 text-base rounded-xl font-display font-bold w-full sm:w-auto text-center"
                  >
                    🧠 Start AI Session
                  </Link>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Camera access will be requested · Runs fully on device
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!selectedGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-3">☝️</div>
            <p className="font-display font-medium text-lg" style={{ color: "var(--text-muted)" }}>
              Select a goal above to see your personalized routine
            </p>
          </motion.div>
        )}
      </div>
    </>
  );
}
