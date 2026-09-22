"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { goals } from "@/lib/routines";

const steps = [
  {
    step: "01",
    icon: "🎯",
    title: "Set Your Goal",
    desc: "Choose from 10 wellness categories tailored to your body and intentions.",
  },
  {
    step: "02",
    icon: "📋",
    title: "Get Your Routine",
    desc: "Receive a curated sequence of poses selected specifically for your goal.",
  },
  {
    step: "03",
    icon: "📸",
    title: "Camera Detects",
    desc: "Your device camera captures your body position in real time.",
  },
  {
    step: "04",
    icon: "🧠",
    title: "AI Understands",
    desc: "Our pose model identifies 33 body landmarks and analyzes alignment.",
  },
  {
    step: "05",
    icon: "✅",
    title: "Corrects Your Form",
    desc: "Instant cues guide you into the optimal position for each pose.",
  },
  {
    step: "06",
    icon: "📈",
    title: "Tracks Progress",
    desc: "Session scores and completion history help you grow over time.",
  },
];

const features = [
  {
    icon: "⚡",
    title: "Instant AI Feedback",
    desc: "Real-time form correction powered by MediaPipe — no cloud required.",
  },
  {
    icon: "🎨",
    title: "10 Wellness Goals",
    desc: "From stress relief to hormonal balance — science-backed routines.",
  },
  {
    icon: "🔒",
    title: "100% Private",
    desc: "Everything runs on your device. Your camera feed never leaves.",
  },
  {
    icon: "📱",
    title: "Mobile First",
    desc: "Designed for your phone. Practice anywhere, any time.",
  },
  {
    icon: "🆓",
    title: "Completely Free",
    desc: "No subscription, no sign-up. Just open and practice.",
  },
  {
    icon: "🌿",
    title: "Evidence-Based",
    desc: "Every routine built on traditional yoga and modern movement science.",
  },
];

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingHero() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Orb glows */}
        <div
          className="orb w-96 h-96 top-10 -left-24 opacity-30"
          style={{ background: "var(--accent-violet)" }}
        />
        <div
          className="orb w-80 h-80 bottom-10 -right-20 opacity-20"
          style={{ background: "var(--accent-cyan)" }}
        />
        <div
          className="orb w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
          style={{ background: "var(--accent-pink)" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{
              background: "rgba(124, 58, 237, 0.15)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              color: "#C4B5FD",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 pulse-glow" />
            AI-Powered Wellness · Free · Private
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6"
          >
            Understand Your{" "}
            <span className="gradient-text">Movement.</span>
            <br />
            <span className="gradient-text-warm">Improve</span> Your Form.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            Set your wellness goal. Get a personalized yoga routine. Let AI
            watch your form and guide you to better alignment — in real time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/practice"
              id="hero-cta"
              className="btn-glow px-8 py-4 text-base rounded-xl font-display font-bold"
            >
              Start Practicing — It&apos;s Free →
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 text-base rounded-xl font-display font-medium transition-all duration-200"
              style={{
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(124,58,237,0.4)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-subtle)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
              }}
            >
              See How It Works
            </a>
          </motion.div>

          {/* Goal pills preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-14 flex flex-wrap justify-center gap-2"
          >
            {goals.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.04 }}
              >
                <Link
                  href="/practice"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background: `${g.colorFrom}18`,
                    border: `1px solid ${g.colorFrom}33`,
                    color: g.textColor,
                  }}
                >
                  <span>{g.icon}</span>
                  <span>{g.title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-5 flex items-center justify-center"
            style={{ color: "var(--text-muted)" }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      <div className="section-divider max-w-4xl" />

      {/* ── How It Works ──────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--accent-violet)" }}
            >
              The ReForm Flow
            </p>
            <h2
              className="font-display font-bold text-4xl sm:text-5xl mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Six steps to{" "}
              <span className="gradient-text">better movement</span>
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              From goal selection to real-time correction — the complete loop.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <AnimatedSection key={s.step}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass glass-hover rounded-2xl p-6 h-full"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(124, 58, 237, 0.12)",
                        border: "1px solid rgba(124,58,237,0.2)",
                      }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <div
                        className="text-xs font-mono font-semibold mb-1"
                        style={{ color: "var(--accent-violet)" }}
                      >
                        Step {s.step}
                      </div>
                      <h3
                        className="font-display font-semibold text-base mb-1.5"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ── Goals Preview ─────────────────────────────────────── */}
      <section id="goals" className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div
          className="orb w-96 h-96 -right-48 top-1/2 -translate-y-1/2 opacity-10"
          style={{ background: "var(--accent-cyan)" }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--accent-cyan)" }}
            >
              10 Wellness Goals
            </p>
            <h2
              className="font-display font-bold text-4xl sm:text-5xl mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Find your{" "}
              <span className="gradient-text">intention</span>
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Every goal, a unique sequence. Every sequence, an experience built for you.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {goals.map((g, i) => (
              <AnimatedSection key={g.id}>
                <motion.div whileHover={{ scale: 1.04, y: -3 }}>
                  <Link
                    href={`/practice?goal=${g.id}`}
                    className="flex flex-col items-center gap-3 rounded-2xl p-5 transition-all duration-200"
                    style={{
                      background: `linear-gradient(135deg, ${g.colorFrom}14, ${g.colorTo}20)`,
                      border: `1px solid ${g.colorFrom}28`,
                    }}
                  >
                    <span className="text-3xl">{g.icon}</span>
                    <span
                      className="font-display font-semibold text-sm text-center leading-tight"
                      style={{ color: g.textColor }}
                    >
                      {g.title}
                    </span>
                    <span
                      className="text-xs text-center leading-tight"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {g.poses.length} poses
                    </span>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link
              href="/practice"
              id="goals-cta"
              className="btn-glow inline-block px-8 py-4 text-base rounded-xl font-display font-bold"
            >
              Choose Your Goal →
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2
              className="font-display font-bold text-4xl sm:text-5xl mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Why <span className="gradient-text">ReForm</span>?
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <AnimatedSection key={f.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass glass-hover rounded-2xl p-6"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                    style={{
                      background: "rgba(6, 182, 212, 0.12)",
                      border: "1px solid rgba(6,182,212,0.2)",
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3
                    className="font-display font-semibold text-base mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {f.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div
          className="orb w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"
          style={{ background: "var(--accent-violet)" }}
        />
        <AnimatedSection className="relative z-10 text-center max-w-2xl mx-auto">
          <h2
            className="font-display font-black text-4xl sm:text-5xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Your practice starts{" "}
            <span className="gradient-text">now.</span>
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            No equipment. No subscription. Just you, your breath, and AI-guided form.
          </p>
          <Link
            href="/practice"
            id="footer-cta"
            className="btn-glow inline-block px-10 py-4 text-lg rounded-xl font-display font-bold"
          >
            Begin Your Session →
          </Link>
        </AnimatedSection>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer
        className="py-8 px-4 text-center"
        style={{
          borderTop: "1px solid var(--border-subtle)",
          color: "var(--text-muted)",
        }}
      >
        <p className="text-sm font-display">
          <span className="gradient-text font-bold">ReForm</span> · Built for
          your wellness · Free forever
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          No data collected. No sign-up. Practice freely.
        </p>
      </footer>
    </>
  );
}
