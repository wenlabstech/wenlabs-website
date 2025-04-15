"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isGrace = pathname.startsWith("/grace");

  return (
    <>
      {!isGrace && <Navbar />}
      <main>{children}</main>
      {!isGrace && <FooterWrapper />}
    </>
  );
}
