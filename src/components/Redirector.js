"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirector() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      router.replace("/home");
    }
  }, [pathname, router]);

  return null; // This component doesn't render anything
}
