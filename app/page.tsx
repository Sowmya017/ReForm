import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import LandingHero from "@/components/LandingHero";

export const metadata: Metadata = {
  title: "ReForm — Understand Your Movement",
  description:
    "AI-powered yoga and wellness form detection. Set your goal, get a personalized routine, and get real-time feedback on your form.",
};

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Suspense>
        <LandingHero />
      </Suspense>
    </main>
  );
}
