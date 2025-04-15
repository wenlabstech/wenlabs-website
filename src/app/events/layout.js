"use client";

import { useState } from "react";
import LandingPage from "./page";
import EventsPage from "./eventspage";

export default function EventsLayout() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const pageHeight = window.innerHeight;

    if (scrollTop >= pageHeight * 0.5) {
      setCurrentPage(2);
    } else {
      setCurrentPage(1);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Scrollable container */}
      <div
        className="h-full overflow-y-scroll scroll-smooth"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="h-screen">
          <LandingPage />
        </div>
        <div className="h-screen">
          <EventsPage />
        </div>
      </div>

      {/* Top Fade Effect */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black via-black/30 to-transparent z-30" />

      {/* Bottom Fade Effect */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black via-black/30 to-transparent z-30" />
    </div>
  );
}
