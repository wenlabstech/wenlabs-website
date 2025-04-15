"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Confetti from "react-confetti";
import { Send } from "lucide-react";

export default function NFTCard({ id, tier, image }) {
  const name = "Test NFT";
  const price = "0.08 ETH";
  const chain = "Ethereum";
  const chainLogo = "/eth.svg";

  const [imgTransform, setImgTransform] = useState({});
  const [minted, setMinted] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    setImgTransform({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
    });
  };

  const handleMouseLeave = () => {
    setImgTransform({
      transform: "rotateX(0deg) rotateY(0deg) scale(1)",
    });
  };

  const handleMint = (e) => {
    e.preventDefault(); // Prevent page link from firing
    setMinted(true);
    setTimeout(() => {
      setMinted(false);
    }, 4000);
  };

  return (
    <>
      <Link href={`/dashboard/collection/${id}`}>
        <motion.div
          className="relative w-80 h-[430px] scale-[0.95] p-5 rounded-xl bg-[#1E1E1E] shadow-lg flex flex-col items-center justify-between overflow-hidden border border-gray-800 cursor-pointer"
          whileHover={{ scale: 1 }}
        >
          {/* NFT Image Section with Capsule Badge */}
          <div
            className="w-full relative"
            style={{ paddingTop: "100%" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Network capsule */}
            <div className="absolute top-2 right-2 z-10">
              <div className="flex items-center bg-black/60 backdrop-blur-sm px-3 py-[2px] rounded-full text-white text-[10px] font-medium gap-1 border border-gray-600">
                <Image src={chainLogo} alt={chain} width={12} height={12} />
                <span>{chain}</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={image}
                style={imgTransform}
                className="absolute inset-0 w-full h-full transition-transform duration-200 will-change-transform"
              >
                <Image
                  src={image}
                  alt={tier}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Name + Price */}
          <div className="w-full mt-3 text-sm text-white">
            <div className="flex justify-between mb-1">
              <span className="text-gray-400">Name</span>
              <span>{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Price</span>
              <span>{price}</span>
            </div>
          </div>

          {/* Mint Button */}
          <motion.button
            whileTap={{ scale: 0.92, x: 3, y: -1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full mt-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-purple-600 transition-all text-sm flex justify-center items-center gap-2"
            onClick={handleMint}
          >
            <Send size={16} />
            Mint Now
          </motion.button>
        </motion.div>
      </Link>

      {/* 🎉 Celebration Effects */}
      {minted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-[9999]"
        >
          <Confetti width={window.innerWidth} height={window.innerHeight} />

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="bg-black rounded-lg shadow-xl text-center flex flex-col items-center justify-center border border-gray-800"
            style={{ width: "35vw", height: "40vh" }}
          >
            <motion.img
              src={image}
              alt="Minted NFT"
              className="w-40 h-40 rounded-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <p className="text-white text-lg mt-8">🎉 Minting Successful 🎉</p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}