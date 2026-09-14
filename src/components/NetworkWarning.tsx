interface Props {
  onSwitch: () => void
  isSwitching?: boolean
}

export function NetworkWarning({ onSwitch, isSwitching }: Props) {
  return (
    <div className="bg-yellow-900/40 border border-yellow-700 rounded-xl p-4 mb-4">
      <p className="text-sm text-yellow-300 mb-2">Wrong network. Nexus runs on Sepolia testnet.</p>
      <button
        onClick={onSwitch}
        disabled={isSwitching}
        className="w-full bg-yellow-600 hover:bg-yellow-500 active:scale-[0.98] text-white font-medium rounded-lg py-2 text-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSwitching ? 'Switching...' : 'Switch to Sepolia'}
      </button>
    </div>
  )
}