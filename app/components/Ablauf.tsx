import Rail from "./ui/Rail";
import Reveal from "./ui/Reveal";

/**
 * Wortlaut aus den finalen Website-Texten, Abschnitt "So beginnt unsere
 * Zusammenarbeit". Die frueheren Taktangaben (20 Minuten / einmalig /
 * monatlich) stehen dort nicht und sind entfallen.
 */
const SCHRITTE = [
  {
    titel: "Persönliches Erstgespräch",
    text: "Wir sprechen über Ihr Unternehmen, Ihre bisherigen Abläufe und den konkreten Unterstützungsbedarf. Das Gespräch ist kostenfrei und unverbindlich.",
  },
  {
    titel: "Leistungsumfang klar festlegen",
    text: "Ich prüfe, welche Aufgaben innerhalb meines Leistungsangebots übernommen werden können. Zuständigkeiten und Umfang werden vor Beginn eindeutig vereinbart.",
  },
  {
    titel: "Digitale Übergabe einrichten",
    text: "Wir legen fest, wie Unterlagen und Informationen übergeben werden und welche Abläufe für Ihr Unternehmen sinnvoll sind. So einfach wie möglich – und so strukturiert wie nötig.",
  },
  {
    titel: "Laufende Bearbeitung",
    text: "Die vereinbarten laufenden Geschäftsvorfälle werden regelmäßig bearbeitet. Offene Informationsfragen werden zeitnah geklärt und Sie haben eine feste Ansprechpartnerin.",
  },
];

export default function Ablauf() {
  return (
    <section
      id="ablauf"
      className="relative border-t border-primary/10 py-24 lg:py-32"
    >
      <Rail tone="light" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-secondary lg:pr-10 lg:text-right">
            Ablauf
          </p>
          <Reveal className="mt-4 lg:mt-0 lg:pl-10">
            <h2 className="font-headline text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-primary">
              So beginnt unsere Zusammenarbeit
            </h2>
            <p className="mt-4 max-w-[38rem] text-[17px] leading-[1.65] text-secondary">
              Klar. Persönlich. Ohne unnötige Umwege.
            </p>
          </Reveal>
        </div>

        {/* Waagerechte Zeitachse, die bewusst aus dem Spaltenraster ausbricht:
            ein Ablauf liest sich von links nach rechts, nicht von oben nach
            unten. Die Verbindungslinie kreuzt dabei die Kontolinie. */}
        <ol className="relative mt-16 grid gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:mt-24 lg:grid-cols-4 lg:gap-x-6">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-1 hidden h-px bg-primary/15 lg:block"
          />

          {SCHRITTE.map(({ titel, text }, i) => (
            <li key={titel} className="relative">
              <Reveal className="flex h-full flex-col" delay={i * 0.08} y={14}>
                <span
                  aria-hidden="true"
                  className="block h-2 w-2 rotate-45 bg-gold-tief"
                />

                <div className="mt-7 flex-1 rounded-lg border border-primary/10 bg-white p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-brand-kante hover:shadow-[0_16px_32px_-20px_rgba(15,46,59,0.35)]">
                  <span className="tnum block font-headline text-[1.9rem] leading-none tracking-tight text-secondary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-6 font-headline text-[1.15rem] leading-[1.25] tracking-[-0.015em] text-primary">
                    {titel}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-secondary">
                    {text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
