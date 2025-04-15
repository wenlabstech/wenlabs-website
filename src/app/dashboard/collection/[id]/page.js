"use client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const nftCollection = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  name: `NFT #${i + 1}`,
  image: `/nft-images/${i + 1}.png`,
  available: i < 2,
  pinned: i === 0 || i === 1,
  tier: "Legendary",
  price: "0.1 ETH",
  chain: "ETH",
  chainLogo: "/eth.svg", // make sure this is in /public
}));

export default function CollectionPage() {
  const router = useRouter();

  const handleMintClick = (id) => {
    router.push(`/dashboard?nft=${id}`);
  };

  const pinnedNFTs = nftCollection.filter((nft) => nft.pinned);
  const regularNFTs = nftCollection.filter((nft) => !nft.pinned);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className="h-full overflow-y-scroll px-6 pt-20 pb-6"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#1E1E1E transparent",
        }}
      >
        <style jsx global>{`
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #1e1e1e;
            border-radius: 6px;
          }
        `}</style>

        {/* Pinned */}
        <h1 className="text-2xl font-bold text-white mt-6 mb-4">
          📌 Pinned Collection
        </h1>
        <div className="flex flex-wrap gap-6 mb-12 ml-[4.8%]">
          {pinnedNFTs.map((nft) => (
            <NFTCard key={nft.id} nft={nft} onMint={() => handleMintClick(nft.id)} />
          ))}
        </div>

        {/* Regular */}
        <h1 className="text-2xl font-bold text-white mb-4">🎨 NFT Collection</h1>
        <div className="flex flex-wrap gap-6 mb-12 ml-[4.8%]">
          {regularNFTs.map((nft) => (
            <NFTCard key={nft.id} nft={nft} onMint={() => handleMintClick(nft.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NFTCard({ nft, onMint }) {
  return (
    <motion.div
      className="relative w-80 h-[430px] scale-[0.95] p-5 rounded-xl bg-[#1E1E1E] shadow-lg flex flex-col items-center justify-between overflow-hidden border border-gray-800"
      whileHover={{ scale: 1.02 }}
    >
      {/* NFT Image */}
      <div className="w-full relative" style={{ paddingTop: "100%" }}>
        {/* Chain capsule */}
        <div className="absolute top-2 right-2 bg-white/10 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm z-10">
          <Image src={nft.chainLogo} alt={nft.chain} width={12} height={12} />
          {nft.chain}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={nft.image}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={nft.image}
              alt={nft.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NFT Name and Price */}
      <div className="w-full text-white text-sm mt-3 mb-1 px-1">
        <div className="flex justify-between mb-1">
          <span className="text-gray-400">Name:</span>
          <span className="font-medium">{nft.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Price:</span>
          <span className="font-medium">{nft.price}</span>
        </div>
      </div>

      {/* Mint Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={!nft.available}
        onClick={onMint}
        className={`w-full mt-2 py-2 rounded-lg font-medium transition-all ${
          nft.available
            ? "bg-gray-600 text-white hover:bg-purple-600"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
      >
        {nft.available ? "Mint Now" : "Coming Soon"}
      </motion.button>
    </motion.div>
  );
}
