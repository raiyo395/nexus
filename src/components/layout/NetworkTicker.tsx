import { NETWORK_STATS } from '../../data/mockData'

export function NetworkTicker() {
  const items = [...NETWORK_STATS, ...NETWORK_STATS]

  return (
    <div className="relative overflow-hidden border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <span className="absolute left-0 top-0 z-10 flex h-full items-center border-r border-white/5 bg-zinc-950/95 px-3 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        Sample market data
      </span>
      <div className="flex animate-ticker whitespace-nowrap py-2 pl-36">
        {items.map((stat, i) => (
          <span key={`${stat}-${i}`} className="mx-8 text-xs font-medium text-zinc-500">
            {stat}
            <span className="mx-8 text-zinc-700">|</span>
          </span>
        ))}
      </div>
    </div>
  )
}
