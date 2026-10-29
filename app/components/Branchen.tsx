"use client";

import { useEffect, useRef } from "react";
import type { ComponentType, SVGProps } from "react";
import { useReducedMotion } from "framer-motion";
import Rail from "./ui/Rail";
import Reveal from "./ui/Reveal";
import { Mauer, Ordner, Person } from "./ui/Icons";

/**
 * Wortlaut aus den finalen Website-Texten, Abschnitt "Branchen, in denen
 * Erfahrung zaehlt": drei Bereiche. Handel und Industrie stehen dort bewusst
 * nicht mehr - nicht wieder ergaenzen. Die Texte beschreiben Erfahrung und
 * Lage des Kunden, keine zusaetzliche Leistung.
 */
const BRANCHEN = [
  {
    Icon: Mauer,
    name: "Bau & Handwerk",
    zeile:
      "Mehrere Projekte, verschiedene Objekte und zahlreiche laufende Zahlungsvorgänge verlangen eine klare Zuordnung. Ich erfasse und ordne die laufenden Geschäftsvorfälle strukturiert nach den vereinbarten Vorgaben.",
  },
  {
    Icon: Ordner,
    name: "Projektorientierte Unternehmen",
    zeile:
      "Wenn Geschäftsvorfälle mehreren Projekten oder Objekten zugeordnet werden müssen, ist Nachvollziehbarkeit entscheidend. Klare Abläufe sorgen dafür, dass die Zuordnung auch im laufenden Tagesgeschäft übersichtlich bleibt.",
  },
  {
    Icon: Person,
    name: "Freiberufler & Dienstleister",
    zeile:
      "Auch bei einem überschaubaren Belegvolumen lohnt sich eine professionelle Organisation. Digitale Abläufe und eine feste Ansprechpartnerin halten den administrativen Aufwand gering und schaffen Verlässlichkeit.",
  },
];

/**
 * Reiter + Karte fuer eine Branche. Extrahiert, weil dieselbe Karte zweimal
 * gerendert wird: im festen Raster ab sm und in der automatisch
 * durchwechselnden Reihe darunter (nur unter sm sichtbar, siehe unten).
 */
function BranchenKarte({
  Icon,
  name,
  zeile,
  index,
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  zeile: string;
  index: number;
}) {
  return (
    <div className="group h-full">
      {/* Reiter */}
      <span className="ml-6 flex h-8 w-fit items-center gap-2 rounded-t-md bg-gold-licht px-3.5 text-[11px] font-medium tracking-[0.16em] text-primary uppercase transition-transform duration-300 group-hover:-translate-y-1">
        <Icon className="h-[15px] w-[15px] shrink-0" />
        {String(index + 1).padStart(2, "0")}
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
  );
}

/** Millisekunden zwischen zwei automatischen Weiterschaltungen der Mobil-Reihe. */
const AUTO_INTERVALL = 3200;
/** Wartezeit nach eigenem Wischen, bevor die Automatik weiterlaeuft. */
const AUTO_PAUSE = 2600;

