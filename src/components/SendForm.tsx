import { Loader2 } from 'lucide-react'
import { TransactionLink } from './TransactionLink'

interface Props {
  recipient: string
  amount: string
  formError: string
  txError?: string
  isPending: boolean
  isSuccess: boolean
  txHash?: string
  wrongNetwork: boolean
  onRecipientChange: (v: string) => void
  onAmountChange: (v: string) => void
  onSend: () => void
}

export function SendForm({
  recipient,
  amount,
  formError,
  txError,
  isPending,
  isSuccess,
  txHash,
  wrongNetwork,
  onRecipientChange,
  onAmountChange,
  onSend,
}: Props) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 mb-4">
      <p className="text-sm text-gray-400 mb-3">Send</p>
      <input
        type="text"
        placeholder="Recipient address"
        value={recipient}
        onChange={(e) => onRecipientChange(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm mb-2 outline-none focus:border-gray-500 transition-colors duration-150"
      />
      <input
        type="text"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-gray-500 transition-colors duration-150"
      />
      <button
        onClick={onSend}
        disabled={isPending || wrongNetwork || !recipient || !amount}
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 font-medium rounded-lg py-2 text-sm hover:bg-gray-200 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {isPending && <Loader2 size={14} className="animate-spin" />}
        {isPending ? 'Sending...' : 'Send'}
      </button>

      {formError && <p className="text-sm text-red-400 mt-2">{formError}</p>}
      {txError && <p className="text-sm text-red-400 mt-2">{txError}</p>}

      {isSuccess && txHash && <TransactionLink hash={txHash} variant="success" />}
    </div>
  )
}