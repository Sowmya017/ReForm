"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b"
          : "bg-transparent"
      }`}
      style={{
        borderColor: scrolled ? "rgba(255,255,255,0.06)" : "transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: "var(--gradient-brand)" }}
            >
              R
            </div>
            <span
              className="text-lg font-bold font-display tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Re<span className="gradient-text">Form</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/#how-it-works"
              className="text-sm transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text-secondary)")
              }
            >
              How it Works
            </Link>
            <Link
              href="/#goals"
              className="text-sm transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text-secondary)")
              }
            >
              Goals
            </Link>
            <Link
              href="/practice"
              className="btn-glow px-4 py-2 text-sm rounded-lg font-display font-semibold"
            >
              Start Practicing
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-0.5 w-5 rounded transition-all duration-200"
              style={{
                background: "var(--text-primary)",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }}
            />
            <span
              className="block h-0.5 w-5 rounded transition-all duration-200"
              style={{
                background: "var(--text-primary)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-0.5 w-5 rounded transition-all duration-200"
              style={{
                background: "var(--text-primary)",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden glass border-t"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              <Link
                href="/#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                How it Works
              </Link>
              <Link
                href="/#goals"
                onClick={() => setMenuOpen(false)}
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Goals
              </Link>
              <Link
                href="/practice"
                onClick={() => setMenuOpen(false)}
                className="btn-glow px-4 py-2.5 text-sm rounded-lg text-center"
              >
                Start Practicing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
