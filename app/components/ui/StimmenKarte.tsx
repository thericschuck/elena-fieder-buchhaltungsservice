"use client";

import { useState, type CSSProperties, type SVGProps } from "react";
import { ChevronDown } from "./Icons";

/*
  Portiert aus der shadcn-Vorlage "testimonials-3".

  Uebernommen ist die Bildsprache: der Rahmen aus vier Haarlinien, die ueber die
  Kartenkante hinauslaufen und sich kreuzen, das Pluszeichen auf der Kreuzung
  oben links, das ausgestellte Anfuehrungszeichen und der treppenartige Versatz
  der Karten nach rechts unten. Das passt zu der Kontolinie, mit der die ganze
  Seite arbeitet - gezeichnete Linien statt Kaestchen mit Schatten.

  Bewusst nicht uebernommen:

  1. `cn()` aus @/lib/utils. Die Klassen entstehen hier vollstaendig im
     Baustein, es gibt keinen className von aussen zu mergen. Damit sparen wir
     clsx und tailwind-merge als Abhaengigkeiten.
  2. Die shadcn-Farbtoken (bg-border, text-muted-foreground, bg-background).
     Die gibt es in diesem Projekt nicht; hier stehen die Token aus
     globals.css, die aus dem Logo abgeleitet sind.
  3. @radix-ui/react-avatar. Von Elenas drei echten Mandanten liegt kein Foto
     vor, und die Vorlage laedt Portraits von unavatar.io - das wuerde die
     Namen an einen Dritten senden und fuer Privatpersonen ohnehin nichts
     finden. Es waere also immer nur der AvatarFallback zu sehen. Den rendern
     wir direkt als Initialenkreis, wie schon beim EF-Badge.
*/

export type Stimme = {
  absaetze: string[];
  name: string;
  initialen: string;
  meta: string | null;
};

/** Pluszeichen auf der Linienkreuzung oben links. */
function KreuzMarke(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute top-0 left-0 z-10 size-3.5 shrink-0 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)] text-brand-tief/70"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

/**
 * Ausgestelltes Anfuehrungszeichen, Konturform.
 * Steht bewusst neben dem Zitat und nicht darueber - so beginnt der Text auf
 * derselben Grundlinie wie in einem gesetzten Zitat.
 */
function ZitatZeichen(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6 shrink-0 text-brand-tief"
      {...props}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

export default function StimmenKarte({
  stimme,
  index,
}: {
  stimme: Stimme;
  index: number;
}) {
  const { absaetze, name, initialen, meta } = stimme;

  /*
    Der Aufklappzustand liegt in der Karte, nicht in der Liste darueber. So
    bleibt die Sektion eine Server-Komponente und es duerfen mehrere Karten
    gleichzeitig offen sein - ein Akkordeon, das die vorige zuklappt, nimmt
    dem Leser den Vergleich, und genau der ueberzeugt bei Referenzen.
  */
  const [offen, setOffen] = useState(false);
  const panelId = `stimme-${index}`;

  return (
    <figure
      style={{ "--karte-index": index } as CSSProperties}
      className="group relative flex flex-col justify-between gap-6 px-7 pt-8 pb-6 md:translate-y-[calc(2.5rem*var(--karte-index))]"
    >
      {/* Rahmen aus vier Haarlinien. Sie laufen 1rem ueber die Karte hinaus und
          kreuzen sich - dadurch entsteht ein Raster, das aus dem Inhalt kommt
          und nicht aus einer Kartenkante. */}
      <div aria-hidden="true" className="absolute -inset-y-4 -left-px w-px bg-primary/12" />
      <div aria-hidden="true" className="absolute -inset-y-4 -right-px w-px bg-primary/12" />
      <div aria-hidden="true" className="absolute -inset-x-4 -top-px h-px bg-primary/12" />
      <div aria-hidden="true" className="absolute -right-4 -bottom-px -left-4 h-px bg-primary/12" />
      <KreuzMarke />

      <blockquote id={panelId} className="flex gap-4">
        <ZitatZeichen />

        <div className="flex-1 text-[16px] leading-[1.65] text-text">
          {/*
            Ausgeblendet, nicht weggelassen: so steht der vollstaendige
            Wortlaut im ausgelieferten HTML und ist auffindbar, auch wenn
            niemand aufklappt. Nicht auf bedingtes Rendern umbauen.

            line-clamp klammert nur einen einzelnen Textblock - bei mehreren
            <p> im selben Container greift es nicht, deshalb klammert der
            erste Absatz und die restlichen sind hidden.
          */}
          {absaetze.map((absatz, k) => (
            <p
              key={absatz.slice(0, 24)}
              hidden={!offen && k > 0}
              className={`${k > 0 ? "mt-3.5" : ""} ${
                !offen && k === 0 ? "line-clamp-5" : ""
              }`}
            >
              {absatz}
            </p>
          ))}

          <button
            type="button"
            onClick={() => setOffen((v) => !v)}
            aria-expanded={offen}
            aria-controls={panelId}
            className="mt-4 -ml-1 inline-flex w-fit items-center gap-2 rounded-sm px-1 py-1 text-[13px] font-medium text-primary"
          >
            <span className="border-b border-gold-tief/50 transition-colors hover:border-gold-tief">
              {offen ? "Weniger anzeigen" : "Ganze Bewertung lesen"}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 shrink-0 text-gold-tief transition-transform duration-300 ${
                offen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </blockquote>

      <figcaption className="flex items-center gap-3">
        {/* Statt eines Avatarbilds die Initialen – es liegen keine Fotos der
            Mandanten vor, siehe Kopfkommentar. */}
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-headline text-[13px] tracking-tight text-bg ring-2 ring-primary/12 ring-offset-2 ring-offset-white transition-shadow group-hover:ring-brand-tief/40"
        >
          {initialen}
        </span>
        <div className="flex flex-col">
          <cite className="text-sm font-medium text-primary not-italic">
            {name}
          </cite>
          {meta && <p className="text-xs text-secondary">{meta}</p>}
        </div>
      </figcaption>
    </figure>
  );
}
