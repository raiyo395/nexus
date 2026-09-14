import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { NetworkTicker } from './components/layout/NetworkTicker'
import { LandingPage } from './components/landing/LandingPage'
import { PortfolioTab } from './components/dashboard/PortfolioTab'
import { SwapTab } from './components/dashboard/SwapTab'
import { ActivityTab } from './components/dashboard/ActivityTab'
import { WalletProviderUI } from './components/wallet/WalletProviderUI'
import { useWalletConnection } from './hooks/useWalletConnection'

function ConnectGate({
  children,
  isConnected,
  isConnecting,
  onConnectClick,
}: {
  children: ReactNode
  isConnected: boolean
  isConnecting?: boolean
  onConnectClick: () => void
}) {
  if (isConnecting) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-zinc-500">
        Checking wallet connection…
      </div>
    )
  }

  if (isConnected) return <>{children}</>

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-10 backdrop-blur-md">
        <h2 className="text-xl font-semibold text-white">Wallet Required</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Connect your wallet to access this section of the Nexus dashboard.
        </p>
        <button
          type="button"
          onClick={onConnectClick}
          className="mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-900/30 transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  )
}

function HomeRoute({
  isConnected,
  isConnecting,
  onConnectClick,
}: {
  isConnected: boolean
  isConnecting?: boolean
  onConnectClick: () => void
}) {
  if (isConnecting) return null
  if (isConnected) return <Navigate to="/dashboard" replace />
  return <LandingPage onConnectClick={onConnectClick} />
}

function App() {
  const wallet = useWalletConnection()

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <NetworkTicker />
      <Navbar
        isConnected={wallet.isConnected}
        address={wallet.address}
        onConnectClick={wallet.openModal}
        onDisconnect={() => wallet.disconnect()}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomeRoute
                isConnected={wallet.isConnected}
                isConnecting={wallet.isConnecting}
                onConnectClick={wallet.openModal}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ConnectGate
                isConnected={wallet.isConnected}
                isConnecting={wallet.isConnecting}
                onConnectClick={wallet.openModal}
              >
                <PortfolioTab />
              </ConnectGate>
            }
          />
          <Route
            path="/swap"
            element={
              <ConnectGate
                isConnected={wallet.isConnected}
                isConnecting={wallet.isConnecting}
                onConnectClick={wallet.openModal}
              >
                <SwapTab />
              </ConnectGate>
            }
          />
          <Route
            path="/activity"
            element={
              <ConnectGate
                isConnected={wallet.isConnected}
                isConnecting={wallet.isConnecting}
                onConnectClick={wallet.openModal}
              >
                <ActivityTab />
              </ConnectGate>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-white/5 py-6 text-center text-xs text-zinc-600">
        © 2026 NEXUShub · Non-custodial Web3 Dashboard
      </footer>

      <WalletProviderUI
        isModalOpen={wallet.isModalOpen}
        onClose={wallet.closeModal}
        onConnect={wallet.handleConnect}
        connectors={wallet.connectors}
        connectingId={wallet.connectingId}
        error={wallet.connectError}
        wcUri={wallet.wcUri}
      />
    </div>
  )
}

export default App