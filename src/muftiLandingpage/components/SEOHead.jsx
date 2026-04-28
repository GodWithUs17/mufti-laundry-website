import React from 'react'
import { Helmet } from 'react-helmet-async'

/**
 * SEO component with:
 * - Meta tags (title, description, OG, Twitter)
 * - Local Business structured data (Schema.org)
 * - Canonical URL
 */
const SEOHead = React.memo(() => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LaundryOrDryCleaningService',
    name: 'Mufti Spot Laundry',
    description:
      'Premium laundry and dry cleaning service in Ibadan, Nigeria.',
    url: 'https://muftispot.com',
    telephone: '+234-812-345-6789',
    priceRange: '₦₦',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Shop 5, General Gas Junction, Akobo Road',
        addressLocality: 'Ibadan',
        addressRegion: 'Oyo State',
        postalCode: '200001',
        addressCountry: 'NG',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Beside First Bank, Akobo Ojurin',
        addressLocality: 'Ibadan',
        addressRegion: 'Oyo State',
        postalCode: '200001',
        addressCountry: 'NG',
      },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 7.4205,
      longitude: 3.9165,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '07:00',
        closes: '20:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2847',
      bestRating: '5',
    },
    sameAs: [
      'https://instagram.com/muftispot',
      'https://twitter.com/muftispot',
    ],
  }

  return (
    <Helmet>
      <title>
        Mufti Spot Laundry — Premium Laundry &amp; Dry Cleaning in Ibadan
      </title>
      <meta
        name="description"
        content="Experience Mufti Clean — Ibadan's #1 premium laundry service. Native wear, suits, casual wear cleaned with care. Free pickup & delivery."
      />
      <meta
        name="keywords"
        content="laundry Ibadan, dry cleaning Ibadan, native wear cleaning, agbada cleaning, Mufti Spot"
      />
      <meta
        property="og:title"
        content="Mufti Spot Laundry — Premium Laundry in Ibadan"
      />
      <meta
        property="og:description"
        content="Experience Mufti Clean — Ibadan's #1 rated laundry service."
      />
      <meta property="og:type" content="website" />
      <link rel="canonical" href="https://muftispot.com" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
})

SEOHead.displayName = 'SEOHead'
export default SEOHead