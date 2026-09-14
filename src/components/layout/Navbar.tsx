import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, LogOut } from 'lucide-react'
import { NexusBrand } from './NexusLogo'
import { truncateAddress } from '../../utils/format'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/swap', label: 'Swap' },
  { to: '/activity', label: 'Activity' },
] as const

interface NavbarProps {
  isConnected: boolean
  address?: string
  onConnectClick: () => void
  onDisconnect: () => void
}

export function Navbar({ isConnected, address, onConnectClick, onDisconnect }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleProtectedNav = (to: string, e: React.MouseEvent) => {
    if (!isConnected && to !== '/') {
      e.preventDefault()
      onConnectClick()
    }
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'relative px-1 py-1 text-sm font-medium transition-colors duration-200',
      isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200',
    ].join(' ')

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <button type="button" onClick={() => navigate('/')} className="group flex-shrink-0">
          <NexusBrand />
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={(e) => handleProtectedNav(link.to, e)}
              className={linkClass}
            >
              {({ isActive }) => (
                <span className="relative inline-block">
                  {link.label}
                  <span
                    className={[
                      'absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300',
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0',
                    ].join(' ')}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Wallet */}
        <div className="flex items-center gap-3">
          {isConnected && address ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="group flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-sm transition-all duration-200 hover:border-white/20 hover:bg-zinc-800/80 active:scale-[0.98]"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <span className="font-mono text-zinc-200">{truncateAddress(address)}</span>
                <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform group-hover:rotate-180" />
              </button>
              {menuOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-40"
                    aria-label="Close menu"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-white/10 bg-zinc-900/95 p-1 shadow-xl backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => {
                        onDisconnect()
                        setMenuOpen(false)
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Disconnect
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onConnectClick}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-900/30 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              Connect Wallet
            </button>
          )}

          <button
            type="button"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-white/5 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={(e) => {
                  handleProtectedNav(link.to, e)
                  setMobileOpen(false)
                }}
                className={({ isActive }) =>
                  [
                    'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white/5 text-white'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
