"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { FaTrash, FaPlus } from "react-icons/fa";
import contractABI from "@/constants/WenNFT.json";

const CONTRACT_ADDRESS = "0x485757051c5526C0746C1640032618192c9d895C";

export default function NFTManager() {
  const router = useRouter();
  const { address } = useAccount();

  const [listedNFTs, setListedNFTs] = useState([]);
  const [newId, setNewId] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newSupply, setNewSupply] = useState("");
  const [newMetadataURL, setNewMetadataURL] = useState("");
  const [loading, setLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin-auth") === "true";
    if (!isAuthenticated) {
      router.push("/grace/login");
    }
  }, [router]);

  const handleList = async () => {
    if (!newId || !newPrice || !newSupply || !newMetadataURL) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const priceInWei = parseEther(newPrice);

      // ✅ Call the smart contract to list NFT
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: "listNFT",
        args: [Number(newId), priceInWei, Number(newSupply)],
      });

      // ✅ Optionally: store the metadata URL in your own off-chain DB or file (for now we just show it in UI)
      setListedNFTs([
        ...listedNFTs,
        {
          id: newId,
          price: newPrice + " ETH",
          maxSupply: newSupply,
          metadata: newMetadataURL,
        },
      ]);

      // Reset
      setNewId("");
      setNewPrice("");
      setNewSupply("");
      setNewMetadataURL("");

      alert("✅ NFT listed on-chain!");
    } catch (err) {
      console.error("Listing failed:", err);
      alert("❌ Failed to list: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeNFT = (id) => {
    setListedNFTs(listedNFTs.filter((nft) => nft.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🛠️ Admin: NFT Listing</h1>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
        <input
          className="bg-black/30 border border-white/20 rounded px-3 py-2 text-sm text-white"
          placeholder="NFT ID"
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
          type="number"
        />
        <input
          className="bg-black/30 border border-white/20 rounded px-3 py-2 text-sm text-white"
          placeholder="Price (ETH)"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          type="number"
        />
        <input
          className="bg-black/30 border border-white/20 rounded px-3 py-2 text-sm text-white"
          placeholder="Max Supply"
          value={newSupply}
          onChange={(e) => setNewSupply(e.target.value)}
          type="number"
        />
        <input
          className="bg-black/30 border border-white/20 rounded px-3 py-2 text-sm text-white"
          placeholder="IPFS Metadata URL"
          value={newMetadataURL}
          onChange={(e) => setNewMetadataURL(e.target.value)}
        />
        <button
          onClick={handleList}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm font-semibold"
        >
          {loading ? "Listing..." : <>
            <FaPlus size={12} /> List NFT
          </>}
        </button>
      </div>

      {/* Listed NFTs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listedNFTs.map((nft) => (
          <div
            key={nft.id}
            className="p-4 bg-white/5 border border-white/10 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">ID: {nft.id}</p>
              <p className="text-white/60 text-sm">Price: {nft.price}</p>
              <p className="text-white/60 text-sm">Supply: {nft.maxSupply}</p>
              <p className="text-white/50 text-xs break-all">Metadata: {nft.metadata}</p>
            </div>
            <button
              onClick={() => removeNFT(nft.id)}
              className="text-red-400 hover:text-red-600"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
