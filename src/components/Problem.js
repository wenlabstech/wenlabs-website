"use client";
import { motion } from "framer-motion";

const Problem = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* Heading */}
      <motion.h2
        className="text-5xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        The Problem
      </motion.h2>
      
      {/* Short Explanation */}
      <motion.p
        className="text-lg text-gray-300 max-w-3xl mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Crypto traders and investors rely on outdated tracking tools that report major wallet movements **too late**, missing profitable opportunities. **By the time you know, the move has already happened.**
      </motion.p>

      {/* Side-by-Side Comparison */}
      <div className="flex flex-col md:flex-row gap-6 max-w-5xl">
        {/* Old Way */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h3 className="text-xl font-semibold text-red-400 mb-3">❌ Old Methods</h3>
          <ul className="text-gray-400 text-left list-disc list-inside">
            <li>Delayed alerts (1-2 hours late)</li>
            <li>Missed opportunities</li>
            <li>Manual tracking required</li>
            <li>No real-time actions</li>
          </ul>
        </motion.div>
        
        {/* Wen AI Way */}
        <motion.div
          className="bg-blue-900 p-6 rounded-lg shadow-lg w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">✅ Wen AI’s Real-Time Tracking</h3>
          <ul className="text-gray-300 text-left list-disc list-inside">
            <li>Instant alerts on major transactions</li>
            <li>Tracks whale wallets & exchange movements</li>
            <li>AI-driven insights & automated updates</li>
            <li>Real-time tweets & notifications</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
