'use client';

import { useState } from "react";

export default function LandingPage() {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted={isMuted}
      >
        <source src="/sample-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Feathered Black Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10 pointer-events-none" />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-5xl md:text-6xl font-bold drop-shadow-lg mb-4">
          Discover Live & Upcoming Events
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl drop-shadow">
          Engage with community-driven experiences, exclusive drops, and immersive content — powered by Wen  AI.
        </p>
      </div>

      {/* Navbar with Mute Toggle */}
      <div className="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-30">
        <div className="text-white font-semibold text-xl">Wen Events</div>
        <button
          onClick={toggleMute}
          className="bg-white/10 text-white px-3 py-1 rounded-full hover:bg-white/20 transition text-sm"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* Scroll Button */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <button className="text-white text-sm bg-white/10 px-5 py-2 rounded-full hover:bg-white/20 transition">
          Scroll Down
        </button>
      </div>
    </div>
  );
}
