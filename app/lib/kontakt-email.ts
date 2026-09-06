import type { KontaktFelder } from "./kontakt";

/**
 * Benachrichtigungs-Mail an Elena.
 *
 * Bewusst schlicht: Inline-Styles, keine externen Bilder, keine Web-Fonts –
 * genau das, was Outlook und Co. zuverlaessig darstellen. Die Antwort geht per
 * Reply direkt an den Absender, deshalb steht dessen Adresse oben.
 */

/** Nutzereingaben landen im HTML – ohne Maskierung waere das eine Injektionsluecke. */
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Zeile = { label: string; wert: string };

function zeilen(f: KontaktFelder): Zeile[] {
  return [
    { label: "Name", wert: f.name },
    { label: "E-Mail", wert: f.email },
    { label: "Telefon", wert: f.telefon },
  ].filter((z) => z.wert !== "");
}

export function kontaktEmailBetreff(f: KontaktFelder) {
  return `Anfrage Erstgespräch: ${f.name}`;
}

export function kontaktEmailText(f: KontaktFelder) {
  const kopf = zeilen(f)
    .map((z) => `${z.label}: ${z.wert}`)
    .join("\n");

  const nachricht = f.nachricht
    ? `\n\nAnmerkung:\n${f.nachricht}`
    : "\n\n(Keine Nachricht hinterlassen.)";

  return `Neue Anfrage über das Kontaktformular\n\n${kopf}${nachricht}\n\nDatenschutzerklärung wurde bestätigt.`;
}

export function kontaktEmailHtml(f: KontaktFelder) {
  const rows = zeilen(f)
    .map(
      (z) => `
      <tr>
        <td style="padding:8px 16px 8px 0;color:#3A4F63;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(z.label)}</td>
        <td style="padding:8px 0;color:#111827;font-size:15px;">${esc(z.wert)}</td>
      </tr>`,
    )
    .join("");

  const nachricht = f.nachricht
    ? `<div style="margin-top:24px;padding:16px;background:#F5F7FA;border-radius:6px;">
         <p style="margin:0 0 8px;color:#3A4F63;font-size:13px;">Anmerkung</p>
         <p style="margin:0;color:#111827;font-size:15px;line-height:1.6;white-space:pre-wrap;">${esc(f.nachricht)}</p>
       </div>`
    : "";

  return `<!doctype html>
<html lang="de">
  <body style="margin:0;padding:24px;background:#F5F7FA;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2e6ec;border-radius:8px;overflow:hidden;">
      <div style="padding:20px 24px;background:#1E2A38;">
        <p style="margin:0;color:#F5F7FA;font-size:16px;font-weight:bold;">Neue Anfrage über das Kontaktformular</p>
      </div>
      <div style="padding:24px;">
        <table style="border-collapse:collapse;width:100%;">${rows}</table>
        ${nachricht}
        <p style="margin:24px 0 0;color:#3A4F63;font-size:12px;">
          Die Datenschutzerklärung wurde bestätigt. Eine Antwort auf diese Mail
          geht direkt an ${esc(f.email)}.
        </p>
      </div>
    </div>
  </body>
</html>`;
}
