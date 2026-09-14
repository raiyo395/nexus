export type TxStatus = 'success' | 'pending' | 'failed'

export interface TokenAsset {
  id: string
  symbol: string
  name: string
  icon: string
  allocation: number
  balance: number
  priceUsd: number
  chain: string
}

export interface NftItem {
  id: string
  name: string
  collection: string
  floorEth: number
}

export interface ActivityItem {
  id: string
  hash: string
  type: 'Send' | 'Receive' | 'Swap' | 'Approve'
  from: string
  to: string
  amount: string
  token: string
  status: TxStatus
  timestamp: string
  chain: string
}

export interface SwapToken {
  symbol: string
  name: string
  icon: string
  balance: number
  priceUsd: number
}

export const NETWORK_STATS = [
  'Ethereum Gas: 14 Gwei',
  'Total Vol: $1.2B',
  'BTC Dominance: 52.4%',
  'Active Wallets: 892K',
  'ETH Price: $3,842',
  'DeFi TVL: $98.6B',
]

export const MOCK_TOKENS: TokenAsset[] = [
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: '⟠',
    allocation: 42.5,
    balance: 12.84,
    priceUsd: 3842.12,
    chain: 'Ethereum',
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '$',
    allocation: 28.3,
    balance: 18420.5,
    priceUsd: 1.0,
    chain: 'Ethereum',
  },
  {
    id: 'wbtc',
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    icon: '₿',
    allocation: 18.7,
    balance: 0.42,
    priceUsd: 98420.0,
    chain: 'Ethereum',
  },
  {
    id: 'link',
    symbol: 'LINK',
    name: 'Chainlink',
    icon: '⬡',
    allocation: 6.2,
    balance: 890,
    priceUsd: 18.44,
    chain: 'Ethereum',
  },
  {
    id: 'arb',
    symbol: 'ARB',
    name: 'Arbitrum',
    icon: '◈',
    allocation: 4.3,
    balance: 4200,
    priceUsd: 1.12,
    chain: 'Arbitrum',
  },
]

export const MOCK_NFTS: NftItem[] = [
  { id: '1', name: 'Nexus Genesis #042', collection: 'Nexus Genesis', floorEth: 0.84 },
  { id: '2', name: 'Cyber Vault #118', collection: 'Cyber Vault', floorEth: 0.32 },
  { id: '3', name: 'Pulse Wave #007', collection: 'Pulse Wave', floorEth: 1.2 },
  { id: '4', name: 'Dark Ledger #901', collection: 'Dark Ledger', floorEth: 0.15 },
]

export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    hash: '0x12a4f8b3c9d2e1f0a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5',
    type: 'Swap',
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0xUniswapRouter00000000000000000000000001',
    amount: '2.5',
    token: 'ETH → USDC',
    status: 'success',
    timestamp: '2 min ago',
    chain: 'Ethereum',
  },
  {
    id: '2',
    hash: '0x9f8e7d6c5b4a392817061524334352637281910a0b0c0d0e0f10111213141516',
    type: 'Send',
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    amount: '500',
    token: 'USDC',
    status: 'pending',
    timestamp: '18 min ago',
    chain: 'Ethereum',
  },
  {
    id: '3',
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    type: 'Receive',
    from: '0xCoinbaseHotWallet00000000000000000000001',
    to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    amount: '0.25',
    token: 'ETH',
    status: 'success',
    timestamp: '1 hr ago',
    chain: 'Ethereum',
  },
  {
    id: '4',
    hash: '0xdeadbeefcafebabe0000000000000000000000000000000000000000000001',
    type: 'Approve',
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x1f9840a85d8aF58202000000000000000000000001',
    amount: '∞',
    token: 'LINK',
    status: 'failed',
    timestamp: '3 hr ago',
    chain: 'Ethereum',
  },
  {
    id: '5',
    hash: '0x111122223333444455556666777788889999aaaabbbbccccddddeeeeffff0000',
    type: 'Swap',
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    to: '0x1inchRouter000000000000000000000000000001',
    amount: '1000',
    token: 'USDC → ARB',
    status: 'success',
    timestamp: 'Yesterday',
    chain: 'Arbitrum',
  },
]

export const SWAP_TOKENS: SwapToken[] = [
  { symbol: 'ETH', name: 'Ethereum', icon: '⟠', balance: 12.84, priceUsd: 3842.12 },
  { symbol: 'USDC', name: 'USD Coin', icon: '$', balance: 18420.5, priceUsd: 1.0 },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '₿', balance: 0.42, priceUsd: 98420.0 },
  { symbol: 'LINK', name: 'Chainlink', icon: '⬡', balance: 890, priceUsd: 18.44 },
]

export function getPortfolioTotalUsd(tokens: TokenAsset[]): number {
  return tokens.reduce((sum, t) => sum + t.balance * t.priceUsd, 0)
}
