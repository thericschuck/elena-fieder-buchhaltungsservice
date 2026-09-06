import Rail from "./ui/Rail";
import Reveal from "./ui/Reveal";
import { ChevronDown } from "./ui/Icons";
import { FRAGEN } from "../lib/faq";

/**
 * Haeufige Fragen.
 *
 * Bewusst native details/summary statt eines eigenen Akkordeons: Tastatur,
 * Screenreader und die Browser-Suche (Strg+F findet auch zugeklappte Inhalte
 * in modernen Browsern) funktionieren ohne eine Zeile JavaScript. Die Section
 * bleibt dadurch eine Server-Komponente.
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
          {FRAGEN.map(({ frage, antwortKlartext }) => (
            <details
              key={frage}
              className="group border-t border-primary/12 last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 lg:grid lg:grid-cols-[var(--rail-x)_1fr] lg:gap-0 [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="hidden lg:block lg:pr-10" />
                <span className="flex flex-1 items-start justify-between gap-6 lg:pl-10">
                  <h3 className="font-headline text-[1.05rem] leading-[1.35] tracking-[-0.015em] text-primary lg:text-[1.2rem]">
                    {frage}
                  </h3>
                  <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-brand-tief transition-transform duration-300 group-open:rotate-180" />
                </span>
              </summary>

              <div className="pb-7 lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
                <span aria-hidden="true" className="hidden lg:block" />
                <p className="max-w-[44rem] text-[16px] leading-[1.7] text-text lg:pl-10">
                  {antwortKlartext}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
