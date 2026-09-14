import { useEffect, useCallback, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { X, Loader2 } from 'lucide-react'
import type { Connector } from 'wagmi'

/* -------------------------------------------------------------------------- */
/*  Wallet icon placeholders (swap SVGs for official assets in production)   */
/* -------------------------------------------------------------------------- */

function MetaMaskIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <path
        fill="#E2761B"
        d="M29.5 2.5L17.9 10.8l2.2-5.2 9.4-3.1z"
      />
      <path fill="#E4761B" d="M2.5 2.5l11.5 8.4-2.1-5.3L2.5 2.5z" />
      <path fill="#E4761B" d="M24.1 22.1l-3.1 4.7 6.6 1.8 1.9-6.6-5.4-.1z" />
      <path fill="#E4761B" d="M2.5 22.1l1.9 6.6 6.6-1.8-3.1-4.8H2.5z" />
      <path fill="#E4761B" d="M9.1 14.1l-1.8 2.7 6.4.3-.2-6.9-4.4 3.9z" />
      <path fill="#E4761B" d="M22.9 14.1l-4.5-4.1-.1 7 6.4-.3-1.8-2.6z" />
      <path fill="#D7C1B3" d="M9.1 14.1l1.8 8-6.4-.3 4.6-7.7z" />
      <path fill="#D7C1B3" d="M22.9 14.1l4.6 7.7-6.4.3 1.8-8z" />
      <path fill="#233447" d="M17.6 24.3l-1.6 2.8 3.6-.1-.1-1.2-2-1.5z" />
      <path fill="#233447" d="M14.4 24.3l-2 1.5-.1 1.2 3.6.1-1.5-2.8z" />
      <path fill="#CD6116" d="M20.9 17.1l-3.3-1 1.7-1.6 1.6 2.6z" />
      <path fill="#CD6116" d="M11.1 17.1l1.6-2.6 1.7 1.6-3.3 1z" />
      <path fill="#E4751F" d="M9.1 22.1l3.1-1.5-.3-2.2-2.8 3.7z" />
      <path fill="#E4751F" d="M19.8 20.6l-.3 2.2 3.1 1.5-2.8-3.7z" />
      <path fill="#F6851B" d="M24.1 22.1l-3.1-1.5-2.5 1.9 4.6-.4z" />
      <path fill="#F6851B" d="M7.9 21.6l4.6.4-2.5-1.9-2.1 1.5z" />
    </svg>
  )
}

function WalletConnectIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#3B99FC" />
      <path
        fill="#fff"
        d="M9.5 12.2c3.9-3.8 10.1-3.8 14 0l.5.5c.2.2.2.5 0 .7l-1.7 1.7c-.1.1-.3.1-.4 0l-.7-.7c-2.7-2.7-7.1-2.7-9.8 0l-.7.7c-.1.1-.3.1-.4 0l-1.7-1.7c-.2-.2-.2-.5 0-.7l.5-.5zm4.4 4.3c2.7-2.7 7.1-2.7 9.8 0l.7.7c.2.2.2.5 0 .7l-3.4 3.4c-.1.1-.3.1-.4 0l-2.4-2.4c-.1-.1-.3-.1-.4 0l-2.4 2.4c-.1.1-.3.1-.4 0l-3.4-3.4c-.2-.2-.2-.5 0-.7l.7-.7z"
      />
    </svg>
  )
}

function PhantomIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#AB9FF2" />
      <path
        fill="#fff"
        d="M23.5 12.8c0-3.5-2.8-4.8-6.5-4.8-4.9 0-7.3 2.2-7.3 5.9v2.4c0 2.9 1.3 4.3 4 4.9l4.8 1.1c1.8.4 2.4 1 2.4 2.2v.5c0 1.4-1.1 2.2-3.2 2.2-2.3 0-3.6-.9-3.9-2.5h-3.8c.3 3.4 2.8 5.3 7.5 5.3 4.7 0 7.4-1.9 7.4-5.5v-2.3c0-2.8-1.2-4.2-3.9-4.8l-4.9-1.1c-1.7-.4-2.3-1-2.3-2.1v-.5c0-1.3 1.1-2.1 3-2.1 2 0 3.2.8 3.4 2.3h3.8z"
      />
    </svg>
  )
}

function CoinbaseIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#0052FF" />
      <rect x="10" y="10" width="12" height="12" rx="2" fill="#fff" />
    </svg>
  )
}

function BrowserWalletIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#334155" />
      <path
        fill="#94A3B8"
        d="M8 11h16v2H8v-2zm0 4h10v2H8v-2zm0 4h14v2H8v-2z"
      />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/*  Wallet name detection (replaces raw "Injected" label)                     */
/* -------------------------------------------------------------------------- */

type EthereumProvider = {
  isMetaMask?: boolean
  isCoinbaseWallet?: boolean
  isPhantom?: boolean
  isBraveWallet?: boolean
  isRabby?: boolean
  isTrust?: boolean
  isTrustWallet?: boolean
  isOkxWallet?: boolean
  isOKExWallet?: boolean
  isRainbow?: boolean
}

const PROVIDER_FLAGS: { flag: keyof EthereumProvider; name: string }[] = [
  { flag: 'isMetaMask', name: 'MetaMask' },
  { flag: 'isCoinbaseWallet', name: 'Coinbase Wallet' },
  { flag: 'isPhantom', name: 'Phantom' },
  { flag: 'isBraveWallet', name: 'Brave Wallet' },
  { flag: 'isRabby', name: 'Rabby' },
  { flag: 'isTrust', name: 'Trust Wallet' },
  { flag: 'isTrustWallet', name: 'Trust Wallet' },
  { flag: 'isOkxWallet', name: 'OKX Wallet' },
  { flag: 'isOKExWallet', name: 'OKX Wallet' },
  { flag: 'isRainbow', name: 'Rainbow' },
]

export function detectBrowserWalletName(): string {
  if (typeof window === 'undefined') return 'Browser Wallet'
  const eth = (window as Window & { ethereum?: EthereumProvider }).ethereum
  if (!eth) return 'Browser Wallet'
  for (const { flag, name } of PROVIDER_FLAGS) {
    if (eth[flag]) return name
  }
  return 'Browser Wallet'
}

export function getWalletDisplayName(connector: Connector): string {
  const normalized = connector.name?.trim()
  if (normalized && normalized.toLowerCase() !== 'injected') return normalized
  if (connector.id === 'walletConnect') return 'WalletConnect'
  return detectBrowserWalletName()
}

function getWalletIcon(name: string, connectorId: string) {
  const key = `${name} ${connectorId}`.toLowerCase()
  if (key.includes('metamask')) return <MetaMaskIcon />
  if (key.includes('walletconnect')) return <WalletConnectIcon />
  if (key.includes('phantom')) return <PhantomIcon />
  if (key.includes('coinbase')) return <CoinbaseIcon />
  return <BrowserWalletIcon />
}

/** Hide generic injected connector when EIP-6963 wallets are already listed. */
export function filterConnectors(connectors: readonly Connector[]): Connector[] {
  const hasNamedInjected = connectors.some(
    (c) => c.type === 'injected' && c.name.toLowerCase() !== 'injected',
  )
  return connectors.filter((c) => {
    if (c.type === 'injected' && c.name.toLowerCase() === 'injected' && hasNamedInjected) {
      return false
    }
    return true
  })
}

/* -------------------------------------------------------------------------- */
/*  Modal types & mock-friendly props                                         */
/* -------------------------------------------------------------------------- */

export interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
  /** Called when user picks a wallet. Wire to wagmi `connect({ connector })` or mock logic. */
  onConnect: (connector: Connector) => void
  connectors: readonly Connector[]
  connectingId?: string | null
  error?: string | null
  /** WalletConnect pairing URI — renders QR when present */
  wcUri?: string | null
}

function Spinner() {
  return <Loader2 className="h-4 w-4 animate-spin text-blue-400" aria-hidden="true" />
}

