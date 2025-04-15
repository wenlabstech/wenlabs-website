// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell"; // ✅ Don't forget this!

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wen AI",
  description: "My Web3 app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
