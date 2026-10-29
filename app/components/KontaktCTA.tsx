"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";
import Rail from "./ui/Rail";
import { ArrowRight, Check, WarningCircle } from "./ui/Icons";
import {
  HONEYPOT,
  hatFehler,
  leseFormData,
  pruefeKontakt,
  type KontaktFehler,
} from "../lib/kontakt";

/*
  ACHTUNG: Dieses Formular versendet noch nichts.
  Die Server Action in app/actions/kontaktanfrage.ts ist fertig, aber noch nicht
  verdrahtet. Die drei Schritte zur Aktivierung stehen in KONTAKT-SETUP.md.

  Die Pruefregeln kommen aus app/lib/kontakt.ts – dieselbe Datei nutzt die
  Action serverseitig, damit Client und Server nicht auseinanderlaufen.
*/

type FeldName = "name" | "email" | "telefon";

/**
 * Stichworte fuer den Anmerkungsblock. Sie stehen bewusst neben dem Formular
 * statt darin: als Auswahlfelder haben sie das Formular ueberladen, als Hinweis
 * geben sie dieselbe Hilfe, ohne ein Feld zu kosten.
 */
const HINWEISE = [
  "Ihr Unternehmen und die Branche",
  "Wie Ihre Belege heute vorliegen",
  "Wann Sie am besten erreichbar sind",
  "Mit welcher Software Sie arbeiten",
  "Wer die Buchhaltung bisher macht",
];

const FELD_KLASSE =
  "w-full rounded-md border bg-white/[0.06] px-4 py-3.5 text-[16px] text-bg outline-none transition-colors focus-visible:border-gold-licht focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-licht";

