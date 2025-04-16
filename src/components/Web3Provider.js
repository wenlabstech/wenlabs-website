"use client";

import "../app/globals.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  WagmiProvider,
  createConfig,
  http,
} from "wagmi";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Setup QueryClient instance
const queryClient = new QueryClient();

// ✅ Only Base chain
const chains = [base];

// ✅ Wallet connectors
const { connectors } = getDefaultWallets({
  appName: "Grace Panel",
  projectId: "b50796dbd58c1c7a89c41871a7e9c641",
  chains,
});

// ✅ wagmi config with only Base transport
const wagmiConfig = createConfig({
  chains,
  connectors,
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

export default function Web3Provider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
