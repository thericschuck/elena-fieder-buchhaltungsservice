"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "./Icons";

/*
  Frueher natives <details>/<summary> ohne jedes JavaScript - Tastatur,
  Screenreader und Strg+F funktionierten dadurch von allein. In der Praxis war
  das Auf-/Zuklappen darueber aber nur beim allerersten Oeffnen butterweich:
  der Browser blendet den details-Inhalt per UA-Stylesheet aus (display:none
  bzw. content-visibility:hidden je nach Engine), und das ist nicht animierbar
  - jede eigene CSS-Animation auf einem Kind-Element wird beim naechsten
  Zuklappen von genau diesem Default wieder gekappt, sichtbar als Ruckeln ab
  dem zweiten Mal.

  Deshalb jetzt ein Button + Framer Motion, exakt dieselbe Technik wie bei
  StimmenKarte: die Antwort steht immer im DOM (Strg+F findet sie weiterhin),
  nur ihre Hoehe wird zwischen 0 und "auto" animiert. Preis dafuer: eine Zeile
  "use client" statt einer reinen Server-Komponente - der Tausch ist es wert,
  weil das Zuklappen jetzt bei jedem Klick gleich smooth ist, nicht nur beim
  ersten.
*/
export default function FrageItem({
  index,
  frage,
  antwortKlartext,
}: {
  index: number;
  frage: string;
  antwortKlartext: string;
}) {
  const [offen, setOffen] = useState(false);
  const reduziert = useReducedMotion();
  const panelId = `frage-${index}`;

  return (
    <div className="group border-t border-primary/12 last:border-b">
      <button
        type="button"
        onClick={() => setOffen((v) => !v)}
        aria-expanded={offen}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left lg:grid lg:grid-cols-[var(--rail-x)_1fr] lg:gap-0"
      >
        <span aria-hidden="true" className="hidden lg:block lg:pr-10" />
        <span className="flex flex-1 items-start justify-between gap-6 lg:pl-10">
          <h3 className="font-headline text-[1.05rem] leading-[1.35] tracking-[-0.015em] text-primary lg:text-[1.2rem]">
            {frage}
          </h3>
          <ChevronDown
            className={`mt-0.5 h-5 w-5 shrink-0 text-brand-tief transition-transform duration-300 ${
              offen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      <motion.div
        id={panelId}
        initial={false}
        animate={{ height: offen ? "auto" : 0 }}
        transition={{
          duration: reduziert ? 0 : 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="overflow-hidden"
      >
        <div className="pb-7 lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
          <span aria-hidden="true" className="hidden lg:block" />
          <p className="max-w-[44rem] text-[16px] leading-[1.7] text-text lg:pl-10">
            {antwortKlartext}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
