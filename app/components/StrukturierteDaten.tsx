import { FIRMA } from "../lib/firma";
import { FRAGEN } from "../lib/faq";

/*
  Strukturierte Daten als JSON-LD.

  Warum JSON-LD und nicht Microdata im Markup: Google empfiehlt es
  ausdruecklich, und es haelt die Auszeichnung aus dem Layout heraus - das
  Markup kann umgebaut werden, ohne die Daten zu zerstoeren.

  Drei Graphen in einem @graph, ueber @id verknuepft:

    AccountingService  das Unternehmen. Der spezifische Typ ist besser als
                       LocalBusiness, weil er die Branche mitteilt.
    Person             Elena selbst, als founder/employee verknuepft.
    FAQPage            die Fragen aus der Fragen-Section. Nur zulaessig, weil
                       Frage und Antwort auf der Seite auch sichtbar stehen -
                       unsichtbare FAQ-Auszeichnung ist ein Verstoss gegen die
                       Richtlinien und fuehrt zu manuellen Massnahmen.

  BEWUSST NICHT enthalten:

  1. aggregateRating / review. Wir haben echte Kundenstimmen, aber von
     der Website selbst eingesammelte Bewertungen sind fuer Review-Snippets
     seit 2019 nicht mehr zulaessig ("self-serving reviews"). Auszeichnen
     wuerde hier nichts bringen und im schlechtesten Fall eine manuelle
     Massnahme ausloesen.
  2. geo (Breite/Laenge). Die Koordinaten der Anschrift sind mir nicht
     bekannt. Geratene Koordinaten sind schlechter als keine - sie koennen
     das Unternehmen an einen falschen Ort setzen. Nachtragen, sobald das
     Google-Unternehmensprofil steht; von dort exakt uebernehmen.
  3. priceRange und openingHours. Keine belastbaren Angaben vorhanden.
*/

const ID_FIRMA = `${FIRMA.url}/#buchhaltungsservice`;
const ID_PERSON = `${FIRMA.url}/#elena-fieder`;

const BRANCHEN = [
  "Baubranche",
  "Handwerk",
  "Handel",
  "Industrie",
  "Dienstleistung",
  "Freiberufler",
];

const LEISTUNGEN = [
  "Laufende Finanzbuchhaltung",
  "Offene Posten und Zahlungsüberwachung",
  "BWA und betriebswirtschaftliche Auswertungen",
  "Prozessoptimierung und digitale Organisation",
  "Bau- und projektbezogene Abrechnung",
  "Vorbereitung der Unterlagen für den Steuerberater",
];

export default function StrukturierteDaten() {
  const daten = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AccountingService",
        "@id": ID_FIRMA,
        name: FIRMA.name,
        legalName: FIRMA.name,
        url: FIRMA.url,
        email: FIRMA.email,
        telephone: FIRMA.telefonE164,
        image: `${FIRMA.url}/opengraph-image.png`,
        logo: `${FIRMA.url}/icon.svg`,
        description:
          "Laufende Buchhaltung für Baubranche, Handwerk, Handel, Industrie, Dienstleister und Freiberufler. Bilanzbuchhalterin (IHK) mit über 10 Jahren Berufserfahrung, Sitz in Obernburg am Main, deutschlandweit digital.",
        address: {
          "@type": "PostalAddress",
          streetAddress: FIRMA.strasse,
          postalCode: FIRMA.plz,
          addressLocality: FIRMA.ort,
          addressRegion: FIRMA.region,
          addressCountry: FIRMA.landCode,
        },
        founder: { "@id": ID_PERSON },
        employee: { "@id": ID_PERSON },
        knowsLanguage: ["de", "ru"],
        areaServed: [
          { "@type": "Country", name: "Deutschland" },
          { "@type": "City", name: FIRMA.ort },
        ],
        /* Was Elena tut - und ausdruecklich, was sie nicht tut. Die Abgrenzung
           steht bewusst auch in den Daten, nicht nur im Text. */
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Leistungen",
          itemListElement: LEISTUNGEN.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
        makesOffer: {
          "@type": "Offer",
          name: "Kostenloses Erstgespräch",
          description:
            "20 Minuten Telefonat, unverbindlich und kostenlos.",
          price: "0",
          priceCurrency: "EUR",
        },
        keywords: BRANCHEN.join(", "),
        disambiguatingDescription:
          "Buchhaltungsservice nach § 6 StBerG. Steuerberatung, Jahresabschlüsse und Steuererklärungen sind Steuerberatern vorbehalten und nicht Teil des Leistungsangebots.",
      },
      {
        "@type": "Person",
        "@id": ID_PERSON,
        name: FIRMA.inhaberin,
        jobTitle: "Bilanzbuchhalterin (IHK)",
        description:
          "Bachelor Professional in Bilanzbuchhaltung (IHK), über 10 Jahre Berufserfahrung in Buchhaltung und Jahresabschluss.",
        worksFor: { "@id": ID_FIRMA },
        knowsLanguage: ["de", "ru"],
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Fortbildungsabschluss",
          name: "Bachelor Professional in Bilanzbuchhaltung (IHK)",
          recognizedBy: {
            "@type": "Organization",
            name: "Industrie- und Handelskammer",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${FIRMA.url}/#fragen`,
        mainEntity: FRAGEN.map(({ frage, antwortKlartext }) => ({
          "@type": "Question",
          name: frage,
          acceptedAnswer: { "@type": "Answer", text: antwortKlartext },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify entschaerft die Daten ausreichend: der Inhalt ist
      // statisch und enthaelt keine Nutzereingaben.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(daten) }}
    />
  );
}
