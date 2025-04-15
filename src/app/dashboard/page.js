"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WalletConnectButton from "@/components/WalletConnectButton";
import NFTCard from "@/components/NFTCard";
import NFTBackground from "@/components/NFTBackground";

import "@rainbow-me/rainbowkit/styles.css";
import {
  WagmiProvider,
  createConfig,
  http,
} from "wagmi";
import { base } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const config = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: {
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

const nftCollection = Array.from({ length: 120 }, (_, i) => ({
  id: i + 1,
  name: `Website Launch Day ${i + 1}`,
  description: `Website Launch Day ${i + 1}. 🚧 No NFTs available for minting yet.
Enjoy the animations and stay tuned — the first mint is coming soon! 🎉 .`,
  image: `/nft-images/${i + 1}.png`,
  available: i < 2,
  price: "0.1 MONAD",
}));

function NFTDescription({ title, description }) {
  const [expanded, setExpanded] = useState(false);
  const wordLimit = 45;
  const shortDescription = description.split(" ").slice(0, wordLimit).join(" ") + "...";

  return (
    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl text-white w-full max-w-md ml-245 mt-0">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
        {expanded ? description : shortDescription}
      </p>
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="text-blue-400 mt-2 text-sm hover:underline"
        >
          Read more
        </button>
      )}
    </div>
  );
}

function ClientOnlyProviderWrapper({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider chains={[base]}>
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const selectedId = parseInt(searchParams.get("nft"));

  const availableNFTs = useMemo(
    () => nftCollection.filter((nft) => nft.available),
    []
  );

  const [currentIndex, setCurrentIndex] = useState(
    selectedId && !isNaN(selectedId)
      ? availableNFTs.findIndex((nft) => nft.id === selectedId)
      : 0
  );

  const [paused, setPaused] = useState(false);
  const lastInteractionRef = useRef(Date.now());
  const [firstLoad, setFirstLoad] = useState(true);

  const selectedNFT = availableNFTs[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastInteraction = now - lastInteractionRef.current;

      if (!paused || timeSinceLastInteraction > 30000) {
        setCurrentIndex((prev) => (prev + 1) % availableNFTs.length);
        setFirstLoad(false);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [paused, availableNFTs.length]);

  const handleInteraction = () => {
    setPaused(true);
    lastInteractionRef.current = Date.now();
    setTimeout(() => {
      setPaused(false);
    }, 30000);
  };

  return (
    <ClientOnlyProviderWrapper>
      <div className="relative flex flex-col items-start justify-center min-h-screen w-full max-w-[2000px] p-12 bg-opacity-80 rounded-lg overflow-hidden">
        <WalletConnectButton />
        <NFTBackground selectedNFT={selectedNFT} />

        <h1 className="text-4xl font-bold text-white mb-0 z-10 pl-13">
          Mint Your NFT
        </h1>

        <div
          className="flex w-full mt-24 pl-10 z-10 h-[550px] relative"
          onMouseEnter={handleInteraction}
          onClick={handleInteraction}
        >
          <AnimatePresence mode="wait">
            {firstLoad ? (
              <motion.div
                key={`first-${selectedNFT.id}`}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute flex"
              >
                <NFTCard
                  id={selectedNFT.id}
                  tier={selectedNFT.name}
                  image={selectedNFT.image}
                  description={selectedNFT.description}
                  glowColor="purple"
                  showDetails={true}
                />
                <NFTDescription
                  title={selectedNFT.name}
                  description={selectedNFT.description}
                />
              </motion.div>
            ) : (
              <div className="absolute flex">
                <NFTCard
                  id={selectedNFT.id}
                  tier={selectedNFT.name}
                  image={selectedNFT.image}
                  description={selectedNFT.description}
                  glowColor="purple"
                  showDetails={true}
                />
                <NFTDescription
                  title={selectedNFT.name}
                  description={selectedNFT.description}
                />
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="z-10" onClick={handleInteraction}></div>
      </div>
    </ClientOnlyProviderWrapper>
  );
}
