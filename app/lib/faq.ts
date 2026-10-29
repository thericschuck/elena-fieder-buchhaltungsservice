/**
 * Häufige Fragen – einzige Quelle für die sichtbare Section und für das
 * FAQPage-Markup in StrukturierteDaten.tsx.
 *
 * Wortlaut aus den finalen Website-Texten ("Häufige Fragen"): fünf Fragen.
 * "Passt eine Zusammenarbeit zu Ihnen?" ist dort keine FAQ-Frage, sondern die
 * Überschrift des Kontaktblocks und steht in KontaktCTA.tsx.
 *
 * Bewusst nur ein Feld pro Antwort und kein zweiter, "schoenerer" Text fuers
 * Layout: Googles Richtlinien verlangen, dass die ausgezeichnete Antwort
 * woertlich der sichtbaren entspricht. Zwei Fassungen wuerden genau das
 * verletzen, sobald jemand eine davon anfasst.
 *
 * Nichts hinzuerfinden - insbesondere keine Preise und keine Leistungen, die
 * nach § 6 StBerG nicht angeboten werden duerfen.
 */
export const FRAGEN = [
  {
    frage: "Welche Leistungen bieten Sie an?",
    antwortKlartext:
      "Mein selbstständiges Leistungsangebot ist klar abgegrenzt. Im Bereich der Hilfeleistung in Steuersachen übernehme ich das Buchen laufender Geschäftsvorfälle. Ergänzend unterstütze ich bei organisatorischen Abläufen wie digitaler Belegübergabe, offenen Posten und der Zuordnung laufender Geschäftsvorfälle nach vereinbarten Vorgaben.",
  },
  {
    frage: "Übernehmen Sie Jahresabschlüsse, Bilanzen oder Steuererklärungen?",
    antwortKlartext:
      "Nein. Jahresabschlüsse, Bilanzen, Steuererklärungen und steuerliche Beratung gehören nicht zu meinem selbstständigen Leistungsangebot und bleiben bei Ihrem Steuerberater.",
  },
  {
    frage: "Was kostet die Zusammenarbeit?",
    antwortKlartext:
      "Der Preis richtet sich nach dem tatsächlichen Umfang der vereinbarten Leistungen und der Anzahl der laufenden Geschäftsvorfälle. Nach dem Erstgespräch erhalten Sie ein transparentes individuelles Angebot.",
  },
  {
    frage: "Wie übergebe ich meine Unterlagen?",
    antwortKlartext:
      "Möglichst digital. Zu Beginn legen wir gemeinsam einen einfachen, verlässlichen und zu Ihrem Unternehmen passenden Übergabeweg fest.",
  },
  {
    frage: "Arbeiten Sie nur regional?",
    antwortKlartext:
      "Nein. Mein Standort ist Obernburg am Main. Die Zusammenarbeit ist deutschlandweit digital möglich.",
  },
] as const;
