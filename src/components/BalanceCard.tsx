interface Props {
  isLoading: boolean
  value?: number
  symbol?: string
}

export function BalanceCard({ isLoading, value, symbol }: Props) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 mb-4">
      <p className="text-sm text-gray-400 mb-1">Balance</p>
      <p className="text-2xl font-semibold">
        {isLoading ? (
          <span className="text-gray-500 text-lg animate-pulse">Loading...</span>
        ) : (
          <>
            {value !== undefined ? value.toFixed(4) : '0'}{' '}
            <span className="text-gray-400 text-lg">{symbol}</span>
          </>
        )}
      </p>
    </div>
  )
}