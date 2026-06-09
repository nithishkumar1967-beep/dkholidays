export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://dkholidays.in/#organization",
        name: "DK Holidays",
        alternateName: ["DK Holidays Coimbatore", "Team Black Panther Travels"],
        url: "https://dkholidays.in",
        logo: "https://dkholidays.in/logo.png",
        description:
          "Coimbatore's trusted travel & transportation company. Tourist bus rental, corporate transport, airport pickup, family trips, school tours and wedding transportation.",
        telephone: "+919944890203",
        email: "info@dkholidays.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Coimbatore",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 11.0168,
          longitude: 76.9558,
        },
        areaServed: ["Coimbatore", "Tamil Nadu", "South India"],
        openingHours: "Mo-Su 00:00-24:00",
        priceRange: "₹₹",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "200",
          bestRating: "5",
        },
      },
    ],
  };
}
