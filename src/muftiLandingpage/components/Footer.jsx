import React from 'react'
import { 
  Sparkles, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Hammer 
} from 'lucide-react'

// Brand icons from React Icons (Font Awesome sets)
import { FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa'

/**
 * SOCIAL_ICON_MAP connects your data strings to the actual components.
 * We use Fa (Font Awesome) for brands because Lucide removed them.
 */
const SOCIAL_ICON_MAP = {
  WhatsApp: FaWhatsapp,
  Instagram: FaInstagram,
  Twitter: FaTwitter
};

const Footer = React.memo(() => (
  <footer className="relative overflow-hidden bg-mufti-blue-950 text-white">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Brand Section */}
        <div className="lg:col-span-1">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mufti-blue-500">
              <Sparkles className="h-5 w-5 text-mufti-lime" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight">
                MUFTI<span className="text-mufti-blue-400">SPOT</span>
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-mufti-blue-400">
                Premium Laundry
              </p>
            </div>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-blue-300">
            Ibadan&apos;s premium laundry service. Professional care since 2022.
          </p>
          
          {/* Social Links - Fixed with React Icons */}
          <div className="flex gap-3">
            {[
              { icon: 'WhatsApp', href: 'https://wa.me/2348123456789', label: 'WhatsApp' },
              { icon: 'Instagram', href: 'https://instagram.com/muftispot', label: 'Instagram' },
              { icon: 'Twitter', href: 'https://twitter.com/muftispot', label: 'Twitter' },
            ].map((s) => {
              const IconComponent = SOCIAL_ICON_MAP[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition-all duration-300 hover:border-mufti-lime hover:bg-mufti-lime hover:text-mufti-blue-900"
                >
                  {IconComponent && <IconComponent className="h-5 w-5" />}
                </a>
              )
            })}
          </div>
        </div>

        {/* Link Columns */}
        {[
          {
            title: 'Services',
            items: ['Wash & Fold', 'Dry Cleaning', 'Steam & Press', 'Native Wear Care', 'Stain Removal', 'Shoe Cleaning'],
          },
          {
            title: 'Company',
            items: ['About Us', 'Our Story', 'Careers', 'Blog', 'Partners', 'Press Kit'],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-blue-300 transition-colors duration-200 hover:text-mufti-lime"
                  >
                    <ChevronRight className="h-3 w-3 text-blue-500 transition-all group-hover:translate-x-1 group-hover:text-mufti-lime" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Section */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mufti-lime" />
              <span className="text-sm text-blue-300">
                General Gas Junction, Akobo Road, Ibadan
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-mufti-lime" />
              <a href="tel:+2348123456789" className="text-sm text-blue-300 transition-colors hover:text-mufti-lime">
                +234 812 345 6789
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-mufti-lime" />
              <a href="mailto:hello@muftispot.com" className="text-sm text-blue-300 transition-colors hover:text-mufti-lime">
                hello@muftispot.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-mufti-lime" />
              <span className="text-sm text-blue-300">Mon-Sat: 7AM - 8PM</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-blue-400">
          &copy; {new Date().getFullYear()} Mufti Spot Laundry. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-blue-400">
          <a href="#" className="transition-colors hover:text-mufti-lime">Privacy Policy</a>
          <span className="text-blue-700">|</span>
          <a href="#" className="transition-colors hover:text-mufti-lime">Terms of Service</a>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-blue-500">
          <Hammer className="h-3 w-3" />
          Building in Public by{' '}
          <a href="#" className="font-medium text-mufti-lime hover:underline">
            Emmanuel Oguntoke
          </a>
        </p>
      </div>
    </div>
  </footer>
))

Footer.displayName = 'Footer'
export default Footer