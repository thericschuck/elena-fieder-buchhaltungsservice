/**
 * Häufige Fragen – einzige Quelle für die sichtbare Section und für das
 * FAQPage-Markup in StrukturierteDaten.tsx.
 *
 * Bewusst nur ein Feld pro Antwort und kein zweiter, "schoenerer" Text fuers
 * Layout: Googles Richtlinien verlangen, dass die ausgezeichnete Antwort
 * woertlich der sichtbaren entspricht. Zwei Fassungen wuerden genau das
 * verletzen, sobald jemand eine davon anfasst.
 *
 * Jede Antwort ist aus den Unterlagen belegt (Leistungsdokument bzw.
 * Strategiegespraech). Nichts hinzuerfinden - insbesondere keine Preise und
 * keine Leistungen, die nach § 6 StBerG nicht angeboten werden duerfen.
 */
export const FRAGEN = [
  {
    frage: "Was kostet das Erstgespräch?",
    antwortKlartext:
      "Nichts. Wir telefonieren rund 20 Minuten, Sie erzählen, wie Ihre Buchhaltung heute läuft, und ich sage Ihnen, was ich übernehmen kann. Das Gespräch ist kostenlos und unverbindlich, es wird nichts unterschrieben.",
  },
  {
    frage: "Was kostet die laufende Buchhaltung?",
    antwortKlartext:
      "Das hängt davon ab, wie viele Belege anfallen und was Sie abgeben möchten. Deshalb gibt es hier keine Pauschale: Nach dem Erstgespräch kenne ich den Umfang und mache Ihnen ein Angebot, das Sie prüfen können.",
  },
  {
    frage: "Übernehmen Sie auch Jahresabschluss und Steuererklärung?",
    antwortKlartext:
      "Nein. Jahresabschlüsse, Bilanzen, Steuererklärungen und steuerliche Beratung sind nach § 6 Steuerberatungsgesetz Steuerberatern vorbehalten und bleiben bei Ihrem Steuerberater. Bearbeitet habe ich diese Bereiche im Angestelltenverhältnis unter Aufsicht eines Steuerberaters – deshalb weiß ich, was er am Jahresende braucht, und buche das ganze Jahr über entsprechend vor.",
  },
  {
    frage: "Mit welcher Software arbeiten Sie?",
    antwortKlartext:
      "Mit DATEV, Lexware, Storetax, Monitor ERP und Agenda. Wenn Sie mit einem anderen Programm arbeiten, arbeite ich mich ein.",
  },
  {
    frage: "Arbeiten Sie nur in Obernburg und Umgebung?",
    antwortKlartext:
      "Der Sitz ist Obernburg am Main. Gearbeitet wird deutschlandweit digital – für die laufende Buchhaltung ist es unerheblich, wo Ihr Unternehmen sitzt.",
  },
  {
    frage: "Wie kommen meine Belege zu Ihnen?",
    antwortKlartext:
      "Digital, wenn es geht. Wie genau, legen wir bei der Einrichtung gemeinsam fest – so einfach wie möglich und so, dass es in Ihren Arbeitsalltag passt.",
  },
  {
    frage: "Für welche Branchen arbeiten Sie?",
    antwortKlartext:
      "Baubranche, Handwerk, Handel, Industrie, Dienstleistung und Freiberufler. In diesen Bereichen habe ich gebucht. Steht Ihre Branche nicht dabei, fragen Sie trotzdem – meistens passt es.",
  },
  {
    frage: "Wie schnell bekomme ich eine Antwort?",
    antwortKlartext:
      "In der Regel am selben Werktag. Kurze Kommunikationswege sind mir wichtig: Wenn bei einem Beleg etwas unklar ist, rufe ich an, statt es irgendwie zu buchen.",
  },
] as const;
