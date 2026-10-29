# SEO – Elena Fieder Buchhaltungsservice*

Stand 06.09.2026. Domain: `elena-fieder.de`

Dieses Dokument enthält **alle Texte, die Google und Social-Previews anzeigen**,
zum Freigeben durch Elena – plus die Liste der Punkte, die sich nicht im Code
erledigen lassen.

---

## 1. Suchergebnis bei Google (Startseite)

So sieht der Eintrag aus:

```
elena-fieder.de
Buchhaltungsservice* Obernburg am Main | Elena Fieder
Buchen laufender Geschäftsvorfälle für Bau, Handwerk und Freiberufler.
Bilanzbuchhalterin (IHK) in Obernburg am Main, deutschlandweit digital.
```

| Feld | Text | Länge |
|---|---|---|
| Title | Buchhaltungsservice* Obernburg am Main \| Elena Fieder | 52 Zeichen |
| Description | Buchen laufender Geschäftsvorfälle für Bau, Handwerk und Freiberufler. Bilanzbuchhalterin (IHK) in Obernburg am Main, deutschlandweit digital. | 142 Zeichen |

Google kappt Titles ab rund 60 Zeichen und Descriptions ab rund 160 – beides
liegt bewusst knapp darunter, damit nichts abgeschnitten wird.

**Warum dieser Title:** Suchbegriff plus Ort plus Name. „Buchhaltungsservice*
Obernburg" ist die Wortfolge, die jemand tatsächlich eintippt; der Name steht
hinten, weil ihn noch niemand kennt.

### Unterseiten

| Seite | Title |
|---|---|
| `/impressum` | Impressum \| Elena Fieder Buchhaltungsservice* |
| `/datenschutz` | Datenschutzerklärung \| Elena Fieder Buchhaltungsservice* |
| 404 | Seite nicht gefunden \| Elena Fieder Buchhaltungsservice* (noindex) |

---

## 2. Vorschau in WhatsApp, LinkedIn, Facebook

Bild: `app/opengraph-image.png`, 1200 × 630 – dunkler Block mit der Headline,
Logo oben rechts, Kontolinie bei 34 %.

| Feld | Text |
|---|---|
| og:title | Buchhaltungsservice* Obernburg am Main \| Elena Fieder |
| og:description | Buchen laufender Geschäftsvorfälle für Bau, Handwerk und Freiberufler. Bilanzbuchhalterin (IHK), über 10 Jahre Berufserfahrung, deutschlandweit digital. |
| og:image:alt | Elena Fieder Buchhaltungsservice*: Sie fragen nach Ihren Zahlen. Ich habe sie schon. Laufende Buchhaltung für Bau, Handwerk, Handel und Industrie. Bilanzbuchhalterin (IHK) in Obernburg am Main. |
| twitter:card | summary_large_image |

---

## 3. Häufige Fragen (neue Section)

Neu auf der Seite, zwischen „Über mich" und „So fangen wir an". Sie erfüllt
zwei Zwecke: sie räumt Einwände vor dem Kontaktformular aus, und sie beantwortet
Suchanfragen in Frageform.

Stand Textfassung "Finale Website-Texte": fünf Fragen, Wortlaut in
`app/lib/faq.ts` (eine Quelle für Section und FAQPage-Markup). Die frühere
Fassung mit acht Fragen (u. a. Software, Antwortzeit, Erstgespräch) ist
ersetzt.

> Achtung: `app/opengraph-image.png` (und `twitter-image.png`) enthalten noch
> den alten Text „Sie fragen nach Ihren Zahlen … Laufende Buchhaltung für Bau,
> Handwerk, Handel und Industrie“. Bild muss neu erzeugt werden; die zugehörigen
> `*.alt.txt` bleiben bis dahin bewusst unverändert, damit sie zum Bild passen.

---

## 4. Was technisch umgesetzt ist

