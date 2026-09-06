import type { MetadataRoute } from "next";
import { FIRMA } from "./lib/firma";

/**
 * Next erzeugt daraus /sitemap.xml.
 *
 * lastModified kommt aus einer festen Konstante und nicht aus new Date():
 * die Seite wird statisch vorgerendert, ein Datum zur Buildzeit wuerde bei
 * jedem Deployment "geaendert" melden, ohne dass sich Inhalt geaendert hat.
 * Google straft das nicht ab, aber es macht das Signal wertlos.
 * Bei echten inhaltlichen Aenderungen hier hochsetzen.
 */
const STAND = "2026-09-06";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: FIRMA.url,
      lastModified: STAND,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${FIRMA.url}/impressum`,
      lastModified: STAND,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${FIRMA.url}/datenschutz`,
      lastModified: STAND,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
