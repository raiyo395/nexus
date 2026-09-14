import { WalletConnectModal } from '../WalletConnectModal'
import type { Connector } from 'wagmi'

interface WalletProviderProps {
  isModalOpen: boolean
  onClose: () => void
  onConnect: (connector: Connector) => void
  connectors: readonly Connector[]
  connectingId: string | null
  error: string | null
  wcUri: string | null
}

export function WalletProviderUI({
  isModalOpen,
  onClose,
  onConnect,
  connectors,
  connectingId,
  error,
  wcUri,
}: WalletProviderProps) {
  return (
    <WalletConnectModal
      isOpen={isModalOpen}
      onClose={onClose}
      onConnect={onConnect}
      connectors={connectors}
      connectingId={connectingId}
      error={error}
      wcUri={wcUri}
    />
  )
}
