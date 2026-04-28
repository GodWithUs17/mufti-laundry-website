import React from 'react'
import * as Icons from 'lucide-react'
import useInView from '../hooks/useInView'

/**
 * Interactive section with:
 * - Feature list for the customer dashboard
 * - CSS-styled iPhone mockup showing sample app UI
 */
const AppMockupSection = React.memo(() => {
  const [ref, inView] = useInView()

  return (
    <section className="relative overflow-hidden bg-mufti-blue-950 py-20 lg:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-mufti-blue-800/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-mufti-lime/5 blur-3xl" />
        <div className="bg-dot-pattern absolute inset-0 text-white opacity-5" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── Text Side ── */}
          <div className={inView ? 'animate-slide-up' : 'opacity-0'}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm font-semibold text-mufti-lime">
              <Icons.Smartphone className="h-4 w-4" /> Customer Dashboard
            </span>

            <h2 className="mt-4 mb-6 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Track Your Clothes in <span className="text-mufti-lime">Real-Time</span>
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-blue-200">
              Schedule pickups, track order status, and manage your subscription — via WhatsApp or our web app.
            </p>

            <div className="mb-10 space-y-4">
              {[
                { icon: 'Bell', text: 'WhatsApp notifications at every stage' },
                { icon: 'Eye', text: 'Live order tracking with status updates' },
                { icon: 'CreditCard', text: 'Easy payment via transfer or card' },
                { icon: 'RotateCcw', text: 'One-tap reorder your usual items' },
              ].map((f) => {
                const FI = Icons[f.icon]
                return (
                  <div key={f.text} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mufti-lime/20">
                      {FI && <FI className="h-4 w-4 text-mufti-lime" />}
                    </div>
                    <span className="text-sm text-blue-100">{f.text}</span>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/2348123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-mufti-lime px-6 py-3 text-sm font-bold text-mufti-blue-900 shadow-lg shadow-mufti-lime/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-mufti-lime-300"
              >
                <Icons.MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20">
                <Icons.PlayCircle className="h-4 w-4" /> Watch Demo
              </button>
            </div>
          </div>

          {/* ── iPhone Mockup ── */}
          <div className={`flex justify-center ${inView ? 'animation-delay-400 animate-fade-in' : 'opacity-0'}`}>
            <div className="relative">
              {/* Phone frame */}
              <div className="relative h-[580px] w-[280px] rounded-[3rem] border border-slate-700/50 bg-slate-900 p-3 shadow-2xl shadow-black/50 sm:h-[620px] sm:w-[300px]">
                <div className="iphone-notch" />
                <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-linear-to-b from-slate-50 to-blue-50">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 pt-10 pb-2">
                    <span className="text-xs font-semibold text-slate-800">9:41</span>
                    <div className="flex items-center gap-1">
                      <Icons.Signal className="h-3 w-3 text-slate-600" />
                      <Icons.Wifi className="h-3 w-3 text-slate-600" />
                      <Icons.Battery className="h-4 w-4 text-slate-600" />
                    </div>
                  </div>

                  {/* Greeting */}
                  <div className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-xs text-slate-500">Good Morning ☀️</p>
                      <p className="text-lg font-bold text-mufti-blue-950">Adewale!</p>
                    </div>
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-mufti-blue-400 to-mufti-blue-600 text-sm font-bold text-white">
                        AJ
                      </div>
                      <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
                    </div>
                  </div>

                  {/* Active order */}
                  <div className="mx-5 mb-4 rounded-2xl bg-mufti-blue-500 p-4 text-white shadow-lg">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icons.Package className="h-4 w-4 text-mufti-lime" />
                        <span className="text-xs font-semibold text-mufti-lime">In Progress</span>
                      </div>
                      <span className="text-xs text-blue-200">MFT-2024-847</span>
                    </div>
                    <p className="mb-1 text-sm font-bold">Native Wear Bundle</p>
                    <p className="mb-3 text-xs text-blue-200">3 Agbada • 2 Senator • 1 Aso Oke</p>
                    <div className="h-1.5 overflow-hidden rounded-full bg-blue-400/30">
                      <div className="h-full w-3/5 rounded-full bg-mufti-lime" />
                    </div>
                    <div className="mt-2 flex justify-between text-[10px] text-blue-200">
                      <span>Washing</span>
                      <span>Ironing</span>
                      <span>Ready</span>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="mb-4 px-5">
                    <p className="mb-3 text-xs font-semibold text-slate-500">Quick Actions</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: 'Plus', label: 'New Order', c: 'bg-blue-50 text-blue-500' },
                        { icon: 'Clock', label: 'History', c: 'bg-purple-50 text-purple-500' },
                        { icon: 'Gift', label: 'Rewards', c: 'bg-amber-50 text-amber-500' },
                      ].map((a) => {
                        const AI = Icons[a.icon]
                        return (
                          <div key={a.label} className="flex flex-col items-center gap-1.5 rounded-xl bg-white p-3 shadow-sm">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${a.c}`}>
                              {AI && <AI className="h-4 w-4" />}
                            </div>
                            <span className="text-[10px] font-medium text-slate-600">{a.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Recent orders */}
                  <div className="px-5">
                    <p className="mb-3 text-xs font-semibold text-slate-500">Recent Orders</p>
                    {[
                      { id: 'MFT-843', items: '5 Shirts, 3 Trousers', status: 'Delivered', c: 'text-green-500' },
                      { id: 'MFT-839', items: '2 Suits, Dry Clean', status: 'Delivered', c: 'text-green-500' },
                    ].map((o) => (
                      <div key={o.id} className="flex items-center justify-between border-b border-slate-100 py-2.5 last:border-0">
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{o.id}</p>
                          <p className="text-[10px] text-slate-400">{o.items}</p>
                        </div>
                        <span className={`text-[10px] font-semibold ${o.c}`}>{o.status}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom nav */}
                  <div className="absolute right-0 bottom-0 left-0 flex items-center justify-around border-t border-slate-100 bg-white px-6 py-3">
                    {[
                      { icon: 'Home', label: 'Home', active: true },
                      { icon: 'Search', label: 'Track', active: false },
                      { icon: 'CalendarDays', label: 'Book', active: false },
                      { icon: 'User', label: 'Profile', active: false },
                    ].map((tab) => {
                      const TI = Icons[tab.icon]
                      return (
                        <div key={tab.label} className="flex flex-col items-center gap-0.5">
                          {TI && <TI className={`h-5 w-5 ${tab.active ? 'text-mufti-blue-500' : 'text-slate-400'}`} />}
                          <span className={`text-[9px] font-medium ${tab.active ? 'text-mufti-blue-500' : 'text-slate-400'}`}>
                            {tab.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -left-4 top-32 flex max-w-[180px] animate-bounce-gentle items-start gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-lg sm:-left-16">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50">
                  <Icons.Check className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Order Ready!</p>
                  <p className="text-[10px] text-slate-500">Your clothes are ready 🎉</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

AppMockupSection.displayName = 'AppMockupSection'
export default AppMockupSection