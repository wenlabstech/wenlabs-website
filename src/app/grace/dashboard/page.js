// src/app/grace/dashboard/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GraceDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin-auth") === "true";
    if (!isAuthenticated) {
      router.push("/grace/login");
    }
  }, [router]);

  const cards = [
    { title: "NFT Control", subtitle: "Manage your NFT collection" },
    { title: "Event Manager", subtitle: "Control live & upcoming events" },
    { title: "Wen AI Settings", subtitle: "Update AI replies & behavior" },
    { title: "Site Toggles", subtitle: "Enable/disable features & flows" },
  ];

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to Grace ✨</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-white/70 text-sm">{card.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
