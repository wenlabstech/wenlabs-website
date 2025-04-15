"use client";
import { motion } from "framer-motion";
import { FaSearch, FaBrain, FaRocket } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch className="text-blue-400 text-4xl" />,
    title: "Problem Detected",
    description: "WenAI identifies major whale movements & suspicious transactions in real-time.",
  },
  {
    icon: <FaBrain className="text-purple-400 text-4xl" />,
    title: "AI Analyzes Data",
    description: "Our advanced AI tracks transaction patterns, liquidity shifts, and token swaps.",
  },
  {
    icon: <FaRocket className="text-green-400 text-4xl" />,
    title: "Solution Delivered",
    description: "WenAI instantly tweets alerts & updates dashboards with crucial insights.",
  },
];

export default function FlowChart() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <h2 className="text-4xl font-bold text-white mb-8">How WenAI Works</h2>
      <div className="flex flex-col gap-16 w-full max-w-4xl">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-6 p-6 rounded-lg bg-white/10 backdrop-blur-md shadow-lg w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            viewport={{ once: true }}
          >
            <div className="p-4 bg-white/20 rounded-full">{step.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
