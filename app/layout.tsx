import type { Metadata, Viewport } from "next";
import { Archivo_Black, DM_Sans } from "next/font/google";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import StrukturierteDaten from "./components/StrukturierteDaten";
import { FIRMA } from "./lib/firma";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-archivo-black",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-dm-sans",
});

/*
  Metadaten fuer die ganze Seite. Was hier steht, ist das, was Google und
  Social-Previews anzeigen - die Formulierungen sind deshalb keine
  Entwicklerdetails, sondern Text zum Freigeben.

  Laengen: Title 52 Zeichen, Description 142 Zeichen. Google schneidet Titles
  ab etwa 580px (rund 60 Zeichen) und Descriptions ab rund 160 Zeichen ab -
  beides liegt bewusst knapp darunter.

  metadataBase ist Voraussetzung dafuer, dass Next relative Pfade in
  canonical, Open Graph und Twitter zu absoluten URLs aufloest. Ohne den Wert
  liefert der Build Warnungen und die Previews bleiben leer.
*/
export const metadata: Metadata = {
  metadataBase: new URL(FIRMA.url),

  title: {
    default: "Buchhaltungsservice* Obernburg am Main | Elena Fieder",
    // Unterseiten setzen nur ihren eigenen Titel, der Rest kommt von hier.
    template: `%s | ${FIRMA.name}`,
  },
  description:
    "Buchen laufender Geschäftsvorfälle für Bau, Handwerk und Freiberufler. Bilanzbuchhalterin (IHK) in Obernburg am Main, deutschlandweit digital.",

  applicationName: FIRMA.name,
  authors: [{ name: FIRMA.inhaberin, url: FIRMA.url }],
  creator: FIRMA.inhaberin,
  publisher: FIRMA.name,
  category: "Buchhaltung",

  /*
    Keywords sind fuer das Ranking seit Jahren ohne Wirkung. Sie stehen hier
    nur, weil einzelne Verzeichnis- und Vorschaudienste sie noch auslesen -
    nicht ueberladen und nicht mit Wunschbegriffen fuellen.
  */
  keywords: [
    "Buchhaltungsservice* Obernburg",
    "Buchhaltung Obernburg am Main",
    "Bilanzbuchhalterin IHK",
    "Buchen laufender Geschäftsvorfälle",
    "Buchhaltung Bau Handwerk",
    "Buchhaltung Freiberufler",
    "Buchhaltung Landkreis Miltenberg",
    "Buchhaltungsbüro Bayerischer Untermain",
  ],

  alternates: { canonical: "/" },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "de_DE",
    url: FIRMA.url,
    siteName: FIRMA.name,
    title: "Buchhaltungsservice* Obernburg am Main | Elena Fieder",
    description:
      "Buchen laufender Geschäftsvorfälle für Bau, Handwerk und Freiberufler. Bilanzbuchhalterin (IHK), über 10 Jahre Berufserfahrung, deutschlandweit digital.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Buchhaltungsservice* Obernburg am Main | Elena Fieder",
    description:
      "Buchen laufender Geschäftsvorfälle für Bau, Handwerk und Freiberufler. Bilanzbuchhalterin (IHK), deutschlandweit digital.",
  },

  /* Adressen duerfen nicht erkannt werden - iOS verlinkt sonst
     Textfragmente, die keine Adresse sind, und zerlegt das Layout. */
  formatDetection: { telephone: true, address: false, email: true },
};

export const viewport: Viewport = {
  themeColor: "#0f2e3b",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${archivoBlack.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-body text-text">
        <StrukturierteDaten />
        <a
          href="#inhalt"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[70] focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-5 focus-visible:py-3 focus-visible:text-[15px] focus-visible:font-medium focus-visible:text-bg"
        >
          Zum Inhalt springen
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
