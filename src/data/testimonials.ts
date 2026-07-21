export interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    company: "BrightWave Media",
    role: "Marketing Director",
    review:
      "Abhijeet transformed our brand videos from ordinary to extraordinary. The cinematic quality and attention to detail exceeded all expectations. Our engagement rates tripled after launching the new content.",
    rating: 5,
    image: "/images/testimonials/client-1.webp",
  },
  {
    id: 2,
    name: "Marcus Chen",
    company: "TechVista Inc.",
    role: "CEO",
    review:
      "Working with Abhijeet was a game-changer for our product launch. The motion graphics and video editing were world-class. Delivered on time and the final product blew our entire team away.",
    rating: 5,
    image: "/images/testimonials/client-2.webp",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    company: "Luxe Fashion House",
    role: "Creative Director",
    review:
      "The fashion film Abhijeet created for our collection was pure art. Every frame was meticulously crafted with a keen eye for color grading and mood. Truly a visionary creative.",
    rating: 5,
    image: "/images/testimonials/client-3.webp",
  },
  {
    id: 4,
    name: "James Okafor",
    company: "FitPro Academy",
    role: "Founder",
    review:
      "Abhijeet revamped our entire YouTube channel — thumbnails, intros, and video editing. The quality jumped ten levels. Subscriber growth has been incredible since the rebrand.",
    rating: 4,
    image: "/images/testimonials/client-4.webp",
  },
  {
    id: 5,
    name: "Priya Sharma",
    company: "Wanderlust Travel Co.",
    role: "Content Manager",
    review:
      "The travel documentary Abhijeet edited for us was breathtaking. The pacing, music selection, and color grading created an immersive experience that our audience absolutely loved.",
    rating: 5,
    image: "/images/testimonials/client-5.webp",
  },
];
