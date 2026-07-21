export interface ReelItem {
  id: string;
  videoUrl: string;
  title: string;
  description: string;
  client: string;
}

export const reelsData: ReelItem[] = [
  {
    id: "reel-1",
    videoUrl: "/videos/Short1.mp4",
    title: "Urban Streetwear Editorial",
    description: "Fast-paced rhythm-based fashion promo with custom speed ramps and kinetic overlay titles.",
    client: "Midnight Studios",
  },
  {
    id: "reel-2",
    videoUrl: "/videos/Short2.mp4",
    title: "Minimalist Morning Coffee",
    description: "Sleek portrait cinematography showcasing satisfying coffee textures with clean, modern transitions.",
    client: "Daily Grind Cafe",
  },
  {
    id: "reel-3",
    videoUrl: "/videos/Short3.mp4",
    title: "Cyberpunk Cinematic Montage",
    description: "High-contrast neon styling and glitch effects sync'd with heavy industrial sound design.",
    client: "Neo-Tokyo Beats",
  },
  {
    id: "reel-4",
    videoUrl: "/videos/Short4.mp4",
    title: "Dynamic Sports Edit",
    description: "Energetic movement cuts tracking high-intensity athlete routines and transitions.",
    client: "Active Athletics",
  },
];
