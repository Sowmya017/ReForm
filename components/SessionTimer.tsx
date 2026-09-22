"use client";

import { useEffect, useRef } from "react";

interface SessionTimerProps {
  totalSeconds: number;
  remainingSeconds: number;
  accentColor: string;
  size?: number;
  strokeWidth?: number;
}

export default function SessionTimer({
  totalSeconds,
  remainingSeconds,
  accentColor,
  size = 160,
  strokeWidth = 8,
}: SessionTimerProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = remainingSeconds / totalSeconds;
  const strokeDashoffset = circumference * (1 - progress);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)", position: "absolute" }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={accentColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="ring-progress"
        />
      </svg>
      {/* Time display */}
      <div className="text-center z-10">
        <div
          className="font-display font-bold tabular-nums"
          style={{ fontSize: size * 0.22, color: "var(--text-primary)", lineHeight: 1 }}
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
        <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          remaining
        </div>
      </div>
    </div>
  );
}
