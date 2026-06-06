export interface PricingTier {
  id: number;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export const pricing: PricingTier[] = [
  {
    id: 1,
    name: "Basic",
    price: 99,
    period: "per project",
    features: [
      "Single video edit (up to 3 min)",
      "Basic color correction",
      "Background music",
      "2 revision rounds",
      "720p / 1080p delivery",
      "3-day turnaround",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    id: 2,
    name: "Standard",
    price: 249,
    period: "per project",
    features: [
      "Video edit (up to 10 min)",
      "Advanced color grading",
      "Sound design & mixing",
      "Motion graphics & titles",
      "5 revision rounds",
      "4K delivery",
      "Thumbnail design included",
      "48-hour turnaround",
    ],
    popular: true,
    cta: "Most Popular",
  },
  {
    id: 3,
    name: "Premium",
    price: 499,
    period: "per project",
    features: [
      "Unlimited video length",
      "Cinematic color grading",
      "Full sound design & SFX",
      "Custom motion graphics",
      "Unlimited revisions",
      "4K + HDR delivery",
      "Thumbnail + social media assets",
      "Priority 24-hour turnaround",
      "Dedicated project manager",
    ],
    popular: false,
    cta: "Go Premium",
  },
];
