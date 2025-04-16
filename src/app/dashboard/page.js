"use client";

import { Suspense } from "react";
import DashboardContent from "@/components/DashboardContent"; // move all logic here

export default function DashboardPage() {
  return (
    <Suspense fallback={<p className="text-white text-xl mt-10">Loading NFTs...</p>}>
      <DashboardContent />
    </Suspense>
  );
}
