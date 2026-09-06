import Image from "next/image";
import Link from "next/link";
import Rail from "./ui/Rail";
import { Envelope, MapPin, Phone } from "./ui/Icons";
import logoHell from "../assets/logo/elena-fieder-logo-hell.png";
import { FIRMA } from "../lib/firma";

/*
  Die vollstaendige Anschrift steht hier bewusst im Footer und nicht nur im
  Impressum: fuer die lokale Suche zaehlt, dass Name, Adresse und Telefon auf
  jeder Seite in genau derselben Schreibweise auftauchen. Die Werte kommen aus
  app/lib/firma.ts - dort aendern, nicht hier.

  Das address-Element ist semantisch korrekt und wird von Suchmaschinen als
  Kontaktblock gelesen; die strukturierten Daten dazu liegen in
  app/components/StrukturierteDaten.tsx.
*/

export default function Footer() {
  return (
    <footer className="on-dark relative border-t border-white/10 bg-primary">
      <Rail tone="dark" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[var(--rail-x)_1fr_auto] lg:gap-10">
          <div className="lg:pr-10">
            {/* Helle Variante: im Original ist die Schrift Grau #545454 und
                waere auf dem Primary-Block nicht lesbar. */}
            <Image
              src={logoHell}
              alt="Elena Fieder Buchhaltungsservice"
              sizes="220px"
              className="h-14 w-auto"
            />
            <p className="mt-6 max-w-[22rem] text-[13px] leading-[1.6] text-white/55">
              Laufende Buchhaltung für Baubranche, Handwerk, Handel, Industrie,
              Dienstleistung und Freiberufler – aus Obernburg am Main,
              deutschlandweit digital.
            </p>
          </div>

          <div className="lg:pl-10">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
              Kontakt
            </h2>
            <address className="mt-5 flex flex-col gap-3.5 text-[15px] text-white/75 not-italic">
              <a
                href={FIRMA.telefonHref}
                className="flex items-center gap-3 transition-colors hover:text-bg"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                {FIRMA.telefon}
              </a>
              <a
                href={`mailto:${FIRMA.email}`}
                className="flex items-center gap-3 transition-colors hover:text-bg"
              >
                <Envelope className="h-4 w-4 shrink-0 text-gold" />
                {FIRMA.email}
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {FIRMA.strasse}
                  <br />
                  {FIRMA.plz} {FIRMA.ort}
                  <br />
                  <span className="text-white/55">
                    Deutschlandweit digital
                  </span>
                </span>
              </p>
            </address>
          </div>

          <nav aria-label="Rechtliches">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
              Rechtliches
            </h2>
            <ul className="mt-5 flex flex-col gap-3.5 text-[15px]">
              <li>
                <Link
                  href="/impressum"
                  className="text-white/75 transition-colors hover:text-bg"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-white/75 transition-colors hover:text-bg"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
          <p className="text-[13px] text-white/55 lg:pr-10">
            © 2026 {FIRMA.name}
          </p>
          <p className="mt-4 max-w-[42rem] text-[13px] leading-[1.6] text-white/55 lg:mt-0 lg:pl-10">
            Buchhaltungsservice nach § 6 StBerG. Steuerberatung sowie die
            Erstellung von Jahresabschlüssen und Steuererklärungen sind
            Steuerberatern vorbehalten und nicht Teil des Leistungsangebots.
          </p>
        </div>
      </div>
    </footer>
  );
}
