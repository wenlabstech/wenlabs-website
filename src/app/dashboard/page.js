"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// ✅ Dynamically import DashboardContent with SSR disabled
const DashboardContent = dynamic(() => import("@/components/DashboardContent"), {
  ssr: false,
});

export default function DashboardPage() {
  return (
    <Suspense fallback={<p className="text-white text-xl mt-10">Loading NFTs...</p>}>
      <DashboardContent />
    </Suspense>
  );
}
