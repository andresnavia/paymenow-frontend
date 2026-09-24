const VARIANTS = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500 shadow-sm',
  secondary:
    'bg-white text-navy-900 border border-brand-200 hover:bg-brand-50',
  danger:
    'bg-white text-red-600 border border-red-200 hover:bg-red-50',
  ghost: 'text-brand-700 hover:bg-brand-100',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium
        transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
