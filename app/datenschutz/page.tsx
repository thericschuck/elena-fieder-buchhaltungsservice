import type { Metadata } from "next";
import RechtstextSeite from "../components/RechtstextSeite";
import { FIRMA } from "../lib/firma";

/*
  Stammdaten kommen aus app/lib/firma.ts - hier nichts hart eintragen.

  NOCH ZU KLAEREN: Hosting-Anbieter samt Anschrift und Log-Speicherdauer
  (Ziffer 3). Ein falsch benannter Auftragsverarbeiter ist ein echter
  Datenschutzverstoss, deshalb bewusst nicht geraten.

  Diese Erklaerung beschreibt bewusst nur, was die Seite tatsaechlich tut.
  Nachgemessen im Browser: keine Cookies, kein Local/Session Storage, keine
  einzige Verbindung zu einem Fremd-Host. Schriftarten werden ueber next/font
  selbst ausgeliefert. Wird spaeter irgendetwas eingebaut, das Daten Dritter
  laedt (Karte, Video, Analyse, Buchungstool), muss dieser Text erweitert und
  eventuell eine Einwilligungsloesung ergaenzt werden.
*/

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten nach Art. 13 DSGVO.",
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzSeite() {
  return (
    <RechtstextSeite
      titel="Datenschutzerklärung"
      stand={FIRMA.standRechtstexte}
    >
      <p>
        Der Schutz Ihrer personenbezogenen Daten ist mir wichtig. Nachfolgend
        informiere ich Sie gemäß Art. 13 der Datenschutz-Grundverordnung (DSGVO)
        darüber, welche Daten beim Besuch dieser Website und bei einer
        Kontaktaufnahme verarbeitet werden, zu welchem Zweck und auf welcher
        Rechtsgrundlage.
      </p>

      <h2>1. Verantwortliche</h2>
      <div className="block">
        <p>
          {FIRMA.inhaberin} – {FIRMA.name}
          <br />
          {FIRMA.strasse}
          <br />
          {FIRMA.plz} {FIRMA.ort}
          <br />
          {FIRMA.land}
          <br />
          E-Mail: <a href={`mailto:${FIRMA.email}`}>{FIRMA.email}</a>
        </p>
      </div>

      <h2>2. Datenschutzbeauftragte oder Datenschutzbeauftragter</h2>
      <p>
        Eine Datenschutzbeauftragte oder ein Datenschutzbeauftragter ist nicht
        bestellt. Die gesetzlichen Voraussetzungen für eine Bestellungspflicht
        nach Art. 37 DSGVO in Verbindung mit § 38 BDSG liegen nicht vor.
      </p>

      <h2>3. Aufruf der Website und Server-Logfiles</h2>
      <p>
        Beim Aufruf dieser Website übermittelt Ihr Browser technisch notwendige
        Daten, die vom Hosting-Anbieter in Server-Logfiles gespeichert werden.
        Erfasst werden dabei:
      </p>
      <ul>
        <li>die aufgerufene Adresse und die übertragene Datenmenge</li>
        <li>Datum und Uhrzeit des Abrufs</li>
        <li>der verwendete Browser samt Version und das Betriebssystem</li>
        <li>die verweisende Seite, sofern Ihr Browser eine übermittelt</li>
        <li>Ihre IP-Adresse</li>
      </ul>
      <p>
        <strong>Zweck:</strong> Bereitstellung der Website, Sicherstellung des
        technischen Betriebs sowie Erkennung und Abwehr von Angriffen.
        <br />
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO. Mein
        berechtigtes Interesse liegt im sicheren und störungsfreien Betrieb der
        Website.
        <br />
        <strong>Speicherdauer:</strong> Die Zugriffsprotokolle werden nur
        kurzfristig gespeichert – je nach Tarif zwischen einer Stunde und
        längstens 30 Tagen – und danach gelöscht. Eine Zusammenführung dieser
        Daten mit anderen Datenquellen findet nicht statt.
      </p>

      <h3>Hosting</h3>
      <p>
        Diese Website wird bei Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA, betrieben. Vercel verarbeitet die oben genannten Daten
        ausschließlich in meinem Auftrag. Über einen Vertrag zur
        Auftragsverarbeitung nach Art. 28 DSGVO ist sichergestellt, dass die
        Verarbeitung weisungsgebunden und im Einklang mit der DSGVO erfolgt.
      </p>
      <p>
        Die Auslieferung der Website erfolgt über das weltweite Servernetz von
        Vercel. Dabei kann eine Übermittlung personenbezogener Daten –
        insbesondere Ihrer IP-Adresse – in die USA erfolgen. Vercel Inc. ist
        nach dem EU-US Data Privacy Framework zertifiziert, sodass die
        Übermittlung auf dem Angemessenheitsbeschluss der Europäischen
        Kommission nach Art. 45 DSGVO beruht. Ergänzend sind die
        Standarddatenschutzklauseln der Europäischen Kommission nach Art. 46
        Abs. 2 lit. c DSGVO Bestandteil des Auftragsverarbeitungsvertrags.
        Trotz dieser Garantien lässt sich nicht vollständig ausschließen, dass
        US-Behörden auf Grundlage dortiger Gesetze Zugriff auf Daten verlangen.
      </p>

      <h2>4. Cookies und Zugriff auf Ihr Endgerät</h2>
      <p>
        <strong>
          Diese Website setzt keine Cookies und speichert keine Informationen in
          Ihrem Browser.
        </strong>{" "}
        Es findet kein Zugriff auf Ihr Endgerät statt, der nach § 25 des
        Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes (TDDDG) einer
        Einwilligung bedürfte. Ein Einwilligungsbanner ist deshalb nicht
        erforderlich.
      </p>

      <h2>5. Schriftarten und Inhalte Dritter</h2>
      <p>
        Die verwendeten Schriftarten werden von diesem Server ausgeliefert und
        nicht von einem externen Dienst nachgeladen. Beim Aufruf dieser Website
        wird deshalb <strong>keine Verbindung zu Google Fonts</strong> oder
        einem anderen Anbieter von Schriftarten aufgebaut und keine IP-Adresse
        an Dritte übermittelt.
      </p>
      <p>
        Diese Website bindet keine Karten, Videos, Social-Media-Plugins,
        Schaltflächen externer Netzwerke, Chat-Werkzeuge oder Schriftdienste
        Dritter ein.
      </p>

      <h2>6. Keine Analyse und kein Tracking</h2>
      <p>
        Es werden keine Werkzeuge zur Reichweitenmessung, Webanalyse oder
        Nutzerverfolgung eingesetzt. Es findet kein Profiling statt, und es
        werden keine Daten zu Werbezwecken verarbeitet.
      </p>

      <h2>7. Kontaktformular</h2>
      <p>
        Wenn Sie das Kontaktformular nutzen, verarbeite ich die von Ihnen
        eingegebenen Angaben:
      </p>
      <ul>
        <li>Name (Pflichtangabe, um Sie ansprechen zu können)</li>
        <li>E-Mail-Adresse (Pflichtangabe, um antworten zu können)</li>
        <li>Telefonnummer (freiwillig)</li>
        <li>Ihre Anmerkung (freiwillig)</li>
      </ul>
      <p>
        <strong>Zweck:</strong> Bearbeitung Ihrer Anfrage und Vorbereitung eines
        möglichen Erstgesprächs.
        <br />
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO, soweit die
        Anfrage auf den Abschluss oder die Anbahnung eines Vertrags gerichtet
        ist; im Übrigen Art. 6 Abs. 1 lit. f DSGVO aufgrund meines berechtigten
        Interesses an der Beantwortung von Anfragen. Die Bestätigung im Formular
        dient der Kenntnisnahme dieser Datenschutzerklärung und ist keine
        gesonderte Einwilligung.
        <br />
        <strong>Speicherdauer:</strong> Ihre Angaben werden gelöscht, sobald die
        Anfrage abschließend bearbeitet ist und keine gesetzlichen
        Aufbewahrungspflichten entgegenstehen. Entsteht aus der Anfrage ein
        Auftrag, gelten die Fristen unter Ziffer 9.
      </p>

      <h3>Versand der Formularnachricht</h3>
      <p>
        Für den technischen Versand der Formularnachricht an mein Postfach nutze
        ich den Dienst Resend der Resend, Inc., 2261 Market Street #5039, San
        Francisco, CA 94114, USA. Resend verarbeitet die von Ihnen übermittelten
        Angaben ausschließlich in meinem Auftrag auf Grundlage eines Vertrags
        zur Auftragsverarbeitung nach Art. 28 DSGVO.
      </p>
      <p>
        Dabei findet eine Übermittlung in die USA statt. Resend ist nach dem
        EU-US Data Privacy Framework zertifiziert, sodass die Übermittlung auf
        dem Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45
        DSGVO beruht. Ergänzend sind die Standarddatenschutzklauseln der
        Europäischen Kommission nach Art. 46 Abs. 2 lit. c DSGVO vereinbart.
        Trotz dieser Garantien lässt sich nicht vollständig ausschließen, dass
        US-Behörden auf Grundlage dortiger Gesetze Zugriff auf Daten verlangen.
      </p>
      <p>
        Wenn Sie das vermeiden möchten, können Sie mich ohne Nutzung des
        Formulars direkt per E-Mail erreichen. Die Kontaktdaten
        finden Sie unter Ziffer 1.
      </p>

      <h2>8. Kontaktaufnahme per E-Mail</h2>
      <p>
        Wenn Sie mich per E-Mail kontaktieren, verarbeite ich Ihre
        Angaben zur Bearbeitung Ihres Anliegens. Rechtsgrundlage ist Art. 6
        Abs. 1 lit. b DSGVO bei vertragsbezogenen Anfragen, im Übrigen Art. 6
        Abs. 1 lit. f DSGVO. Bitte beachten Sie, dass unverschlüsselte E-Mails
        auf dem Übertragungsweg von Dritten mitgelesen werden können.
      </p>

      <h2>9. Speicherdauer und gesetzliche Aufbewahrungspflichten</h2>
      <p>
        Personenbezogene Daten werden gelöscht, sobald der Zweck ihrer
        Verarbeitung entfällt. Davon ausgenommen sind Daten, für die gesetzliche
        Aufbewahrungspflichten bestehen – insbesondere nach § 147 der
        Abgabenordnung und § 257 des Handelsgesetzbuchs. Diese Fristen betragen
        je nach Unterlage sechs oder zehn Jahre. Solange eine solche Pflicht
        besteht, werden die betroffenen Daten für andere Zwecke gesperrt.
      </p>

      <h2>10. Empfänger Ihrer Daten</h2>
      <p>Ihre Daten erhalten ausschließlich:</p>
      <ul>
        <li>
          der unter Ziffer 3 genannte Hosting-Anbieter als Auftragsverarbeiter
        </li>
        <li>
          der unter Ziffer 7 genannte Versanddienstleister als
          Auftragsverarbeiter
        </li>
        <li>
          Behörden, soweit eine gesetzliche Verpflichtung zur Übermittlung
          besteht
        </li>
      </ul>
      <p>
        Eine Weitergabe zu Werbezwecken oder ein Verkauf von Daten findet nicht
        statt.
      </p>

      <h2>11. Keine automatisierte Entscheidungsfindung</h2>
      <p>
        Eine automatisierte Entscheidungsfindung einschließlich Profiling im
        Sinne von Art. 22 DSGVO findet nicht statt.
      </p>

      <h2>12. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über die zu Ihrer Person verarbeiteten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
      </ul>
      <p>
        Soweit eine Verarbeitung auf einer Einwilligung beruht, können Sie diese
        jederzeit ohne Angabe von Gründen mit Wirkung für die Zukunft
        widerrufen (Art. 7 Abs. 3 DSGVO). Für die Ausübung Ihrer Rechte genügt
        eine Nachricht an die unter Ziffer 1 genannten Kontaktdaten.
      </p>

      <h3>Widerspruchsrecht</h3>
      <p>
        Verarbeite ich Ihre Daten auf Grundlage eines berechtigten Interesses
        nach Art. 6 Abs. 1 lit. f DSGVO, können Sie dieser Verarbeitung
        widersprechen, sofern Gründe vorliegen, die sich aus Ihrer besonderen
        Situation ergeben. Ich verarbeite die Daten dann nicht mehr, es sei
        denn, es liegen zwingende schutzwürdige Gründe vor, die Ihre Interessen
        überwiegen.
      </p>

      <h2>13. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über
        die Verarbeitung Ihrer Daten zu beschweren (Art. 77 DSGVO). Zuständig
        ist die Behörde des Bundeslandes, in dem ich meinen Sitz habe – für
        {" "}
        {FIRMA.ort} ({FIRMA.region}) ist das:
      </p>
      <div className="block">
        <p>
          Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)
          <br />
          91522 Ansbach
          <br />
          <a
            href="https://www.lda.bayern.de"
            rel="noopener noreferrer"
            target="_blank"
          >
            www.lda.bayern.de
          </a>
        </p>
      </div>

      <h2>14. Datensicherheit</h2>
      <p>
        Diese Website wird ausschließlich verschlüsselt über HTTPS ausgeliefert.
        Ihre Formulareingaben werden dadurch auf dem Übertragungsweg gegen
        Mitlesen geschützt. Zusätzlich treffe ich technische und
        organisatorische Maßnahmen, um Ihre Daten gegen Verlust, Zerstörung und
        unbefugten Zugriff zu sichern.
      </p>

      <h2>15. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Ich passe diese Erklärung an, wenn sich die Rechtslage oder die
        Verarbeitung auf dieser Website ändert – etwa weil neue Funktionen
        hinzukommen. Für Ihren Besuch gilt jeweils die hier veröffentlichte
        Fassung. Der Stand ist am Anfang dieser Seite angegeben.
      </p>
    </RechtstextSeite>
  );
}
