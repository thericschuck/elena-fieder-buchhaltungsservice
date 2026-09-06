import Rail from "./ui/Rail";
import Reveal from "./ui/Reveal";
import Testimonials from "./Testimonials";
import { Buch, Check, Clock, Globus, Person, Urkunde } from "./ui/Icons";

/*
  Diese Section ist die Zusammenlegung von "Ueber mich" und der frueheren
  eigenen Section "Qualifikation & Berufspraxis". Beide erzaehlten dieselbe
  Sache in zwei Anlaeufen - Abschluss, Berufsjahre und Sprachen standen
  zusaetzlich noch in der Trust-Bar unter dem Hero. Jetzt steht es genau
  einmal, hier.

  Aufbau in drei Baendern, alle auf derselben Kontolinie:

    1  Soll: Portrait          Haben: Bio und die sechs Fakten
    2  Soll: Label             Haben: Berufspraxis aus dem Angestelltenverhaeltnis
    3  volle Breite            Kundenstimmen

  Die Berufspraxis stand vorher als hohe Kachel in der schmalen Soll-Spalte.
  Dort wurde sie rund 550px hoch, wodurch die linke Spalte die rechte um etwa
  450px ueberragte - der Freiraum rechts daneben war das Ergebnis. Als eigenes
  Band ueber die volle Breite passen die beiden Listen nebeneinander und das
  Band ist nur noch etwa halb so hoch.

  Rechtliche Leitplanke (§ 6 StBerG): Bilanzerstellung, Jahresabschluss und
  Steuererklaerungen sind Steuerberatern vorbehalten. Erfahrung darin darf als
  Berufspraxis aus dem Angestelltenverhaeltnis genannt werden, aber nie so
  klingen, als waere es Teil des heutigen Leistungsangebots. Der Satz in
  HINWEIS steht woertlich so im Leistungsdokument von Elena - beim Redigieren
  nicht aufweichen und nicht entfernen.

  Der Bio-Text ist Copy von Schuck Webdesign auf Basis der Antworten aus dem
  Strategiegespraech (1.1). Vor dem Live-Gang von Elena freigeben lassen -
  es spricht ihre Ich-Perspektive.
*/

const HINWEIS =
  "In diesen Bereichen habe ich im Rahmen meiner Anstellung berufliche Erfahrung gesammelt. Sie stellen kein selbstständiges Leistungsangebot dar.";

/**
 * Nachweise und Haltung in einer Liste. Die ersten vier kommen aus
 * "Qualifikation", die letzten zwei aus "Was mich ausmacht" - "Über 10 Jahre
 * Berufserfahrung" stand in beiden Abschnitten und steht deshalb nur einmal.
 */
const FAKTEN = [
  {
    Icon: Urkunde,
    titel: "Bilanzbuchhalterin (IHK)",
    zeile: "Bachelor Professional in Bilanzbuchhaltung.",
  },
  {
    Icon: Clock,
    titel: "Über 10 Jahre Berufserfahrung",
    zeile: "Angestellt und selbstständig, quer durch sechs Branchen.",
  },
  {
    Icon: Buch,
    titel: "Laufende Weiterbildung",
    zeile: "Fachwebinare zu Buchhaltung, Recht und Software.",
  },
  {
    Icon: Globus,
    titel: "Deutsch und Russisch",
    zeile: "Beratung und Korrespondenz in beiden Sprachen.",
  },
  {
    Icon: Person,
    titel: "Persönliche Betreuung",
    zeile: "Eine Ansprechpartnerin, kurze Wege, keine Ticketnummer.",
  },
  {
    Icon: Check,
    titel: "Zuverlässig und termingerecht",
    zeile: "Fristen sind Fristen. Was zugesagt ist, liegt vor.",
  },
];

