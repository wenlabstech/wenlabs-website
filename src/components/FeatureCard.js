"use client";
import { motion } from "framer-motion";

const FeatureCard = ({ title, description, icon: Icon }) => {
  return (
    <motion.div
      className="relative w-[280px] md:w-[320px] h-[200px] bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20 transition-transform hover:scale-105 hover:shadow-blue-500/50"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="absolute top-4 right-4 text-blue-400">
        <Icon size={40} />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-300 mt-2 text-sm">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
