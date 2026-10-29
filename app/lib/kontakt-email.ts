import type { KontaktFelder } from "./kontakt";
import { FIRMA } from "./firma";

/**
 * Mailvorlagen: Benachrichtigung an Elena und Bestaetigung an den Absender.
 *
 * Palette wie die Website (Primary-Block, Logo-Cyan, Gold als Akzent). Bewusst
 * ohne Bilder und Web-Fonts: Bildblocker und Outlook wuerden sie sonst kaputt
 * darstellen, deshalb steht die Wortmarke als Text. Tabellenlayout mit
 * Inline-Styles statt <style>-Block, weil Outlook Desktop <style> unzuverlaessig
 * rendert.
 *
 * Das Sternchen hinter "Buchhaltungsservice" gehoert ueberall dazu; die
 * Erklaerung steht in der Fusszeile (rechtlicher Hinweis wie auf der Website).
 */

const C = {
  primary: "#0F2E3B",
  brand: "#0CC1E0",
  brandTief: "#0A7C93",
  brandHell: "#DCEEF3",
  kante: "#B9DDE8",
  bg: "#F2F7F9",
  text: "#10222B",
  sekundaer: "#35586A",
  gold: "#D4AF37",
  weiss: "#FFFFFF",
};

const SCHRIFT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const SCHRIFT_KOPF =
  "'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const RECHTLICHER_HINWEIS =
  "* Meine Dienstleistungen aus dem Bereich Buchhaltung unterliegen den Einschränkungen des § 6 Nr. 3 und 4 des StBerG. Im Bereich Buchhaltung biete ich Ihnen nur das Buchen der lfd. Geschäftsvorfälle und die Belegverarbeitung an. Es wird ausdrücklich darauf hingewiesen, dass ich keine Steuer- oder Rechtsberatung durchführe.";

