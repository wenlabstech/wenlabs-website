"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("admin-auth");
    router.replace("/grace/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-xl">
      Logging out...
    </div>
  );
}
