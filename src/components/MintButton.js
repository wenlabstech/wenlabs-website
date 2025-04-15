"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function MintButton() {
  const [minted, setMinted] = useState(false);

  const handleMint = () => {
    setMinted(true);
    setTimeout(() => {
      setMinted(false);
    }, 4000); // Close after 3 seconds
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Mint Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleMint}
        className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all"
      >
        Mint Now
      </motion.button>

      {/* Minting Success Popup */}
      {minted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80"
        >
          {/* Celebration Animation */}
          <Confetti width={window.innerWidth} height={window.innerHeight} />

          {/* NFT Scaling */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="bg-black-900 rounded-lg shadow-x3 text-center flex flex-col items-center justify-center border border-gray-800"
            style={{ width: "35vw", height: "40vh" }} // Set width and height to 25% of screen
          >
            <motion.img
              src="/path-to-your-nft.png"
              alt="Minted NFT"
              className="w-40 h-40 rounded-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <p className="text-white text-lg mt-4">🎉 Minting Successful! 🎉</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
