"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-6 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md shadow-lg dark:bg-black/20 z-[1000]"
    >
      {/* Logo → Wen (Chat Page) */}
      <Link href="/chat">
        <Logo />
      </Link>

      {/* Navigation Links */}
      <Link href="/home" className="text-white dark:text-gray-300 hover:text-blue-400">
        Home
      </Link>
      <Link href="/dashboard" className="text-white dark:text-gray-300 hover:text-blue-400">
        Dashboard
      </Link>
      <Link href="/chat" className="text-white dark:text-gray-300 hover:text-blue-400">
        Wen
      </Link>
      <Link href="/events" className="text-white dark:text-gray-300 hover:text-blue-400">
        Events
      </Link>

     {/* Internal Docs Link */}
     <Link
        href="/docs"
        className="text-white dark:text-gray-300 hover:text-blue-400"
      >
        Docs
      </Link>
    </motion.nav>
  );
}
