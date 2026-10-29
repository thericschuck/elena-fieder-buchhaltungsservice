"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "./ui/Reveal";
import StimmenKarte, { type Stimme } from "./ui/StimmenKarte";
import { ArrowRight } from "./ui/Icons";

/*
  Kundenstimmen im Wortlaut der finalen Website-Texte ("Was Mandanten ueber die
  Zusammenarbeit sagen"): Ruslan Chukhliebov, Fotostudio Belichtungswert,
  Inna W., Viktor - in dieser Reihenfolge. Bitte hier keine weiteren Stimmen
  erfinden oder ergaenzen und den Wortlaut nicht aendern, ohne dass Elena den
  neuen Text geliefert hat. Carola Stulz (Kollegin, frueher hier) steht in den
  finalen Texten nicht mehr und ist entfernt.

  Die Texte weichen teils von den frueher hier stehenden Fassungen ab (Ruslan
  ohne die Angabe zum Autohandel, Fotostudio auf einen Absatz gekuerzt) - die
  Vorlage ist massgeblich.

  DSGVO: Vor dem Live-Gang von jedem Namensgeber eine formlose schriftliche
  Freigabe einholen (E-Mail reicht) und ablegen. Viktor und Inna sind nur mit
  Vornamen bzw. abgekuerztem Nachnamen genannt; "Fotostudio Belichtungswert"
  und Ruslan Chukhliebov sind mit vollem Namen genannt und brauchen die
  Freigabe des jeweiligen Inhabers.

  Die Initialen stehen als Feld in den Daten und werden nicht aus dem Namen
  berechnet: aus "Fotostudio Belichtungswert" wuerde sonst nur "F".
*/
const STIMMEN: Stimme[] = [
  {
    absaetze: [
      "Wir arbeiten seit über einem Jahr mit Elena zusammen und sind mit der Zusammenarbeit rundum zufrieden.",
      "Unser Geschäftsfeld ist nicht ganz unkompliziert, doch Elena meistert auch anspruchsvolle Aufgaben mit großer Kompetenz und Professionalität. Sie ist eine echte Expertin auf ihrem Gebiet.",
      "Alle Fragen werden schnell geklärt und verständlich erklärt. Ihre Arbeit ist stets professionell, sorgfältig und zuverlässig.",
      "Besonders schätzen wir die schnelle, persönliche und unkomplizierte Kommunikation. Elena ist für uns jederzeit unkompliziert über WhatsApp erreichbar, ohne lange E-Mail-Verläufe oder Wartezeiten. Wenn es wirklich dringend ist, steht sie uns auch außerhalb der üblichen Geschäftszeiten oder am Wochenende zur Seite. Das ist heutzutage alles andere als selbstverständlich.",
      "Wir fühlen uns bei Elena bestens betreut, schätzen die vertrauensvolle Zusammenarbeit sehr und können sie uneingeschränkt weiterempfehlen!",
    ],
    name: "Ruslan Chukhliebov",
    initialen: "RC",
    meta: null,
  },
  {
    absaetze: [
      "Wir arbeiten inzwischen seit rund zwei Jahren zusammen und sind mit der Zusammenarbeit sehr zufrieden. Besonders schätzen wir die hohe Zuverlässigkeit, die schnelle Erreichbarkeit und die stets zeitnahe Rückmeldung bei Fragen oder Anliegen. Auch das persönliche Vertrauen spielt für uns eine große Rolle.",
    ],
    name: "Fotostudio Belichtungswert",
    initialen: "FB",
    meta: "Mandant seit rund zwei Jahren",
  },
  {
    absaetze: [
      "Eine sehr professionelle und gewissenhafte Arbeitsweise. Es wird genau hingeschaut. Die vereinbarten Termine werden zuverlässig eingehalten. Sorgfalt und Verantwortungsbewusstsein haben dabei einen hohen Stellenwert. Das schafft Vertrauen.",
    ],
    name: "Inna W.",
    initialen: "IW",
    meta: null,
  },
  {
    absaetze: [
      "Nach längerer Suche nach einem zuverlässigen Partner bin ich froh, auf Dich getroffen zu sein. Ich danke für die professionelle Zusammenarbeit.",
    ],
    name: "Viktor",
    initialen: "V",
    meta: "Mandant seit zwei Jahren",
  },
];

