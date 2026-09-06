"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useSmoothScrollTo } from "./SmoothScrollProvider";
import Rail from "./ui/Rail";
import { ArrowRight } from "./ui/Icons";
import buero from "../assets/images/arbeitsplatz.webp";

export default function Hero() {
  const scrollTo = useSmoothScrollTo();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(root.querySelectorAll("[data-hero-zeile]"), {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
      }).from(
        root.querySelector("[data-panel]"),
        { opacity: 0, duration: 1.1 },
        "-=0.7",
      );

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative pt-32 pb-16 lg:pt-40 lg:pb-24"
    >
      <Rail tone="light" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/*
          Der Hero hat sein eigenes Spaltenverhaeltnis (60/40) statt des
          Soll/Haben-Rasters der uebrigen Sections: die Aussage braucht die
          breitere Spalte, das Bild die Kante zum Bildschirmrand. Die
          Kontolinie laeuft weiter bei 34% durch und kreuzt dabei die
          Headline - dieselbe bewusste Setzung wie vorher.

          Warum das Foto eine eigene Flaeche bekommt und nicht hinter der
          Schrift liegt: nachgerechnet braeuchte das Logo-Cyan als
          Displayschrift auf einem Foto einen hellsten Bildpunkt unter 0,058
          Luminanz. Ein Buerofoto ist dann fast schwarz. Mit heller Schrift auf
          hellem Scrim kippt es andersherum. Text auf ruhigem Grund und Bild
          daneben ist die einzige Fassung, in der beides bestehen bleibt.
        */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,40%)] lg:items-stretch lg:gap-12">
          <div>
            <div data-hero-zeile>
              <span
                aria-hidden="true"
                className="gold-linie block h-px w-20"
              />
              <p className="mt-4 text-[11px] font-medium tracking-[0.2em] text-secondary uppercase">
                Buchhaltungsservice
              </p>
            </div>

            <h1
              data-hero-zeile
              className="mt-8 font-headline text-[clamp(2.3rem,5.4vw,4.4rem)] leading-[1.03] tracking-[-0.03em] text-primary lg:mt-10"
            >
              Sie fragen nach Ihren Zahlen.
              <span className="mt-1.5 block text-brand-tief">
                Ich habe sie schon.
              </span>
            </h1>

            <p
              data-hero-zeile
              className="mt-8 max-w-[38rem] text-[17px] leading-[1.65] text-secondary sm:text-lg lg:mt-10"
            >
              Ich übernehme die laufende Buchhaltung für Baubranche, Handwerk,
              Handel, Industrie, Dienstleister und Freiberufler – persönlich,
              digital, mit kurzen Wegen. Am Monatsende wissen Sie, wo Sie
              stehen, nicht erst wenn Ihr Steuerberater sich meldet.
            </p>

            <div
              data-hero-zeile
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#kontakt");
                }}
                className="gold-flaeche group inline-flex items-center justify-center gap-2.5 rounded-md px-7 py-4 text-base font-medium text-text hover:-translate-y-0.5"
              >
                Kostenloses Erstgespräch
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <p className="text-sm leading-relaxed text-secondary">
                20 Minuten, unverbindlich.
                <br className="hidden sm:block" /> Antwort in der Regel am
                selben Werktag.
              </p>
            </div>
          </div>

          {/* Bildpanel. bleed-rechts zieht es bis an die Viewportkante, ohne
              dass der Container angefasst werden muss. Der Bildausschnitt ist
              nach rechts verschoben (object-position), weil dort der
              Arbeitsplatz sitzt und links nur Wand. */}
          <div
            data-panel
            className="bleed-rechts relative mt-12 h-64 sm:h-80 lg:mt-0 lg:h-auto lg:min-h-[30rem]"
          >
            <Image
              src={buero}
              alt="Ein aufgeräumter, heller Arbeitsplatz mit Laptop, Notizbuch und Pflanzen."
              placeholder="blur"
              preload
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              quality={85}
              className="rounded-l-lg object-cover object-[62%_50%] lg:rounded-l-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
