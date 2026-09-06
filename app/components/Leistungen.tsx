import Rail from "./ui/Rail";
import Reveal from "./ui/Reveal";
import {
  ChartBar,
  Mauer,
  Karte,
  Ordner,
  Receipt,
  Sliders,
  Users,
  Waage,
} from "./ui/Icons";

/**
 * Reihenfolge ist inhaltlich, nicht dekorativ: Position 01 bis 04 entsprechen
 * exakt der Priorisierung aus dem Strategiegespraech (4.1). 05 und 06 kommen
 * aus dem Leistungsdokument und waren dort nicht priorisiert - sie stehen
 * deshalb hinten, nicht weil sie weniger wichtig waeren.
 *
 * Die Unterpunkte sind die woertlichen Positionen aus "Meine Leistungen".
 * Nicht kuerzen: sie sind das, was Elena tatsaechlich anbietet, und decken
 * gemeinsam alle neun Punkte des Dokuments ab.
 */
const LEISTUNGEN = [
  {
    Icon: Receipt,
    name: "Laufende Finanzbuchhaltung",
    nutzen:
      "Ihre Belege sind Monat für Monat gebucht, statt sich bis zum Jahresabschluss zu stapeln.",
    punkte: [
      { Icon: Receipt, text: "Eingangs- und Ausgangsrechnungen" },
      { Icon: Karte, text: "Bank, Kasse und Kreditkarten" },
      { Icon: Waage, text: "Kontenabstimmung" },
    ],
  },
  {
    Icon: Users,
    name: "Offene Posten und Zahlungsüberwachung",
    nutzen:
      "Sie sehen auf einen Blick, wer noch zahlen muss und welche Rechnung als Nächstes fällig ist.",
    punkte: [
      { Icon: Users, text: "Debitoren- und Kreditorenübersicht" },
      { Icon: Receipt, text: "Offene Posten je Kunde und Lieferant" },
      { Icon: Waage, text: "Zahlungsüberwachung und Fälligkeiten" },
    ],
  },
  {
    Icon: ChartBar,
    name: "BWA und betriebswirtschaftliche Auswertungen",
    nutzen:
      "Monatliche Auswertungen aus Ihrer laufenden Buchhaltung, damit Sie und Ihr Steuerberater auf derselben Zahlenbasis arbeiten.",
    punkte: [
      { Icon: ChartBar, text: "BWA je Monat" },
      { Icon: Waage, text: "Auswertungen nach Bedarf" },
    ],
  },
  {
    Icon: Sliders,
    name: "Prozessoptimierung und digitale Organisation",
    nutzen:
      "Belegübergabe, Ablage, Reisekosten: Wir bringen Ihre Abläufe digital in Form, damit weniger Papier liegen bleibt.",
    punkte: [
      { Icon: Receipt, text: "Reisekostenabrechnungen" },
      { Icon: Sliders, text: "Digitale Belegübergabe und Ablage" },
    ],
  },
  {
    Icon: Mauer,
    name: "Bau- und projektbezogene Abrechnung",
    nutzen:
      "Damit am Ende eines Bauvorhabens nachvollziehbar ist, was auf welchem Objekt gelaufen ist – und welche Abschlagszahlung schon drin steckt.",
    punkte: [
      {
        Icon: Receipt,
        text: "Anzahlungen, Abschlags- und Schlussrechnungen",
      },
      { Icon: Mauer, text: "Projekt- und objektbezogene Zuordnung" },
    ],
  },
  {
    Icon: Ordner,
    name: "Vorbereitung der Unterlagen für den Steuerberater",
    nutzen:
      "Ihr Steuerberater bekommt einen abgestimmten Stand statt eines Belegkartons – das kürzt Rückfragen und Beraterstunden.",
    punkte: [
      { Icon: Ordner, text: "Aufbereitete Unterlagen zum Jahresende" },
      { Icon: Waage, text: "Abgestimmte Konten und Salden" },
    ],
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
              Was ich in Ihrer Buchhaltung übernehme.
            </h2>
            <p className="mt-4 max-w-[38rem] text-[17px] leading-[1.65] text-secondary">
              Sechs Bereiche, geordnet nach dem, was am häufigsten anfällt. Sie
              entscheiden, was Sie davon abgeben – gern auch alles.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 lg:mt-20">
          {LEISTUNGEN.map(({ Icon, name, nutzen, punkte }, i) => (
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
                  {nutzen}
                </p>

                {/* Die konkreten Positionen darunter: der Nutzen-Satz sagt,
                    warum – diese Liste sagt, was genau im Paket steckt. */}
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
                  {punkte.map(({ Icon: PunktIcon, text }) => (
                    <li
                      key={text}
                      className="flex items-center gap-2.5 text-[15px] leading-[1.4] text-text"
                    >
                      <PunktIcon className="h-[17px] w-[17px] shrink-0 text-gold-tief" />
                      {text}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="border-t border-primary/10 pt-8 lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
          <div aria-hidden="true" />
          <div className="max-w-[42rem] lg:pl-10">
            <p className="text-sm leading-[1.6] text-secondary">
              Weitere Tätigkeiten auf Anfrage.
            </p>

            {/*
              Hinweis auf die Angestellten-Erfahrung, wie im Leistungsdokument
              formuliert. Die Reihenfolge der beiden Saetze ist entscheidend:
              erst die Grenze, dann die Erfahrung. Umgedreht liest es sich wie
              ein verdecktes Angebot - und Jahresabschluss, Bilanz und
              Steuererklaerung sind nach § 6 StBerG Steuerberatern vorbehalten.
            */}
            <p className="mt-4 border-l-2 border-gold-tief pl-4 text-sm leading-[1.6] text-secondary">
              Jahresabschlüsse, Bilanzen und Steuererklärungen darf ich nicht
              anbieten – die bleiben bei Ihrem Steuerberater. Bearbeitet habe
              ich sie trotzdem: im Angestelltenverhältnis, unter Aufsicht eines
              Steuerberaters. Was das für Sie heißt, steht{" "}
              <a
                href="#ueber-mich"
                className="text-primary underline decoration-gold-tief decoration-2 underline-offset-4"
              >
                unter „Über mich“
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
