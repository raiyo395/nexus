import { ExternalLink } from 'lucide-react'
import { MOCK_ACTIVITIES } from '../../data/mockData'
import { truncateAddress, truncateHash, getEtherscanUrl } from '../../utils/format'
import { CopyButton } from '../ui/CopyButton'
import { StatusBadge } from '../ui/StatusBadge'

export function ActivityTab() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Activity</h1>
        <p className="mt-1 text-sm text-zinc-400">Recent on-chain transactions across your wallets</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-zinc-500">
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Transaction</th>
                <th className="px-6 py-3 font-medium">From / To</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Time</th>
                <th className="px-6 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {MOCK_ACTIVITIES.map((tx, index) => (
                <tr
                  key={tx.id}
                  className="group border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]"
                >
                  {/* Timeline dot */}
                  <td className="relative px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex flex-col items-center">
                        <span
                          className={[
                            'z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold',
                            tx.type === 'Swap'
                              ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                              : tx.type === 'Send'
                                ? 'border-orange-500/30 bg-orange-500/10 text-orange-400'
                                : tx.type === 'Receive'
                                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                                  : 'border-violet-500/30 bg-violet-500/10 text-violet-400',
                          ].join(' ')}
                        >
                          {tx.type[0]}
                        </span>
                        {index < MOCK_ACTIVITIES.length - 1 && (
                          <span
                            className="absolute top-8 h-full w-px bg-zinc-800"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <span className="font-medium text-zinc-200">{tx.type}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-zinc-300">{truncateHash(tx.hash)}</span>
                      <CopyButton value={tx.hash} label="Copy transaction hash" />
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-500">{tx.chain}</p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex items-center gap-1 text-zinc-400">
                        <span className="text-zinc-600">From</span>
                        {truncateAddress(tx.from)}
                        <CopyButton value={tx.from} label="Copy from address" />
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400">
                        <span className="text-zinc-600">To</span>
                        {truncateAddress(tx.to)}
                        <CopyButton value={tx.to} label="Copy to address" />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium text-white">
                      {tx.amount} {tx.token.includes('→') ? '' : tx.token.split(' ')[0]}
                    </p>
                    <p className="text-xs text-zinc-500">{tx.token}</p>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={tx.status} />
                  </td>

                  <td className="px-6 py-4 text-zinc-400">{tx.timestamp}</td>

                  <td className="px-6 py-4">
                    <a
                      href={getEtherscanUrl(tx.hash, tx.chain)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg p-2 text-zinc-500 transition-all hover:bg-white/5 hover:text-cyan-400 active:scale-95"
                      aria-label="View on Etherscan"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
