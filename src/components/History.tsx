import { TransactionLink } from './TransactionLink'

interface SentTx {
  hash: string
  to: string
  amount: string
}

interface Props {
  history: SentTx[]
}

export function History({ history }: Props) {
  if (history.length === 0) return null

  return (
    <div className="bg-gray-800 rounded-xl p-4 mb-4">
      <p className="text-sm text-gray-400 mb-3">Recent Activity</p>
      <div className="space-y-2">
        {history.map((tx) => (
          <TransactionLink key={tx.hash} hash={tx.hash} variant="history" to={tx.to} amount={tx.amount} />
        ))}
      </div>
    </div>
  )
}