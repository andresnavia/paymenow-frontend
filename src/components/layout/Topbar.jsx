import { NavLink } from 'react-router-dom'
import { Waves } from 'lucide-react'
import { NAV_ITEMS } from '../../nav'

export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-brand-100 bg-white/90 backdrop-blur lg:hidden">
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
          <Waves size={16} />
        </div>
        <p className="font-display text-base text-navy-950">PayMeNow</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3">
        {NAV_ITEMS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-brand-500 text-white'
                  : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
