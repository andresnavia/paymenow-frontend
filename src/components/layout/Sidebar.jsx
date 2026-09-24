import { NavLink } from 'react-router-dom'
import { Waves } from 'lucide-react'
import { NAV_ITEMS } from '../../nav'

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-navy-950 text-white lg:flex">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500">
          <Waves size={18} />
        </div>
        <div>
          <p className="font-display text-lg leading-none text-white">PayMeNow</p>
          <p className="text-xs text-brand-300">Cuentas de streaming</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-500 text-white'
                  : 'text-brand-100/80 hover:bg-navy-900 hover:text-white'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-navy-900 px-6 py-4 text-xs text-brand-300/70">
        Conectado a localhost:8080
      </div>
    </aside>
  )
}
