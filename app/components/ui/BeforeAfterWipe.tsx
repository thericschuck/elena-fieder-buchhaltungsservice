"use client";

import { useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { PfeileHorizontal } from "./Icons";

type Seite = {
  bild: StaticImageData;
  alt: string;
  label: string;
};

/*
  Vorher/Nachher mit einem echten Schieberegler.

  Vorher war die Schnittkante scroll-gebunden und hatte bewusst keinen Griff.
  Das war ein Fehler: es sieht wie ein Regler aus, also erwartet man einen -
  und wer nicht genau im richtigen Scrollbereich war, hat gar keine Bewegung
  gesehen. GSAP und ScrollTrigger sind hier deshalb raus.

  Umgesetzt als natives input[type=range] ueber dem ganzen Bild:

  - Touch, Maus und Stift funktionieren ohne eigene Pointer-Logik.
  - Pfeiltasten, Pos1 und Ende funktionieren ebenfalls kostenlos.
  - Screenreader kuendigen es als Regler mit Wert an.

  Der Griff ist eine eigene, nicht klickbare Flaeche - der unsichtbare Thumb
  des Inputs ist bewusst 3rem breit und volle Bildhoehe, damit man ueberall
  auf dem Bild ziehen kann und nicht nur auf dem Griff.
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

  return (
    <figure
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
        className="peer absolute inset-0 m-0 h-full w-full cursor-ew-resize appearance-none bg-transparent focus:outline-none [&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-12 [&::-moz-range-thumb]:cursor-ew-resize [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-moz-range-track]:h-full [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
      />

      {/* Die Kontolinie als Schnittkante */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[var(--wipe)] w-0.5 -translate-x-1/2 bg-gold shadow-[0_0_0_1px_rgba(15,46,59,0.3)]"
      />

      {/* Griff. 44px, damit er auch als Touchziel taugt. */}
      <span
        aria-hidden="true"
        className="gold-flaeche pointer-events-none absolute top-1/2 left-[var(--wipe)] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-text shadow-[0_6px_18px_-6px_rgba(15,46,59,0.6)] ring-1 ring-primary/20 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
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