export default function Branchen() {
  const reduziert = useReducedMotion();
  const reiheRef = useRef<HTMLUListElement>(null);

  /*
    Nur fuer die Mobil-Reihe unter sm (siehe JSX weiter unten): die Karten
    liegen nebeneinander in einem nativ scrollbaren <ul> mit Scroll-Snap - man
    kann jederzeit selbst wischen - und wechseln daneben von allein per
    Intervall weiter.

    Wichtig: der Wechsel laeuft ueber reihe.scrollTo(), nicht ueber
    karte.scrollIntoView(). scrollIntoView() sucht sich JEDEN scrollbaren
    Vorfahren, der das Ziel gerade nicht zeigt - inklusive der Seite/des
    Fensters selbst. Ist man laengst zu einem anderen Abschnitt weiter-
    gescrollt, waere die Reihe dann vertikal nicht mehr im Bild und der
    Browser haette die ganze Seite zurueck zu "Branchen" gescrollt, nur weil
    die Automatik im Hintergrund weiterlief. reihe.scrollTo() fasst
    ausschliesslich den scrollLeft der Reihe selbst an, die Seite bleibt in
    jedem Fall unberuehrt.

    Zusaetzlich pausiert ein IntersectionObserver die Automatik komplett,
    solange die Reihe gar nicht im Bild ist - man soll sich den Rest der
    Seite ansehen koennen, ohne dass im Hintergrund unbemerkt weitergeschaltet
    wird.

    Nach eigenem Wischen pausiert die Automatik kurz (AUTO_PAUSE) und der
    interne Index wird auf die Karte nachgezogen, die dann tatsaechlich
    sichtbar ist - sonst wuerde der naechste Automatik-Tick zu der Karte
    zurueckspringen, an der die Automatik vor dem Wischen stand.

    Bei reduzierter Bewegung bleibt es beim reinen Antippen/Wischen ohne
    automatischen Wechsel.
  */
  useEffect(() => {
    if (reduziert) return;
    const reihe = reiheRef.current;
    if (!reihe) return;

    let index = 0;
    let pausiert = false;
    let sichtbar = false;
    let resumeTimer: number;

    const karten = () => Array.from(reihe.children) as HTMLElement[];

    const weiter = () => {
      if (pausiert || !sichtbar) return;
      const liste = karten();
      if (liste.length === 0) return;
      index = (index + 1) % liste.length;
      reihe.scrollTo({ left: liste[index].offsetLeft, behavior: "smooth" });
    };
    const intervall = window.setInterval(weiter, AUTO_INTERVALL);

    const sichtbarkeitsBeobachter = new IntersectionObserver(
      ([eintrag]) => {
        sichtbar = eintrag.isIntersecting;
      },
      { threshold: 0.5 },
    );
    sichtbarkeitsBeobachter.observe(reihe);

    const onScroll = () => {
      pausiert = true;
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        const liste = karten();
        const mitte = reihe.scrollLeft + reihe.clientWidth / 2;
        let naechste = 0;
        let bester = Infinity;
        liste.forEach((karte, i) => {
          const abstand = Math.abs(
            karte.offsetLeft + karte.clientWidth / 2 - mitte,
          );
          if (abstand < bester) {
            bester = abstand;
            naechste = i;
          }
        });
        index = naechste;
        pausiert = false;
      }, AUTO_PAUSE);
    };
    reihe.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearInterval(intervall);
      window.clearTimeout(resumeTimer);
      reihe.removeEventListener("scroll", onScroll);
      sichtbarkeitsBeobachter.disconnect();
    };
  }, [reduziert]);

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
              Branchen, in denen Erfahrung zählt
            </h2>
            <p className="mt-4 max-w-[38rem] text-[17px] leading-[1.65] text-secondary">
              Unterschiedliche Unternehmen haben unterschiedliche Abläufe.
              Besonders vertraut bin ich mit Bau, Handwerk, projektorientierten
              Unternehmen sowie mit Freiberuflern und Dienstleistern.
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

          Ab sm fest im Raster (alle Karten gleichzeitig sichtbar). Darunter,
          auf dem Handy, liegen dieselben Karten stattdessen nebeneinander in
          einer eigenen, automatisch weiterwechselnden Reihe (siehe unten) -
          "untereinander" waere auf dem schmalen Bildschirm mehrmals scrollen,
          bis man durch ist.
        */}
        <ul className="mt-16 hidden gap-x-6 gap-y-10 sm:grid sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-x-8">
          {BRANCHEN.map(({ Icon, name, zeile }, i) => (
            <li key={name}>
              <Reveal className="h-full" delay={(i % 3) * 0.07} y={14}>
                <BranchenKarte Icon={Icon} name={name} zeile={zeile} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Unter sm: nebeneinander statt untereinander, per Scroll-Snap.
            Wechselt von allein weiter (siehe Effekt oben), man kann aber
            jederzeit selbst weiterwischen - die Automatik pausiert dabei kurz.
            Scrollbalken bewusst per Utility ausgeblendet, das Wischen bleibt
            davon unberuehrt. */}
        <ul
          ref={reiheRef}
          className="mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pt-1 pb-6 sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {BRANCHEN.map(({ Icon, name, zeile }, i) => (
            <li
              key={name}
              className="h-full w-[78%] max-w-[320px] shrink-0 snap-start"
            >
              {/* Bewusst ohne Reveal: dessen Fade-in nutzt einen Sichtbereich
                  mit -80px Rand auf allen vier Seiten (siehe Reveal.tsx) - die
                  nur als Streifen rechts hereinragende naechste Karte liegt
                  darin ausserhalb der Zone und bleibt bei opacity:0 haengen,
                  bis man sie erst selbst weiter hereinwischt. Fuer eine Reihe,
                  die von Anfang an komplett da sein soll, ist der Eintritts-
                  Fade ohnehin das falsche Motiv. */}
              <BranchenKarte Icon={Icon} name={name} zeile={zeile} index={i} />
            </li>
          ))}
        </ul>

        <div className="mt-12 lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
          <div aria-hidden="true" />
          <p className="max-w-[38rem] text-sm leading-[1.6] text-secondary lg:pl-10">
            Ihre Branche ist nicht dabei? Sprechen Sie mich gerne an. Im
            Erstgespräch klären wir, ob mein Leistungsangebot zu Ihrem Bedarf
            passt.
          </p>
        </div>
      </div>
    </section>
  );
}