export default function KontaktCTA() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<KontaktFehler>({});
  const [sent, setSent] = useState<string | null>(null);

  const fehlerFuer = (key: string) =>
    (errors as Record<string, string | undefined>)[key];

  /** Prueft erst beim Verlassen des Feldes, nicht bei jedem Tastendruck. */
  const handleBlur = () => {
    const form = formRef.current;
    if (!form || !hatFehler(errors)) return;
    setErrors(pruefeKontakt(leseFormData(new FormData(form))));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const naechste = pruefeKontakt(leseFormData(new FormData(form)));
    setErrors(naechste);

    const erstes = Object.keys(naechste)[0];
    if (erstes) {
      form.querySelector<HTMLElement>(`[name="${erstes}"]`)?.focus();
      return;
    }

    // TODO: durch useActionState(sendeKontaktanfrage, ...) ersetzen.
    // Datum erst im Event-Handler bilden, nie beim Rendern – sonst weicht die
    // Server-Ausgabe von der Client-Hydration ab.
    setSent(
      new Date().toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
      }),
    );
  };

  return (
    <section id="kontakt" className="on-dark relative bg-bg">
      {/* Der dunkle Block liegt als eigene Ebene darueber, damit die Stufe an
          der Kontolinie das Weiss der Ablauf-Section freilegt statt eines
          grauen Zwischenstreifens. */}
      <div aria-hidden="true" className="step-top absolute inset-0 bg-primary" />

      <Rail tone="dark" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-24 pb-24 lg:px-10 lg:pt-40 lg:pb-32">
        <div className="lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
          <div className="lg:pr-10">
            <p className="text-[11px] font-medium tracking-[0.2em] text-gold uppercase lg:text-right">
              Kontakt
            </p>

            {/* Die Notizseite sitzt jetzt auf der Soll-Seite: sie ist das,
                was der Besucher mitbringt. Das Formular bekommt dadurch die
                ganze Haben-Spalte. */}
            <aside className="relative mt-10 overflow-hidden rounded-lg bg-bg shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)]">
              <span
                aria-hidden="true"
                className="buch-bund pointer-events-none absolute inset-y-0 left-0 w-5"
              />

              <p className="border-b border-primary/10 bg-brand-hell py-3.5 pr-4 pl-8 text-[11px] font-medium tracking-[0.16em] text-secondary uppercase">
                Was mir hilft
              </p>

              <ul
                className="buch-linien pr-4 pl-8"
                style={{ "--zeile": "3rem" } as CSSProperties}
              >
                {HINWEISE.map((hinweis) => (
                  <li
                    key={hinweis}
                    className="flex min-h-12 items-center gap-3 py-2 text-[14px] leading-[1.35] text-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-gold-tief"
                    />
                    {hinweis}
                  </li>
                ))}
              </ul>

              <p className="py-5 pr-4 pl-8 text-[13px] leading-[1.6] text-secondary">
                Alles freiwillig. Je mehr davon in Ihrer Anmerkung steht, desto
                konkreter kann ich Ihnen im Erstgespräch antworten.
              </p>
            </aside>
          </div>

          <div className="mt-4 lg:mt-0 lg:pl-10">
            <h2 className="font-headline text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-bg">
              Passt eine Zusammenarbeit zu Ihnen?
            </h2>
            <p className="mt-5 max-w-[36rem] text-[17px] leading-[1.65] text-white/70">
              Sie legen Wert auf Qualität, Verlässlichkeit und eine persönliche
              Ansprechpartnerin, die Ihre Abläufe kennt? Dann freue ich mich
              darauf, Ihr Unternehmen kennenzulernen.
            </p>

            {/* Ganz normales Formular: Beschriftung ueber dem Feld, ein Feld
                pro Zeile, sichtbare Raender. */}
            <div className="mt-10 max-w-[38rem]">
                {sent ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-lg border border-gold/40 bg-white/[0.06] p-7"
                  >
                    <p className="flex items-center gap-3 font-headline text-lg tracking-tight text-bg">
                      <Check className="h-5 w-5 shrink-0 text-gold" />
                      Anfrage notiert am {sent}
                    </p>
                    <p className="mt-3 text-[15px] leading-[1.6] text-white/70">
                      Ich melde mich bei Ihnen.
                    </p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    {/* Honeypot: unsichtbar, nicht fokussierbar, fuer
                        Screenreader ausgeblendet. */}
                    <div
                      aria-hidden="true"
                      className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                    >
                      <label htmlFor={HONEYPOT}>Bitte nicht ausfüllen</label>
                      <input
                        id={HONEYPOT}
                        name={HONEYPOT}
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="flex flex-col gap-5">
                      <Feld
                        name="name"
                        label="Name"
                        pflicht
                        autoComplete="name"
                        fehler={fehlerFuer("name")}
                        onBlur={handleBlur}
                      />
                      <Feld
                        name="email"
                        label="E-Mail"
                        type="email"
                        inputMode="email"
                        pflicht
                        autoComplete="email"
                        fehler={fehlerFuer("email")}
                        onBlur={handleBlur}
                      />
                      <Feld
                        name="telefon"
                        label="Telefon"
                        hinweis="optional"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        onBlur={handleBlur}
                      />

                      <div>
                        <label
                          htmlFor="nachricht"
                          className="mb-2 block text-sm font-medium text-white/80"
                        >
                          Anmerkung{" "}
                          <span className="font-normal text-white/55">
                            optional
                          </span>
                        </label>
                        <textarea
                          id="nachricht"
                          name="nachricht"
                          rows={5}
                          onBlur={handleBlur}
                          className={`${FELD_KLASSE} resize-y border-white/15 hover:border-white/30`}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="flex items-start gap-3 text-sm leading-[1.55] text-white/70">
                        <input
                          type="checkbox"
                          name="datenschutz"
                          onBlur={handleBlur}
                          aria-invalid={errors.datenschutz ? true : undefined}
                          aria-describedby={
                            errors.datenschutz ? "err-datenschutz" : undefined
                          }
                          className="mt-0.5 h-5 w-5 shrink-0 accent-gold"
                        />
                        <span>
                          Ich habe die{" "}
                          <a
                            href="/datenschutz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-bg underline decoration-gold decoration-2 underline-offset-4"
                          >
                            Datenschutzerklärung
                          </a>{" "}
                          gelesen.
                          <span className="text-gold">{" *"}</span>
                        </span>
                      </label>
                      {errors.datenschutz && (
                        <Fehler id="err-datenschutz" text={errors.datenschutz} />
                      )}
                    </div>

                    <button
                      type="submit"
                      className="gold-flaeche group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-md px-7 py-4 text-base font-medium text-text hover:-translate-y-0.5"
                    >
                      Persönliches Erstgespräch anfragen
                      <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    <p className="mt-3 text-center text-[13px] text-white/70">
                      Ca. 20 Minuten · kostenfrei · unverbindlich
                    </p>

                    <p className="mt-4 text-[13px] text-white/55">
                      Felder mit <span className="text-gold">*</span> brauche
                      ich, um antworten zu können.
                    </p>
                  </form>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fehler({ id, text }: { id: string; text: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-center gap-2 text-[13px] text-[#FCA5A5]"
    >
      <WarningCircle className="h-4 w-4 shrink-0" />
      {text}
    </p>
  );
}

function Feld({
  name,
  label,
  hinweis,
  pflicht,
  fehler,
  ...props
}: {
  name: FeldName;
  label: string;
  hinweis?: string;
  pflicht?: boolean;
  fehler?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const fehlerId = `err-${name}`;

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-white/80"
      >
        {label}
        {pflicht ? (
          <span className="text-gold">{" *"}</span>
        ) : hinweis ? (
          <span className="font-normal text-white/55"> {hinweis}</span>
        ) : null}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={fehler ? true : undefined}
        aria-describedby={fehler ? fehlerId : undefined}
        className={`${FELD_KLASSE} ${
          fehler ? "border-[#FCA5A5]" : "border-white/15 hover:border-white/30"
        }`}
        {...props}
      />
      {fehler && <Fehler id={fehlerId} text={fehler} />}
    </div>
  );
}
