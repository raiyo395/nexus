import { useState, useEffect, useCallback } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import type { Connector } from 'wagmi'

export function useWalletConnection() {
  const { address, isConnected, isReconnecting } = useAccount()
  const { connect, connectors, error: connectError, isPending: isConnectPending, reset: resetConnect } =
    useConnect()
  const { disconnect } = useDisconnect()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [connectingId, setConnectingId] = useState<string | null>(null)
  const [wcUri, setWcUri] = useState<string | null>(null)

  useEffect(() => {
    const wcConnector = connectors.find((c) => c.id === 'walletConnect')
    if (!wcConnector) return

    return wcConnector.emitter.on('message', (message) => {
      if (message.type === 'display_uri' && typeof message.data === 'string') {
        setWcUri(message.data)
      }
    })
  }, [connectors])

  useEffect(() => {
    if (isConnected) {
      setIsModalOpen(false)
      setConnectingId(null)
      setWcUri(null)
      resetConnect()
    }
  }, [isConnected, resetConnect])

  const openModal = useCallback(() => setIsModalOpen(true), [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setConnectingId(null)
    setWcUri(null)
    resetConnect()
  }, [resetConnect])

  const handleConnect = useCallback(
    (connector: Connector) => {
      setConnectingId(connector.uid)
      setWcUri(null)
      resetConnect()
      connect(
        { connector },
        {
          onError: () => {
            setConnectingId(null)
            setWcUri(null)
          },
        },
      )
    },
    [connect, resetConnect],
  )

  return {
    address,
    isConnected,
    isConnecting: isReconnecting, // true during auto-reconnect on page load/refresh
    isModalOpen,
    openModal,
    closeModal,
    handleConnect,
    disconnect,
    connectors,
    connectingId: isConnectPending ? connectingId : null,
    connectError: connectError?.message ?? null,
    wcUri,
  }
}