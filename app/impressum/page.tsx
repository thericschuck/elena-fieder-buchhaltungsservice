import type { Metadata } from "next";
import RechtstextSeite from "../components/RechtstextSeite";
import { ANSCHRIFT_EINZEILIG, FIRMA } from "../lib/firma";

/*
  Stammdaten kommen aus app/lib/firma.ts - hier nichts hart eintragen.

  Rechtsgrundlage der Pflichtangaben: § 5 DDG (seit Mai 2024; ersetzt § 5 TMG –
  eine Nennung des TMG waere heute selbst abmahnfaehig), erweitert um die
  Informationspflichten fuer Dienstleister aus § 2 DL-InfoV.

  BEWUSST NOCH NICHT ENTHALTEN (Stand 30.10.2026) - ab 01.01.2027 nachtragen,
  sobald die Unterlagen vorliegen:
  1. Umsatzsteuer - USt-IdNr. (§ 27a UStG) oder Hinweis nach § 19 UStG. Eine
     falsche Angabe ist abmahnfaehig, deshalb nichts raten.
  2. Berufshaftpflichtversicherung nach § 2 Abs. 1 Nr. 11 DL-InfoV (Versicherer,
     Anschrift, raeumlicher Geltungsbereich) - nur Pflicht, wenn eine besteht.
*/

export const metadata: Metadata = {
  title: "Impressum",
  description: `Anbieterkennzeichnung nach § 5 DDG für ${FIRMA.name}, ${FIRMA.ort}.`,
  alternates: { canonical: "/impressum" },
};

export default function ImpressumSeite() {
  return (
    <RechtstextSeite titel="Impressum" stand={FIRMA.standRechtstexte}>
      <h2>Angaben gemäß § 5 DDG</h2>
      <div className="block">
        <p>
          {FIRMA.name}
          <br />
          Inhaberin: {FIRMA.inhaberin}
          <br />
          {FIRMA.strasse}
          <br />
          {FIRMA.plz} {FIRMA.ort}
          <br />
          {FIRMA.land}
        </p>
      </div>

      <h2>Kontakt</h2>
      <div className="block">
        <p>
          E-Mail: <a href={`mailto:${FIRMA.email}`}>{FIRMA.email}</a>
          <br />
          Website: <a href={FIRMA.url}>{FIRMA.domain}</a>
        </p>
      </div>

      <h2>Berufsbezeichnung und berufsrechtliche Angaben</h2>
      <p>
        Berufsbezeichnung: Bilanzbuchhalterin (IHK) – Bachelor Professional
        in Bilanzbuchhaltung
        <br />
        Verliehen in: Deutschland
      </p>
      <p>
        Es besteht keine Zugehörigkeit zu einer Berufskammer und es ist keine
        behördliche Zulassung für die angebotenen Leistungen erforderlich.
      </p>
      <p>
        <strong>
          * Die Tätigkeit beschränkt sich auf Hilfeleistungen in Steuersachen im
          Rahmen von § 6 Nr. 3 und Nr. 4 Steuerberatungsgesetz (StBerG).
        </strong>{" "}
        Im Bereich Buchhaltung werden nur das Buchen der laufenden
        Geschäftsvorfälle und die Belegverarbeitung angeboten. Nicht angeboten werden
        Leistungen, die Steuerberaterinnen und Steuerberatern vorbehalten sind –
        insbesondere steuerliche Beratung, die Erstellung von Jahresabschlüssen
        und Bilanzen sowie die Anfertigung von Steuererklärungen.
      </p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        {FIRMA.inhaberin}, {ANSCHRIFT_EINZEILIG}
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Es besteht keine Bereitschaft und keine Verpflichtung zur Teilnahme an
        einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        (§ 36 Verbraucherstreitbeilegungsgesetz).
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Anbieterin dieses digitalen Dienstes bin ich gemäß § 7 Abs. 1 DDG
        für eigene Inhalte auf diesen Seiten verantwortlich. Nach den §§ 8 bis 10
        DDG bin ich als Anbieterin jedoch nicht verpflichtet, übermittelte oder
        gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Die Inhalte
        dieser Website wurden mit Sorgfalt erstellt, eine Gewähr für Richtigkeit,
        Vollständigkeit und Aktualität kann jedoch nicht übernommen werden. Die
        Inhalte stellen keine steuerliche oder rechtliche Beratung dar.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Diese Website enthält gegebenenfalls Links zu externen Websites Dritter,
        auf deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte
        kann ich keine Gewähr übernehmen; verantwortlich ist stets der jeweilige
        Anbieter oder Betreiber. Verlinkte Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft, rechtswidrige Inhalte
        waren nicht erkennbar. Eine permanente inhaltliche Kontrolle ist ohne
        konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
        Bekanntwerden von Rechtsverstößen werden entsprechende Links entfernt.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die auf dieser Website erstellten Inhalte und Werke unterliegen dem
        deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und
        jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen
        der schriftlichen Zustimmung der jeweiligen Urheberin oder des jeweiligen
        Urhebers. Soweit die Inhalte nicht von mir erstellt wurden, werden die
        Urheberrechte Dritter beachtet und solche Inhalte als solche
        gekennzeichnet.
      </p>
    </RechtstextSeite>
  );
}
