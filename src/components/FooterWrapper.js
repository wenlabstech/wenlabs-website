// src/components/FooterWrapper.js
"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Hide footer on `/wen` and subpages
  if (pathname.startsWith("/wen")) return null;

  return <Footer />;
}
