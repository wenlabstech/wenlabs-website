"use client";

import "@app/globals.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  WagmiConfig,
  configureChains,
  createConfig,
} from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Grace Panel",
  projectId: "b50796dbd58c1c7a89c41871a7e9c641", // Optional for WalletConnect
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function Web3Provider({ children }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
