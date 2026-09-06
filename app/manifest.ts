import type { MetadataRoute } from "next";
import { FIRMA } from "./lib/firma";

/**
 * Web-App-Manifest. Fuer das Ranking irrelevant, aber es liefert Name, Farben
 * und Icon fuer den Fall, dass jemand die Seite auf den Homescreen legt - und
 * Lighthouse prueft es unter "Best Practices".
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: FIRMA.name,
    short_name: "Elena Fieder",
    description:
      "Laufende Buchhaltung für Bau, Handwerk, Handel und Industrie – Bilanzbuchhalterin (IHK) in Obernburg am Main.",
    lang: "de",
    start_url: "/",
    display: "browser",
    background_color: "#f2f7f9",
    theme_color: "#0f2e3b",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
