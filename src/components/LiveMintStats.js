"use client"; // 👈 Add this at the very top

import { useState, useEffect } from "react";

export default function LiveMintStats() {
  const [minted, setMinted] = useState(0);

  useEffect(() => {
    // Simulate fetching minted NFT stats
    const interval = setInterval(() => {
      setMinted((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Live Mint Stats</h2>
      <p>Minted NFTs: {minted}</p>
    </div>
  );
}
