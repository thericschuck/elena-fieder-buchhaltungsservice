"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PfeileHorizontal } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

type Seite = {
  bild: StaticImageData;
  alt: string;
  label: string;
};

/*
  Vorher/Nachher - zwei Bedienweisen je nach Platz.

  Unter lg (Handy/Tablet): echter Schieberegler, siehe weiter unten. Hier war
  die Schnittkante frueher scroll-gebunden und hatte bewusst keinen Griff -
  das war auf kleinen Screens ein Fehler: es sieht wie ein Regler aus, also
  erwartet man einen, und wer nicht genau im richtigen Scrollbereich war, hat
  gar keine Bewegung gesehen.

  Ab lg (Desktop): genau umgekehrt, wieder die urspruengliche Fassung ohne
  Griff. Auf grossen Screens ist genug Raum, um den Vergleich passiv beim
  Vorbeiscrollen zu zeigen, und ein Regler mitten im Fliesstext wirkt dort wie
  ein Fremdkoerper. Eingabe und Griff werden per lg:hidden ausgeblendet,
  ScrollTrigger schreibt --wipe stattdessen direkt per style.setProperty auf
  das Element - bewusst kein React-State dafuer, sonst ein Re-Render pro
  Scroll-Frame. Ohne Bewegungswunsch (prefers-reduced-motion) bleibt die
  Kante stehen, wo sie zuletzt war - keine Bewegung ist hier das gewuenschte
  Verhalten, kein Bug.
*/
export default function BeforeAfterWipe({
  vorher,
  nachher,
  className,
}: {
  vorher: Seite;
  nachher: Seite;
  className?: string;
}) {
  const [wipe, setWipe] = useState(50);
  const wipeRef = useRef(wipe);
  wipeRef.current = wipe;
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const st = ScrollTrigger.create({
          trigger: figure,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            // Invertiert: --wipe: 0% zeigt volles Nachher, 100% volles
            // Vorher (siehe Clip-Pfad oben). Progress soll aber beim
            // Reinscrollen mit Vorher beginnen und zu Nachher auflaufen,
            // deshalb hier 1 - progress statt progress.
            figure.style.setProperty(
              "--wipe",
              `${(1 - self.progress) * 100}%`,
            );
          },
        });

        // Zurueck auf den Regler-Wert, falls der Screen waehrenddessen unter
        // lg schrumpft - sonst zeigt der wieder eingeblendete Regler 50%,
        // waehrend die Kante noch am zuletzt gescrollten Wert haengt.
        return () => {
          st.kill();
          figure.style.setProperty("--wipe", `${wipeRef.current}%`);
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <figure
      ref={figureRef}
      style={{ "--wipe": `${wipe}%` } as CSSProperties}
      className={`relative overflow-hidden rounded-lg border border-primary/10 ${className ?? ""}`}
    >
      {/* Basis: der Ausgangszustand */}
      <Image
        src={vorher.bild}
        alt={vorher.alt}
        placeholder="blur"
        sizes="(min-width: 1024px) 34vw, 100vw"
        className="h-auto w-full"
      />

      {/* Darueber der Zielzustand, von rechts nach links freigelegt */}
      <div
        className="absolute inset-0"
        style={{ clipPath: "inset(0 0 0 var(--wipe))" }}
      >
        <Image
          src={nachher.bild}
          alt={nachher.alt}
          placeholder="blur"
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>

      {/*
        Der Regler liegt ueber dem ganzen Bild und steht im DOM vor Kante und
        Griff: so zeichnen die beiden darueber, lassen aber per
        pointer-events-none alle Zeigereignisse durch. Ueber peer-* reagiert
        der Griff sichtbar auf Fokus.

        Nur unter lg im Einsatz - ab lg uebernimmt ScrollTrigger die Kante,
        siehe Kopfkommentar. lg:hidden statt nur unsichtbar, damit Tab und
        Screenreader das Element auf Desktop erst gar nicht antreffen.
      */}
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={wipe}
        onChange={(e) => setWipe(Number(e.target.value))}
        aria-label={`Vergleich: ${vorher.label} und ${nachher.label}`}
        aria-valuetext={`${wipe} Prozent ${nachher.label}`}
        className="peer absolute inset-0 m-0 h-full w-full cursor-ew-resize appearance-none bg-transparent focus:outline-none lg:hidden [&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-12 [&::-moz-range-thumb]:cursor-ew-resize [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-moz-range-track]:h-full [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
      />

      {/* Die Kontolinie als Schnittkante */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[var(--wipe)] w-0.5 -translate-x-1/2 bg-gold shadow-[0_0_0_1px_rgba(15,46,59,0.3)]"
      />

      {/* Griff. 44px, damit er auch als Touchziel taugt. Nur unter lg - ab lg
          gibt es keinen Regler zum Greifen, siehe Kopfkommentar. */}
      <span
        aria-hidden="true"
        className="gold-flaeche pointer-events-none absolute top-1/2 left-[var(--wipe)] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-text shadow-[0_6px_18px_-6px_rgba(15,46,59,0.6)] ring-1 ring-primary/20 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 lg:hidden"
      >
        <PfeileHorizontal className="h-5 w-5" />
      </span>

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-3 sm:p-4">
        <span className="rounded-full bg-primary/85 px-3 py-1.5 text-[10px] font-medium tracking-[0.18em] text-bg uppercase backdrop-blur-sm sm:text-[11px]">
          {vorher.label}
        </span>
        <span className="rounded-full bg-primary/85 px-3 py-1.5 text-[10px] font-medium tracking-[0.18em] text-bg uppercase backdrop-blur-sm sm:text-[11px]">
          {nachher.label}
        </span>
      </figcaption>
    </figure>
  );
}
