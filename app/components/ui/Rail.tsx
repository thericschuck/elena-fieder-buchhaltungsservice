/**
 * Kontolinie – die durchgehende Soll/Haben-Achse der Seite.
 *
 * Jede Section rendert ihr eigenes Segment, damit dunkle Bloecke die Farbe
 * umstellen koennen. Die x-Position kommt aus --rail-x (app/globals.css),
 * dieselbe Variable nutzen die Section-Grids – so kann nichts auseinanderlaufen.
 *
 * Ab lg sichtbar - genau dort greifen die zweispaltigen Section-Grids.
 * Darunter bleibt die Spalte einspaltig, da traegt die Linie nichts bei.
 */
export default function Rail({
  tone = "light",
  marker = false,
}: {
  tone?: "light" | "dark";
  marker?: boolean;
}) {
  const line = tone === "light" ? "bg-brand-tief/30" : "bg-brand/40";
  const raute = tone === "light" ? "bg-gold-tief" : "bg-gold";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden justify-center lg:flex"
    >
      <div className="relative h-full w-full max-w-7xl px-6 lg:px-10">
        <div className="relative h-full">
          <span
            className={`absolute inset-y-0 left-[var(--rail-x)] w-px -translate-x-1/2 ${line}`}
          />
          {marker && (
            <span
              className={`absolute top-0 left-[var(--rail-x)] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 ${raute}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
