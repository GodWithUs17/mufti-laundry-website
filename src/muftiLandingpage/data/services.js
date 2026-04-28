/**
 * Service pricing data
 * Backend: GET /api/services
 * Prisma Schema:
 *   model Service {
 *     id        Int     @id @default(autoincrement())
 *     name      String
 *     price     Int
 *     icon      String
 *     category  String
 *     popular   Boolean @default(false)
 *     type      String  // 'individual' | 'subscription'
 *     items     String? // for subscriptions
 *     features  Json?   // for subscriptions
 *   }
 */

export const SUBSCRIPTION_PLANS = [
  {
    id: 101,
    name: 'Mufti Basic',
    price: 15000,
    items: '20 items/month',
    features: ['Wash & Fold', 'Free Pickup', '48hr Delivery'],
    popular: false,
  },
  {
    id: 102,
    name: 'Mufti Plus',
    price: 30000,
    items: '45 items/month',
    features: [
      'Wash, Iron & Fold',
      'Free Pickup & Delivery',
      '24hr Express',
      'Stain Treatment',
    ],
    popular: true,
  },
  {
    id: 103,
    name: 'Mufti Premium',
    price: 50000,
    items: 'Unlimited items',
    features: [
      'All Services Included',
      'Priority Pickup',
      'Same-Day Delivery',
      'Dedicated Handler',
      'WhatsApp Updates',
    ],
    popular: false,
  },
]

export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'native', label: 'Native Wear' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'casual', label: 'Casual' },
  { id: 'household', label: 'Household' },
  { id: 'special', label: 'Special' },
]