import Rail from "./ui/Rail";

/**
 * Bewusst als Wortmarken gesetzt, nicht als Logo-Grafiken:
 * Fuer die echten Logos braucht es Nutzungsrechte der Hersteller. Text ist
 * rechtlich sauber und wirkt disziplinierter als ein Logo-Karussell.
 */
const SOFTWARE = ["DATEV", "Lexware", "Agenda", "Stotax", "Monitor ERP"];

/**
 * Diese Leiste ist nur der Uebergang vom Aufmacher zur Problem-Section und
 * traegt deshalb genau eine Information: womit gearbeitet wird.
 *
 * Qualifikation, Berufsjahre und Sprachen standen hier vorher ebenfalls -
 * sie gehoeren in "Ueber mich" und wuerden hier nur doppelt stehen.
 */
export default function TrustBar() {
  return (
    <section
      aria-label="Eingesetzte Software"
      className="relative border-y border-brand-kante bg-brand-hell py-9"
    >
      <Rail tone="light" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-[var(--rail-x)_1fr] lg:items-baseline">
          <p className="text-[11px] font-medium tracking-[0.2em] text-secondary uppercase lg:pr-10 lg:text-right">
            Digitale Arbeitsweise
          </p>

          <div className="mt-5 lg:mt-0 lg:pl-10">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {SOFTWARE.map((name) => (
                <li
                  key={name}
                  className="border-l border-primary/20 pl-6 text-sm font-medium tracking-[0.06em] text-primary first:border-l-0 first:pl-0"
                >
                  {name}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-secondary">
              Wenn Sie ein anderes System nutzen, prüfen wir gemeinsam, ob und wie
              sich eine Zusammenarbeit sinnvoll umsetzen lässt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
