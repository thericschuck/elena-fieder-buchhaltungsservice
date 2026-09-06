import Rail from "./ui/Rail";
import Reveal from "./ui/Reveal";
import {
  Aktentasche,
  Hammer,
  Industrie,
  Laden,
  Mauer,
  Person,
} from "./ui/Icons";

/**
 * Die sechs Branchen stehen woertlich so im Leistungsdokument unter
 * "Erfahrungen". Nicht zusammenfassen und nicht ergaenzen - die Liste ist
 * Elenas eigene Angabe, kein Marketing-Sortiment.
 *
 * Die Kurzzeilen beschreiben bewusst die Lage des Kunden, nicht eine
 * zusaetzliche Leistung. Alles, was Elena tut, steht in der Leistungs-Section.
 */
const BRANCHEN = [
  {
    Icon: Mauer,
    name: "Baubranche",
    zeile: "Abschlagsrechnungen, Objektzuordnung, viele Nachweise pro Projekt.",
  },
  {
    Icon: Hammer,
    name: "Handwerk",
    zeile: "Kleines Team, voller Terminkalender, das Büro läuft nebenher.",
  },
  {
    Icon: Laden,
    name: "Handel",
    zeile: "Viele Eingangs- und Ausgangsrechnungen, Kasse und Bank täglich.",
  },
  {
    Icon: Industrie,
    name: "Industrie",
    zeile: "Gewachsene Prozesse, ERP im Haus, Zahlen müssen zusammenpassen.",
  },
  {
    Icon: Aktentasche,
    name: "Dienstleistung",
    zeile: "Projektbezogen abrechnen, Reisekosten, offene Posten im Blick.",
  },
  {
    Icon: Person,
    name: "Freiberufler",
    zeile: "Ein Kopf für alles – die Buchhaltung soll einfach erledigt sein.",
  },
];

export default function Branchen() {
  return (
    <section id="branchen" className="relative py-24 lg:py-32">
      <Rail tone="light" marker />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
          <p className="text-[11px] font-medium tracking-[0.2em] text-secondary uppercase lg:pr-10 lg:text-right">
            Erfahrung
          </p>
          <Reveal className="mt-4 lg:mt-0 lg:pl-10">
            <h2 className="font-headline text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-primary">
              Branchen, die ich kenne.
            </h2>
            <p className="mt-4 max-w-[38rem] text-[17px] leading-[1.65] text-secondary">
              In diesen Branchen habe ich gebucht – ich muss mir die Belege
              nicht erst erklären lassen.
            </p>
          </Reveal>
        </div>

        {/*
          Haengeregister statt Kartenraster. Das Motiv kommt aus dem Moodboard
          des Strategiepapiers (Cluster A: Karteikasten mit beschrifteten
          Reitern) und passt hier besser als bei den Leistungen, wo die
          Nummerierung schon die Ordnung traegt.

          Der Reiter ist ein eigenes span oberhalb der Kartenkante, in derselben
          Fuellfarbe - dadurch verschmelzen Reiter und Karte zu einer Form,
          ohne Pseudo-Element-Tricks.
        */}
        <ul className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-x-8">
          {BRANCHEN.map(({ Icon, name, zeile }, i) => (
            <li key={name}>
              <Reveal className="h-full" delay={(i % 3) * 0.07} y={14}>
                <div className="group h-full">
                  {/* Reiter */}
                  <span className="ml-6 flex h-8 w-fit items-center gap-2 rounded-t-md bg-gold-licht px-3.5 text-[11px] font-medium tracking-[0.16em] text-primary uppercase transition-transform duration-300 group-hover:-translate-y-1">
                    <Icon className="h-[15px] w-[15px] shrink-0" />
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Karte */}
                  <div className="flex h-[calc(100%-2rem)] flex-col rounded-b-md rounded-tr-md border-t-2 border-gold-tief/40 bg-white p-6 shadow-[0_18px_44px_-30px_rgba(15,46,59,0.45)]">
                    <h3 className="font-headline text-[1.15rem] leading-[1.25] tracking-[-0.015em] text-primary">
                      {name}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-px w-10 bg-primary/15 transition-all duration-300 group-hover:w-16 group-hover:bg-gold-tief"
                    />
                    <p className="mt-4 text-[15px] leading-[1.6] text-secondary">
                      {zeile}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
          <div aria-hidden="true" />
          <p className="max-w-[38rem] text-sm leading-[1.6] text-secondary lg:pl-10">
            Sitz in Obernburg am Main, gearbeitet wird deutschlandweit
            digital. Ihre Branche steht nicht dabei? Fragen Sie trotzdem –
            meistens passt es.
          </p>
        </div>
      </div>
    </section>
  );
}
