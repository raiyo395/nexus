export function truncateAddress(value: string, start = 6, end = 4): string {
  if (value.length <= start + end + 2) return value
  return `${value.slice(0, start)}...${value.slice(-end)}`
}

export function truncateHash(hash: string): string {
  return truncateAddress(hash, 6, 4)
}

export function formatUsd(value: number, compact = false): string {
  if (compact && value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  if (compact && value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatTokenAmount(value: number, maxDecimals = 4): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return value.toLocaleString('en-US', { maximumFractionDigits: 2 })
  return value.toLocaleString('en-US', { maximumFractionDigits: maxDecimals })
}

export function getEtherscanUrl(hash: string, chain = 'ethereum'): string {
  const base =
    chain.toLowerCase() === 'arbitrum'
      ? 'https://arbiscan.io/tx/'
      : 'https://etherscan.io/tx/'
  return `${base}${hash}`
}
