/* ========================================
   PORTFOLIO DATA
   Placeholder content — replace with real media later
   ======================================== */

export interface VideoItem {
  id: number;
  title: string;
  category: "reels" | "youtube" | "commercial" | "cinematic" | "shortform";
  thumbnail: string;
  description: string;
  client: string;
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
  { id: 1, title: "Summer Vibes Reel", category: "reels", thumbnail: "/images/projects/video-1.jpg", description: "Dynamic summer montage with energetic transitions", client: "SunWave Co." },
  { id: 2, title: "Tech Product Launch", category: "commercial", thumbnail: "/images/projects/video-2.jpg", description: "Sleek product reveal with 3D motion graphics", client: "NovaTech" },
  { id: 3, title: "Travel Documentary", category: "cinematic", thumbnail: "/images/projects/video-3.jpg", description: "Cinematic travel film across Southeast Asia", client: "WanderLens" },
  { id: 4, title: "Brand Story — Artisan Coffee", category: "youtube", thumbnail: "/images/projects/video-4.jpg", description: "Brand storytelling for artisan coffee roasters", client: "Brew & Co." },
  { id: 5, title: "Instagram Carousel Reel", category: "reels", thumbnail: "/images/projects/video-5.jpg", description: "Trendy carousel-style reel with kinetic text", client: "FitLife" },
  { id: 6, title: "Fashion Film — Noir", category: "cinematic", thumbnail: "/images/projects/video-6.jpg", description: "High-fashion noir with dramatic lighting", client: "Maison Élite" },
  { id: 7, title: "60-Second Ad Spot", category: "commercial", thumbnail: "/images/projects/video-7.jpg", description: "Fast-paced commercial for fitness brand", client: "IronEdge" },
  { id: 8, title: "YouTube Intro Package", category: "youtube", thumbnail: "/images/projects/video-8.jpg", description: "Custom animated intro and outro package", client: "GameVault" },
  { id: 9, title: "TikTok Trend Edit", category: "shortform", thumbnail: "/images/projects/video-9.jpg", description: "Viral-ready TikTok edit with trending audio", client: "BuzzFeed" },
  { id: 10, title: "Wedding Highlights", category: "cinematic", thumbnail: "/images/projects/video-10.jpg", description: "Emotional wedding highlights with cinematic grading", client: "Private Client" },
  { id: 11, title: "Recipe Short", category: "shortform", thumbnail: "/images/projects/video-11.jpg", description: "Overhead recipe video with satisfying edits", client: "TastyBites" },
  { id: 12, title: "Behind the Scenes", category: "youtube", thumbnail: "/images/projects/video-12.jpg", description: "BTS vlog with dynamic cuts and sound design", client: "Studio X" },
];

/* ---------- Cinematic Shots ---------- */
export const cinematicShots: CinematicShot[] = [
  { id: 1, title: "Golden Hour Silhouette", thumbnail: "/images/cinematic/shot-1.jpg", aspectRatio: "landscape" },
  { id: 2, title: "Urban Neon Nights", thumbnail: "/images/cinematic/shot-2.jpg", aspectRatio: "portrait" },
  { id: 3, title: "Mountain Mist", thumbnail: "/images/cinematic/shot-3.jpg", aspectRatio: "landscape" },
  { id: 4, title: "Ocean Waves", thumbnail: "/images/cinematic/shot-4.jpg", aspectRatio: "square" },
  { id: 5, title: "Desert Dunes", thumbnail: "/images/cinematic/shot-5.jpg", aspectRatio: "portrait" },
  { id: 6, title: "City Reflections", thumbnail: "/images/cinematic/shot-6.jpg", aspectRatio: "landscape" },
  { id: 7, title: "Forest Canopy", thumbnail: "/images/cinematic/shot-7.jpg", aspectRatio: "portrait" },
  { id: 8, title: "Aerial Coastline", thumbnail: "/images/cinematic/shot-8.jpg", aspectRatio: "landscape" },
];

/* ---------- Graphic Designs ---------- */
export const graphicDesigns: GraphicDesignItem[] = [
  { id: 1, title: "Music Festival Poster", category: "posters", thumbnail: "/images/designs/design-1.jpg", description: "Vibrant festival poster with neon aesthetics" },
  { id: 2, title: "Gaming Thumbnail Pack", category: "thumbnails", thumbnail: "/images/designs/design-2.jpg", description: "Eye-catching YouTube gaming thumbnails" },
  { id: 3, title: "Instagram Story Templates", category: "social-media", thumbnail: "/images/designs/design-3.jpg", description: "Minimal story templates for lifestyle brands" },
  { id: 4, title: "Restaurant Brand Identity", category: "branding", thumbnail: "/images/designs/design-4.jpg", description: "Full brand identity for upscale restaurant" },
  { id: 5, title: "Movie Poster — Sci-Fi", category: "posters", thumbnail: "/images/designs/design-5.jpg", description: "Cinematic sci-fi movie poster concept" },
  { id: 6, title: "Podcast Thumbnail Series", category: "thumbnails", thumbnail: "/images/designs/design-6.jpg", description: "Consistent podcast cover series" },
  { id: 7, title: "Social Media Campaign", category: "social-media", thumbnail: "/images/designs/design-7.jpg", description: "Multi-platform campaign for fashion brand" },
  { id: 8, title: "Startup Logo & Guidelines", category: "branding", thumbnail: "/images/designs/design-8.jpg", description: "Modern logo with comprehensive brand guide" },
  { id: 9, title: "Concert Poster — Jazz", category: "posters", thumbnail: "/images/designs/design-9.jpg", description: "Retro-inspired jazz concert poster" },
  { id: 10, title: "Fitness Thumbnails", category: "thumbnails", thumbnail: "/images/designs/design-10.jpg", description: "High-energy fitness YouTube thumbnails" },
  { id: 11, title: "LinkedIn Carousel", category: "social-media", thumbnail: "/images/designs/design-11.jpg", description: "Professional LinkedIn carousel design" },
  { id: 12, title: "Coffee Shop Rebrand", category: "branding", thumbnail: "/images/designs/design-12.jpg", description: "Complete rebrand for specialty coffee shop" },
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
