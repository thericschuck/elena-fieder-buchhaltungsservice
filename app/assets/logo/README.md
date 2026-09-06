# Logo – Elena Fieder Buchhaltungsservice

| Datei | Zweck |
|-------|-------|
| `elena-fieder-logo-quelle.jpg` | Original wie von Elena geliefert (JPEG, weisser Hintergrund). Nur Archiv, nicht importieren. |
| `elena-fieder-logo.png` | Wortmarke freigestellt, graue Schrift – fuer helle Flaechen (Header). |
| `elena-fieder-logo-hell.png` | Wortmarke freigestellt, Schrift in `--color-bg` – fuer dunkle Flaechen (Footer). |
| `../../icon.svg` | Ordner-Bildmarke als echtes SVG, aus der Pixelgeometrie des Originals nachgebaut. Favicon. |
| `../../favicon.ico` | Multi-Size-ICO aus derselben Bildmarke. |
| `../../apple-icon.png` | 180x180, Bildmarke auf `--color-primary` (Safari legt hinter Transparenz Schwarz). |

## Wie die freigestellten PNGs entstanden sind

Das Original ist Flaechen-Artwork in zwei Volltonfarben auf Weiss:
Cyan `#0CC1E0` und Grau `#545454`. Die Freistellung rechnet die
Weiss-Ueberlagerung heraus (`p = a*ink + (1-a)*255`, pro Pixel gegen beide
Tinten geloest, die mit dem kleineren Fehler gewinnt) und schneidet das
JPEG-Rauschen unter 10 % Deckkraft ab. Mittlere Abweichung zum Original nach
Rueckmontage auf Weiss: 1,57/255.

PNG mit Alpha ist hier bewusst die Quelle im Repo – `next/image` liefert daraus
automatisch AVIF/WebP aus. Nicht durch ein handgeschriebenes WebP ersetzen.

## Offener Punkt

Ein echtes Vektor-Original (AI/EPS/SVG) der **Wortmarke** liegt nicht vor. Die
Bildmarke ist nachgebaut, die Schrift nicht – dafuer braucht es die Datei vom
Ersteller des Logos. Fuer Print und sehr grosse Darstellungen bei Elena
anfragen.
