import { TrendingUp, TrendingDown } from 'lucide-react'
import { MOCK_TOKENS, MOCK_NFTS, getPortfolioTotalUsd } from '../../data/mockData'
import { formatUsd, formatTokenAmount } from '../../utils/format'

export function PortfolioTab() {
  const totalUsd = getPortfolioTotalUsd(MOCK_TOKENS)
  const change24h = 4.28

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Balance hero */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-zinc-400">Total Portfolio Value</p>
        <div className="mt-2 flex flex-wrap items-end gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {formatUsd(totalUsd)}
          </h1>
          <span
            className={`mb-1 flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium ${
              change24h >= 0
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-red-500/10 text-red-400'
            }`}
          >
            {change24h >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {change24h >= 0 ? '+' : ''}
            {change24h}% (24h)
          </span>
        </div>
        <p className="mt-2 text-sm text-zinc-500">Across {MOCK_TOKENS.length} assets · 2 chains</p>
      </div>

      {/* Token table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md">
        <div className="border-b border-white/5 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Assets</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-zinc-500">
                <th className="px-6 py-3 font-medium">Token</th>
                <th className="px-6 py-3 font-medium">Allocation</th>
                <th className="px-6 py-3 font-medium">Balance</th>
                <th className="px-6 py-3 text-right font-medium">Live Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_TOKENS.map((token) => (
                <tr
                  key={token.id}
                  className="group transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-zinc-800 text-base font-bold text-zinc-200">
                        {token.icon}
                      </span>
                      <div>
                        <p className="font-medium text-white">{token.name}</p>
                        <p className="text-xs text-zinc-500">
                          {token.symbol} · {token.chain}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all group-hover:brightness-110"
                          style={{ width: `${token.allocation}%` }}
                        />
                      </div>
                      <span className="font-mono text-zinc-400">{token.allocation}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-zinc-300">
                    {formatTokenAmount(token.balance)} {token.symbol}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-white">
                    {formatUsd(token.balance * token.priceUsd)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NFT gallery skeleton */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">NFT Gallery</h2>
          <span className="text-xs text-zinc-500">Loading collection…</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_NFTS.map((nft) => (
            <div
              key={nft.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md"
            >
              <div className="relative aspect-square bg-zinc-800/80">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-800 via-zinc-700/50 to-zinc-800" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl opacity-20">◈</span>
                </div>
              </div>
              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-700/80" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-800" />
                <p className="text-xs text-zinc-500">
                  Floor: {nft.floorEth} ETH
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