| Maßnahme | Datei |
|---|---|
| `metadataBase`, Title-Template, Description, Canonical | `app/layout.tsx` |
| Robots-Direktiven inkl. `max-image-preview:large` | `app/layout.tsx` |
| Open Graph + Twitter Cards mit Bild und Alt-Text | `app/layout.tsx`, `app/opengraph-image.png`, `app/opengraph-image.alt.txt` |
| `robots.txt` mit Sitemap-Verweis | `app/robots.ts` |
| `sitemap.xml` (3 URLs, feste `lastmod`) | `app/sitemap.ts` |
| Web-App-Manifest, `theme-color` | `app/manifest.ts`, `app/layout.tsx` |
| Strukturierte Daten: `AccountingService`, `Person`, `FAQPage` | `app/components/StrukturierteDaten.tsx` |
| Eigene 404-Seite mit `noindex` | `app/not-found.tsx` |
| Sprungmarke „Zum Inhalt springen" | `app/layout.tsx` |
| Name, Adresse und E-Mail auf jeder Seite im `<address>` | `app/components/Footer.tsx` |
| Stammdaten als einzige Quelle | `app/lib/firma.ts` |

Überschriftengliederung geprüft: genau ein `h1`, darunter `h2` je Section,
`h3` für Einzelposten, keine übersprungene Ebene.

### Bewusst NICHT ausgezeichnet

