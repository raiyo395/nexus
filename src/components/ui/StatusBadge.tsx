import type { TxStatus } from '../../data/mockData'

const STYLES: Record<TxStatus, string> = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  pending: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  failed: 'border-red-500/30 bg-red-500/10 text-red-400',
}

const LABELS: Record<TxStatus, string> = {
  success: 'Success',
  pending: 'Pending',
  failed: 'Failed',
}

export function StatusBadge({ status }: { status: TxStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  )
}
