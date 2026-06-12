export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://dkholidays.in/#organization",
        name: "DK Holidays",
        alternateName: [
          "DK Holidays Coimbatore",
          "DK Holidays Travels",
          "DK Holidays Tours and Travels",
          "DK Holidays Travel Agency",
          "Team Black Panther Travels",
        ],
        url: "https://dkholidays.in",
        logo: "https://dkholidays.in/logo.png",
        description:
          "DK Holidays is the best travel agency in Coimbatore offering tours and travels, tourist bus rental, holiday packages, corporate transport, airport pickup, family tours, school trips, wedding transportation and travel services across Tamil Nadu and South India.",
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
        areaServed: ["Coimbatore", "Tamil Nadu", "South India", "Kerala", "Ooty", "Kodaikanal", "Munnar"],
        openingHours: "Mo-Su 00:00-24:00",
        priceRange: "₹₹",
        sameAs: [
          "https://dkholidays.in",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "250",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://dkholidays.in/#local-business",
        name: "DK Holidays Coimbatore",
        parentOrganization: { "@id": "https://dkholidays.in/#organization" },
        description: "Best travel agency and tour operator in Coimbatore. Tour packages, bus rental, and holiday packages from Coimbatore.",
        areaServed: ["Coimbatore", "Gandhipuram", "RS Puram", "Peelamedu", "Saravanampatti", "Singanallur", "Vadavalli", "Saibaba Colony", "Race Course"],
      },
    ],
  };
}
