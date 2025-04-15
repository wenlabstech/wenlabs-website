"use client";
import FeatureCard from "@/components/FeatureCard";
import { FaBrain, FaShieldAlt, FaRobot } from "react-icons/fa";

export default function Features() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-black py-20">
      <h2 className="text-4xl font-bold text-white-400 mb-6">AI-Powered Features</h2>
      <p className="text-gray-300 max-w-2xl">
        Experience cutting-edge AI capabilities powered by WenAI.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <FeatureCard
          title="Advanced AI Models"
          description="Utilizing the latest AI to provide intelligent insights."
          icon={FaBrain}
        />
        <FeatureCard
          title="Secure & Private"
          description="Top-tier security ensuring safe transactions and privacy."
          icon={FaShieldAlt}
        />
        <FeatureCard
          title="Automation AI"
          description="Smart automation AI to simplify complex processes."
          icon={FaRobot}
        />
      </div>
    </section>
  );
}
