import Rail from "./ui/Rail";
import Reveal from "./ui/Reveal";
import FrageItem from "./ui/FrageItem";
import { FRAGEN } from "../lib/faq";

/**
 * Haeufige Fragen.
 *
 * Das Auf-/Zuklappen selbst steckt in FrageItem (Client-Komponente, Framer
 * Motion) - siehe dort, warum es kein natives details/summary mehr ist. Diese
 * Section bleibt eine Server-Komponente, nur das einzelne Akkordeon-Item ist
 * Client.
 *
 * Der Inhalt kommt aus app/lib/faq.ts - dieselbe Quelle speist das
 * FAQPage-Markup. Die ausgezeichnete Antwort muss woertlich der sichtbaren
 * entsprechen, sonst verstoesst die Auszeichnung gegen Googles Richtlinien.
 */
export default function Fragen() {
  return (
    <section
      id="fragen"
      className="relative border-y border-brand-kante bg-brand-hell py-24 lg:py-32"
    >
      <Rail tone="light" marker />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
          <p className="text-[11px] font-medium tracking-[0.2em] text-secondary uppercase lg:pr-10 lg:text-right">
            Häufige Fragen
          </p>
          <Reveal className="mt-4 lg:mt-0 lg:pl-10">
            <h2 className="font-headline text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-primary">
              Das werde ich oft gefragt.
            </h2>
            <p className="mt-4 max-w-[38rem] text-[17px] leading-[1.65] text-secondary">
              Wenn Ihre Frage nicht dabei ist, stellen Sie sie im Erstgespräch –
              das kostet nichts.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 lg:mt-20">
          {FRAGEN.map(({ frage, antwortKlartext }, i) => (
            <FrageItem
              key={frage}
              index={i}
              frage={frage}
              antwortKlartext={antwortKlartext}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
