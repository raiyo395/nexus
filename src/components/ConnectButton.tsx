import { type Connector } from 'wagmi'

interface Props {
  connector: Connector
  onConnect: () => void
}

export function ConnectButton({ connector, onConnect }: Props) {
  return (
    <button
      onClick={onConnect}
      className="w-full bg-gray-800 hover:bg-gray-700 active:scale-[0.98] active:bg-gray-600 rounded-lg py-2.5 text-sm transition-all duration-150"
    >
      Connect {connector.name}
    </button>
  )
}