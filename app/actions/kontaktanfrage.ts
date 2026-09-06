"use server";

import { Resend } from "resend";
import {
  HONEYPOT,
  hatFehler,
  leseFormData,
  pruefeKontakt,
  type KontaktErgebnis,
} from "@/app/lib/kontakt";
import {
  kontaktEmailBetreff,
  kontaktEmailHtml,
  kontaktEmailText,
} from "@/app/lib/kontakt-email";

/*
  NOCH NICHT AKTIV. Diese Action ist fertig, aber das Formular ruft sie noch
  nicht auf – siehe KONTAKT-SETUP.md fuer die drei Schritte zur Aktivierung.

  Signatur passt zu React 19 `useActionState(sendeKontaktanfrage, { status: "leer" })`.
*/

export async function sendeKontaktanfrage(
  _bisher: KontaktErgebnis,
  formData: FormData,
): Promise<KontaktErgebnis> {
  const felder = leseFormData(formData);

  // Honeypot: Erfolg melden, ohne zu senden. Ein Bot lernt so nichts darueber,
  // woran er gescheitert ist.
  if (felder[HONEYPOT] !== "") return { status: "ok" };

  // Zweite Pruefung auf dem Server: der Client kann umgangen werden.
  const fehler = pruefeKontakt(felder);
  if (hatFehler(fehler)) return { status: "fehler", fehler };

  const apiKey = process.env.RESEND_API_KEY;
  const absender = process.env.KONTAKT_ABSENDER;
  const empfaenger = process.env.KONTAKT_EMPFAENGER;

  if (!apiKey || !absender || !empfaenger) {
    console.error(
      "[kontakt] RESEND_API_KEY, KONTAKT_ABSENDER oder KONTAKT_EMPFAENGER fehlt. Siehe .env.example.",
    );
    return {
      status: "fehler",
      allgemein:
        "Die Anfrage konnte gerade nicht versendet werden. Bitte melden Sie sich telefonisch oder per E-Mail.",
    };
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: absender,
      to: [empfaenger],
      // Antworten landen direkt beim Interessenten, nicht bei der Absenderdomain.
      replyTo: felder.email,
      subject: kontaktEmailBetreff(felder),
      html: kontaktEmailHtml(felder),
      text: kontaktEmailText(felder),
    });

    if (error) {
      console.error("[kontakt] Resend hat abgelehnt:", error);
      return {
        status: "fehler",
        allgemein:
          "Die Anfrage konnte gerade nicht versendet werden. Bitte versuchen Sie es noch einmal.",
      };
    }

    return { status: "ok" };
  } catch (ursache) {
    console.error("[kontakt] Versand fehlgeschlagen:", ursache);
    return {
      status: "fehler",
      allgemein:
        "Die Anfrage konnte gerade nicht versendet werden. Bitte versuchen Sie es noch einmal.",
    };
  }
}
