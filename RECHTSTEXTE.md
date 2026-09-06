# Impressum und Datenschutz — Stand, Recherche, offene Punkte

`/impressum` und `/datenschutz` sind als statische Seiten gebaut und aus dem
Footer verlinkt. Beide sind **Entwürfe**: alles in `[eckigen Klammern]` muss
Elena liefern, und der fertige Text sollte vor dem Live-Gang von einem
Fachanwalt für IT-Recht oder einem Generator mit Haftungsübernahme
(e-recht24, IT-Recht Kanzlei, Trusted Shops) gegengelesen werden. Ich kann
Struktur und Rechtsgrundlagen liefern, aber keine Haftung.

---

## Was Elena liefern muss

### Für das Impressum
- [ ] Vollständiger Name, ggf. mit Rechtsform (Einzelunternehmen / GbR / UG …)
- [ ] **Ladungsfähige Anschrift** — ein Postfach genügt nicht. Bei Tätigkeit aus
      der Wohnung muss die Wohnadresse rein.
- [ ] Telefonnummer und E-Mail-Adresse
- [ ] USt-IdNr. nach § 27a UStG **oder** Hinweis auf § 19 UStG (Kleinunternehmer)
- [ ] Genaue Berufsbezeichnung, die sie führt
- [ ] **Berufshaftpflichtversicherung**: Versicherer, Anschrift, räumlicher
      Geltungsbereich — das ist Pflicht nach § 2 Abs. 1 Nr. 11 DL-InfoV und wird
      fast immer vergessen
- [ ] Ist sie im Handelsregister eingetragen? Falls ja: Registergericht und
      Nummer ergänzen. Falls nein: entfällt.

### Für die Datenschutzerklärung
- [ ] **Hosting-Anbieter**: Name, vollständige Anschrift, Speicherdauer der
      Logfiles, und ein **unterschriebener AVV nach Art. 28 DSGVO**
- [ ] Zuständige Landesdatenschutzbehörde nach Sitz. Für einen Sitz in Hessen
      ist es der Hessische Beauftragte für Datenschutz und Informationsfreiheit;
      bitte nach der tatsächlichen Anschrift richten.
- [ ] **AVV mit Resend** abschließen, bevor das Formular live geht
- [ ] Gibt sie Daten an ihren eigenen Steuerberater weiter? Dann in Ziffer 10
      konkret benennen.

---

## Was ich recherchiert und geprüft habe

### Gesetzesnamen: hier veralten Vorlagen
- **§ 5 DDG** statt § 5 TMG. Das Digitale-Dienste-Gesetz hat das Telemediengesetz
  im Mai 2024 ersetzt. Inhaltlich ändert sich fast nichts, aber die Nennung eines
  nicht mehr existierenden Gesetzes ist selbst ein Abmahnrisiko.
- **§ 25 TDDDG** statt § 25 TTDSG. Gleiche Umstellung.
- **Kein Link zur EU-Plattform für Online-Streitbeilegung.** Die OS-Plattform
  wurde zum 20. Juli 2025 abgeschaltet, die ODR-Verordnung durch die Verordnung
  (EU) 2024/3228 aufgehoben. Wer den Hinweis noch stehen lässt, riskiert jetzt
  dafür eine Abmahnung. Steht deshalb bewusst **nicht** drin — auch wenn fast
  jede Vorlage im Netz ihn noch enthält.

### Verbraucherstreitbeilegung
Betriebe mit zehn oder weniger Beschäftigten sind von der Informationspflicht
nach § 36 Abs. 1 Nr. 1 VSBG ausgenommen. Die Pflicht aus Nr. 2 bleibt. Im
Impressum steht deshalb die Standardaussage, dass keine Bereitschaft und keine
Verpflichtung zur Teilnahme besteht.

### Was die Seite technisch tatsächlich tut — nachgemessen
Ich habe die gebaute Seite in einem echten Chrome geladen, durchgescrollt und
mitgeschnitten. Ergebnis:

| Geprüft | Ergebnis |
|---|---|
| Cookies | **keine** |
| localStorage / sessionStorage | **leer** |
| Verbindungen zu Fremd-Hosts | **keine** |
| Google Fonts | keine Verbindung — die Schriften liefert der eigene Server (`next/font`) |

**Daraus folgt: kein Einwilligungsbanner nötig.** § 25 TDDDG greift nur, wenn
auf das Endgerät zugegriffen wird. Das ist hier nicht der Fall. Die
Datenschutzerklärung sagt das ausdrücklich, statt sich hinter Floskeln zu
verstecken.

⚠️ Sobald etwas eingebaut wird, das Daten Dritter lädt — Google Maps, ein
eingebettetes Video, ein Buchungstool, Analyse, ein Chat-Widget — gilt das nicht
mehr. Dann muss die Erklärung erweitert und in der Regel eine
Einwilligungslösung ergänzt werden.

### Resend und die USA
Resend ist nach dem EU-US Data Privacy Framework zertifiziert, die Übermittlung
stützt sich damit auf den Angemessenheitsbeschluss nach Art. 45 DSGVO; ergänzend
sind Standarddatenschutzklauseln nach Art. 46 vereinbart. Beides steht in der
Erklärung. Der AVV muss trotzdem aktiv abgeschlossen werden — die Zertifizierung
allein ersetzt ihn nicht.

