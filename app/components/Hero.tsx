"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useSmoothScrollTo } from "./SmoothScrollProvider";
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
      className="relative pt-28 pb-12 lg:pt-32 lg:pb-14"
    >
      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/*
          Der Hero hat sein eigenes Spaltenverhaeltnis (60/40) statt des
          Soll/Haben-Rasters der uebrigen Sections: die Aussage braucht die
          breitere Spalte, das Bild die Kante zum Bildschirmrand. Die
          Kontolinie beginnt bewusst erst unterhalb des Heros (TrustBar), damit
          der Aufmacher ruhig bleibt.

          Warum das Foto eine eigene Flaeche bekommt und nicht hinter der
          Schrift liegt: nachgerechnet braeuchte das Logo-Cyan als
          Displayschrift auf einem Foto einen hellsten Bildpunkt unter 0,058
          Luminanz. Ein Buerofoto ist dann fast schwarz. Mit heller Schrift auf
          hellem Scrim kippt es andersherum. Text auf ruhigem Grund und Bild
          daneben ist die einzige Fassung, in der beides bestehen bleibt.
        */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,40%)] lg:items-stretch lg:gap-10">
          <div>
            <div data-hero-zeile>
              <span
                aria-hidden="true"
                className="gold-linie block h-px w-20"
              />
              <p className="mt-3 text-[11px] font-medium tracking-[0.2em] text-secondary uppercase">
                Elena Fieder | Bilanzbuchhalterin (IHK)
              </p>
              <p className="mt-1.5 text-[13px] leading-[1.5] text-secondary">
                Buchen laufender Geschäftsvorfälle · persönlich &amp; digital
              </p>
            </div>

            <h1
              data-hero-zeile
              className="mt-5 font-headline text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.05] tracking-[-0.03em] text-primary lg:mt-6"
            >
              Mehr Klarheit in Ihren Zahlen.
              <span className="mt-1.5 block text-brand-tief">
                Mehr Zeit für Ihr Unternehmen.
              </span>
            </h1>

            <div
              data-hero-zeile
              className="mt-5 max-w-[38rem] space-y-3 text-[16px] leading-[1.55] text-secondary lg:mt-6"
            >
              <p>
                Professionelle Unterstützung beim Buchen laufender
                Geschäftsvorfälle – für Unternehmen und Freiberufler, die Wert
                auf Qualität, Verlässlichkeit und persönliche Betreuung legen.
              </p>
              <p>
                Besondere Erfahrung in Bau, Handwerk und projektorientierten
                Unternehmen sowie in der Betreuung von Freiberuflern und
                Dienstleistern.
              </p>
            </div>

            <p
              data-hero-zeile
              className="mt-4 max-w-[38rem] text-[14px] leading-[1.55] text-primary"
            >
              Bilanzbuchhalterin (IHK) · Bachelor Professional in
              Bilanzbuchhaltung · über 10 Jahre Berufserfahrung
              <br />
              <span className="text-secondary">
                Obernburg am Main · deutschlandweit digital · Deutsch &amp;
                Russisch
              </span>
            </p>

            <div
              data-hero-zeile
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#kontakt");
                }}
                className="gold-flaeche group inline-flex items-center justify-center gap-2.5 rounded-md px-6 py-3.5 text-base font-medium text-text hover:-translate-y-0.5"
              >
                Persönliches Erstgespräch anfragen
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <p className="text-sm leading-relaxed text-secondary">
                Ca. 20 Minuten · kostenfrei · unverbindlich
              </p>
            </div>
          </div>

          {/* Bildpanel. bleed-rechts zieht es bis an die Viewportkante, ohne
              dass der Container angefasst werden muss. Der Bildausschnitt ist
              nach rechts verschoben (object-position), weil dort der
              Arbeitsplatz sitzt und links nur Wand. */}
          <div
            data-panel
            className="bleed-rechts relative mt-8 h-56 sm:h-72 lg:mt-0 lg:h-auto lg:min-h-[24rem]"
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
