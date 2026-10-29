"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rail from "./ui/Rail";
import Reveal from "./ui/Reveal";
import BeforeAfterWipe from "./ui/BeforeAfterWipe";
import { Clock, Receipt, Users, WarningCircle } from "./ui/Icons";
import belegeVorher from "../assets/images/belege-vorher.jpg";
import belegeNachher from "../assets/images/belege-nachher.jpg";

gsap.registerPlugin(ScrollTrigger);

const VORHER = {
  bild: belegeVorher,
  alt: "Ein hoher Stapel loser Papiere und Belege auf einem Schreibtisch.",
  label: "Vorher",
};

const NACHHER = {
  bild: belegeNachher,
  alt: "Eine geöffnete Schublade mit sauber sortierten und beschrifteten Akten.",
  label: "Nachher",
};

const BELEGE = [
  { nr: "ER 4711", text: "Baustoffe Nord", datum: "03.09.", betrag: "3.480,00" },
  { nr: "AR 2098", text: "Rohbau Etappe 2", datum: "04.09.", betrag: "18.900,00" },
  { nr: "Tankbeleg", text: "Fuhrpark", datum: "05.09.", betrag: "412,60" },
  { nr: "ER 4712", text: "Gerüstbau Mainz", datum: "06.09.", betrag: "2.150,00" },
  { nr: "Bewirtung", text: "Bauherrentermin", datum: "06.09.", betrag: "86,40" },
  { nr: "ER 4713", text: "Container Entsorgung", datum: "09.09.", betrag: "640,00" },
];

/**
 * Startpositionen der Belege, von denen aus sie sich einsortieren.
 * Feste Werte statt Math.random(): muss serverseitig identisch rendern.
 *
 * Bewusst flach gehalten: frueher streuten die Karten bis 650px nach rechts
 * und lagen damit quer ueber der Pain-Liste. Zusammen mit der Stapelreihenfolge
 * sah das aus, als waeren die Karten durchsichtig.
 */
const SCATTER = [
  { x: 300, y: -180, r: 6 },
  { x: 170, y: 120, r: -5 },
  { x: 355, y: 30, r: -3 },
  { x: 95, y: -120, r: 7 },
  { x: 315, y: 185, r: 4 },
  { x: 215, y: -30, r: -6 },
];

/*
  Texte aus den finalen Website-Texten, Abschnitt "Mehr Struktur. Mehr
  Ueberblick. Mehr Freiraum." - Ueberschrift, Einleitung, vier Punkte,
  Schlusssatz. Der Aufbau der Section (Belegstapel, Liste, Vorher/Nachher)
  ist unveraendert; nur der Wortlaut ist ersetzt. Nicht umformulieren.
*/
const PAINS = [
  {
    Icon: Clock,
    titel: "Mehr Zeit für Ihr Kerngeschäft",
    text: "Laufende Geschäftsvorfälle werden regelmäßig bearbeitet, statt sich im Tagesgeschäft anzusammeln.",
  },
  {
    Icon: Receipt,
    titel: "Klare Abläufe",
    text: "Von der digitalen Belegübergabe bis zur laufenden Erfassung schaffen wir einen Prozess, der zu Ihrem Unternehmen passt.",
  },
  {
    Icon: WarningCircle,
    titel: "Offene Punkte zeitnah klären",
    text: "Unklare Vorgänge werden nicht einfach weitergeschoben. Fehlende Informationen werden frühzeitig angefragt und nachvollziehbar dokumentiert.",
  },
  {
    Icon: Users,
    titel: "Persönliche Betreuung",
    text: "Sie haben eine feste Ansprechpartnerin. Ich kenne Ihre Abläufe und Sie sprechen direkt mit mir.",
  },
];

function BelegCard({ beleg }: { beleg: (typeof BELEGE)[number] }) {
  return (
    <div className="rounded-md border border-primary/15 bg-white px-4 py-3 shadow-[0_14px_30px_-18px_rgba(15,46,59,0.55)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <Receipt className="h-4 w-4 shrink-0 text-gold-tief" />
          <span className="truncate text-sm font-medium text-primary">
            {beleg.nr}
          </span>
        </div>
        <span className="tnum shrink-0 text-sm text-text">
          {beleg.betrag} €
        </span>
      </div>
      <p className="mt-1 truncate pl-6.5 text-xs text-secondary">
        <span className="tnum">{beleg.datum}</span> · {beleg.text}
      </p>
    </div>
  );
}

