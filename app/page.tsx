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
  Reihenfolge wie bisher (Sitemap aus dem Strategiegespraech). Nur der Wortlaut
  stammt aus den finalen Website-Texten.

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
