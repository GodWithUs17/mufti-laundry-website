import React, { useState, useCallback, useEffect } from 'react'
import * as Icons from 'lucide-react'
import useInView from '../hooks/useInView'
import FormField from './FormField'
import SuccessModal from './SuccessModal'
import API from '../../api/axios'

/**
 * Booking form section with:
 * - Left: Trust features
 * - Right: Validated form
 * - Success modal on submission
 * - Backend: POST /api/orders/book
 */
const BookingSection = React.memo(() => {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '',
    date: '', time: '', service: '', notes: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [services, setServices] = useState([])

  const today = new Date().toISOString().split('T')[0]

  // Fetch services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Fetch from public endpoint
        const response = await API.get('/services/public')
        // Response should be an array of services directly
        const servicesData = Array.isArray(response.data) ? response.data : response.data?.services || []
        setServices(servicesData)
      } catch (err) {
        console.error('Failed to fetch services:', err)
        // Fallback to hardcoded services if API fails
        setServices([
          { id: '1', name: 'Wash & Fold', price: 1500 },
          { id: '2', name: 'Dry Cleaning', price: 3000 },
          { id: '3', name: 'Native Wear Care', price: 2500 },
          { id: '4', name: 'Steam & Press', price: 2000 },
          { id: '5', name: 'Stain Removal', price: 1000 },
          { id: '6', name: 'Household Items', price: 4000 },
          { id: '7', name: 'Shoe Cleaning', price: 1500 }
        ])
      }
    }
    fetchServices()
  }, [])

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setForm((p) => ({ ...p, [name]: value }))
      if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
    },
    [errors]
  )

  const validate = useCallback(() => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    else if (!/^(\+234|0)[789]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid Nigerian phone number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.date) e.date = 'Select a date'
    if (!form.time) e.time = 'Select a time'
    if (!form.service) e.service = 'Choose a service'
    return e
  }, [form])

