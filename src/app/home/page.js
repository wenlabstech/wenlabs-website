"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // ✅ Import Link

const logMessages = [
  "[12:45 PM] Whale moved 400 ETH to Binance",
  "[12:46 PM] TVL on Base up 3.2%",
  "[12:47 PM] Swapped 10K USDC to ETH - Slippage: 0.2%",
];

export default function HeroSection() {
  const [currentLog, setCurrentLog] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLog((prev) => (prev + 1) % logMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-white px-6 py-20">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Meet the AI That Reads the Blockchain, Executes Commands, and Talks Back.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Real-time wallet monitoring, chain analytics, and DeFi execution — automated directly through Twitter and web.
        </p>
        <div className="flex gap-4 justify-center mb-12">
          <Button className="text-lg px-6 py-3">▶ Watch AI in Action</Button>
          <Link href="/chat">
            <Button variant="outline" className="text-lg px-6 py-3 border-white text-white">
              ⚙️ Launch AI Console
            </Button>
          </Link>
        </div>
        <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4 font-mono text-sm w-full max-w-xl mx-auto h-[120px] overflow-hidden">
          <motion.p
            key={currentLog}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-green-400"
          >
            {logMessages[currentLog]}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
