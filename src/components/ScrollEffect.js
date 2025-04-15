import { motion } from "framer-motion";

const ScrollEffect = () => {
  return (
    <motion.div
      className="absolute w-full h-full bg-gradient-to-t from-black via-gray-900 to-transparent"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
    />
  );
};

export default ScrollEffect;
