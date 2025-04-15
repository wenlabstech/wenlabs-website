// components/NFTDescription.js
"use client";
import { useState } from "react";

export default function NFTDescription({ title, description }) {
  const [expanded, setExpanded] = useState(false);
  const wordLimit = 40;

  const shortDescription = description
    .split(" ")
    .slice(0, wordLimit)
    .join(" ") + "...";

  return (
    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl text-white w-full max-w-md ml-6">
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
