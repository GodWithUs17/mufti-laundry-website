import React from 'react'
import * as Icons from 'lucide-react'

/**
 * Small trust indicator used in the Hero section.
 * Renders an icon + value + label.
 */
const TrustMetric = React.memo(({ icon, value, label }) => {
  const IconComponent = Icons[icon]

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-mufti-blue-50">
        {IconComponent && (
          <IconComponent className="h-5 w-5 text-mufti-blue-500" />
        )}
      </div>
      <div>
        <p className="text-sm font-bold text-mufti-blue-900">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  )
})

TrustMetric.displayName = 'TrustMetric'
export default TrustMetric