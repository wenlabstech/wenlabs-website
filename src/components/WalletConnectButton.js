"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function WalletConnectButton() {
  return (
    <div className="absolute right-30 top-6.5 z-20 scale-90">
      <ConnectButton showBalance={false} />
    </div>
  );
}
