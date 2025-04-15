"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { Element } from "react-scroll";
import Navbar from "@/components/Navbar";
import ParticlesBackground from "@/components/ParticlesBackground";
import Hero from "@/app/home/page";
import ScrollEffect from "@/components/ScrollEffect";
import Features from "@/app/Features";
import Metrics from "@/app/Metrics";
import FooterPage from "@/app/Footerpage";
import SocialCTA from "@/app/Socialcta";
import "@/app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function HomeLayout({ children }) {
  // Prevent SSR Mismatch  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🚀 Avoid Hydration Issues
  if (!mounted) return <div className="bg-black dark:bg-black-900 min-h-screen" />;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased relative text-black dark:text-white`}>
        
    

        {/* 🔥 Particles Layer */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <ParticlesBackground />
        </div>

        {/* ✅ Main Content */}
        <div className="relative z-10">
          <Navbar />

          <div className="overflow-y-auto h-screen scroll-smooth">
            <Element name="page">
              <Hero />
            </Element>
            <ScrollEffect />
            <Element name="features">
              <Features />
            </Element>
            <Element name="metrics">
              <Metrics />
            </Element>
            <Element name="footer">
              <FooterPage />
            </Element>
            <Element name="social">
              <SocialCTA />
            </Element>
          </div>

          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
