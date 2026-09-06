"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Einmaliger Einblendvorgang beim Eintritt in den Viewport.
 *
 * Bewusst zurueckhaltend: Die eine aufwendige, scroll-gebundene Sequenz sitzt in
 * ProblemPain. Ueberall sonst reicht ein kurzer Reveal - mehr Bewegung wuerde
 * der Seriositaet der Seite schaden statt ihr zu helfen.
 *
 * Framer Motion animiert Inline-Styles per rAF, nicht per CSS-Transition. Der
 * globale reduced-motion-Block in globals.css greift hier also nicht - deshalb
 * die explizite Abfrage.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
