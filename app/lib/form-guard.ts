/**
 * Schutz fuer das Kontaktformular, nach dem Muster aus dem Band-Projekt
 * (packages/form-guard): Grenzen je IP, je Empfaengeradresse und insgesamt.
 *
 * Bewusst ohne externe Dienste. Der Zaehler liegt im Arbeitsspeicher der
 * Serverinstanz; auf Vercel teilen sich mehrere Instanzen keinen Speicher, die
 * Grenzen gelten also pro Instanz. Das bremst Skripte und Mehrfachklicks
 * zuverlaessig, ersetzt aber kein Captcha. Gespeichert wird nur ein
 * fluechtiger Zaehler, nichts davon wird persistiert.
 */

export const LIMITS = {
  /** Maximale Zeichenzahl je Feld. */
  felder: { name: 100, email: 254, telefon: 40, nachricht: 5_000 } as Record<
    string,
    number
  >,
  /** Absendeversuche je IP-Adresse (zaehlt auch ungueltige). */
  proIp: { max: 5, fensterMs: 10 * 60_000 },
  /** Mails je Adresse - verhindert, dass Fremde per Bestaetigung zugespammt werden. */
  proEmail: { max: 3, fensterMs: 60 * 60_000 },
  /** Notbremse fuer die ganze Instanz. */
  gesamt: { max: 60, fensterMs: 60 * 60_000 },
};

const treffer = new Map<string, number[]>();
const MAX_SCHLUESSEL = 5_000;

function aufraeumen(jetzt: number) {
  if (treffer.size <= MAX_SCHLUESSEL) return;
  for (const [key, zeiten] of treffer) {
    if (zeiten.every((t) => jetzt - t > 60 * 60_000)) treffer.delete(key);
  }
  if (treffer.size > MAX_SCHLUESSEL) {
    for (const key of [...treffer.keys()].slice(
      0,
      treffer.size - MAX_SCHLUESSEL,
    )) {
      treffer.delete(key);
    }
  }
}

/** Gleitendes Fenster. Zaehlt den Aufruf mit, auch wenn das Limit erreicht ist. */
export function begrenze(
  key: string,
  { max, fensterMs }: { max: number; fensterMs: number },
): boolean {
  const jetzt = Date.now();
  const juengste = (treffer.get(key) ?? []).filter(
    (t) => jetzt - t < fensterMs,
  );
  juengste.push(jetzt);
  treffer.set(key, juengste);
  aufraeumen(jetzt);
  return juengste.length <= max;
}

/**
 * Client-IP. Auf Vercel setzt die Plattform diese Header selbst und
 * ueberschreibt Werte des Aufrufers; ausserhalb von Vercel sind sie faelschbar.
 */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ||
    headers.get("x-real-ip")?.trim() ||
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unbekannt"
  );
}

/** Zu lange Felder ablehnen, statt sie still abzuschneiden. */
export function zuLang(felder: Record<string, unknown>): boolean {
  return Object.entries(LIMITS.felder).some(([key, max]) => {
    const wert = felder[key];
    return typeof wert === "string" && wert.length > max;
  });
}
