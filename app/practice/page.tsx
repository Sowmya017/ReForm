import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import PracticeClient from "@/components/PracticeClient";

export const metadata: Metadata = {
  title: "Choose Your Goal — ReForm",
  description:
    "Select from 10 wellness goals. Get a personalized yoga routine and start your AI session.",
};

export default function PracticePage() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Suspense>
        <PracticeClient />
      </Suspense>
    </main>
  );
}
