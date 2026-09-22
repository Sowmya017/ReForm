"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { goals, Goal, Pose } from "@/lib/routines";
import SessionTimer from "@/components/SessionTimer";
import ScoreCard from "@/components/ScoreCard";
import { useCamera } from "@/hooks/useCamera";
import CameraView from "@/components/CameraView";
import PoseIllustration from "@/components/PoseIllustration";

type SessionState = "loading" | "camera-prompt" | "countdown" | "active" | "pose-complete" | "done";

function CameraIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function SkipIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
  );
}

export default function SessionClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const goalId = searchParams.get("goal") ?? "stress";
  const goal = goals.find((g) => g.id === goalId) ?? goals[0];

  const { stream, error: cameraError, isAllowed: cameraAllowed, requestCamera, stopCamera } = useCamera();

  const [state, setState] = useState<SessionState>("loading");
  const [poseIndex, setPoseIndex] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [completedPoses, setCompletedPoses] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [skipped, setSkipped] = useState<Set<number>>(new Set());

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedRef = useRef<NodeJS.Timeout | null>(null);

  const currentPose: Pose = goal.poses[poseIndex];

  // ── Cleanup ──────────────────────────────────────────────────

  useEffect(() => {
    setState("camera-prompt");
    return () => {
      stopCamera();
      if (timerRef.current) clearInterval(timerRef.current);
      if (elapsedRef.current) clearInterval(elapsedRef.current);
    };
  }, [stopCamera]);

  const startWithoutCamera = useCallback(() => {
    setState("countdown");
  }, []);

  // ── Countdown ────────────────────────────────────────────────
  useEffect(() => {
    if (state !== "countdown") return;
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          setPoseIndex(0);
          setPoseTime(goal.poses[0]?.duration ?? 60);
          setState("active");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state, goal.poses]);

  // ── Pose timer ───────────────────────────────────────────────
  useEffect(() => {
    if (state !== "active") return;

    if (timerRef.current) clearInterval(timerRef.current);
    if (elapsedRef.current) clearInterval(elapsedRef.current);

    timerRef.current = setInterval(() => {
      setPoseTime((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          advancePose(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    elapsedRef.current = setInterval(() => {
      setTotalElapsed((e) => e + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (elapsedRef.current) clearInterval(elapsedRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, poseIndex]);

  function advancePose(wasSkipped: boolean) {
    if (timerRef.current) clearInterval(timerRef.current);
    if (elapsedRef.current) clearInterval(elapsedRef.current);

    if (!wasSkipped) setCompletedPoses((c) => c + 1);
    else setSkipped((s) => new Set(s).add(poseIndex));

    const next = poseIndex + 1;
    if (next >= goal.poses.length) {
      setState("done");
      stopCamera();
    } else {
      setPoseIndex(next);
      setPoseTime(goal.poses[next].duration);
      setState("active");
    }
  }

  useEffect(() => {
    if (cameraAllowed && state === "camera-prompt") {
      setState("countdown");
    }
  }, [cameraAllowed, state]);

  // ─────────────────────────────────────────────────────────────
  // RENDER — Camera Prompt
  // ─────────────────────────────────────────────────────────────
  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: `${goal.colorFrom} transparent transparent transparent` }} />
      </div>
    );
  }

  if (state === "camera-prompt") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          className="orb w-80 h-80 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"
          style={{ background: goal.colorFrom }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-3xl p-8 max-w-md w-full text-center relative z-10"
          style={{ border: `1px solid ${goal.colorFrom}33` }}
        >
          {/* Goal badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              background: `${goal.colorFrom}22`,
              color: goal.textColor,
            }}
          >
            <span>{goal.icon}</span>
            <span>{goal.title}</span>
          </div>

          {/* Camera icon */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: `linear-gradient(135deg, ${goal.colorFrom}22, ${goal.colorFrom}44)`,
              border: `1px solid ${goal.colorFrom}44`,
              color: goal.textColor,
            }}
          >
            <CameraIcon />
          </div>

          <h1
            className="font-display font-bold text-2xl mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Ready to begin?
          </h1>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            For the best experience, allow camera access so our AI can analyze
            your form in real time. Everything runs locally — your feed never leaves your device.
          </p>

          {cameraError && (
            <div
              className="text-xs px-4 py-3 rounded-xl mb-4 text-left"
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#FCA5A5",
              }}
            >
              ⚠ {cameraError}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              id="enable-camera-btn"
              onClick={requestCamera}
              className="btn-glow px-6 py-3.5 rounded-xl text-sm font-display font-semibold"
            >
              Enable Camera & Start
            </button>
            <button
              id="skip-camera-btn"
              onClick={startWithoutCamera}
              className="px-6 py-3 rounded-xl text-sm transition-all duration-200"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
            >
              Continue without camera
            </button>
          </div>

          <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            🔒 Camera feed stays on your device. No data is sent or stored.
          </p>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER — Countdown
  // ─────────────────────────────────────────────────────────────
  if (state === "countdown") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          key={countdown}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div
            className="font-display font-black text-[180px] leading-none"
            style={{ color: goal.colorFrom, textShadow: `0 0 60px ${goal.colorFrom}60` }}
          >
            {countdown}
          </div>
          <p className="font-display font-semibold text-xl mt-4" style={{ color: "var(--text-secondary)" }}>
            Get into position
          </p>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER — Done
  // ─────────────────────────────────────────────────────────────
  if (state === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div
          className="orb w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"
          style={{ background: goal.colorFrom }}
        />
        <ScoreCard
          goal={goal}
          completedPoses={completedPoses}
          totalPoses={goal.poses.length}
          timeElapsed={totalElapsed}
        />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER — Active Session
  // ─────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-4"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <Link
          href="/practice"
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          ← Back
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl">{goal.icon}</span>
          <span
            className="font-display font-semibold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            {goal.title}
          </span>
        </div>
        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
          {poseIndex + 1} / {goal.poses.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full" style={{ background: "rgba(255,255,255,0.05)" }}>
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(to right, ${goal.colorFrom}, ${goal.colorTo})` }}
          animate={{ width: `${((poseIndex) / goal.poses.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-0">
        {/* Camera / Visual area */}
        <div className="relative lg:flex-1 flex items-center justify-center p-4 sm:p-6" style={{ minHeight: "320px" }}>
          {cameraAllowed && stream ? (
            <div className="camera-feed w-full max-w-2xl aspect-video relative rounded-2xl overflow-hidden">
              <CameraView stream={stream} accentColor={goal.colorFrom} />
              {/* Pose name overlay */}
              <div
                className="absolute bottom-4 left-4 right-4 px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${goal.colorFrom}44`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                      {currentPose.name}
                    </p>
                    {currentPose.sanskrit && (
                      <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>
                        {currentPose.sanskrit}
                      </p>
                    )}
                  </div>
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      background: goal.colorFrom,
                      boxShadow: `0 0 8px ${goal.colorFrom}`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* No-camera visual */
            <motion.div
              key={poseIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center w-full max-w-xl aspect-video rounded-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${goal.colorFrom}15, ${goal.colorTo}25)`,
                border: `1px solid ${goal.colorFrom}33`,
              }}
            >
              {/* Animated background circles */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.15, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-64 h-64 rounded-full"
                style={{ background: `radial-gradient(circle, ${goal.colorFrom}40 0%, transparent 70%)` }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-48 h-48 rounded-full"
                style={{ border: `1px solid ${goal.colorFrom}22` }}
              />

              <div className="relative z-10 text-center px-6">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-7xl mb-4"
                >
                  {goal.icon}
                </motion.div>
                <h2
                  className="font-display font-bold text-2xl mb-2"
                  style={{ color: goal.textColor }}
                >
                  {currentPose.name}
                </h2>
                {currentPose.sanskrit && (
                  <p className="text-sm italic mb-3" style={{ color: "var(--text-muted)" }}>
                    {currentPose.sanskrit}
                  </p>
                )}
                <p
                  className="text-sm leading-relaxed max-w-xs mx-auto"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {currentPose.cue}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right panel */}
        <div
          className="lg:w-80 xl:w-96 flex flex-col"
          style={{ borderLeft: "1px solid var(--border-subtle)" }}
        >
          {/* Current pose info */}
          <div className="p-5 flex-1 flex flex-col gap-5">
            {/* Timer */}
            <div className="flex justify-center">
              <SessionTimer
                totalSeconds={currentPose.duration}
                remainingSeconds={poseTime}
                accentColor={goal.colorFrom}
                size={140}
              />
            </div>

            {/* Pose details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={poseIndex}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl p-4"
                style={{
                  background: `linear-gradient(135deg, ${goal.colorFrom}12, ${goal.colorTo}18)`,
                  border: `1px solid ${goal.colorFrom}28`,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3
                      className="font-display font-bold text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {currentPose.name}
                    </h3>
                    {currentPose.sanskrit && (
                      <p className="text-xs italic mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {currentPose.sanskrit}
                      </p>
                    )}
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-mono"
                    style={{ background: `${goal.colorFrom}22`, color: goal.textColor }}
                  >
                    {poseIndex + 1}/{goal.poses.length}
                  </span>
                </div>
                
                {/* Pose Illustration */}
                <div className="w-full h-32 rounded-lg mb-3 flex items-center justify-center overflow-hidden" style={{ background: "rgba(255,255,255,0.4)" }}>
                  <PoseIllustration poseId={currentPose.id} className="w-full h-full p-2" />
                </div>

                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                  {currentPose.description}
                </p>
                {/* Cue */}
                <div
                  className="rounded-lg px-3 py-2 text-xs leading-relaxed"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    color: "var(--text-secondary)",
                    borderLeft: `2px solid ${goal.colorFrom}`,
                  }}
                >
                  <span style={{ color: goal.textColor, fontWeight: 600 }}>Cue: </span>
                  {currentPose.cue}
                </div>
                {currentPose.breathCue && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs" style={{ color: goal.textColor }}>
                    <span>🌬</span>
                    <span>{currentPose.breathCue}</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Upcoming poses */}
            {poseIndex < goal.poses.length - 1 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                  Up Next
                </p>
                <div className="flex flex-col gap-1.5">
                  {goal.poses.slice(poseIndex + 1, poseIndex + 4).map((p, i) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-subtle)",
                        opacity: 1 - i * 0.2,
                      }}
                    >
                      <span className="text-xs font-mono w-4" style={{ color: "var(--text-muted)" }}>
                        {poseIndex + 2 + i}
                      </span>
                      <span className="text-xs flex-1" style={{ color: "var(--text-secondary)" }}>
                        {p.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div
            className="p-4 flex flex-col gap-2"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <button
              id="next-pose-btn"
              onClick={() => advancePose(false)}
              className="btn-glow px-4 py-3 rounded-xl text-sm font-display font-semibold"
            >
              {poseIndex < goal.poses.length - 1 ? "Next Pose →" : "Finish Session ✓"}
            </button>
            {poseIndex < goal.poses.length - 1 && (
              <button
                id="skip-pose-btn"
                onClick={() => advancePose(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs transition-all duration-200"
                style={{
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-muted)",
                }}
              >
                <SkipIcon />
                Skip this pose
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
