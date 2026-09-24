import { Inbox } from 'lucide-react'

export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-brand-200 bg-white px-6 py-16 text-center">
      <div className="rounded-full bg-brand-50 p-3 text-brand-500">
        <Inbox size={22} />
      </div>
      <div>
        <p className="font-medium text-navy-900">{title}</p>
        {description && <p className="mt-1 text-sm text-ink/60">{description}</p>}
      </div>
      {action}
    </div>
  )
}
