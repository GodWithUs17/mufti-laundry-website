import React from 'react'
import * as Icons from 'lucide-react'

/**
 * Reusable form input with:
 * - Icon prefix
 * - Validation states (error / success)
 * - Accessible labelling
 */
const FormField = React.memo(
  ({ label, name, type, placeholder, value, onChange, error, icon, required, min }) => {
    const IconComponent = Icons[icon]

    return (
      <div>
        <label
          htmlFor={name}
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>

        <div className="relative">
          {IconComponent && (
            <IconComponent className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          )}
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            required={required}
            className={`w-full rounded-xl border bg-white/60 py-3 pr-4 text-sm font-medium
                       text-slate-800 placeholder-slate-400 backdrop-blur-sm transition-all duration-300
                       focus:border-mufti-blue-500 focus:bg-white focus:ring-2 focus:ring-mufti-blue-500/50
                       focus:outline-none
                       ${icon ? 'pl-10' : 'pl-4'}
                       ${error
                         ? 'border-red-400 focus:border-red-400 focus:ring-red-400/50'
                         : value
                           ? 'border-green-400 focus:border-green-400 focus:ring-green-400/50'
                           : 'border-slate-200'
                       }`}
          />
        </div>

        {error && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
            <Icons.AlertCircle className="h-3 w-3" /> {error}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'
export default FormField