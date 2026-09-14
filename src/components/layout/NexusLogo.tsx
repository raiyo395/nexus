export function NexusLogo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="nexus-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#nexus-grad)" opacity="0.15" />
      <path
        d="M20 8 L32 14 L32 26 L20 32 L8 26 L8 14 Z"
        fill="none"
        stroke="url(#nexus-grad)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="4" fill="url(#nexus-grad)" />
      <path
        d="M20 14 L20 26 M14 17 L26 23 M14 23 L26 17"
        stroke="url(#nexus-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}

export function NexusBrand({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg'
  return (
    <div className="flex items-center gap-2.5">
      <NexusLogo className={size === 'lg' ? 'h-10 w-10' : 'h-8 w-8'} />
      <span className={`${textSize} tracking-tight`}>
        <span className="font-bold text-white">NEXUS</span>
        <span className="font-light text-zinc-400">hub</span>
      </span>
    </div>
  )
}
