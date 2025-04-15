"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaExclamationTriangle, FaChartLine } from "react-icons/fa";

const dummyData = [
  {
    type: "alert",
    icon: <FaExclamationTriangle className="text-red-400 text-2xl" />,
    text: "🚨 Suspicious: 401,346 ETH moved from Bybit to an unknown wallet!",
  },
  {
    type: "tweet",
    icon: <FaTwitter className="text-blue-400 text-2xl" />,
    text: "🔥 WenAI Alert: WLFI just swapped 200 ETH for MOVE tokens!",
  },
  {
    type: "insight",
    icon: <FaChartLine className="text-green-400 text-2xl" />,
    text: "📊 On-Chain Data: Ethereum gas fees surged 30 Gwei in the last 24h.",
  },
];

export default function DashboardPreview() {
  const [alerts, setAlerts] = useState(dummyData);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts((prevAlerts) => [
        ...prevAlerts,
        dummyData[Math.floor(Math.random() * dummyData.length)],
      ]);
    }, 5000); // Adds a new alert every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-black overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-500 opacity-20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 opacity-20 blur-[100px] rounded-full animate-pulse"></div>

      {/* Section Title */}
      <h2 className="text-4xl font-bold text-white mb-8 text-center relative z-10">
        Ability To Tweet Real-Time Insights & Alerts
      </h2>

      {/* Alert Box */}
      <div className="bg-black/50 backdrop-blur-lg rounded-lg shadow-xl p-6 w-full max-w-3xl border border-white/10 relative z-10">
        {alerts.slice(-5).map((alert, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4 p-4 border-b border-white/10 last:border-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="p-3 bg-white/10 rounded-full">{alert.icon}</div>
            <p className="text-white">{alert.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
