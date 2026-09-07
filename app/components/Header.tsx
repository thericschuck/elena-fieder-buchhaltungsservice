"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { Close, Menu } from "./ui/Icons";
import logo from "../assets/logo/elena-fieder-logo.png";

const NAV = [
  { id: "leistungen", label: "Leistungen" },
  { id: "branchen", label: "Branchen" },
  { id: "ueber-mich", label: "Über mich" },
  { id: "ablauf", label: "Ablauf" },
  { id: "kontakt", label: "Kontakt" },
] as const;

export default function Header() {
  const { scrollTo, setStopped } = useSmoothScroll();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  /*
    Lesefortschritt als Linie auf der Unterkante der Leiste. Bewusst in
    Markenblau und nicht in Gold: Gold ist auf dieser Seite die Farbe der
    Handlung (Buttons), ein Fortschrittsbalken ist Anzeige. In dieser Rolle
    ist die Linie ausserdem die Fortsetzung der Kontolinie.

    useScroll hoert auf das Fensterscrollen - Lenis scrollt das echte Fenster,
    der Wert bleibt also gueltig.
  */
  const { scrollYProgress } = useScroll();
  const fortschritt = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lenis scrollt das echte Fenster, window.scrollY bleibt also gueltig.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-Spy: markiert den Abschnitt, der gerade im Blickfeld liegt.
  useEffect(() => {
    const sections = NAV.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setStopped(menuOpen);
    if (!menuOpen) return;

    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setStopped]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollTo(`#${id}`);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[height,background-color,border-color] duration-300 ease-out ${
          scrolled
            ? "h-18 border-b border-primary/10 bg-bg/85 backdrop-blur-md"
            : "h-22 border-b border-transparent"
        }`}
      >
        <motion.span
          aria-hidden="true"
          style={{ scaleX: reduced ? scrollYProgress : fortschritt }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand-tief"
        />
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6 lg:px-10">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              go("hero");
            }}
            className="-m-2 block p-2"
          >
            <Image
              src={logo}
              alt="Elena Fieder Buchhaltungsservice – zum Seitenanfang"
              priority
              sizes="220px"
              className={`w-auto transition-[height] duration-300 ease-out ${
                scrolled ? "h-11 lg:h-13" : "h-13 lg:h-16"
              }`}
            />
          </a>

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      go(id);
                    }}
                    className={`group relative block py-2 text-[15px] transition-colors ${
                      active === id
                        ? "text-primary"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    {label}

                    {/* Hover-Andeutung nur, wenn der Punkt nicht aktiv ist -
                        sonst laufen zwei Marken gegeneinander. */}
                    {active !== id && (
                      <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gold-tief/50 transition-all duration-300 group-hover:w-full" />
                    )}

                    {active === id &&
                      (reduced ? (
                        <span className="gold-flaeche absolute -bottom-0.5 left-0 h-0.5 w-full" />
                      ) : (
                        <motion.span
                          layoutId="nav-marke"
                          className="gold-flaeche absolute -bottom-0.5 left-0 h-0.5 w-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      ))}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault();
                go("kontakt");
              }}
              className="gold-flaeche hidden rounded-md px-5 py-2.5 text-[15px] font-medium text-text hover:-translate-y-0.5 sm:block"
            >
              Erstgespräch
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-3 flex h-11 w-11 items-center justify-center text-primary lg:hidden"
            >
              <span className="sr-only">Menü öffnen</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-bg lg:hidden"
          >
            <div className="mx-auto flex h-22 w-full max-w-7xl items-center justify-between px-6">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  go("hero");
                }}
                className="-m-2 block p-2"
              >
                <Image
                  src={logo}
                  alt="Elena Fieder Buchhaltungsservice – zum Seitenanfang"
                  sizes="180px"
                  className="h-13 w-auto"
                />
              </a>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                className="-mr-3 flex h-11 w-11 items-center justify-center text-primary"
              >
                <span className="sr-only">Menü schließen</span>
                <Close className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="Hauptnavigation mobil" className="px-6 pt-6">
              <ul className="flex flex-col gap-1">
                {NAV.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(id);
                      }}
                      className="block border-b border-primary/10 py-5 font-headline text-2xl tracking-tight text-primary"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault();
                  go("kontakt");
                }}
                className="gold-flaeche mt-8 block rounded-md px-6 py-4 text-center text-base font-medium text-text"
              >
                Kostenloses Erstgespräch
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