/*
  Bewusst Fliesstext und keine Punkteliste: neun Aufzaehlungspunkte fuer
  Taetigkeiten, die Elena gerade NICHT anbieten darf, lesen sich wie eine
  Leistungsliste - und genau diese Form ist nach § 6 StBerG und UWG
  angreifbar. Alle Fachbegriffe aus dem Leistungsdokument sind erhalten.
  Bitte nicht in <ul> zurueckbauen.
*/
const BERUFSPRAXIS = [
  {
    bereich: "Jahresabschluss",
    punkte:
      "Einnahmen-/Überschussrechnung, Bilanzen und Steuererklärungen.",
  },
  {
    bereich: "Finanzbuchhaltung",
    punkte:
      "Allgemeine Buchhaltung, Offene-Posten-Buchhaltung, Kostenrechnung, digitales Belegbuchen, Anlagenbuchhaltung und BWA.",
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

            {/*
              PLATZHALTER – Porträtslot.

              Hier gehoert ein echtes Foto von Elena Fieder hin. Bewusst als
              leerer Rahmen und nicht mit einem Stockfoto belegt: ein fremdes
              Gesicht oder ein Schreibtischfoto an dieser Stelle waere
              schlechter als eine sichtbare Luecke. Die Bildunterschrift, die
              das erklaert hat, ist auf Wunsch entfernt - erkennbar bleibt es
              am gestrichelten Rahmen und der kleinen Marke im Bild.

              Zum Einsetzen: den Rahmen unten durch
                <Image src={portrait} alt="Elena Fieder" placeholder="blur"
                       sizes="(min-width: 1024px) 30vw, 100vw"
                       className="aspect-[4/5] w-full rounded-lg object-cover" />
              ersetzen und next/image oben importieren. Hochformat 4:5,
              mindestens 800 x 1000 px.
            */}
            <div className="mt-8 flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-brand-kante bg-brand-hell">
              <Person className="h-9 w-9 text-primary/35" />
              <span className="text-[13px] font-medium tracking-[0.14em] text-secondary uppercase">
                Porträt folgt
              </span>
            </div>
          </div>

          <div className="mt-10 lg:mt-0 lg:pl-10">
            <Reveal>
              <h2 className="font-headline text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-primary">
                Elena Fieder, Bilanzbuchhalterin (IHK).
              </h2>
              <p className="mt-3 text-[15px] leading-[1.5] text-secondary">
                Buchhaltungsservice in Obernburg am Main · deutschlandweit
                digital
              </p>

              <div className="mt-8 max-w-[42rem] space-y-5 text-[17px] leading-[1.7] text-text">
                <p>
                  Seit über zehn Jahren mache ich Buchhaltung – gerne und genau.
                  Nicht, weil Genauigkeit Selbstzweck wäre, sondern weil jede
                  Zahl, die von Anfang an stimmt, Ihnen später eine Rückfrage
                  erspart.
                </p>
                <p>
                  Wenn mir etwas unklar ist, schiebe ich es nicht weg und buche
                  es auch nicht irgendwie. Ich rufe an, kläre es und suche eine
                  Lösung. Denn mir reicht es nicht, dass Ihre Buchhaltung formal
                  stimmt – sie soll Ihnen auch etwas bringen. Was vollständig
                  und richtig gebucht ist, kann Ihr Steuerberater am Jahresende
                  auch geltend machen.
                </p>
                <p>
                  Am liebsten arbeite ich langfristig. Zwei der Mandanten, die
                  unten zu Wort kommen, sind seit rund zwei Jahren dabei – und
                  das ist mir lieber als ein einmaliger Auftrag.
                </p>
              </div>
            </Reveal>

            <ul className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {FAKTEN.map(({ Icon, titel, zeile }, i) => (
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
                        {zeile}
                      </span>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Band 2: Berufspraxis. Ausdruecklich kein Angebot - deshalb steht
            der Hinweis vor den Begriffen und nicht als Fussnote darunter. */}
        <div className="mt-16 border-t border-primary/10 pt-10 lg:mt-20 lg:grid lg:grid-cols-[var(--rail-x)_1fr] lg:pt-12">
          <div className="lg:pr-10 lg:text-right">
            <p className="text-[11px] font-medium tracking-[0.2em] text-secondary uppercase">
              Berufspraxis
            </p>
            <h3 className="mt-4 font-headline text-[1.1rem] leading-[1.3] tracking-[-0.015em] text-primary lg:text-[1.25rem]">
              Fachliche Erfahrung im Angestelltenverhältnis
            </h3>
          </div>

          <Reveal className="mt-6 lg:mt-0 lg:pl-10">
            <p className="max-w-[42rem] border-l-2 border-gold-tief pl-4 text-[15px] leading-[1.6] text-text">
              {HINWEIS}
            </p>

            <dl className="mt-8 flex max-w-[42rem] flex-col gap-5">
              {BERUFSPRAXIS.map(({ bereich, punkte }) => (
                <div key={bereich} className="sm:flex sm:gap-5">
                  <dt className="shrink-0 pt-0.5 text-[11px] font-medium tracking-[0.16em] text-secondary uppercase sm:w-40 sm:text-right">
                    {bereich}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-[1.6] text-text sm:mt-0">
                    {punkte}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 max-w-[42rem] text-sm leading-[1.6] text-secondary">
              Diese Erfahrung hilft Ihnen trotzdem: Ich weiß, was Ihr
              Steuerberater am Jahresende braucht, und buche das ganze Jahr über
              entsprechend vor.
            </p>
          </Reveal>
        </div>

        {/* Band 3: die Stimmen, ueber die ganze Breite */}
        <Testimonials />
      </div>
    </section>
  );
}
