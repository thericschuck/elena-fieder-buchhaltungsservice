import type { SVGProps } from "react";

/**
 * Inline-SVG-Set im Phosphor-Duktus: 24er Viewbox, Strichstaerke 1.5, currentColor.
 * Bewusst kein Icon-Paket als Dependency und keine Emojis.
 *
 * Dekorativ per Default (aria-hidden). Wo ein Icon Bedeutung traegt, bekommt es
 * am Einsatzort ein Label.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </Icon>
);

export const Check = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </Icon>
);

/** Beleg / Rechnung – gezackte Unterkante wie ein abgerissener Kassenbon. */
export const Receipt = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 3h12v18l-2.4-1.6-2.4 1.6-2.4-1.6L8.4 21 6 19.4V3Z" />
    <path d="M9.5 8h5" />
    <path d="M9.5 12h5" />
  </Icon>
);

export const Users = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9.5" cy="8" r="3.3" />
    <path d="M3.5 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
    <path d="M16.2 5.2a3.3 3.3 0 0 1 0 5.6" />
    <path d="M17.5 14.9c1.9.7 3 2.5 3 5.1" />
  </Icon>
);

export const ChartBar = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 20h16" />
    <path d="M7.5 20v-7" />
    <path d="M12 20V5.5" />
    <path d="M16.5 20v-4.5" />
  </Icon>
);

export const Sliders = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h6" />
    <path d="M14 7h6" />
    <path d="M4 17h4" />
    <path d="M12 17h8" />
    <circle cx="12" cy="7" r="2" />
    <circle cx="10" cy="17" r="2" />
  </Icon>
);

export const Clock = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5.2l3.4 2" />
  </Icon>
);

export const Euro = (p: IconProps) => (
  <Icon {...p}>
    <path d="M18 6.8a6.4 6.4 0 1 0 0 10.4" />
    <path d="M4.5 10.3h8" />
    <path d="M4.5 13.7h8" />
  </Icon>
);

export const WarningCircle = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.8v4.6" />
    <path d="M12 16.1h.01" />
  </Icon>
);

export const Phone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.6 3.5h3l1.6 4-2 1.4a12.3 12.3 0 0 0 5.9 5.9l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2C11.4 19.4 4.6 12.6 4.1 5.7a2 2 0 0 1 2-2.2Z" />
  </Icon>
);

export const Envelope = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="M3.6 6.6 12 12.7l8.4-6.1" />
  </Icon>
);

export const MapPin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s6.8-5.8 6.8-10.6a6.8 6.8 0 1 0-13.6 0C5.2 15.2 12 21 12 21Z" />
    <circle cx="12" cy="10.2" r="2.4" />
  </Icon>
);

export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Icon>
);

export const Close = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </Icon>
);

/* --- Branchen ------------------------------------------------------------ */

/**
 * Baubranche – Mauerwerk im Laeuferverband.
 *
 * Vorher stand hier ein Schutzhelm. In 18px Groesse las der sich als
 * Tischglocke; das Mauerwerk ist bei derselben Groesse eindeutig und passt
 * ausserdem besser zur Linienfuehrung der uebrigen Icons.
 */
export const Mauer = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 6.5h18v11H3z" />
    <path d="M3 12h18" />
    <path d="M9 6.5V12" />
    <path d="M15 6.5V12" />
    <path d="M6 12v5.5" />
    <path d="M12 12v5.5" />
    <path d="M18 12v5.5" />
  </Icon>
);

/**
 * Handwerk – Hammer.
 *
 * Der frueher hier stehende Schraubenschluessel war in 18px eine Flaeche ohne
 * erkennbare Form. Kopf oben, Stiel nach unten liest sich sofort.
 */
export const Hammer = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9.5 5.5h9.2a1.3 1.3 0 0 1 1.3 1.3v2.4a1.3 1.3 0 0 1-1.3 1.3H9.5z" />
    <path d="M9.5 8h-2a2 2 0 0 0-2 2v1" />
    <path d="M13.5 10.5v7.8a2 2 0 0 1-4 0v-7.8" />
  </Icon>
);

/** Handel – Ladenfront mit Markise. */
export const Laden = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 9.5V20h16V9.5" />
    <path d="M3 9.5 4.8 4.5h14.4L21 9.5Z" />
    <path d="M9.5 20v-5.5h5V20" />
  </Icon>
);

/** Industrie – Werkshalle mit Schornstein. */
export const Industrie = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 20V11l5 3V11l5 3V6.5h3.5L18 20Z" />
    <path d="M3.5 20h17" />
    <path d="M20 20V4.5h-2.5" />
  </Icon>
);

/** Dienstleistung – Aktentasche. */
export const Aktentasche = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="7.5" width="18" height="12.5" rx="1.8" />
    <path d="M9 7.5V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.7" />
    <path d="M3 12.5h18" />
  </Icon>
);

/** Freiberufler – Einzelperson. */
export const Person = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
  </Icon>
);

/* --- Qualifikation & Vertrauen ------------------------------------------ */

/** Urkunde mit Siegel. */
export const Urkunde = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19 12.5V4.5H5v15h6" />
    <path d="M8.5 8h7" />
    <path d="M8.5 11.5h4" />
    <circle cx="16.5" cy="16" r="3.2" />
    <path d="M14.8 18.6 14 22l2.5-1.4L19 22l-.8-3.4" />
  </Icon>
);

/** Sprachen – Globus. */
export const Globus = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17" />
    <path d="M12 3.5c2.4 2.4 3.6 5.3 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.3-3.6-8.5S9.6 5.9 12 3.5Z" />
  </Icon>
);

/** Weiterbildung – aufgeschlagenes Buch. */
export const Buch = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 6.5v13" />
    <path d="M12 6.5C10.4 5.2 8.2 4.5 5 4.5v13c3.2 0 5.4.7 7 2 1.6-1.3 3.8-2 7-2v-13c-3.2 0-5.4.7-7 2Z" />
  </Icon>
);

/** Bank, Kasse, Kreditkarte. */
export const Karte = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
    <path d="M2.5 10h19" />
    <path d="M6 14.2h3.5" />
  </Icon>
);

/** Waage – Kontenabstimmung, Soll gegen Haben. */
export const Waage = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4.5V20" />
    <path d="M7 20h10" />
    <path d="M4 8h16" />
    <path d="M4 8l-2.2 4.6a3.4 3.4 0 0 0 4.4 0Z" />
    <path d="M20 8l2.2 4.6a3.4 3.4 0 0 1-4.4 0Z" />
  </Icon>
);

/** Ordner – Uebergabe an den Steuerberater. */
export const Ordner = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 19V6a1.5 1.5 0 0 1 1.5-1.5h4L11 7h8a1.5 1.5 0 0 1 1.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19Z" />
    <path d="M9 11.5h6" />
  </Icon>
);

/** Aufklapp-Pfeil. Dreht sich am Einsatzort per CSS, nicht per zweitem Icon. */
export const ChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 9.5l6 6 6-6" />
  </Icon>
);

/** Griff des Vorher/Nachher-Reglers: zwei Pfeile, links und rechts. */
export const PfeileHorizontal = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 7.5 4.5 12 9 16.5" />
    <path d="M15 7.5 19.5 12 15 16.5" />
    <path d="M6 12h12" />
  </Icon>
);
