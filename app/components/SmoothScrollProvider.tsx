"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Hoehe des fixen Headers – Ankerziele muessen darunter frei bleiben. */
const HEADER_OFFSET = 88;

type ScrollToTarget = string | HTMLElement | number;

type SmoothScrollApi = {
  /** Scrollt zu einem Ankerziel, mit Header-Offset. */
  scrollTo: (target: ScrollToTarget) => void;
  /** Friert das Scrollen ein, solange ein Overlay offen ist. */
  setStopped: (stopped: boolean) => void;
};

const SmoothScrollContext = createContext<SmoothScrollApi>({
  scrollTo: () => {},
  setStopped: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

/** Kurzform fuer den haeufigsten Fall: Anker-Navigation. */
export function useSmoothScrollTo() {
  return useContext(SmoothScrollContext).scrollTo;
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Bei reduzierter Bewegung uebernimmt der Browser das Scrollen komplett.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    // Lenis treibt ScrollTriggers Update, GSAPs Ticker treibt Lenis' rAF.
    // Ohne diese beiden Zeilen laufen Scrollposition und Animation auseinander –
    // ohne Fehlermeldung, nur als leichter Versatz.
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Webfonts und Bilder aendern die Seitenhoehe, nachdem ScrollTrigger schon
    // gemessen hat. Der Refresh nach dem load-Event faengt beides ab und sorgt
    // zugleich dafuer, dass alle Trigger einmal gemeinsam neu rechnen –
    // dabei zieht refreshPriority die gepinnten Bloecke nach vorn.
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    document.fonts?.ready.then(refresh);
    if (document.readyState === "complete") requestAnimationFrame(refresh);
    else window.addEventListener("load", refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: ScrollToTarget) => {
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(target, { offset: -HEADER_OFFSET });
      return;
    }

    // Lenis laeuft nicht (reduzierte Bewegung) – nativ scrollen.
    if (typeof target === "string") {
      document
        .querySelector(target)
        ?.scrollIntoView({ behavior: "auto", block: "start" });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    } else {
      window.scrollTo(0, target);
    }
  }, []);

  const setStopped = useCallback((stopped: boolean) => {
    const lenis = lenisRef.current;

    if (lenis) {
      if (stopped) lenis.stop();
      else lenis.start();
      return;
    }

    document.documentElement.style.overflow = stopped ? "hidden" : "";
  }, []);

  const api = useMemo(() => ({ scrollTo, setStopped }), [scrollTo, setStopped]);

  return (
    <SmoothScrollContext.Provider value={api}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