---

## Zwei Entscheidungen, die du kennen solltest

### 1. Die Checkbox ist jetzt Kenntnisnahme, nicht Einwilligung
Vorher stand da „… und bin mit der Verarbeitung meiner Angaben einverstanden".
Jetzt steht da nur noch „Ich habe die Datenschutzerklärung gelesen."

Grund: Eine Kontaktanfrage zur Vertragsanbahnung ist über
**Art. 6 Abs. 1 lit. b DSGVO** gedeckt, allgemeine Anfragen über lit. f. Eine
Einwilligung ist dafür nicht erforderlich — und eine *erzwungene* Einwilligung
als Voraussetzung fürs Absenden ist wegen des Kopplungsverbots angreifbar. Die
Kenntnisnahme-Variante ist die von Datenschutzjuristen übliche Empfehlung.

Falls der Anwalt die Einwilligungsvariante bevorzugt: Text der Checkbox zurück
auf „einverstanden" ändern **und** in der Datenschutzerklärung Ziffer 7 die
Rechtsgrundlage auf Art. 6 Abs. 1 lit. a umstellen. Beides muss zusammenpassen.

Der Link zur Datenschutzerklärung öffnet jetzt in einem neuen Tab, damit
ausgefüllte Formularfelder nicht verloren gehen.

### 2. Zwei Punkte, die inhaltlich noch geklärt werden sollten

**Umsatzsteuer-Voranmeldungen.** Nach dem Merkblatt der Finanzverwaltung ist die
Erstellung von Umsatzsteuer-Voranmeldungen von § 6 Nr. 4 StBerG **nicht**
gedeckt. Die Website bietet das nicht an — bitte im Gespräch mit Elena
sicherstellen, dass sie es auch nicht tut oder anbietet.

**Leistung 4 „Prozessoptimierung und digitale Organisation".** Ebenfalls nach
diesem Merkblatt ist das *Einrichten* der Buchführung nicht von § 6 StBerG
gedeckt. Unsere Leistung 4 beschreibt Reisekostenabrechnung, Belegübergabe und
Ablage — das ist organisatorisch und meines Erachtens etwas anderes als das
Einrichten einer Buchführung. Aber die Grenze ist unscharf, und die Formulierung
sollte mit Elena und ggf. dem Anwalt abgeglichen werden.

**Qualifikation nach § 6 Nr. 4 StBerG** verlangt eine kaufmännische
Abschlussprüfung oder gleichwertige Vorbildung plus mindestens drei Jahre
praktische Tätigkeit im Buchhaltungswesen mit mindestens 16 Wochenstunden. Mit
über zehn Jahren Erfahrung und dem IHK-Bachelor Professional ist das klar
erfüllt — nur zur Sicherheit dokumentieren.

---

## Quellen

- [§ 5 DDG, Gesetze im Internet](https://www.gesetze-im-internet.de/ddg/__5.html)
- [IHK Bonn/Rhein-Sieg: Das DDG ersetzt das TMG](https://www.ihk-bonn.de/recht-und-steuern/recht/aktuelles/das-digitale-dienste-gesetz-ersetzt-das-telemediengesetz)
- [IT-Recht Kanzlei: Löschpflicht des OS-Plattform-Hinweises zum 20.07.2025](https://www.it-recht-kanzlei.de/entfernung-informationen-os-plattform.html)
- [BRAK: Europäische Plattform für Online-Streitbeilegung wurde eingestellt](https://www.brak.de/newsroom/newsletter/nachrichten-aus-berlin/2025/ausgabe-16-2025-v-682025/europaeischen-plattform-fuer-online-streitbeilegung-wurde-eingestellt/)
- [§ 36 VSBG, Gesetze im Internet](https://www.gesetze-im-internet.de/vsbg/__36.html)
- [BfJ: Informationspflichten für Unternehmer](https://www.bundesjustizamt.de/DE/Themen/Verbraucherrechte/Verbraucherstreitbeilegung/Unternehmen/Unternehmen_node.html)
- [dr-datenschutz.de: Pflichtangaben im Impressum — DL-InfoV wird gern vergessen](https://www.dr-datenschutz.de/pflichtangaben-im-impressum-dl-infov-wird-gern-vergessen/)
- [Bayerisches Landesamt für Steuern: Merkblatt Buchführungshilfe (§ 6 StBerG)](https://www.lfst.bayern.de/fileadmin/RESSOURCEN/LfSt/Recht_zur_Steuerberatung/Merkblatt_Buchfuehrungshilfe.pdf)
- [IHK Chemnitz: Merkblatt Buchführungshilfe](https://www.ihk.de/chemnitz/recht-und-steuern/rechtsinformationen/gewerberecht/nach-branchen/dienstleister/merkblatt-buchfuehrungshilfe-4777532)
- [Resend: Data Processing Addendum](https://resend.com/legal/dpa)
- [Resend: Data Privacy Framework Certification](https://resend.com/changelog/data-privacy-framework-certification)
