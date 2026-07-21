export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 1,
    title: "Video Editing",
    description:
      "Professional video editing with cinematic color grading, seamless transitions, and compelling storytelling.",
    icon: "video",
    features: ["Color Grading", "Sound Design", "Motion Tracking", "Multi-cam Editing"],
  },
  {
    id: 2,
    title: "Motion Graphics",
    description:
      "Eye-catching motion graphics, animated intros, lower thirds, and dynamic visual effects.",
    icon: "motion",
    features: ["2D/3D Animation", "Title Design", "Logo Animation", "Visual Effects"],
  },
  {
    id: 3,
    title: "Thumbnail Design",
    description:
      "High-converting YouTube and social media thumbnails designed to maximize click-through rates.",
    icon: "thumbnail",
    features: ["A/B Testing Designs", "Brand Consistency", "Click-Optimized", "Batch Delivery"],
  },
  {
    id: 4,
    title: "Graphic Design",
    description:
      "Stunning visual designs for brands — from logos and posters to complete brand identity systems.",
    icon: "graphic",
    features: ["Brand Identity", "Poster Design", "Print Materials", "Style Guides"],
  },
  {
    id: 5,
    title: "Photo Retouching",
    description:
      "Professional photo editing and retouching that transforms raw images into polished masterpieces.",
    icon: "photo",
    features: ["Portrait Retouching", "Color Correction", "Background Removal", "HDR Processing"],
  },
  {
    id: 6,
    title: "Social Media Content",
    description:
      "Scroll-stopping social media content tailored for Instagram, TikTok, LinkedIn, and YouTube.",
    icon: "social",
    features: ["Platform-Optimized", "Content Calendar", "Reels & Stories", "Carousel Design"],
  },
];
