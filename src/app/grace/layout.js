"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaImages,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaRobot,
} from "react-icons/fa";

// ✅ NEW: Import the Web3Provider
import { Web3Provider } from "@/lib/wagmi"; // Make sure this file exists and exports the Web3Provider

const navItems = [
  { name: "Dashboard", href: "/grace/dashboard", icon: <FaHome /> },
  { name: "NFT Manager", href: "/grace/nfts", icon: <FaImages /> },
  { name: "Event Manager", href: "/grace/events", icon: <FaChartBar /> },
  { name: "Wen AI", href: "/grace/ai", icon: <FaRobot /> },
  { name: "Settings", href: "/grace/settings", icon: <FaCog /> },
  { name: "Logout", href: "/grace/logout", icon: <FaSignOutAlt /> },
];

export default function GraceLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoginPage = pathname === "/grace/login";

  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth") === "true";

    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }

    if (!isAuth) {
      router.push("/grace/login");
    }

    setIsAuthenticated(isAuth);
    setAuthChecked(true);
  }, [router, isLoginPage]);

  return (
    <Web3Provider>
      <div className="flex min-h-screen bg-black text-white">
        {/* Sidebar (hidden on login page or while loading) */}
        {!isLoginPage && authChecked && isAuthenticated && (
          <aside className="w-64 bg-white/5 border-r border-white/10 p-6 hidden md:block">
            <h1 className="text-2xl font-bold mb-8">Grace Panel</h1>
            <nav className="flex flex-col gap-3">
              {navItems.map(({ name, href, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition ${
                    pathname === href
                      ? "bg-white/10 font-semibold"
                      : "text-white/70"
                  }`}
                >
                  <span className="text-base">{icon}</span>
                  <span className="text-sm">{name}</span>
                </Link>
              ))}
            </nav>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">
          {!authChecked ? (
            <div className="text-white/70 text-sm">Checking access...</div>
          ) : isLoginPage || isAuthenticated ? (
            children
          ) : null}
        </main>
      </div>
    </Web3Provider>
  );
}