const onSubmit = useCallback(
  async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    
    setSubmitting(true);

    try {
      // Find the selected service
      const selectedService = services.find(s => s.id === form.service || s.name.toLowerCase().replace(/\s+/g, '-') === form.service);
      
      // Prepare data to match backend structure
      const orderData = {
        customerName: form.name,
        customerPhone: form.phone,
        address: form.address,
        pickupDate: form.date,
        pickupSlot: form.time,
        pickupNotes: form.notes,
        // Create items array with the selected service
        items: selectedService ? [{
          name: selectedService.name,
          price: selectedService.price || 1500,
          qty: 1,
          id: selectedService.id,
          serviceId: selectedService.id
        }] : [],
        applyHandlingFee: true
      };

      const response = await API.post('/orders/book', orderData);
    
      if (response.data.success || response.status === 201) {
        setSuccess(true);
        // Reset form
        setForm({
          name: '', phone: '', email: '', address: '',
          date: '', time: '', service: '', notes: '',
        });
        setErrors({});
      }
    }
    
    catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || "Booking failed";
      console.error("Booking Error:", errorMsg);
      setErrors({ submit: errorMsg });
    } finally {
      setSubmitting(false);
    }
  },
  [validate, form, services]
);

  const TRUST_FEATURES = [
    { icon: 'ShieldCheck', title: '100% Satisfaction Guarantee', desc: "Not happy? We'll re-clean for free or refund you." },
    { icon: 'Lock', title: 'Your Clothes Are Insured', desc: 'Full coverage for any damage during our care.' },
    { icon: 'Leaf', title: 'Eco-Friendly Products', desc: 'Biodegradable detergents safe for all fabrics.' },
    { icon: 'MessageCircle', title: 'WhatsApp Updates', desc: 'Real-time status updates on WhatsApp.' },
  ]

  return (
    <>
      <section id="booking" ref={ref} className="relative bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* ── Left: Info ── */}
            <div className={inView ? 'animate-slide-up' : 'opacity-0'}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-mufti-blue-100 bg-mufti-blue-50 px-4 py-1.5 text-sm font-semibold text-mufti-blue-600">
                <Icons.CalendarPlus className="h-4 w-4" /> Book a Pickup
              </span>
              <h2 className="mt-4 mb-4 text-3xl font-extrabold text-mufti-blue-950 sm:text-4xl lg:text-5xl">
                Schedule Your <span className="gradient-text">Pickup</span>
              </h2>
              <p className="mb-10 text-lg leading-relaxed text-slate-500">
                Fill in your details and we&apos;ll be at your doorstep. Free
                pickup for orders above ₦5,000.
              </p>

              <div className="space-y-6">
                {TRUST_FEATURES.map((f) => {
                  const FI = Icons[f.icon]
                  return (
                    <div key={f.title} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-mufti-blue-100 bg-mufti-blue-50">
                        {FI && <FI className="h-6 w-6 text-mufti-blue-500" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-mufti-blue-950">{f.title}</p>
                        <p className="text-sm text-slate-500">{f.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className={inView ? 'animation-delay-200 animate-slide-up' : 'opacity-0'}>
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl sm:p-8">
                <form onSubmit={onSubmit} noValidate>
                  {/* Name + Phone */}
                  <div className="mb-4 grid gap-4 sm:grid-cols-2">
                    <FormField label="Full Name" name="name" type="text" placeholder="Adewale Johnson" value={form.name} onChange={onChange} error={errors.name} icon="User" required />
                    <FormField label="Phone Number" name="phone" type="tel" placeholder="0812 345 6789" value={form.phone} onChange={onChange} error={errors.phone} icon="Phone" required />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <FormField label="Email (Optional)" name="email" type="email" placeholder="adewale@example.com" value={form.email} onChange={onChange} error={errors.email} icon="Mail" />
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <FormField label="Pickup Address" name="address" type="text" placeholder="House 5, Akobo Estate, Ibadan" value={form.address} onChange={onChange} error={errors.address} icon="MapPin" required />
                  </div>

                  {/* Date + Time */}
                  <div className="mb-4 grid gap-4 sm:grid-cols-2">
                    <FormField label="Pickup Date" name="date" type="date" min={today} value={form.date} onChange={onChange} error={errors.date} icon="Calendar" required />
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Time Slot <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Icons.Clock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <select
                          name="time"
                          value={form.time}
                          onChange={onChange}
                          className={`w-full appearance-none rounded-xl border bg-white/60 py-3 pr-10 pl-10 text-sm font-medium text-slate-800 backdrop-blur-sm transition-all duration-300 focus:border-mufti-blue-500 focus:bg-white focus:ring-2 focus:ring-mufti-blue-500/50 focus:outline-none ${errors.time ? 'border-red-400' : 'border-slate-200'}`}
                          required
                        >
                          <option value="">Select time slot</option>
                          <option value="7-9">7:00 AM - 9:00 AM</option>
                          <option value="9-11">9:00 AM - 11:00 AM</option>
                          <option value="11-1">11:00 AM - 1:00 PM</option>
                          <option value="1-3">1:00 PM - 3:00 PM</option>
                          <option value="3-5">3:00 PM - 5:00 PM</option>
                          <option value="5-7">5:00 PM - 7:00 PM</option>
                        </select>
                        <Icons.ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                      {errors.time && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <Icons.AlertCircle className="h-3 w-3" />
                          {errors.time}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service */}
                  <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Service Type <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Icons.Sparkles className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <select
                        name="service"
                        value={form.service}
                        onChange={onChange}
                        className={`w-full appearance-none rounded-xl border bg-white/60 py-3 pr-10 pl-10 text-sm font-medium text-slate-800 backdrop-blur-sm transition-all duration-300 focus:border-mufti-blue-500 focus:bg-white focus:ring-2 focus:ring-mufti-blue-500/50 focus:outline-none ${errors.service ? 'border-red-400' : 'border-slate-200'}`}
                        required
                      >
                        <option value="">Choose a service</option>
                        {services.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.name} {s.price ? `(₦${s.price})` : ''}
                          </option>
                        ))}
                      </select>
                      <Icons.ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                    {errors.service && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <Icons.AlertCircle className="h-3 w-3" />
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="mb-6">
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Special Instructions
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={onChange}
                      rows={3}
                      placeholder="E.g., 'Please use mild detergent on the lace Aso Oke'"
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white/60 px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 backdrop-blur-sm transition-all duration-300 focus:border-mufti-blue-500 focus:bg-white focus:ring-2 focus:ring-mufti-blue-500/50 focus:outline-none"
                    />
                  </div>

                  {/* Error message */}
                  {errors.submit && (
                    <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-700">
                      <Icons.AlertCircle className="h-4 w-4 shrink-0" />
                      <p className="text-sm font-medium">{errors.submit}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-mufti-lime px-6 py-4 text-base font-bold text-mufti-blue-900 shadow-lg shadow-mufti-lime/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-mufti-lime-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Icons.Loader2 className="h-5 w-5 animate-spin" />{' '}
                        Scheduling...
                      </>
                    ) : (
                      <>
                        <Icons.CalendarCheck className="h-5 w-5" /> Confirm Free
                        Pickup
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {success && <SuccessModal onClose={() => setSuccess(false)} />}
    </>
  )
})

BookingSection.displayName = 'BookingSection'
export default BookingSection