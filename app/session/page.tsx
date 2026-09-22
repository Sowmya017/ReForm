import type { Metadata } from "next";
import { Suspense } from "react";
import SessionClient from "@/components/SessionClient";

export const metadata: Metadata = {
  title: "AI Session — ReForm",
  description: "Your personalized AI yoga session. Real-time form detection and pose guidance.",
};

export default function SessionPage() {
  return (
    <main className="min-h-screen">
      <Suspense>
        <SessionClient />
      </Suspense>
    </main>
  );
}
