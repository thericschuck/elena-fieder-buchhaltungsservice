/**
 * Stammdaten des Unternehmens – die einzige Quelle dafuer.
 *
 * Impressum, Datenschutzerklaerung, Footer, Metadaten, Sitemap und die
 * strukturierten Daten lesen alle von hier. Fuer lokale Suche ist das nicht
 * nur bequem, sondern notwendig: Google bewertet Name, Adresse und E-Mail
 * ("NAP") ueber alle Fundstellen hinweg, und schon eine abweichende
 * Schreibweise schwaecht das Signal. Aenderungen also ausschliesslich hier.
 */
export const FIRMA = {
  name: "Elena Fieder Buchhaltungsservice*",
  inhaberin: "Elena Fieder",

  strasse: "Siegfriedstraße 75",
  plz: "63785",
  ort: "Obernburg am Main",
  region: "Bayern",
  regionKurz: "Bayerischer Untermain",
  land: "Deutschland",
  landCode: "DE",

  /* Bewusst keine Telefonnummer: Elena moechte keine angeben. Nicht ergaenzen. */

  email: "info@elena-fieder.de",
  domain: "elena-fieder.de",
  url: "https://elena-fieder.de",

  /** Stand der Rechtstexte. Bei jeder inhaltlichen Aenderung mitziehen. */
  standRechtstexte: "September 2026",
} as const;

/** Einzeilige Anschrift, z. B. fuer "Verantwortlich fuer den Inhalt". */
export const ANSCHRIFT_EINZEILIG = `${FIRMA.strasse}, ${FIRMA.plz} ${FIRMA.ort}`;
