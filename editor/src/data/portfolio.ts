/* ========================================
   PORTFOLIO DATA
   Placeholder content — replace with real media later
   ======================================== */


export interface VideoItem {
  id: number | string;
  title: string;
  category: "reels" | "youtube" | "commercial" | "cinematic" | "shortform";
  thumbnail: string;
  description: string;
  client: string;
  videoUrl?: string;
  aspectRatio?: "portrait" | "landscape";
}

export interface CinematicShot {
  id: number;
  title: string;
  thumbnail: string;
  aspectRatio: "landscape" | "portrait" | "square";
}

export interface GraphicDesignItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  width: number;
  height: number;
}

export interface PhotoEditItem {
  id: number;
  title: string;
  before: string;
  after: string;
}

export interface PhotographItem {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  span?: boolean; // For grid layout — some items span 2 columns
}

/* ---------- Video Editing Portfolio ---------- */
export const videoPortfolio: VideoItem[] = [
  {
    id: "comm-shorts-1",
    title: "Restaurant Promotional Reel",
    category: "commercial",
    thumbnail: "/videos/thumbnail.webp",
    description: "Cinematic restaurant advertisement featuring signature dishes, premium presentation, and engaging food storytelling designed to attract customers and enhance brand visibility.",
    client: "Radha Raman Restaurant",
    videoUrl: "https://youtube.com/shorts/gKkIjvCkpw4?feature=share",
    aspectRatio: "portrait",
  },
  {
    id: "yt-video-1",
    title: "🎓 The Last Bell – College Farewell Edit",
    category: "youtube",
    thumbnail: "/videos/thumbnail.webp",
    description: "Emotional and fast-paced farewell video capturing college life, friendships, and graduation moments with heartfelt emotion and cinematic storytelling.",
    client: "OCT",
    videoUrl: "https://youtu.be/GzlQiZm7ZRo",
    aspectRatio: "landscape",
  },
  {
    id: "yt-video-2",
    title: "AI & ML Club Showcase",
    category: "youtube",
    thumbnail: "/videos/thumbnail.webp",
    description: "Dynamic club introduction featuring event highlights, member testimonials, and a futuristic tech-driven aesthetic that captures the energy of the AI & ML Club.",
    client: "OCT",
    videoUrl: "https://youtu.be/l4BNiSEgDSc",
    aspectRatio: "landscape",
  },
];

/* ---------- Cinematic Shots ---------- */
export const cinematicShots: CinematicShot[] = [
  { id: 1, title: "Golden Hour Silhouette", thumbnail: "/photo/cinematic1.webp", aspectRatio: "landscape" },
  { id: 2, title: "Cinematic Nature", thumbnail: "/photo/cinematic2.webp", aspectRatio: "portrait" },
  { id: 3, title: "Omkareshwar", thumbnail: "/photo/cinematic3.webp", aspectRatio: "landscape" },
  { id: 4, title: "Ocean Waves", thumbnail: "/photo/cinematic4.webp", aspectRatio: "square" },
];

/* ---------- Graphic Designs ---------- */
export const graphicDesigns: GraphicDesignItem[] = [
  { id: 1, title: "Promotion Poster", category: "posters", thumbnail: "/graphic/DEMO1.webp", description: "Event Poster Design using bold layouts and typography.", width: 546, height: 771 },
  { id: 2, title: "Brand Promotion Campaign", category: "marketing", thumbnail: "/graphic/DEMO2.webp", description: "Promotional Poster featuring vibrant color themes.", width: 1363, height: 767 },
  { id: 3, title: "Creative Marketing Poster", category: "marketing", thumbnail: "/graphic/DEMO3.webp", description: "Creative Poster Design with custom graphical assets.", width: 961, height: 542 },
  { id: 4, title: "Elegant Invitation Card Design", category: "invitation", thumbnail: "/graphic/DEMO5.webp", description: "Marketing Poster optimized for communication and branding.", width: 1120, height: 641 },
  { id: 5, title: "YouTube Thumbnail Design", category: "thumbnail", thumbnail: "/graphic/DEMO4.webp", description: "YouTube Thumbnail Design focusing on high click-through rate (CTR).", width: 1672, height: 941 },
  { id: 6, title: "Social Media Campaign Design", category: "social-media", thumbnail: "/graphic/DEMO6.webp", description: "Cohesive social media marketing campaign designed for multi-platform engagement.", width: 2938, height: 2463 },
  { id: 7, title: "Brand Identity Design", category: "branding", thumbnail: "/graphic/DEMO7.webp", description: "Professional branding and visual identity design crafted to create a strong and memorable brand presence.", width: 4950, height: 1238 },
  { id: 8, title: "Grand Inauguration Ceremony Poster", category: "event", thumbnail: "/graphic/DEMO8.webp", description: "Professionally designed promotional poster featuring modern layout, strong visual hierarchy, and engaging branding elements.", width: 1422, height: 705 },
  { id: 9, title: "Cricket Championship Tournament Poster", category: "event", thumbnail: "/graphic/DEMO9.webp", description: "Modern promotional poster design created with strong visual hierarchy, engaging typography, and impactful branding elements.", width: 1920, height: 1080 },
];

/* ---------- Photo Edits (Before/After) ---------- */
export const photoEdits: PhotoEditItem[] = [
  { id: 1, title: "Portrait Retouching", before: "/photo/before1.webp", after: "/photo/after1.webp" },
  { id: 2, title: "Landscape Color Grading", before: "/photo/placeholder.png", after: "/photo/after2.webp" },
  { id: 3, title: "Product Photo Enhancement", before: "/photo/before3.webp", after: "/photo/after3.webp" },
  { id: 4, title: "Real Estate HDR Edit", before: "/photo/before4.webp", after: "/photo/after4.webp" },
];

/* ---------- Photography ---------- */
export const photographs: PhotographItem[] = [
  { id: 1, title: "Morning Light Portrait", thumbnail: "/images/photos/photo-1.webp", category: "portrait", span: true },
  { id: 2, title: "Street Photography — Tokyo", thumbnail: "/images/photos/photo-2.webp", category: "street" },
  { id: 3, title: "Macro — Dewdrops", thumbnail: "/images/photos/photo-3.webp", category: "macro" },
  { id: 4, title: "Architectural Lines", thumbnail: "/images/photos/photo-4.webp", category: "architecture" },
  { id: 5, title: "Night Cityscape", thumbnail: "/images/photos/photo-5.webp", category: "landscape", span: true },
  { id: 6, title: "Café Moments", thumbnail: "/images/photos/photo-6.webp", category: "lifestyle" },
  { id: 7, title: "Abstract Shadows", thumbnail: "/images/photos/photo-7.webp", category: "abstract" },
  { id: 8, title: "Forest Trail", thumbnail: "/images/photos/photo-8.webp", category: "landscape" },
  { id: 9, title: "Studio Portrait — Dramatic", thumbnail: "/images/photos/photo-9.webp", category: "portrait" },
  { id: 10, title: "Vintage Car Detail", thumbnail: "/images/photos/photo-10.webp", category: "lifestyle", span: true },
];
