import React from 'react'
import * as Icons from 'lucide-react'

/**
 * Booking confirmation modal overlay.
 * Closes on backdrop click or "Done" button.
 */
const SuccessModal = React.memo(({ onClose }) => (
  <div
    className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
    onClick={onClose}
  >
    {/* Backdrop */}
    <div className="animate-fade-in absolute inset-0 bg-black/50 backdrop-blur-sm" />

    {/* Modal */}
    <div
      className="animate-scale-in relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl sm:p-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-100">
        <Icons.CheckCircle2 className="h-10 w-10 text-green-500" />
      </div>

      <h3 className="mb-3 text-2xl font-extrabold text-mufti-blue-950">
        Booking Confirmed! 🎉
      </h3>
      <p className="mb-2 text-slate-500">
        Your pickup has been scheduled successfully.
      </p>
      <p className="mb-8 text-sm text-slate-400">
        We&apos;ll send a confirmation to your WhatsApp shortly.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="https://wa.me/2348123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-mufti-lime px-6 py-3
                     text-sm font-bold text-mufti-blue-900 shadow-lg transition-all hover:bg-mufti-lime-300"
        >
          <Icons.MessageCircle className="h-4 w-4" /> Chat on WhatsApp
        </a>
        <button
          onClick={onClose}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-mufti-blue-500
                     bg-transparent px-6 py-3 text-sm font-semibold text-mufti-blue-500
                     transition-all hover:bg-mufti-blue-500 hover:text-white"
        >
          Done
        </button>
      </div>
    </div>
  </div>
))

SuccessModal.displayName = 'SuccessModal'
export default SuccessModal