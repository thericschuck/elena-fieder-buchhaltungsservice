import Image from "next/image";
import portrait from "../assets/images/elena-fieder-portrait.webp";
import Rail from "./ui/Rail";
import Reveal from "./ui/Reveal";
import Testimonials from "./Testimonials";
import { Check, Clock, Globus, Person, Urkunde, Users } from "./ui/Icons";

/*
  Aufbau wie bisher: Portrait und Bio, darunter die sechs Punkte (jetzt
  "Warum mit mir?"), danach die Kundenstimmen. Der fruehere Block "Berufspraxis
  im Angestelltenverhaeltnis" ist entfallen: die finalen Website-Texte fuehren
  ihn nicht mehr.

  Rechtliche Leitplanke (§ 6 StBerG): Bilanzerstellung, Jahresabschluss und
  Steuererklaerungen sind Steuerberatern vorbehalten. Hier daher keine
  Taetigkeitslisten dazu und keine Erfahrungsaufzaehlung aus dem Bereich.

  Der Wortlaut der Absaetze stammt aus den finalen Website-Texten ("Ueber mich")
  und ist in Elenas Ich-Perspektive - nicht umformulieren.
*/

/* Wortlaut aus den finalen Website-Texten, Abschnitt "Warum mit mir?". */
const PUNKTE = [
  {
    Icon: Urkunde,
    titel: "Bilanzbuchhalterin (IHK)",
    text: "Bachelor Professional in Bilanzbuchhaltung – verbunden mit über 10 Jahren praktischer Berufserfahrung im kaufmännischen Rechnungswesen.",
  },
  {
    Icon: Clock,
    titel: "Erfahrung aus Praxis und unterschiedlichen Unternehmensstrukturen",
    text: "Meine Erfahrung habe ich in Unternehmen, im Umfeld einer Steuerkanzlei und in der selbstständigen Betreuung laufender Geschäftsvorgänge gesammelt. Dadurch kann ich mich schnell in bestehende Abläufe einarbeiten.",
  },
  {
    Icon: Check,
    titel: "Genauigkeit mit Blick fürs Wesentliche",
    text: "Wenn ein Vorgang nicht eindeutig ist, wird er nicht einfach irgendwie erfasst. Ich frage nach, dokumentiere offene Punkte und sorge für nachvollziehbare Abläufe.",
  },
  {
    Icon: Person,
    titel: "Persönlich statt anonym",
    text: "Sie sprechen direkt mit mir. Keine wechselnden Ansprechpartner, keine anonyme Ticketbearbeitung und kurze Kommunikationswege.",
  },
  {
    Icon: Users,
    titel: "Bewusst klare Kapazitäten",
    text: "Ich arbeite bewusst mit klaren Kapazitäten, damit persönliche Betreuung, zuverlässige Bearbeitung und ein gleichbleibender Qualitätsanspruch gewährleistet bleiben.",
  },
  {
    Icon: Globus,
    titel: "Digitale Arbeitsweise",
    text: "Erfahrung unter anderem mit DATEV, Lexware, Agenda, Stotax und Monitor ERP. Wenn Sie ein anderes System nutzen, prüfen wir gemeinsam, ob und wie sich eine Zusammenarbeit sinnvoll umsetzen lässt.",
  },
];

export default function TrustUeberMich() {
  return (
    <section
      id="ueber-mich"
      className="relative border-t border-primary/10 bg-white py-24 lg:py-32"
    >
      <Rail tone="light" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* Band 1: Person */}
        <div className="lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
          <div className="lg:pr-10 lg:text-right">
            <p className="text-[11px] font-medium tracking-[0.2em] text-secondary uppercase">
              Über mich
            </p>

            {/* Porträt, 4:5, aus dem Original (2:3) mit Gesicht im oberen Drittel
                zugeschnitten. */}
            <Image
              src={portrait}
              alt="Elena Fieder, Bilanzbuchhalterin (IHK), am Laptop"
              placeholder="blur"
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="mt-8 aspect-[4/5] w-full rounded-lg object-cover"
            />
          </div>

          <div className="mt-10 lg:mt-0 lg:pl-10">
            <Reveal>
              <h2 className="font-headline text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-primary">
                Zahlen brauchen Genauigkeit. Zusammenarbeit braucht Vertrauen.
              </h2>

              <div className="mt-8 max-w-[42rem] space-y-5 text-[17px] leading-[1.7] text-text">
                <p>
                  Ich bin Elena Fieder, Bilanzbuchhalterin (IHK), und arbeite
                  seit über 10 Jahren im kaufmännischen Rechnungswesen. Mein
                  Anspruch ist, dass vereinbarte Aufgaben nicht nur erledigt
                  werden, sondern strukturiert, nachvollziehbar und zuverlässig
                  funktionieren.
                </p>
                <p>
                  Ich arbeite sorgfältig, persönlich und lösungsorientiert
                  innerhalb meines Leistungsbereichs. Offene Fragen lasse ich
                  nicht liegen: Fehlende Informationen werden angefragt,
                  Vorgänge nachvollziehbar dokumentiert und Abläufe so einfach
                  wie möglich gestaltet.
                </p>
                <p>
                  Langfristige Zusammenarbeit ist mir wichtiger als möglichst
                  viele Mandate. Qualität, Vertrauen und Verlässlichkeit stehen
                  für mich an erster Stelle.
                </p>
                <p className="border-l-2 border-gold-tief pl-4 font-headline text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.35] tracking-[-0.01em] text-primary">
                  Für mich sind zuverlässige Zahlen und klare Abläufe
                  Vertrauenssache.
                </p>
              </div>
            </Reveal>

            <div className="mt-12">
              <p className="text-[11px] font-medium tracking-[0.2em] text-secondary uppercase">
                Warum mit mir?
              </p>
              <h3 className="mt-3 font-headline text-[1.1rem] leading-[1.3] tracking-[-0.015em] text-primary lg:text-[1.25rem]">
                Fachliche Kompetenz. Persönliche Betreuung. Verlässliche
                Zusammenarbeit.
              </h3>
            </div>

            <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {PUNKTE.map(({ Icon, titel, text }, i) => (
                <li key={titel}>
                  <Reveal className="flex gap-4" delay={(i % 2) * 0.06} y={12}>
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/10 bg-brand-hell text-primary">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="block text-[15px] leading-[1.35] font-medium text-primary">
                        {titel}
                      </span>
                      <span className="mt-1.5 block text-[14px] leading-[1.5] text-secondary">
                        {text}
                      </span>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Band 2: die Stimmen, ueber die ganze Breite */}
        <Testimonials />
      </div>
    </section>
  );
}