/** Nutzereingaben landen im HTML - ohne Maskierung waere das eine Injektionsluecke. */
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Zeilenumbrueche in Betreff und Anrede entfernen (Header-Injektion). */
function einzeilig(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

type Zeile = { label: string; wert: string };

function zeilen(f: KontaktFelder): Zeile[] {
  return [
    { label: "Name", wert: einzeilig(f.name) },
    { label: "E-Mail", wert: f.email },
    { label: "Telefon", wert: einzeilig(f.telefon) },
  ].filter((z) => z.wert !== "");
}

function zeilenHtml(f: KontaktFelder) {
  return zeilen(f)
    .map(
      (z) => `<tr>
        <td style="padding:8px 16px 8px 0;font-family:${SCHRIFT};font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${C.sekundaer};white-space:nowrap;vertical-align:top;width:90px;">${esc(z.label)}</td>
        <td style="padding:8px 0;font-family:${SCHRIFT};font-size:15px;color:${C.text};vertical-align:top;">${esc(z.wert)}</td>
      </tr>`,
    )
    .join("");
}

function nachrichtHtml(f: KontaktFelder) {
  if (!f.nachricht) return "";
  return `<div style="margin-top:20px;padding:16px 18px;background:${C.bg};border-left:3px solid ${C.gold};font-family:${SCHRIFT};font-size:15px;line-height:1.65;color:${C.text};">
    <div style="margin:0 0 8px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${C.sekundaer};">Anmerkung</div>
    ${esc(f.nachricht).replace(/\n/g, "<br />")}
  </div>`;
}

function huelle(opts: { vorschau: string; titel: string; inhalt: string }) {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(FIRMA.name)}</title>
  </head>
  <body style="margin:0;padding:0;background:${C.bg};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(opts.vorschau)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:${C.weiss};border:1px solid ${C.kante};">
            <tr>
              <td style="padding:28px 36px;background:${C.primary};">
                <div style="font-family:${SCHRIFT_KOPF};font-size:20px;line-height:1.2;color:${C.weiss};">Elena Fieder</div>
                <div style="height:2px;width:48px;background:${C.gold};margin:10px 0 8px;font-size:0;line-height:0;">&nbsp;</div>
                <div style="font-family:${SCHRIFT};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${C.brand};">Buchhaltungsservice*</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 36px 8px;">
                <h1 style="margin:0 0 20px;font-family:${SCHRIFT_KOPF};font-weight:800;font-size:22px;line-height:1.2;letter-spacing:-0.3px;color:${C.primary};">${opts.titel}</h1>
                ${opts.inhalt}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 36px 32px;">
                <div style="border-top:1px solid ${C.kante};padding-top:20px;font-family:${SCHRIFT};font-size:12px;line-height:1.7;color:${C.sekundaer};">
                  ${esc(FIRMA.name)} · ${esc(FIRMA.strasse)}, ${esc(FIRMA.plz)} ${esc(FIRMA.ort)}<br />
                  <a href="mailto:${esc(FIRMA.email)}" style="color:${C.brandTief};text-decoration:none;">${esc(FIRMA.email)}</a><br /><br />
                  ${esc(RECHTLICHER_HINWEIS)}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/* ------------------------------------------------------------------ */
/* Benachrichtigung an Elena                                           */
/* ------------------------------------------------------------------ */

export function kontaktEmailBetreff(f: KontaktFelder) {
  return `Anfrage Erstgespräch: ${einzeilig(f.name)}`;
}

export function kontaktEmailText(f: KontaktFelder) {
  const kopf = zeilen(f)
    .map((z) => `${z.label}: ${z.wert}`)
    .join("\n");

  const nachricht = f.nachricht
    ? `\n\nAnmerkung:\n${f.nachricht}`
    : "\n\n(Keine Nachricht hinterlassen.)";

  return `Neue Anfrage über das Kontaktformular\n\n${kopf}${nachricht}\n\nDie Datenschutzerklärung wurde bestätigt. Eine Antwort auf diese Mail geht direkt an ${f.email}.`;
}

export function kontaktEmailHtml(f: KontaktFelder) {
  return huelle({
    vorschau: `Neue Anfrage von ${einzeilig(f.name)}`,
    titel: "Neue Anfrage über das Kontaktformular",
    inhalt: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${zeilenHtml(f)}</table>
      ${nachrichtHtml(f)}
      <p style="margin:24px 0 0;font-family:${SCHRIFT};font-size:12px;line-height:1.6;color:${C.sekundaer};">
        Die Datenschutzerklärung wurde bestätigt. Eine Antwort auf diese Mail geht direkt an ${esc(f.email)}.
      </p>`,
  });
}

/* ------------------------------------------------------------------ */
/* Bestaetigung an den Absender                                        */
/* ------------------------------------------------------------------ */

export const BESTAETIGUNG_BETREFF = "Ihre Anfrage ist eingegangen";

export function bestaetigungEmailText(f: KontaktFelder) {
  const kopf = zeilen(f)
    .map((z) => `${z.label}: ${z.wert}`)
    .join("\n");
  const nachricht = f.nachricht ? `\n\nIhre Anmerkung:\n${f.nachricht}` : "";

  return `Guten Tag ${einzeilig(f.name)},

vielen Dank für Ihre Anfrage zu einem persönlichen Erstgespräch. Ich habe Ihre Angaben erhalten und melde mich bei Ihnen.

Ihre Angaben
${kopf}${nachricht}

Das Erstgespräch dauert ca. 20 Minuten und ist kostenfrei und unverbindlich.

Freundliche Grüße
Elena Fieder
Bilanzbuchhalterin (IHK)

${FIRMA.name}
${FIRMA.strasse}, ${FIRMA.plz} ${FIRMA.ort}
${FIRMA.email}

${RECHTLICHER_HINWEIS}`;
}

export function bestaetigungEmailHtml(f: KontaktFelder) {
  return huelle({
    vorschau: "Ihre Anfrage ist eingegangen – ich melde mich bei Ihnen.",
    titel: "Ihre Anfrage ist eingegangen",
    inhalt: `<p style="margin:0 0 24px;font-family:${SCHRIFT};font-size:16px;line-height:1.7;color:${C.text};">
        Guten Tag ${esc(einzeilig(f.name))},<br /><br />
        vielen Dank für Ihre Anfrage zu einem persönlichen Erstgespräch. Ich habe Ihre Angaben erhalten und melde mich bei Ihnen.
      </p>
      <div style="margin:0 0 8px;font-family:${SCHRIFT};font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${C.brandTief};">Ihre Angaben</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${zeilenHtml(f)}</table>
      ${nachrichtHtml(f)}
      <div style="margin:24px 0 0;padding:14px 18px;background:${C.brandHell};font-family:${SCHRIFT};font-size:14px;line-height:1.6;color:${C.primary};">
        Das Erstgespräch dauert ca. 20 Minuten und ist kostenfrei und unverbindlich.
      </div>
      <p style="margin:28px 0 0;font-family:${SCHRIFT};font-size:16px;line-height:1.7;color:${C.text};">
        Freundliche Grüße<br />
        <strong style="color:${C.primary};">Elena Fieder</strong><br />
        <span style="font-size:13px;color:${C.sekundaer};">Bilanzbuchhalterin (IHK)</span>
      </p>`,
  });
}
