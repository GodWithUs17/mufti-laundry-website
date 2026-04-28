import React from 'react'
import * as Icons from 'lucide-react'
import useCounter from '../hooks/useCounter'

/**
 * Single animated stat card used in StatsSection.
 */
const StatCard = React.memo(
  ({ icon, end, suffix, label, isDecimal, startCounting }) => {
    const count = useCounter(
      isDecimal ? end * 10 : end,
      2000,
      startCounting
    )
    const IconComponent = Icons[icon]
    const display = isDecimal
      ? (count / 10).toFixed(1)
      : count.toLocaleString('en-NG')

    return (
      <div className="text-center">
        <div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl
                      border border-white/20 bg-white/10"
        >
          {IconComponent && (
            <IconComponent className="h-7 w-7 text-mufti-lime" />
          )}
        </div>
        <p className="mb-1 text-3xl font-extrabold text-white sm:text-4xl">
          {display}
          {suffix}
        </p>
        <p className="text-sm font-medium text-blue-100">{label}</p>
      </div>
    )
  }
)

StatCard.displayName = 'StatCard'
export default StatCard