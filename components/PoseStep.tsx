"use client";

import { motion } from "framer-motion";
import { Pose } from "@/lib/routines";

import PoseIllustration from "./PoseIllustration";

interface PoseStepProps {
  pose: Pose;
  index: number;
  isLast: boolean;
  accentColor: string;
  accentText: string;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

export default function PoseStep({
  pose,
  index,
  isLast,
  accentColor,
  accentText,
}: PoseStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="relative flex gap-4"
    >
      {/* Timeline line */}
      {!isLast && (
        <div
          className="absolute left-5 top-10 bottom-0 w-px"
          style={{ background: `${accentColor}30` }}
        />
      )}

      {/* Step number circle */}
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-display z-10"
        style={{
          background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)`,
          border: `1px solid ${accentColor}44`,
          color: accentText,
        }}
      >
        {index + 1}
      </div>

      {/* Content */}
      <div
        className="flex-1 rounded-xl p-4 mb-3 flex flex-col sm:flex-row gap-4"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {/* Visual Illustration */}
        <div className="w-full sm:w-24 h-32 sm:h-24 bg-secondary/10 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
          <PoseIllustration poseId={pose.id} className="w-full h-full p-2" />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4
                className="font-display font-semibold text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                {pose.name}
              </h4>
              {pose.sanskrit && (
                <p
                  className="text-xs italic mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {pose.sanskrit}
                </p>
              )}
            </div>
            <span
              className="text-xs font-mono font-medium px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: `${accentColor}22`,
                color: accentText,
              }}
            >
              {formatDuration(pose.duration)}
            </span>
          </div>

          <p
            className="text-xs mt-2 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {pose.description}
          </p>

          {/* Breath cue */}
          {pose.breathCue && (
            <div
              className="mt-2 flex items-center gap-1.5 text-xs"
              style={{ color: accentText }}
            >
              <span style={{ opacity: 0.7 }}>🌬</span>
              <span style={{ opacity: 0.9 }}>{pose.breathCue}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
