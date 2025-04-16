// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import Web3Provider from "@/components/Web3Provider"; // ✅ use your existing one

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wen AI",
  description: "My Web3 app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <LayoutShell>{children}</LayoutShell>
        </Web3Provider>
      </body>
    </html>
  );
}
