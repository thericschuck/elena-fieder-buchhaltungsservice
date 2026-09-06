import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import ProblemPain from "./components/ProblemPain";
import Leistungen from "./components/Leistungen";
import Branchen from "./components/Branchen";
import TrustUeberMich from "./components/TrustUeberMich";
import Fragen from "./components/Fragen";
import Ablauf from "./components/Ablauf";
import KontaktCTA from "./components/KontaktCTA";
import Footer from "./components/Footer";

/*
  Reihenfolge nach der Sitemap aus dem Strategiegespraech (Abschnitt 5).

  TrustUeberMich traegt inzwischen drei Kapitel in einer Section: Person,
  Qualifikation samt Berufspraxis und die Kundenstimmen. Vorher waren das drei
  eigene Sections, die Abschluss, Berufsjahre und Sprachen mehrfach wiederholt
  haben - die Seite war dadurch deutlich laenger, ohne mehr zu sagen.

  Fragen steht bewusst vor Ablauf und nicht am Seitenende: die Antworten
  raeumen Einwaende aus, und danach folgt direkt der naechste Schritt.
  Der Farbton der Section (brand-hell) bricht ausserdem die Folge
  Weiss - Creme auf, die sonst hier entstuende.

  Ablauf muss direkt ueber KontaktCTA stehen: der dunkle Kontaktblock stuft
  sich per clip-path an der Kontolinie ab und legt dabei die weisse Flaeche der
  Section darueber frei (siehe .step-top in globals.css). Steht dort eine
  Section mit bg-Ton, entsteht ein grauer Zwischenstreifen.
*/
export default function Home() {
  return (
    <>
      <Header />
      <main id="inhalt" className="flex-1">
        <Hero />
        <TrustBar />
        <ProblemPain />
        <Leistungen />
        <Branchen />
        <TrustUeberMich />
        <Fragen />
        <Ablauf />
        <KontaktCTA />
      </main>
      <Footer />
    </>
  );
}
