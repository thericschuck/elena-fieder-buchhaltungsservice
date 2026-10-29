import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "./Footer";
import Rail from "./ui/Rail";
import { ArrowRight } from "./ui/Icons";

/**
 * Rahmen fuer Impressum und Datenschutz.
 *
 * Bewusst ein eigener, schlanker Kopf statt des Seiten-Headers: der arbeitet mit
 * Anker-Navigation und Scroll-Spy auf Abschnitte, die es hier nicht gibt.
 */
export default function RechtstextSeite({
  titel,
  stand,
  children,
}: {
  titel: string;
  stand: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-primary/10">
        <div className="mx-auto flex h-22 w-full max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
          <Link href="/" className="-m-2 flex flex-col p-2 leading-none">
            <span className="font-headline text-[15px] tracking-tight text-primary">
              Elena Fieder
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
              Buchhaltungsservice*
            </span>
          </Link>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[15px] text-secondary transition-colors hover:text-primary"
          >
            Zur Startseite
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </header>

      <main className="relative flex-1">
        <Rail tone="light" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="lg:grid lg:grid-cols-[var(--rail-x)_1fr]">
            <div className="lg:pr-10 lg:text-right">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-secondary">
                Rechtliches
              </p>
              <p className="tnum mt-3 text-sm text-secondary">Stand: {stand}</p>
            </div>

            <div className="mt-6 lg:mt-0 lg:pl-10">
              <h1 className="font-headline text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.1] tracking-[-0.02em] text-primary">
                {titel}
              </h1>
              <div className="rechtstext mt-10 max-w-[44rem]">{children}</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
