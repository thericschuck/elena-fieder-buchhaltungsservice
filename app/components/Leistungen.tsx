import Rail from "./ui/Rail";
import Reveal from "./ui/Reveal";
import { Mauer, Ordner, Receipt, Sliders, Users } from "./ui/Icons";

/**
 * Wortlaut aus den finalen Website-Texten, Abschnitt "Meine Leistungen" -
 * fuenf Leistungen, je ein Beschreibungstext. Nicht zusammenfassen, nicht
 * ergaenzen und keine Unterpunkte oder Nutzen-Saetze hinzufuegen: die Liste ist
 * bewusst eng gehalten (Hilfeleistung in Steuersachen nach § 6 Nr. 3 und 4
 * StBerG). Begriffe wie BWA, Kontenabstimmung, Finanzbuchhaltung oder
 * Jahresabschluss gehoeren nicht in dieses Angebot.
 */
const LEISTUNGEN = [
  {
    Icon: Receipt,
    name: "Buchen laufender Geschäftsvorfälle",
    text: "Regelmäßige Erfassung Ihrer laufenden Geschäftsvorgänge auf Grundlage der von Ihnen bereitgestellten Unterlagen. Dazu gehören insbesondere Eingangs- und Ausgangsrechnungen, Bankbewegungen, Kassenbewegungen, Kreditkartenbewegungen sowie die laufende Zuordnung der Geschäftsvorfälle.",
  },
  {
    Icon: Users,
    name: "Offene Posten & Zahlungsübersicht",
    text: "Übersicht der im Rahmen der laufenden Buchführung erfassten offenen Kunden- und Lieferantenvorgänge sowie organisatorische Nachverfolgung von Zahlungseingängen, Zahlungsausgängen und Fälligkeiten.",
  },
  {
    Icon: Sliders,
    name: "Digitale Belegorganisation",
    text: "Gemeinsam schaffen wir einen einfachen und verlässlichen Ablauf für die digitale Übergabe und Organisation Ihrer laufenden Unterlagen.",
  },
  {
    Icon: Mauer,
    name: "Projekt- und objektbezogene Zuordnung",
    text: "Laufende Geschäftsvorfälle können nach Ihren Vorgaben den entsprechenden Projekten oder Objekten zugeordnet werden. Das schafft insbesondere bei Bau-, Handwerks- und projektorientierten Unternehmen mehr Transparenz.",
  },
  {
    Icon: Ordner,
    name: "Bereitstellung für Ihren Steuerberater",
    text: "Die im Rahmen meiner Tätigkeit bearbeiteten Unterlagen werden strukturiert und nachvollziehbar für die weitere Bearbeitung durch Ihren Steuerberater bereitgestellt.",
  },
];

export default function Leistungen() {
  return (
    <section
      id="leistungen"
      className="relative border-t border-primary/10 bg-white py-24 lg:py-32"
    >
      <Rail tone="light" marker />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-secondary lg:pr-10 lg:text-right">
            Leistungen
          </p>
          <Reveal className="mt-4 lg:mt-0 lg:pl-10">
            <h2 className="font-headline text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-primary">
              Meine Leistungen
            </h2>
            <p className="mt-4 max-w-[38rem] text-[17px] leading-[1.65] text-secondary">
              Klar abgegrenzt, transparent und auf laufende Geschäftsvorgänge
              ausgerichtet.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 lg:mt-20">
          {LEISTUNGEN.map(({ Icon, name, text }, i) => (
            <li
              key={name}
              className="group border-t border-primary/10 py-8 lg:grid lg:grid-cols-[var(--rail-x)_1fr] lg:py-11"
            >
              <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:gap-3 lg:pr-10">
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/10 bg-brand-hell text-primary transition-colors duration-300 group-hover:border-gold-tief/40 group-hover:bg-brand-kante">
                  <Icon className="h-[21px] w-[21px]" />
                </span>
                <span className="tnum font-headline text-2xl leading-none tracking-tight text-secondary/60 transition-colors duration-300 group-hover:text-primary lg:text-[2rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <Reveal className="mt-5 lg:mt-0 lg:pl-10" y={12}>
                <h3 className="font-headline text-[1.15rem] leading-[1.25] tracking-[-0.015em] text-primary lg:text-[1.4rem]">
                  {name}
                </h3>
                <span className="mt-3 block h-px w-10 bg-primary/15 transition-all duration-300 group-hover:w-16 group-hover:bg-gold-tief" />
                <p className="mt-4 max-w-[36rem] text-[17px] leading-[1.6] text-secondary">
                  {text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
