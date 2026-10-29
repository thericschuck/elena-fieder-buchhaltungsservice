import type { Metadata } from "next";
import Link from "next/link";
import RechtstextSeite from "./components/RechtstextSeite";
import { FIRMA } from "./lib/firma";

/**
 * Eigene 404-Seite statt der Next-Standardseite.
 *
 * Fuer die Suche relevant, weil eine 404 mit Navigation und Kontaktweg den
 * Besucher haelt, statt ihn zurueckspringen zu lassen. noindex ist hier
 * richtig: die Seite selbst soll nicht im Index landen.
 */
export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

export default function NichtGefunden() {
  return (
    <RechtstextSeite titel="Diese Seite gibt es nicht." stand="404">
      <p>
        Die Adresse führt ins Leere – vielleicht ein alter Link oder ein
        Tippfehler. Von hier kommen Sie weiter:
      </p>
      <ul>
        <li>
          <Link href="/">Zur Startseite</Link> – Leistungen, Branchen und Ablauf
        </li>
        <li>
          <Link href="/impressum">Impressum</Link>
        </li>
        <li>
          <Link href="/datenschutz">Datenschutzerklärung</Link>
        </li>
      </ul>
      <p>
        Oder direkt melden: <a href={`mailto:${FIRMA.email}`}>{FIRMA.email}</a>
      </p>
    </RechtstextSeite>
  );
}