export default function ProblemPain() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const mm = gsap.matchMedia();

    // Nur auf grossen Screens gepinnt und scroll-gebunden. Darunter waere das
    // Pinning auf schwaecheren Geraeten ruckelig und der Nutzen gering.
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          stage.querySelectorAll("[data-beleg]"),
        );
        const pains = stage.querySelectorAll("[data-pain]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=70%",
            pin: true,
            scrub: true,
            // Der Pin-Spacer verschiebt die gesamte Seite darunter, dieser
            // Trigger muss also vor allen spaeteren vermessen werden.
            refreshPriority: 1,
          },
        });

        // Die Belege liegen im DOM bereits sortiert. GSAP zieht sie nur an den
        // Anfang der Geschichte zurueck - ohne JS bleibt der gute Endzustand.
        tl.from(
          cards,
          {
            x: (i: number) => SCATTER[i % SCATTER.length].x,
            y: (i: number) => SCATTER[i % SCATTER.length].y,
            rotate: (i: number) => SCATTER[i % SCATTER.length].r,
            // Keine Deckkraft-Animation: die Belege sollen durchgehend
            // undurchsichtig sein, sonst scheint der Text dahinter durch.
            ease: "none",
            duration: 0.65,
            stagger: 0.05,
          },
          0,
        ).from(
          pains,
          {
            opacity: 0.12,
            x: -12,
            ease: "none",
            duration: 0.5,
            stagger: 0.12,
          },
          0.3,
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="problem" className="relative">
      <Rail tone="light" marker />

      {/* Die gepinnte Buehne: Belegchaos sortiert sich zur Kontolinie */}
      <div
        ref={stageRef}
        className="relative overflow-hidden py-20 lg:flex lg:h-screen lg:min-h-[40rem] lg:items-center lg:py-0"
      >
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-[var(--rail-x)_1fr] lg:items-center lg:gap-y-0">
            {/* Soll: der Belegstapel.
                z-20, weil die Karten waehrend der Streuung ueber die
                Pain-Spalte laufen. Ohne das zeichnet der spaeter im DOM
                stehende Text darueber und die Karten wirken durchsichtig. */}
            {/* Unter lg gar nicht gerendert: der Sinn der Karten ist das
                gepinnte Einsortieren, und Pinning laeuft nur ab lg. Ohne die
                Bewegung sind es drei Beispielrechnungen ohne Aussage, die nur
                Hoehe kosten. hidden statt Umsortieren, damit das
                Spaltenraster darunter unveraendert bleibt. */}
            <div className="relative z-20 hidden lg:block lg:pr-10">
              <div
                className="hidden lg:flex lg:flex-col lg:gap-2"
                aria-hidden="true"
              >
                {BELEGE.map((beleg) => (
                  <div
                    key={beleg.nr}
                    data-beleg
                    className="will-change-transform"
                  >
                    <BelegCard beleg={beleg} />
                  </div>
                ))}
              </div>
            </div>

            {/* Haben: was das kostet */}
            <div className="relative z-10 mt-12 lg:mt-0 lg:pl-10">
              <h2 className="font-headline text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-primary">
                Mehr Struktur. Mehr Überblick. Mehr Freiraum.
              </h2>
              <p className="mt-5 max-w-[38rem] text-[17px] leading-[1.6] text-secondary">
                Gut organisierte kaufmännische Abläufe sollen Ihnen Arbeit
                abnehmen – nicht zusätzliche schaffen. Ich übernehme die
                vereinbarten Aufgaben im Rahmen meines Leistungsangebots
                zuverlässig und strukturiert, damit Sie sich auf Ihr
                Unternehmen und Ihre Kunden konzentrieren können.
              </p>

              <ul className="mt-8 flex max-w-[36rem] flex-col gap-5">
                {PAINS.map(({ Icon, titel, text }) => (
                  <li key={titel} data-pain className="flex gap-4">
                    {/* Kachel deckt voll: bg-brand-hell statt einer Prozent-Deckkraft.
                        Vorher schien der Hintergrund durch. */}
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/10 bg-brand-hell text-primary">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div>
                      <h3 className="text-[17px] leading-[1.4] font-medium text-primary">
                        {titel}
                      </h3>
                      <p className="mt-1 text-[15px] leading-[1.5] text-text">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Ueberleitung zur Loesung - laeuft nach dem Pin normal weiter.

          Der Vorher/Nachher-Regler sitzt jetzt auf der Soll-Seite, gegenueber
          dem Text. Vorher stand er unter dem Text und hat den Block doppelt so
          hoch gemacht; die Unterschrift darunter ist weg, weil sie behauptet
          hat, es seien dieselben Belege - es sind zwei Symbolfotos. */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10 lg:pb-24">
        <div className="lg:grid lg:grid-cols-[var(--rail-x)_1fr] lg:items-start">
          <div className="lg:pr-10 lg:text-right">
            <div>
              <BeforeAfterWipe vorher={VORHER} nachher={NACHHER} />
            </div>
          </div>

          <Reveal className="mt-10 lg:mt-0 lg:pl-10">
            <p className="max-w-[42rem] font-headline text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.25] tracking-[-0.015em] text-primary">
              Mein Anspruch: eine Zusammenarbeit, auf die Sie sich verlassen
              können.
            </p>
          </Reveal>
        </div>
      </div>

    </section>
  );
}
