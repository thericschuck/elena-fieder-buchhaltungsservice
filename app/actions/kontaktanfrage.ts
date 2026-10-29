"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import {
  HONEYPOT,
  hatFehler,
  leseFormData,
  pruefeKontakt,
  type KontaktErgebnis,
} from "@/app/lib/kontakt";
import {
  BESTAETIGUNG_BETREFF,
  bestaetigungEmailHtml,
  bestaetigungEmailText,
  kontaktEmailBetreff,
  kontaktEmailHtml,
  kontaktEmailText,
} from "@/app/lib/kontakt-email";
import { LIMITS, begrenze, clientIp, zuLang } from "@/app/lib/form-guard";

/*
  Server Action fuer das Kontaktformular, Signatur passt zu React 19
  `useActionState(sendeKontaktanfrage, { status: "leer" })`.

  Schutz (Muster aus dem Band-Projekt): Honeypot, erneute Pruefung auf dem
  Server, Laengengrenzen, Begrenzung je IP, je Adresse und insgesamt. Die
  Herkunftspruefung (Origin = Host) uebernimmt Next bei Server Actions selbst.

  Zwei Mails: Benachrichtigung an Elena (Reply-To = Interessent) und
  Bestaetigung an den Absender (Reply-To = Elena). Resend wirft bei API-Fehlern
  nicht, sondern liefert { error } zurueck - das wird deshalb ausdruecklich
  geprueft. Scheitert nur die Bestaetigung, ist die Anfrage trotzdem
  angekommen und zaehlt als Erfolg.
*/

const ZU_VIELE = "Zu viele Anfragen. Bitte versuchen Sie es später erneut.";
const NICHT_GESENDET =
  "Die Anfrage konnte gerade nicht versendet werden. Bitte versuchen Sie es noch einmal oder schreiben Sie mir direkt per E-Mail.";

export async function sendeKontaktanfrage(
  _bisher: KontaktErgebnis,
  formData: FormData,
): Promise<KontaktErgebnis> {
  const felder = leseFormData(formData);

  // Honeypot: Erfolg melden, ohne zu senden. Ein Bot lernt so nichts darueber,
  // woran er gescheitert ist.
  if (felder[HONEYPOT] !== "") return { status: "ok" };

  const ip = clientIp(await headers());
  if (
    !begrenze(`ip:${ip}`, LIMITS.proIp) ||
    !begrenze("gesamt", LIMITS.gesamt)
  ) {
    return { status: "fehler", allgemein: ZU_VIELE };
  }

  if (zuLang(felder)) {
    return {
      status: "fehler",
      allgemein: "Eine Eingabe ist zu lang. Bitte kürzen Sie Ihren Text.",
    };
  }

  // Zweite Pruefung auf dem Server: der Client kann umgangen werden.
  const fehler = pruefeKontakt(felder);
  if (hatFehler(fehler)) return { status: "fehler", fehler };

  if (!begrenze(`mail:${felder.email.toLowerCase()}`, LIMITS.proEmail)) {
    return { status: "fehler", allgemein: ZU_VIELE };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const absender = process.env.KONTAKT_ABSENDER;
  const empfaenger = process.env.KONTAKT_EMPFAENGER;

  if (!apiKey || !absender || !empfaenger) {
    console.error(
      "[kontakt] RESEND_API_KEY, KONTAKT_ABSENDER oder KONTAKT_EMPFAENGER fehlt. Siehe .env.example.",
    );
    return { status: "fehler", allgemein: NICHT_GESENDET };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: absender,
      to: [empfaenger],
      // Antworten landen direkt beim Interessenten, nicht bei der Absenderdomain.
      replyTo: felder.email,
      subject: kontaktEmailBetreff(felder),
      html: kontaktEmailHtml(felder),
      text: kontaktEmailText(felder),
    });
    if (error) throw error;
  } catch (ursache) {
    console.error("[kontakt] Benachrichtigung fehlgeschlagen:", ursache);
    return { status: "fehler", allgemein: NICHT_GESENDET };
  }

  try {
    const { error } = await resend.emails.send({
      from: absender,
      to: [felder.email],
      replyTo: empfaenger,
      subject: BESTAETIGUNG_BETREFF,
      html: bestaetigungEmailHtml(felder),
      text: bestaetigungEmailText(felder),
    });
    if (error) throw error;
  } catch (ursache) {
    console.error("[kontakt] Bestätigungsmail fehlgeschlagen:", ursache);
  }

  return { status: "ok" };
}
