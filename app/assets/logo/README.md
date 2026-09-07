# Logo – Elena Fieder Buchhaltungsservice

Stand: Logo_3 (2026-09-07). Ersetzt die vorherige Fassung (drei aneinander
anliegende Ordner ohne Trennstrich) – neues Motiv: drei freistehende Ordner,
vertikaler Trennstrich, blaue Unterstreichung unter "Elena Fieder".

| Datei | Zweck |
|-------|-------|
| `elena-fieder-logo-quelle-2.png` | Original wie hochgeladen (PNG, bereits mit echtem Alpha, kein Weiss-Hintergrund). Nur Archiv, nicht importieren. |
| `elena-fieder-logo-quelle.jpg` | Original der vorherigen Logo-Fassung (JPEG, weisser Hintergrund). Nur Archiv, nicht importieren. |
| `elena-fieder-logo.png` | Wortmarke freigestellt, graue Schrift – fuer helle Flaechen (Header). |
| `elena-fieder-logo-hell.png` | Wortmarke freigestellt, Schrift in `--color-bg` – fuer dunkle Flaechen (Footer). |
| `../../icon.svg` | Ordner-Bildmarke als echtes SVG, aus der Pixelgeometrie von Logo_3 nachgebaut (drei freistehende Ordner, siehe unten). Favicon/Tab-Icon. |
| `../../favicon.ico` | Multi-Size-ICO (16/32/48/64/128/256), aus `icon.svg` gerendert. |
| `../../apple-icon.png` | 180x180, Bildmarke aus `icon.svg` auf `--color-primary` (Safari legt hinter Transparenz Schwarz). |

## Wie elena-fieder-logo.png / -hell.png aus der Quelle entstanden sind

Die Quelldatei liefert bereits ein sauberes Freisteller-PNG (echte
Alphakante, RGB bleibt an der Kante konstant statt Richtung Weiss zu blenden -
kein Ink-gegen-Weiss-Loesen wie bei der alten JPEG-Quelle noetig). Verarbeitung:

1. Auf die Inhalts-Bounding-Box zugeschnitten (die Quelle hatte ca. 40px
   Rand rundum).
2. Die Ordner-Fuellung kam nicht in `--color-brand` (#0CC1E0), sondern in
   einem generischen Hellblau (`#63B5F5`, vermutlich Icon-Bibliotheksfarbe der
   Quelle) – jeder Pixel wurde per Farbabstand einer von drei Referenzfarben
   (Ordnerblau / Schriftgrau `#565555` / Trennstrichgrau `#3A3A3A`)
   zugeordnet und das Ordnerblau exakt auf `#0CC1E0` gesetzt, damit die
   Bildmarke wieder auf dem Markenton liegt statt auf einem Zufallsblau aus der
   Quelldatei. Schriftgrau und Trennstrich blieben fuer die helle Fassung
   unveraendert.
3. Fuer die dunkle Fassung (`-hell.png`) zusaetzlich Schriftgrau und
   Trennstrich auf `--color-bg` (#F2F7F9) gesetzt, Ordnerblau bleibt
   `--color-brand` – exakt dieselbe Aufteilung wie in der vorherigen
   Logo-Fassung (dort war das Ordnerblau ebenfalls in beiden Varianten
   identisch, nur die Schrift wechselt).

Falls Logo_3 durch eine weitere Fassung ersetzt wird: bitte pruefen, ob die
Ordnerfarbe wieder vom Markenton abweicht, das war hier der einzige Bruch mit
dem Farbsystem.

PNG mit Alpha ist hier bewusst die Quelle im Repo – `next/image` liefert daraus
automatisch AVIF/WebP aus. Nicht durch ein handgeschriebenes WebP ersetzen.

## Wie icon.svg / favicon.ico / apple-icon.png entstanden sind

`icon.svg` ist von Hand nachgebaut (Maske: weisse Ordner-Grundform minus
duenner schwarzer Kontur fuer Fensterschlitz und Kreis, wie schon in der
vorherigen Fassung), nicht aus der Rasterdatei automatisch vektorisiert. Ein
Ordner-Modul (64 Einheiten breit) wird per `<use>` dreimal mit 12 Einheiten
Abstand instanziert - der sichtbare Unterschied zur vorherigen Fassung ist
genau dieser Abstand (vorher lagen die Ordner mit nur 4 Einheiten Luecke fast
aneinander). Farbe, Kontur-Proportionen und Eckenradius sind unveraendert aus
der alten `icon.svg` uebernommen, weil sie sich bei sehr kleinen Groessen
(16px Tab-Icon) bereits bewaehrt hatten - dort verschwimmen ohnehin beide
Fassungen zu drei blauen Balken, Detailtreue zur Wortmarke bringt bei der
Groesse nichts.

`favicon.ico` und `apple-icon.png` sind aus `icon.svg` gerendert (Playwright/
Chromium, 256px-Rendering per Groesse per Lanczos herunterskaliert fuers ICO).
Bei einer Aenderung an `icon.svg` muessen beide neu erzeugt werden - sie sind
keine Vektor-Referenzen auf die SVG-Datei, sondern gebackene Rasterkopien.

## Offene Punkte

Ein echtes Vektor-Original (AI/EPS/SVG) der **Wortmarke** (Schriftzug) liegt
nicht vor. Fuer Print und sehr grosse Darstellungen bei Elena anfragen. Die
Bildmarke (drei Ordner) liegt dagegen jetzt als echtes SVG vor, siehe oben.
