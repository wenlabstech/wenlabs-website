"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTh,
  FaImages,
  FaClipboardList,
  FaRobot, // New icon for Subscription
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const startX = useRef(null);
  const pathname = usePathname();

  // ✅ Auto-close sidebar whenever the path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!startX.current) return;
    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;

    if (diff > 50) {
      setIsOpen(false);
      startX.current = null;
    } else if (diff < -50) {
      setIsOpen(true);
      startX.current = null;
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        ref={sidebarRef}
        className="fixed right-0 top-0 h-full flex flex-col items-end z-50"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 m-3 bg-black-800 text-white hover:bg-gray-700 transition"
        >
          <FaTh size={20} />
        </button>

        <div
          className={`fixed right-0 top-0 h-full bg-black text-white shadow-lg w-64 transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col mt-13">
            <SidebarItem href="/home" icon={<FaHome />} text="Home" />
            <SidebarItem href="/dashboard" icon={<FaChartBar />} text="Dashboard" />
            <SidebarItem href="/dashboard/collection/default" icon={<FaImages />} text="NFT Collection" />
            {/* Changed from Settings to Subscription */}
            <SidebarItem href="/events" icon={<FaClipboardList />} text="Events" />
            <SidebarItem href="/chat" icon={<FaRobot />} text="Wen AI" />
          </nav>
        </div>
      </div>
    </>
  );
};

const SidebarItem = ({ href, icon, text }) => (
  <Link
    href={href}
    className="flex items-center p-3 hover:bg-white/10 transition text-sm"
  >
    <span className="mr-2 text-base">{icon}</span> {text}
  </Link>
);

export default Sidebar;
