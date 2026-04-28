/**
 * Branch / location data
 * Backend: GET /api/branches
 * Prisma Schema:
 *   model Branch {
 *     id       Int      @id @default(autoincrement())
 *     name     String
 *     address  String
 *     area     String
 *     state    String
 *     phone    String
 *     hours    String
 *     lat      Float
 *     lng      Float
 *     isMain   Boolean  @default(false)
 *     features String[]
 *   }
 */

export const BRANCHES = [
  {
    id: 1,
    name: 'General Gas Branch',
    address: 'Shop 5, General Gas Junction, Akobo Road',
    area: 'General Gas, Ibadan',
    state: 'Oyo State, Nigeria',
    phone: '+234 812 345 6789',
    hours: 'Mon-Sat: 7:00 AM - 8:00 PM',
    lat: 7.4205,
    lng: 3.9165,
    isMain: true,
    features: ['Dry Cleaning', 'Express Service', 'Free Parking'],
  },
  {
    id: 2,
    name: 'Akobo Branch',
    address: 'Beside First Bank, Akobo Ojurin',
    area: 'Akobo, Ibadan',
    state: 'Oyo State, Nigeria',
    phone: '+234 812 345 6790',
    hours: 'Mon-Sat: 7:00 AM - 7:00 PM',
    lat: 7.4335,
    lng: 3.8965,
    isMain: false,
    features: ['Wash & Fold', 'Ironing', 'Pickup Service'],
  },
  {
    id: 3,
    name: 'Bodija Branch',
    address: 'Opposite UI Second Gate, Bodija',
    area: 'Bodija, Ibadan',
    state: 'Oyo State, Nigeria',
    phone: '+234 812 345 6791',
    hours: 'Mon-Sun: 6:30 AM - 9:00 PM',
    lat: 7.4420,
    lng: 3.9040,
    isMain: false,
    features: ['Full Service', '24hr Express', 'Student Discount'],
  },
]