"use client";

import { WagmiConfig, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { http, createPublicClient } from "viem";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const config = createConfig({
  autoConnect: true,
  connectors: [injected()], // ✅ Corrected
  publicClient: createPublicClient({
    chain: base,
    transport: http(),
  }),
});


function WalletButtons() {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  return (
    <div className="flex flex-col items-center space-y-4">
      {address ? (
        <button
          onClick={disconnect}
          className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
        >
          Disconnect Wallet
        </button>
      ) : (
        <button
          onClick={() => connect({ connector: new injected() })}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default function ConnectButtons() {
  return (
    <WagmiConfig config={config}>
      <WalletButtons />
    </WagmiConfig>
  );
}
