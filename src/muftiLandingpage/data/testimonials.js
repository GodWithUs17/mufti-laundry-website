/**
 * Testimonial data
 * Backend: GET /api/testimonials?approved=true
 * Prisma Schema:
 *   model Testimonial {
 *     id        Int      @id @default(autoincrement())
 *     name      String
 *     role      String
 *     content   String
 *     rating    Int
 *     avatar    String
 *     color     String
 *     approved  Boolean  @default(false)
 *     createdAt DateTime @default(now())
 *   }
 */

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Adewale Johnson',
    role: 'Business Executive',
    content:
      'Mufti Spot is a game changer! My agbada always comes back looking brand new. The express service saved me before a last-minute owambe. Best laundry in Ibadan, no cap! 🔥',
    rating: 5,
    avatar: 'AJ',
    color: 'from-blue-500 to-purple-600',
  },
  {
    id: 2,
    name: 'Folashade Ogundimu',
    role: 'University Lecturer, UI',
    content:
      'I have been using their Mufti Plus subscription for 6 months. The consistency is incredible — pickup is always on time and my clothes are handled with such care. Worth every naira!',
    rating: 5,
    avatar: 'FO',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 3,
    name: 'Chinedu Okafor',
    role: 'Tech Founder',
    content:
      'Finally, a laundry service that understands quality. They got red palm oil stains out of my white shirt — I was shocked! The WhatsApp tracking feature is also super convenient.',
    rating: 5,
    avatar: 'CO',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 4,
    name: 'Amina Bello',
    role: 'Medical Doctor, UCH',
    content:
      "As a doctor with crazy hours, Mufti Spot's pickup and delivery service is a lifesaver. My scrubs and personal clothes are always fresh. The Bodija branch is super accessible too!",
    rating: 5,
    avatar: 'AB',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 5,
    name: 'Olumide Adeleke',
    role: 'Real Estate Developer',
    content:
      'I brought my curtains, duvets, and a mountain of native wear — they handled everything perfectly. The pricing is very fair for the quality you get. Highly recommended!',
    rating: 4,
    avatar: 'OA',
    color: 'from-cyan-500 to-blue-600',
  },
]