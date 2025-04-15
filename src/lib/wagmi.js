// src/lib/wagmi.js
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { WagmiProvider, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'Wen Web3',
  projectId: 'b50796dbd58c1c7a89c41871a7e9c641', // 🔐 Replace with your WalletConnect project ID
  chains: [base],
  transports: {
    [base.id]: http(), // default public RPC
  },
});

const queryClient = new QueryClient();

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
