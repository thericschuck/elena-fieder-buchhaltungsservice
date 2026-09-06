import type { MetadataRoute } from "next";
import { FIRMA } from "./lib/firma";

/**
 * Next erzeugt daraus /robots.txt.
 *
 * Bewusst keine Disallow-Regeln: die Seite hat keine Bereiche, die aus dem
 * Index gehalten werden sollen. Impressum und Datenschutz duerfen indexiert
 * werden - sie sind Pflichtseiten und ihre Auffindbarkeit ist ein
 * Vertrauenssignal, kein Nachteil.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${FIRMA.url}/sitemap.xml`,
    host: FIRMA.url,
  };
}
