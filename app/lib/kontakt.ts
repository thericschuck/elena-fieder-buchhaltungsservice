/**
 * Gemeinsame Definition des Kontaktformulars.
 *
 * Client und Server lesen dieselben Regeln aus dieser Datei. Die Pruefung im
 * Browser ist nur Komfort – der Server pruefen muss unabhaengig davon noch
 * einmal, weil ein Request auch ohne unser Formular ankommen kann.
 */

/**
 * Feld, das kein Mensch sieht und kein Mensch ausfuellt. Ist es befuellt,
 * war ein Bot am Werk.
 *
 * Der Name ist bewusst bedeutungslos: "webseite" oder "firma" koennte
 * Browser-Autofill treffen, und eine stillschweigend verworfene echte Anfrage
 * waere deutlich teurer als ein durchgerutschter Bot.
 */
export const HONEYPOT = "bestaetigung";

export type KontaktFelder = {
  name: string;
  email: string;
  telefon: string;
  nachricht: string;
  datenschutz: boolean;
  [HONEYPOT]: string;
};

export type PflichtFeld = "name" | "email" | "datenschutz";
export type KontaktFehler = Partial<Record<PflichtFeld, string>>;

export type KontaktErgebnis =
  | { status: "leer" }
  | { status: "ok" }
  | { status: "fehler"; fehler?: KontaktFehler; allgemein?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const text = (data: FormData, key: string) =>
  String(data.get(key) ?? "").trim();

export function leseFormData(data: FormData): KontaktFelder {
  return {
    name: text(data, "name"),
    email: text(data, "email"),
    telefon: text(data, "telefon"),
    nachricht: text(data, "nachricht"),
    datenschutz: data.get("datenschutz") !== null,
    [HONEYPOT]: text(data, HONEYPOT),
  };
}

export function pruefeKontakt(felder: KontaktFelder): KontaktFehler {
  const fehler: KontaktFehler = {};

  if (felder.name.length < 2) fehler.name = "Bitte geben Sie Ihren Namen an.";

  if (!felder.email) fehler.email = "Bitte geben Sie Ihre E-Mail-Adresse an.";
  else if (!EMAIL.test(felder.email))
    fehler.email = "Diese E-Mail-Adresse sieht nicht vollständig aus.";

  if (!felder.datenschutz)
    fehler.datenschutz = "Bitte bestätigen Sie die Datenschutzerklärung.";

  return fehler;
}

export function hatFehler(fehler: KontaktFehler) {
  return Object.keys(fehler).length > 0;
}
