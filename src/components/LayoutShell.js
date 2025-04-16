"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isGrace = pathname.startsWith("/grace");

  return (
    <>
      {!isGrace && <Navbar />}
      <main>{children}</main>
      {/* Footer has been removed */}
    </>
  );
}
