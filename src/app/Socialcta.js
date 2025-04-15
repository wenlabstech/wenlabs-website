"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaTwitter, FaTelegram, FaDiscord, FaGithub } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import { FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-white py-16 px-8 overflow-hidden">
      {/* 🔹 Animated Social Graphics */}
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 bg-blue-500 rounded-full opacity-30 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-12 h-12 bg-purple-500 rounded-full opacity-30 blur-3xl"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* 📢 Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        
        {/* 🚀 About WenAI Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">🚀 About WenAI</h3>
          <p className="text-gray-400 text-sm">
            WenAI is the ultimate on-chain intelligence tool, providing real-time tracking of wallets, transactions, and liquidity movements.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">🔗 Quick Links</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><Link href="/home" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link href="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link></li>
            <li><Link href="/events" className="hover:text-blue-400 transition">Events</Link></li>
            <li><Link href="/docs" className="hover:text-blue-400 transition">Docs</Link></li>
          </ul>
        </div>

        {/* 🌍 Community */}
        <div>
          <h3 className="text-xl font-bold mb-4">🌍 Community</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><Link href="/faq" className="hover:text-blue-400 transition">FAQ</Link></li>
            <li><Link href="/blog" className="hover:text-blue-400 transition">Blog</Link></li>
            <li><Link href="/careers" className="hover:text-blue-400 transition">Careers</Link></li>
          </ul>
        </div>

        {/* 📢 Stay Connected */}
        <div>
          <h3 className="text-xl font-bold mb-4">📢 Stay Connected</h3>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaTwitter size={24} />
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaTelegram size={24} />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaDiscord size={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* 📩 Newsletter Section (NO API, just UI) */}
      <motion.div
        className="mt-12 flex flex-col items-center text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-bold">📩 Get Real-Time Updates</h3>
        <p className="text-gray-400 text-sm mt-2">Subscribe to get the latest insights.</p>
        <div className="mt-4 flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-4 py-2 rounded-r-md bg-blue-500 hover:bg-blue-600 transition text-white">
            Subscribe
          </button>
        </div>
      </motion.div>

      {/* ⚡️ Bottom Section */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} WenAI. All rights reserved.
      </div>
    </footer>
  );
}
