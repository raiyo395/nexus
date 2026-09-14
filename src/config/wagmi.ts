import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      showQrModal: false,
      metadata: {
        name: 'Nexus',
        description: 'Connect your wallet to Nexus',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://nexus.app',
        icons: [
          typeof window !== 'undefined'
            ? `${window.location.origin}/favicon.svg`
            : 'https://nexus.app/favicon.svg',
        ],
      },
    }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})
