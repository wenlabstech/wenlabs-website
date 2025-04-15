export default function TierSelector({ onSelect }) {
    const tiers = ["Common", "Rare", "Legendary", "Mythic"];
  
    return (
      <select
        onChange={(e) => onSelect(tiers.find(t => t.tier === e.target.value))}
        className="p-2 rounded-lg bg-black text-white border border-gray-600"
      >
        {tiers.map((tier) => (
          <option key={tier} value={tier}>{tier}</option>
        ))}
      </select>
    );
  }
  