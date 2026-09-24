export default function Field({ field, value, onChange, error }) {
  const { name, label, type = 'text', options, placeholder, required } = field

  const commonProps = {
    id: name,
    name,
    required,
    className: 'input-field',
    placeholder,
  }

  return (
    <div>
      <label htmlFor={name} className="label-field">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {type === 'select' ? (
        <select
          {...commonProps}
          value={value ?? ''}
          onChange={(e) => onChange(name, e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          {...commonProps}
          rows={3}
          value={value ?? ''}
          onChange={(e) => onChange(name, e.target.value)}
        />
      ) : (
        <input
          {...commonProps}
          type={type}
          value={value ?? ''}
          onChange={(e) => onChange(name, e.target.value)}
        />
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