export function WalletConnectModal({
  isOpen,
  onClose,
  onConnect,
  connectors,
  connectingId = null,
  error = null,
  wcUri = null,
}: WalletConnectModalProps) {
  const isConnecting = Boolean(connectingId)
  const activeConnector = connectors.find((c) => c.uid === connectingId)
  const activeName = activeConnector ? getWalletDisplayName(activeConnector) : ''
  const isWalletConnect =
    activeConnector?.id === 'walletConnect' || activeConnector?.type === 'walletConnect'
  const showQr = isWalletConnect && isConnecting && Boolean(wcUri)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  const wallets = filterConnectors(connectors)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close wallet modal"
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md transition-all duration-200">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 id="wallet-modal-title" className="text-lg font-semibold text-white">
                {showQr ? 'Scan to Connect' : 'Connect Wallet'}
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                {showQr
                  ? 'Open your mobile wallet and scan the QR code'
                  : 'Choose a wallet to continue to Nexus'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              disabled={false}
              aria-label="Close"
              className="rounded-lg p-1.5 text-zinc-400 transition-all duration-150 hover:bg-white/5 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* WalletConnect QR panel */}
          {showQr ? (
            <div className="flex flex-col items-center gap-4 py-2">
              <div className="rounded-2xl border border-white/10 bg-white p-4 shadow-inner">
                <QRCodeSVG
                  value={wcUri!}
                  size={220}
                  level="M"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor="#0f172a"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <Spinner />
                <span>Waiting for wallet approval…</span>
              </div>
              <p className="text-center text-xs text-zinc-500">
                Or approve the connection prompt in your desktop wallet extension
              </p>
            </div>
          ) : (
            /* Wallet list */
            <ul className="space-y-2" role="listbox" aria-label="Available wallets">
              {wallets.map((connector) => {
                const name = getWalletDisplayName(connector)
                const isActive = connectingId === connector.uid
                const isDisabled = isConnecting && !isActive

                return (
                  <li key={connector.uid}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      disabled={isDisabled}
                      onClick={() => onConnect(connector)}
                      className={[
                        'group flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200',
                        isActive
                          ? 'border-blue-500/50 bg-blue-500/10 brightness-110'
                          : 'border-white/5 bg-zinc-800/60 hover:border-white/15 hover:bg-zinc-800 hover:brightness-110',
                        isDisabled ? 'cursor-not-allowed opacity-40' : 'active:scale-[0.98]',
                      ].join(' ')}
                    >
                      <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                        {getWalletIcon(name, connector.id)}
                      </span>
                      <span className="flex-1 text-sm font-medium text-zinc-100">{name}</span>
                      {isActive && <Spinner />}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {/* Connecting prompt (non-QR wallets) */}
          {isConnecting && !showQr && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
              <Spinner />
              <p className="text-sm text-blue-200">
                Confirm connection in your <span className="font-medium">{activeName}</span>{' '}
                extension…
              </p>
            </div>
          )}

          {/* Error area */}
          {error && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Mock demo — drop-in preview without wagmi                                 */
/* -------------------------------------------------------------------------- */

const MOCK_CONNECTORS = [
  { uid: 'mock-mm', id: 'metaMask', name: 'MetaMask', type: 'injected' },
  { uid: 'mock-wc', id: 'walletConnect', name: 'WalletConnect', type: 'walletConnect' },
  { uid: 'mock-phantom', id: 'phantom', name: 'Phantom', type: 'injected' },
] as unknown as Connector[]

export function WalletConnectModalDemo() {
  const [open, setOpen] = useState(false)
  const [connectingId, setConnectingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [wcUri, setWcUri] = useState<string | null>(null)

  const handleConnect = (connector: Connector) => {
    setConnectingId(connector.uid)
    setError(null)

    if (connector.id === 'walletConnect') {
      setWcUri('wc:demo-session@2?relay-protocol=irn&symKey=abc123')
      return
    }

    setTimeout(() => {
      if (connector.id === 'phantom') {
        setError('User rejected the request')
        setConnectingId(null)
        return
      }
      setOpen(false)
      setConnectingId(null)
    }, 2000)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-[0.98]"
      >
        Connect Wallet
      </button>
      <WalletConnectModal
        isOpen={open}
        onClose={() => {
          setOpen(false)
          setConnectingId(null)
          setError(null)
          setWcUri(null)
        }}
        onConnect={handleConnect}
        connectors={MOCK_CONNECTORS}
        connectingId={connectingId}
        error={error}
        wcUri={wcUri}
      />
    </>
  )
}
