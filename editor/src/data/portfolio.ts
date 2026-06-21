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
  category: "posters" | "thumbnails" | "social-media" | "branding";
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
  { id: 1, title: "Golden Hour Silhouette", thumbnail: "/images/cinematic/shot-1.jpg", aspectRatio: "landscape" },
  { id: 2, title: "Lost In Her Eyes", thumbnail: "/images/cinematic/shot-2.jpg", aspectRatio: "portrait" },
  { id: 3, title: "Mountain Mist", thumbnail: "/images/cinematic/shot-3.jpg", aspectRatio: "landscape" },
  { id: 4, title: "Ocean Waves", thumbnail: "/images/cinematic/shot-4.jpg", aspectRatio: "square" },
  { id: 5, title: "Desert Dunes", thumbnail: "/images/cinematic/shot-5.jpg", aspectRatio: "portrait" },
  { id: 6, title: "City Reflections", thumbnail: "/images/cinematic/shot-6.jpg", aspectRatio: "landscape" },
  { id: 7, title: "Forest Canopy", thumbnail: "/images/cinematic/shot-7.jpg", aspectRatio: "portrait" },
  { id: 8, title: "Aerial Coastline", thumbnail: "/images/cinematic/shot-8.jpg", aspectRatio: "landscape" },
];

/* ---------- Graphic Designs ---------- */
export const graphicDesigns: GraphicDesignItem[] = [
  { id: 1, title: "Promotion Poster", category: "posters", thumbnail: "/graphic/DEMO1.png", description: "Event Poster Design using bold layouts and typography.", width: 546, height: 771 },
  { id: 2, title: "Brand Promotion Campaign", category: "posters", thumbnail: "/graphic/DEMO2.png", description: "Promotional Poster featuring vibrant color themes.", width: 1363, height: 767 },
  { id: 3, title: "Creative Marketing Poster", category: "posters", thumbnail: "/graphic/DEMO3.png", description: "Creative Poster Design with custom graphical assets.", width: 961, height: 542 },
  { id: 4, title: "Elegant Invitation Card Design", category: "posters", thumbnail: "/graphic/DEMO5.png", description: "Marketing Poster optimized for communication and branding.", width: 1120, height: 641 },
  { id: 5, title: "YouTube Thumbnail Design", category: "thumbnails", thumbnail: "/graphic/DEMO4.png", description: "YouTube Thumbnail Design focusing on high click-through rate (CTR).", width: 1672, height: 941 },
  { id: 6, title: "Social Media Campaign Design", category: "social-media", thumbnail: "/graphic/DEMO6.png", description: "Cohesive social media marketing campaign designed for multi-platform engagement.", width: 2938, height: 2463 },
  { id: 7, title: "Brand Identity Design", category: "branding", thumbnail: "/graphic/DEMO7.png", description: "Professional branding and visual identity design crafted to create a strong and memorable brand presence.", width: 4950, height: 1238 },
  { id: 8, title: "Grand Inauguration Ceremony Poster", category: "posters", thumbnail: "/graphic/DEMO8.png", description: "Professionally designed promotional poster featuring modern layout, strong visual hierarchy, and engaging branding elements.", width: 1422, height: 705 },
  { id: 9, title: "Cricket Championship Tournament Poster", category: "posters", thumbnail: "/graphic/DEMO9.png", description: "Modern promotional poster design created with strong visual hierarchy, engaging typography, and impactful branding elements.", width: 1920, height: 1080 },
];

/* ---------- Photo Edits (Before/After) ---------- */
export const photoEdits: PhotoEditItem[] = [
  { id: 1, title: "Portrait Retouching", before: "/images/edits/before-1.jpg", after: "/images/edits/after-1.jpg" },
  { id: 2, title: "Landscape Color Grading", before: "/images/edits/before-2.jpg", after: "/images/edits/after-2.jpg" },
  { id: 3, title: "Product Photo Enhancement", before: "/images/edits/before-3.jpg", after: "/images/edits/after-3.jpg" },
  { id: 4, title: "Real Estate HDR Edit", before: "/images/edits/before-4.jpg", after: "/images/edits/after-4.jpg" },
];

/* ---------- Photography ---------- */
export const photographs: PhotographItem[] = [
  { id: 1, title: "Morning Light Portrait", thumbnail: "/images/photos/photo-1.jpg", category: "portrait", span: true },
  { id: 2, title: "Street Photography — Tokyo", thumbnail: "/images/photos/photo-2.jpg", category: "street" },
  { id: 3, title: "Macro — Dewdrops", thumbnail: "/images/photos/photo-3.jpg", category: "macro" },
  { id: 4, title: "Architectural Lines", thumbnail: "/images/photos/photo-4.jpg", category: "architecture" },
  { id: 5, title: "Night Cityscape", thumbnail: "/images/photos/photo-5.jpg", category: "landscape", span: true },
  { id: 6, title: "Café Moments", thumbnail: "/images/photos/photo-6.jpg", category: "lifestyle" },
  { id: 7, title: "Abstract Shadows", thumbnail: "/images/photos/photo-7.jpg", category: "abstract" },
  { id: 8, title: "Forest Trail", thumbnail: "/images/photos/photo-8.jpg", category: "landscape" },
  { id: 9, title: "Studio Portrait — Dramatic", thumbnail: "/images/photos/photo-9.jpg", category: "portrait" },
  { id: 10, title: "Vintage Car Detail", thumbnail: "/images/photos/photo-10.jpg", category: "lifestyle", span: true },
];
