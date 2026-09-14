import { ExternalLink } from 'lucide-react'

interface Props {
  hash: string
  variant?: 'success' | 'history'
  to?: string
  amount?: string
}

export function TransactionLink({ hash, variant = 'success', to, amount }: Props) {
  if (variant === 'history') {
    return (
      <a
        href={`https://sepolia.etherscan.io/tx/${hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between items-center text-sm text-gray-300 hover:text-white active:opacity-70 transition-colors duration-150"
      >
        <span>{to?.slice(0, 6)}...{to?.slice(-4)}</span>
        <span>{amount} ETH</span>
      </a>
    )
  }

  return (
    <a
      href={`https://sepolia.etherscan.io/tx/${hash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-sm text-green-400 mt-2 hover:text-green-300 active:opacity-70 hover:underline transition-colors duration-150"
    >
      Transaction sent — view on Etherscan <ExternalLink size={14} />
    </a>
  )
}