/**
 * Die Stimmen laufen ueber die volle Breite des Containers und nicht mehr in
 * der Haben-Spalte: dort waren die Karten auf ein Drittel gequetscht. Die
 * Ueberschrift bleibt an der Kontolinie, das Kartenraster bricht darunter
 * heraus.
 *
 * Der Treppenversatz der Karten (2,5rem je Index) laeuft nach rechts unten,
 * die untere Karte haengt also 5rem tiefer - dafuer ist das pb am Raster da.
 *
 * Das Dreier-Raster ist die feste Groesse, nicht die Anzahl der Stimmen: es
 * werden immer genau drei Karten gerendert, das Fenster rotiert bei mehr als
 * drei Eintraegen per Pfeil weiter (mit Wraparound). So bleibt das Layout
 * unveraendert, egal wie viele Stimmen in STIMMEN stehen - dafuer bitte auch
 * keine vierte Spalte oder Sonderfall fuer STIMMEN.length ergaenzen, sondern
 * neue Stimmen einfach hinten anhaengen.
 *
 * Unterhalb von md ist trotzdem nur die erste der drei gerenderten Karten
 * sichtbar (die anderen beiden bekommen `hidden`) - per CSS statt per
 * matchMedia in JS, damit es keinen Fensterwechsel/Flackern beim Hydrieren
 * gibt. Der Pfeil schiebt das Fenster dort trotzdem nur um eine Karte weiter,
 * genau wie am Desktop - es wird also nur sichtbar, was vorher schon
 * unsichtbar mitgerendert war.
 *
 * Der Platzwechsel beim Weiterklicken laeuft ueber Framer-Motion-Layout-
 * Animationen: jede Karte behaelt ihren Key (stimme.name) ueber den
 * Fensterwechsel hinweg, `layout="position"` interpoliert dann automatisch
 * von der alten zur neuen Rasterposition (FLIP), waehrend AnimatePresence die
 * neu einwechselnde Karte einblendet und die herausfallende ausblendet. Nur
 * "position" statt des vollen `layout`, weil StimmenKarte ihre eigene Hoehe
 * beim Auf-/Zuklappen aendert - bei vollem `layout` wuerde Framer das per
 * Skalierung wegkompensieren und mit der eigenen Grid-Zeilen-Animation der
 * Karte kollidieren (verzerrter, doppelter Uebergang).
 */
const FENSTERGROESSE = 3;

export default function Testimonials() {
  const [start, setStart] = useState(0);
  const reduziert = useReducedMotion();
  const anzahl = STIMMEN.length;
  const paginierbarMobil = anzahl > 1;
  const paginierbarDesktop = anzahl > FENSTERGROESSE;

  const sichtbar = Array.from(
    { length: Math.min(FENSTERGROESSE, anzahl) },
    (_, i) => STIMMEN[(start + i) % anzahl],
  );

  return (
    <div className="mt-16 border-t border-primary/10 pt-10 lg:mt-20 lg:pt-12">
      <div className="lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
        <div className="lg:pr-10 lg:text-right">
          <p className="text-[11px] font-medium tracking-[0.2em] text-secondary uppercase">
            Kundenstimmen
          </p>
          <h3 className="mt-4 font-headline text-[1.1rem] leading-[1.3] tracking-[-0.015em] text-primary lg:text-[1.25rem]">
            Was Mandanten über die Zusammenarbeit sagen
          </h3>
        </div>
        <Reveal className="mt-6 lg:mt-0 lg:pl-10">
          <p className="max-w-[42rem] text-[15px] leading-[1.6] text-secondary">
            Vertrauen zeigt sich im Alltag – durch Zuverlässigkeit,
            Erreichbarkeit und sorgfältige Arbeit.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid w-full gap-12 md:grid-cols-3 md:gap-6 md:pb-20 lg:mt-14">
        <AnimatePresence mode="popLayout" initial={false}>
          {sichtbar.map((stimme, i) => {
            const sichtbarkeit = i === 0 ? "" : "hidden md:block";
            return reduziert ? (
              <div className={sichtbarkeit} key={stimme.name}>
                <StimmenKarte index={i} stimme={stimme} />
              </div>
            ) : (
              <motion.div
                key={stimme.name}
                layout="position"
                className={sichtbarkeit}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <StimmenKarte index={i} stimme={stimme} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {paginierbarMobil && (
        <div
          className={`mt-8 flex items-center justify-end gap-2 lg:pr-10 ${
            paginierbarDesktop ? "" : "md:hidden"
          }`}
        >
          <button
            type="button"
            onClick={() => setStart((s) => (s - 1 + anzahl) % anzahl)}
            aria-label="Vorherige Kundenstimme"
            className="flex size-9 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors hover:border-gold-tief hover:text-gold-tief"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => setStart((s) => (s + 1) % anzahl)}
            aria-label="Nächste Kundenstimme"
            className="flex size-9 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors hover:border-gold-tief hover:text-gold-tief"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