**`aggregateRating` und `review`.** Wir haben drei echte Kundenstimmen, aber
von der Website selbst eingesammelte Bewertungen sind für Review-Snippets seit
2019 nicht mehr zulässig („self-serving reviews"). Auszeichnen würde nichts
bringen und im schlechtesten Fall eine manuelle Maßnahme auslösen. Bewertungen
gehören ins Google-Unternehmensprofil – dort zählen sie.

**`geo` (Koordinaten).** Geratene Koordinaten können das Unternehmen an einen
falschen Ort setzen. Nachtragen, sobald das Google-Unternehmensprofil steht,
und die Werte exakt von dort übernehmen.

**`openingHours`, `priceRange`.** Keine belastbaren Angaben vorhanden.

Zu FAQ-Rich-Results: Google hat sie 2023 stark eingeschränkt und zeigt sie
inzwischen fast nur noch für behördliche und medizinische Seiten. Das Markup
ist trotzdem richtig gesetzt – der eigentliche Wert der Section liegt in den
Antworten selbst und in den Frage-Suchanfragen, die sie abdecken.

---

## 5. Nicht im Code

Die Punkte mit dem größten Hebel für lokale Suche liegen außerhalb des Codes –
Google-Unternehmensprofil, Search Console, Domain-Konfiguration. Sie stehen
zusammen mit allen anderen offenen Punkten in der **Checkliste in Abschnitt 7**,
damit du nur eine Liste abarbeiten musst.

## 6. Elenas Daten – jetzt überall eingetragen

Quelle: `app/lib/firma.ts`. Nur dort ändern.

| Feld | Wert |
|---|---|
| Firma | Elena Fieder Buchhaltungsservice* |
| Inhaberin | Elena Fieder |
| Anschrift | Siegfriedstraße 75, 63785 Obernburg am Main, Deutschland |
| Telefon | bewusst keine Nummer angegeben |
| E-Mail | info@elena-fieder.de |
| Domain | elena-fieder.de |

Eingetragen in: Footer (mit `tel:`- und `mailto:`-Links), Impressum,
Datenschutzerklärung, strukturierte Daten, Sitemap, Robots, Manifest,
404-Seite, `.env.example` (Empfänger des Kontaktformulars).

Regionalbezug korrigiert: „Rhein-Main" war falsch – Obernburg am Main liegt im
Landkreis Miltenberg am Bayerischen Untermain. Steht jetzt als „Obernburg am
Main" im sichtbaren Text von Über mich, Branchen und Footer, was für lokale
Suche auch notwendig ist.

Zuständige Datenschutzbehörde ergänzt: Bayerisches Landesamt für
Datenschutzaufsicht (BayLDA), Ansbach, `www.lda.bayern.de`. Die Postanschrift
bitte von dort übernehmen – ich wollte keine Hausnummer angeben, bei der ich
nicht sicher bin.

---

## 7. Checkliste – was noch zu erledigen ist

Eine Liste, vier Gruppen. Alles, was ich nicht selbst erledigen konnte.

### A · Rechtstexte – blockiert den Live-Gang

Diese Angaben stehen im Code als `[OFFEN – …]` und sind damit auf der Seite
sichtbar. Ich habe sie nicht geraten, weil eine falsche Angabe an diesen
Stellen abmahnfähig bzw. ein Datenschutzverstoß wäre.

- [ ] **Umsatzsteuer** (Impressum): USt-IdNr. **oder** Kleinunternehmerregelung
      nach § 19 UStG? Eine der beiden Varianten wählen, die andere löschen.
      → `app/impressum/page.tsx`, Abschnitt „Umsatzsteuer"
- [ ] **Berufshaftpflichtversicherung** (Impressum): Besteht eine? Wenn ja,
      Versicherer, Anschrift und räumlicher Geltungsbereich eintragen. Wenn
      nein, **den ganzen Abschnitt löschen** – die Angabe nach § 2 Abs. 1
      Nr. 11 DL-InfoV ist nur bei bestehender Versicherung Pflicht.
      → `app/impressum/page.tsx`, Abschnitt „Berufshaftpflichtversicherung"
- [ ] **Anschrift von Vercel Inc.** (Datenschutz Ziffer 3): aus
      [vercel.com/legal/privacy-policy](https://vercel.com/legal/privacy-policy)
      übernehmen. Ich habe bewusst keine Hausnummer eingesetzt – für Vercel
      sind zwei verschiedene US-Anschriften im Umlauf, und im
      Auftragsverarbeiter-Abschnitt wäre die falsche ein echter Fehler.
- [ ] **Aufbewahrungsdauer der Zugriffsprotokolle** (Datenschutz Ziffer 3):
      ergibt sich aus dem gebuchten Vercel-Plan, steht im
      Auftragsverarbeitungsvertrag.
- [ ] **DPF-Zertifizierung von Vercel gegenprüfen.** Ich habe als
      Rechtsgrundlage den Angemessenheitsbeschluss nach Art. 45 DSGVO
      angegeben (EU-US Data Privacy Framework). Bitte einmal auf
      [dataprivacyframework.gov](https://www.dataprivacyframework.gov/list)
      nachsehen, dass „Vercel Inc." dort aktiv gelistet ist. Falls nicht,
      trägt allein die SCC-Begründung – dann den Satz zum
      Angemessenheitsbeschluss streichen.
- [ ] **Postanschrift des BayLDA** (Datenschutz Ziffer 13) ergänzen, von
      [lda.bayern.de](https://www.lda.bayern.de). Behörde und Website stehen
      schon drin, nur die Hausnummer wollte ich nicht raten.
- [ ] Beide Rechtstexte einmal von einem Fachanwalt gegenlesen lassen. Der
      kritische Punkt ist die Abgrenzung nach § 6 StBerG – die Begründung dazu
      steht in `INHALTS-ABGLEICH.md`, Abschnitt 9.

### B · Vercel und Domain

- [ ] **Auftragsverarbeitungsvertrag mit Vercel** abschließen bzw. bestätigen
      und ablegen. Ohne DPA ist die Aussage in der Datenschutzerklärung nicht
      gedeckt.
- [ ] **Deployment-Region auf Frankfurt (`fra1`)** stellen. Dann liegt die
      Verarbeitung im Regelfall in der EU und die Drittlandübermittlung
      reduziert sich auf das Edge-Netz. Kostet nichts und verbessert die
      Datenschutzlage messbar.
- [ ] **Domain `elena-fieder.de`** in Vercel verbinden, HTTPS erzwingen.
- [ ] **`www` auf die Variante ohne `www` weiterleiten** (301). Zwei
      erreichbare Varianten teilen die Ranking-Signale auf. In Vercel unter
      Domains einstellbar.
- [ ] `.env.local` aus `.env.example` anlegen. `KONTAKT_ABSENDER` und
      `KONTAKT_EMPFAENGER` sind schon vorbelegt, `RESEND_API_KEY` fehlt.
      Die Domain `elena-fieder.de` muss in Resend verifiziert werden.
- [ ] Kontaktformular scharf schalten – die drei Schritte stehen in
      `KONTAKT-SETUP.md`. Die Server Action ist fertig, aber noch nicht
      verdrahtet.

### C · SEO nach dem Live-Gang

- [ ] **Google-Unternehmensprofil anlegen und verifizieren.** Der stärkste
      einzelne Faktor für lokale Suche. Kategorie „Buchhalter" bzw.
      „Buchhaltungsbüro". Name, Adresse und E-Mail **exakt** wie im Footer
      schreiben – Abweichungen schwächen das Signal.
- [ ] **Google Search Console**: Property `elena-fieder.de` anlegen,
      `sitemap.xml` einreichen.
- [ ] Bing Webmaster Tools: Sitemap übernehmen. Fünf Minuten, deckt Bing und
      die ChatGPT-Suche mit ab.
- [ ] Adresse und E-Mail in Verzeichnissen identisch eintragen: IHK, Gelbe
      Seiten, Das Örtliche.
- [ ] Kunden um **Google-Bewertungen** bitten. Dort dürfen sie als Sterne
      erscheinen – auf der eigenen Seite nicht (Begründung in Abschnitt 4).
- [ ] **Koordinaten** aus dem Unternehmensprofil in
      `app/components/StrukturierteDaten.tsx` als `geo` nachtragen.
- [ ] [Rich-Results-Test](https://search.google.com/test/rich-results) und
      Lighthouse an der echten URL laufen lassen.

### D · Inhalte

- [ ] **Porträtfoto von Elena.** Hochformat 4:5, mindestens 800 × 1000 px.
      Der Platzhalterrahmen ist gebaut, die fertige `<Image>`-Zeile steht als
      Kommentar in `app/components/TrustUeberMich.tsx`.
- [ ] **Schriftliche Freigabe der vier Namensgeber** der Kundenstimmen
      (DSGVO-Nachweis, E-Mail reicht). Viktor ist nur mit Vornamen genannt;
      Carola Stulz und Ruslan Chukhliebov sind mit vollem Namen genannt,
      „Fotostudio Belichtungswert" ist ein Firmenname und braucht die
      Freigabe des Inhabers.
- [ ] **Bio- und Leistungstexte von Elena freigeben lassen** – sie sprechen
      ihre Ich-Perspektive, geschrieben hat sie Schuck Webdesign.
- [ ] **FAQ-Antwort 2 (Preis) prüfen**: die einzige Antwort ohne Belegstelle in
      den Unterlagen. Sie sagt bewusst nur, wovon der Preis abhängt. Falls
      Elena einen Einstiegspreis nennen will, ist das die Stelle dafür.
- [ ] Optional: **Taschenrechner-Motiv**, wenn gewünscht – Datei liefern, dann
      baue ich den Platz ein.
- [ ] Optional: echtes Foto von Elenas Arbeitsplatz statt des Stockfotos im
      Hero.

### Erledigt in dieser Runde

- [x] Hosting-Anbieter benannt: **Vercel Inc.**, samt Drittlandübermittlung
      nach Art. 44 ff. DSGVO in Datenschutz Ziffer 3. Dieser Abschnitt fehlte
      vorher komplett – ohne ihn wäre die Erklärung unvollständig gewesen,
      unabhängig vom Namen des Hosters.
- [x] Elenas Kontaktdaten und Anschrift überall eingetragen (Abschnitt 6).
- [x] Zuständige Aufsichtsbehörde ergänzt (BayLDA).
