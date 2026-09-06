import Reveal from "./ui/Reveal";
import StimmenKarte, { type Stimme } from "./ui/StimmenKarte";

/*
  Echte Kundenstimmen, von Elena geliefert - keine Platzhalter.

  Redaktionell angefasst wurde nur das Minimum: Bei Viktor ist die Anrede der
  E-Mail ("Hallo liebe Elena") weggefallen, sonst ist der Wortlaut unveraendert.
  Beim Kuerzen bitte nichts hinzuerfinden und die Absatzfolge nicht umstellen -
  eingeklappt ist genau der erste Absatz sichtbar, es wird also nichts
  vorgezogen, was im Original hinten steht.

  DSGVO: Vor dem Live-Gang von jedem Namensgeber eine formlose schriftliche
  Freigabe einholen (E-Mail reicht) und ablegen. Inna W. und Viktor sind bereits
  abgekuerzt bzw. nur mit Vornamen genannt; "Fotostudio Belichtungswert" ist ein
  Firmenname und braucht die Freigabe des Inhabers.

  Die Initialen stehen als Feld in den Daten und werden nicht aus dem Namen
  berechnet: aus "Fotostudio Belichtungswert" wuerde sonst nur "F".
*/
const STIMMEN: Stimme[] = [
  {
    absaetze: [
      "Wir arbeiten inzwischen seit rund zwei Jahren zusammen und sind mit der Zusammenarbeit sehr zufrieden. Besonders schätzen wir die hohe Zuverlässigkeit, die schnelle Erreichbarkeit und die stets zeitnahe Rückmeldung bei Fragen oder Anliegen.",
      "Auch das persönliche Vertrauen spielt für uns eine große Rolle: Wir fühlen uns jederzeit kompetent betreut und können uns darauf verlassen, dass alles sorgfältig, professionell und zuverlässig erledigt wird.",
      "Eine sehr angenehme und vertrauensvolle Zusammenarbeit, die wir uneingeschränkt weiterempfehlen können.",
    ],
    name: "Fotostudio Belichtungswert",
    initialen: "FB",
    meta: "Mandant seit rund zwei Jahren",
  },
  {
    absaetze: [
      "Eine sehr professionelle und gewissenhafte Arbeitsweise. Es wird genau hingeschaut. Die Fristen werden zuverlässig eingehalten. Sorgfalt und Verantwortungsbewusstsein haben dabei einen hohen Stellenwert. Das schafft Vertrauen.",
    ],
    name: "Inna W.",
    initialen: "IW",
    meta: null,
  },
  {
    absaetze: [
      "Ich möchte mich für die zuverlässige, aber vor allem die vertrauensvolle Zusammenarbeit der letzten zwei Jahre bei Dir bedanken. Nach längerer Suche nach einem zuverlässigen Partner bin ich froh, auf Dich getroffen zu sein. Ich danke für die professionelle Zusammenarbeit.",
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
 */
export default function Testimonials() {
  return (
    <div className="mt-16 border-t border-primary/10 pt-10 lg:mt-20 lg:pt-12">
      <div className="lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
        <div className="lg:pr-10 lg:text-right">
          <p className="text-[11px] font-medium tracking-[0.2em] text-secondary uppercase">
            Kundenstimmen
          </p>
          <h3 className="mt-4 font-headline text-[1.1rem] leading-[1.3] tracking-[-0.015em] text-primary lg:text-[1.25rem]">
            Was Mandanten sagen
          </h3>
        </div>
        <Reveal className="mt-6 lg:mt-0 lg:pl-10">
          <p className="max-w-[42rem] text-[15px] leading-[1.6] text-secondary">
            Drei Rückmeldungen im Wortlaut, nichts umgeschrieben. Zwei davon
            nach zwei Jahren Zusammenarbeit.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid w-full gap-12 md:grid-cols-3 md:gap-6 md:pb-20 lg:mt-14">
        {STIMMEN.map((stimme, i) => (
          <StimmenKarte index={i} key={stimme.name} stimme={stimme} />
        ))}
      </div>
    </div>
  );
}
