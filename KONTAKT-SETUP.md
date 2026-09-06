# Kontaktformular scharfschalten (Resend)

Der Code ist vollständig da. Was fehlt, ist die Domain-Verifizierung, der
API-Key und drei Zeilen in der Formular-Komponente.

## Aktueller Stand

| Datei | Zustand |
|---|---|
| `app/lib/kontakt.ts` | Felder, Pflichtangaben, Prüfregeln. **Wird schon benutzt** – vom Formular im Browser. |
| `app/lib/kontakt-email.ts` | Benachrichtigungsmail an Elena, HTML und Nur-Text. Nutzereingaben sind maskiert. |
| `app/actions/kontaktanfrage.ts` | Server Action, fertig. Prüft erneut, wertet den Honeypot aus, sendet über Resend. **Wird noch nicht aufgerufen.** |
| `app/components/KontaktCTA.tsx` | Zeigt nach dem Absenden eine Bestätigung an, **ohne zu senden**. |
| `.env.example` | Vorlage für die drei benötigten Variablen. |

Das Paket `resend` (6.26.0) ist installiert.

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

## Schritt 3 – Formular an die Action hängen

In `app/components/KontaktCTA.tsx`:

1. Import ergänzen:
   ```ts
   import { useActionState } from "react";
   import { sendeKontaktanfrage } from "../actions/kontaktanfrage";
   ```
2. `handleSubmit` und den `sent`-State ersetzen durch:
   ```ts
   const [ergebnis, formAction, pending] = useActionState(sendeKontaktanfrage, {
     status: "leer",
   });
   ```
3. Am `<form>` `onSubmit={handleSubmit}` durch `action={formAction}` ersetzen,
   die Erfolgsansicht an `ergebnis.status === "ok"` hängen und den Submit-Button
   während `pending` deaktivieren.

Die Client-Prüfung kann als Komfortschicht davor bleiben – die Action prüft
ohnehin noch einmal selbst.

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
