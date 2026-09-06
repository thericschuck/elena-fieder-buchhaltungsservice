import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 erlaubt per Default nur quality=75. Das Hero-Foto besteht zu
    // grossen Teilen aus glatter weisser Wand, da wird q75 als Banding
    // sichtbar. 85 nur fuer dieses eine Bild freischalten, alles andere
    // laeuft weiter ueber den Default.
    qualities: [75, 85],
  },
};

export default nextConfig;
