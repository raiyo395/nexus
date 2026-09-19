import { ArrowRight, BarChart3, Repeat, Activity, Shield, Zap } from 'lucide-react'

interface LandingPageProps {
  onConnectClick: () => void
}

const FEATURES = [
  {
    icon: BarChart3,
    title: 'Asset Tracking',
    description:
      'Unified portfolio view across Ethereum, L2s, and major chains with valuations and allocation insights.',
    gradient: 'from-indigo-500/20 to-indigo-500/5',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Repeat,
    title: 'Instant Swaps',
    description:
      'Best-route DEX aggregation with slippage controls, one-click approvals, and real-time price impact.',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Activity,
    title: 'On-Chain Activity',
    description:
      'Timeline of every send, swap, and approval — with Etherscan links, status tracking, and copy-to-clipboard.',
    gradient: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-400',
  },
]

export function LandingPage({ onConnectClick }: LandingPageProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]"
        aria-hidden="true"
      />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-md">
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            Multi-chain ready · Non-custodial · Open source
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            The Unified Hub for Your{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Multi-Chain Assets
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Track portfolios, swap tokens, and monitor on-chain activity — all from one premium
            dashboard. Connect your wallet and take control of your Web3 finances.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onConnectClick}
              className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-indigo-900/40 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              Launch App
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={onConnectClick}
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-zinc-300 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/10 active:scale-[0.98]"
            >
              Connect Wallet
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-emerald-500" />
              Audited contracts
            </span>
            <span className="hidden sm:inline text-zinc-700">·</span>
            <span>12+ chains supported</span>
            <span className="hidden sm:inline text-zinc-700">·</span>
            <span>$2.4B+ volume routed</span>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, gradient, iconColor }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-zinc-900/60"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                aria-hidden="true"
              />
              <div className="relative">
                <div
                  className={`mb-4 inline-flex rounded-xl border border-white/10 bg-zinc-800/80 p-3 ${iconColor}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
