# Kontaktformular scharfschalten (Resend)

Der Code ist vollständig da. Was fehlt, ist die Domain-Verifizierung, der
API-Key und drei Zeilen in der Formular-Komponente.

## Aktueller Stand

Das Formular ist an die Server Action angeschlossen (`useActionState`). Es
fehlen nur noch Domain-Verifizierung und Umgebungsvariablen (Schritt 1 und 2).

| Datei | Aufgabe |
|---|---|
| `app/lib/kontakt.ts` | Felder, Pflichtangaben, Prüfregeln (Client und Server). |
| `app/lib/form-guard.ts` | Begrenzung je IP, je Adresse und insgesamt, Längengrenzen. |
| `app/lib/kontakt-email.ts` | Mailvorlagen: Benachrichtigung an Elena und Bestätigung an den Absender. |
| `app/actions/kontaktanfrage.ts` | Prüft erneut, wertet Honeypot aus, sendet zwei Mails über Resend. |
| `app/components/KontaktCTA.tsx` | Formular mit Fehler- und Erfolgsansicht. |

## Schritt 1 – Domain in Resend verifizieren

Ohne verifizierte Absenderdomain lehnt Resend den Versand ab. Eine Adresse bei
GMX oder Gmail als Absender einzutragen funktioniert nicht.

1. Account auf [resend.com](https://resend.com) anlegen.
2. Unter **Domains** die Domain hinzufügen, unter der die Website läuft.
3. Die angezeigten DNS-Einträge setzen (SPF, DKIM, und für die Zustellbarkeit
   möglichst auch DMARC). Bis zur Verifizierung können ein paar Stunden vergehen.
4. Unter **API Keys** einen Key mit Berechtigung *Sending access* erzeugen.

## Schritt 2 – Umgebungsvariablen setzen

`.env.example` nach `.env.local` kopieren und ausfüllen:

```
RESEND_API_KEY=re_...
KONTAKT_ABSENDER=Website <noreply@ihre-domain.de>
KONTAKT_EMPFAENGER=elena@ihre-domain.de
```

`.env.local` ist über `.gitignore` ausgeschlossen und darf nie ins Repo.
Beim Deployment (z. B. Vercel) dieselben drei Variablen in den
Projekteinstellungen hinterlegen – dort werden sie nicht aus `.env.local` gelesen.

## Danach unbedingt testen

- Absenden mit gültigen Daten → Mail kommt an, **Reply-To zeigt auf den Interessenten**.
- Absenden mit leerem Namen und ohne Datenschutz-Haken → Feldfehler erscheinen.
- Server neu starten ohne `RESEND_API_KEY` → verständliche Fehlermeldung
  statt eines Absturzes.

## Noch offen, unabhängig von Resend

- `/impressum` und `/datenschutz` existieren nicht. Die Datenschutz-Checkbox
  verlinkt auf `/datenschutz` – aktuell ein 404. Beide Seiten sind vor dem
  Live-Gang Pflicht.
- Es gibt keine Rate-Begrenzung. Der Honeypot fängt einfache Bots ab, hält aber
  niemanden auf, der es gezielt versucht. Bei Missbrauch nachrüsten
  (z. B. Upstash Ratelimit oder Vercel Firewall).
- Aufbewahrung: In der Datenschutzerklärung muss stehen, wie lange die per
  Formular übermittelten Daten gespeichert werden.
