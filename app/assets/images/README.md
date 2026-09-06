# Bilder

| Datei | Verwendung |
|-------|-----------|
| `arbeitsplatz.webp` | Hero-Bildpanel rechts. 1920 x 1098, aus der gelieferten PNG-Fassung gerechnet. Ausschnitt `object-[62%_50%]` – links ist nur Wand. |
| `belege-vorher.jpg` / `belege-nachher.jpg` | Vorher/Nachher-Regler in der Lösung-Section. |
| `kontobuch.jpg` | Ungenutzt. War in einer früheren Hero-Fassung und im Kontaktblock. |
| `bau-plaene.jpg` | Ungenutzt. Rest aus der ersten Hero-Fassung. |

## Warum das Hero-Bild WebP ist und mit q85 ausgeliefert wird

Gemessen gegen die PNG-Quelle (PSNR, sharp `effort: 6`, `smartSubsample`):

| Qualität | Größe | PSNR |
|----------|-------|------|
| q75 | 71 KB | 40,1 dB |
| q80 | 85 KB | 41,2 dB |
| **q85** | **107 KB** | **42,4 dB** |
| q90 | 153 KB | 43,9 dB |
| q95 | 246 KB | 46,0 dB |

q85 liegt deutlich über der Schwelle für visuell verlustfrei (~40 dB), q90
kostet 43 % mehr Bytes für 1,5 dB. Zum Vergleich: dasselbe Bild als JPEG in
vergleichbarer Qualität lag bei 172 KB.

Die PNG-Quelle hatte einen vollflächig opaken Alphakanal – vor dem Encoden auf
Weiß geflattet, das spart den vierten Kanal ohne sichtbare Änderung.

`next.config.ts` schaltet `images.qualities: [75, 85]` frei: Next 16 erlaubt per
Default nur q75, und bei den großen glatten Wandflächen dieses Motivs wird das
als Banding sichtbar. Ohne den Eintrag würde der Image-Optimizer die sorgfältig
gerechnete Quelle beim Ausliefern wieder auf q75 herunterdrücken.

## Warum das Hero-Foto neben der Schrift steht und nicht darunter

Nachgerechnet: damit `--color-brand` (#0CC1E0) als Displayschrift **auf** einem
Foto 4,5:1 erreicht, darf der hellste Bildpunkt der fertigen Fläche eine
Luminanz von 0,058 nicht überschreiten – ein Bürofoto ist dann praktisch
schwarz. Umgekehrt bräuchte dunkle Schrift auf hellem Scrim einen dunkelsten
Bildpunkt über 0,598, dann ist das Foto ausgewaschen.

Deshalb: Text auf ruhigem Grund, Bild in eigener Fläche daneben, per
`.bleed-rechts` bis an die Viewportkante. Beides bleibt voll lesbar und das
Foto in voller Stärke sichtbar.

Eine Duoton-Variante des Fotos in Palettenfarben war gebaut und wurde
verworfen: sie wirkte kühl und steril, der warme Holzton des Originals trägt
den Gold-Akzent besser.

## Offene Punkte

- **Taschenrechner-Motiv** angefragt, liegt nicht vor. Bitte Datei liefern,
  dann baue ich den Platz ein.
- Alle Fotos sind Stock. Ein echtes Foto von Elenas Arbeitsplatz wäre für den
  Hero weiterhin die bessere Lösung.
- Porträt von Elena Fieder fehlt (Platzhalterrahmen in `TrustUeberMich.tsx`).
