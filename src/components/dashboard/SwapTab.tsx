import { useState, useMemo } from 'react'
import { ArrowDownUp, Settings, Loader2, ChevronDown } from 'lucide-react'
import { SWAP_TOKENS } from '../../data/mockData'
import { formatUsd, formatTokenAmount } from '../../utils/format'

type SwapStage = 'idle' | 'approving' | 'approved' | 'swapping' | 'done'

export function SwapTab() {
  const [fromSymbol, setFromSymbol] = useState('ETH')
  const [toSymbol, setToSymbol] = useState('USDC')
  const [fromAmount, setFromAmount] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  const [showSettings, setShowSettings] = useState(false)
  const [stage, setStage] = useState<SwapStage>('idle')

  const fromToken = SWAP_TOKENS.find((t) => t.symbol === fromSymbol)!
  const toToken = SWAP_TOKENS.find((t) => t.symbol === toSymbol)!

  const toAmount = useMemo(() => {
    const amount = parseFloat(fromAmount)
    if (!amount || isNaN(amount)) return ''
    const usdValue = amount * fromToken.priceUsd
    const received = usdValue / toToken.priceUsd
    const afterSlippage = received * (1 - slippage / 100)
    return afterSlippage.toFixed(6)
  }, [fromAmount, fromToken.priceUsd, toToken.priceUsd, slippage])

  const rate = useMemo(() => {
    if (!fromToken || !toToken) return '—'
    return `1 ${fromSymbol} = ${formatTokenAmount(fromToken.priceUsd / toToken.priceUsd)} ${toSymbol}`
  }, [fromSymbol, toSymbol, fromToken, toToken])

  const handleMax = () => {
    setFromAmount(String(fromToken.balance))
  }

  const handleFlip = () => {
    setFromSymbol(toSymbol)
    setToSymbol(fromSymbol)
    setFromAmount('')
    setStage('idle')
  }

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return

    if (stage === 'idle') {
      setStage('approving')
      await new Promise((r) => setTimeout(r, 1800))
      setStage('approved')
      return
    }

    if (stage === 'approved') {
      setStage('swapping')
      await new Promise((r) => setTimeout(r, 2200))
      setStage('done')
      setTimeout(() => {
        setStage('idle')
        setFromAmount('')
      }, 2000)
    }
  }

  const buttonLabel = () => {
    if (stage === 'approving') return 'Approving Token…'
    if (stage === 'approved') return 'Confirm Swap'
    if (stage === 'swapping') return 'Swapping…'
    if (stage === 'done') return 'Swap Complete ✓'
    if (!fromAmount || parseFloat(fromAmount) <= 0) return 'Enter Amount'
    return 'Approve Token'
  }

  const isLoading = stage === 'approving' || stage === 'swapping'
  const isDisabled =
    isLoading ||
    stage === 'done' ||
    !fromAmount ||
    parseFloat(fromAmount) <= 0

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-8 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-2xl shadow-black/20 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-600/10 blur-3xl"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Swap</h2>
          <button
            type="button"
            onClick={() => setShowSettings((v) => !v)}
            className="rounded-lg p-2 text-zinc-400 transition-all hover:bg-white/5 hover:text-white active:scale-95"
            aria-label="Slippage settings"
          >
            <Settings className={`h-5 w-5 transition-transform ${showSettings ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {showSettings && (
          <div className="mb-4 rounded-xl border border-white/10 bg-zinc-800/50 p-4">
            <p className="mb-2 text-xs font-medium text-zinc-400">Slippage Tolerance</p>
            <div className="flex gap-2">
              {[0.1, 0.5, 1.0].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSlippage(val)}
                  className={[
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-all active:scale-95',
                    slippage === val
                      ? 'bg-indigo-600 text-white'
                      : 'bg-zinc-700/50 text-zinc-400 hover:bg-zinc-700',
                  ].join(' ')}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>
        )}

        {/* From */}
        <TokenInput
          label="You pay"
          token={fromToken}
          amount={fromAmount}
          onAmountChange={setFromAmount}
          onTokenChange={setFromSymbol}
          excludeSymbol={toSymbol}
          onMax={handleMax}
        />

        {/* Flip */}
        <div className="relative z-10 -my-3 flex justify-center">
          <button
            type="button"
            onClick={handleFlip}
            className="rounded-xl border border-white/10 bg-zinc-800 p-2.5 text-zinc-400 transition-all hover:border-white/20 hover:text-white active:scale-95"
            aria-label="Flip tokens"
          >
            <ArrowDownUp className="h-4 w-4" />
          </button>
        </div>

        {/* To */}
        <TokenInput
          label="You receive"
          token={toToken}
          amount={toAmount}
          readOnly
          onTokenChange={setToSymbol}
          excludeSymbol={fromSymbol}
        />

        {/* Rate */}
        <div className="mt-4 rounded-xl border border-white/5 bg-zinc-800/30 px-4 py-3 text-sm">
          <div className="flex justify-between text-zinc-400">
            <span>Rate</span>
            <span className="font-mono text-zinc-300">{rate}</span>
          </div>
          <div className="mt-1 flex justify-between text-zinc-400">
            <span>Network fee (est.)</span>
            <span className="font-mono text-zinc-300">~$4.20</span>
          </div>
          <div className="mt-1 flex justify-between text-zinc-400">
            <span>Slippage</span>
            <span className="font-mono text-zinc-300">{slippage}%</span>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleSwap}
          disabled={isDisabled}
          className={[
            'mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold transition-all duration-200 active:scale-[0.98]',
            stage === 'done'
              ? 'bg-emerald-600 text-white'
              : 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-900/30 hover:brightness-110',
            isDisabled && stage !== 'done' ? 'cursor-not-allowed opacity-50' : '',
          ].join(' ')}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {buttonLabel()}
        </button>
      </div>
    </div>
  )
}

interface TokenInputProps {
  label: string
  token: (typeof SWAP_TOKENS)[0]
  amount: string
  onAmountChange?: (v: string) => void
  onTokenChange: (symbol: string) => void
  excludeSymbol: string
  readOnly?: boolean
  onMax?: () => void
}

function TokenInput({
  label,
  token,
  amount,
  onAmountChange,
  onTokenChange,
  excludeSymbol,
  readOnly,
  onMax,
}: TokenInputProps) {
  const options = SWAP_TOKENS.filter((t) => t.symbol !== excludeSymbol)

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-800/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500">{label}</span>
        {!readOnly && onMax && (
          <button
            type="button"
            onClick={onMax}
            className="text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Max
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          readOnly={readOnly}
          onChange={(e) => onAmountChange?.(e.target.value)}
          placeholder="0.0"
          className="min-w-0 flex-1 bg-transparent text-2xl font-medium text-white outline-none placeholder:text-zinc-600"
        />
        <div className="relative">
          <select
            value={token.symbol}
            onChange={(e) => onTokenChange(e.target.value)}
            className="appearance-none rounded-xl border border-white/10 bg-zinc-700/80 py-2 pl-3 pr-8 text-sm font-medium text-white outline-none transition-colors hover:bg-zinc-700"
          >
            {options.map((t) => (
              <option key={t.symbol} value={t.symbol}>
                {t.icon} {t.symbol}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        </div>
      </div>
      {!readOnly && (
        <p className="mt-2 text-xs text-zinc-500">
          Balance: {formatTokenAmount(token.balance)} {token.symbol} ·{' '}
          {formatUsd(token.balance * token.priceUsd)}
        </p>
      )}
    </div>
  )
}
