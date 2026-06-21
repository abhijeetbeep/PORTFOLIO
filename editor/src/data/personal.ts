export interface ToolItem {
  name: string;
  icon: string;
}

export interface ContactItem {
  icon: string;
  label: string;
  href: string;
  target?: string;
  rel?: string;
}

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

export interface StatItem {
  target: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface PricingFeature {
  icon: string;
  title: string;
  description: string;
}

export const personalData = {
  name: "Abhijeet Sarkar",
  logoText: "ABHIZT STUDIO",
  profileImage: "/profile.jpg",
  roles: ["Video Editor", "Motion Designer", "Graphic Designer"],
  heroDescription: "Transforming raw footage into cinematic masterpieces and creative visions into stunning visual experiences. Let's bring your story to life.",
  footerDescription: "Crafting cinematic visual experiences that elevate brands and captivate audiences worldwide.",
  
  about: {
    title: "Creative Director & Visual Storyteller",
    paragraphs: [
      "With over 8 years of experience in video production, motion design, and graphic design, I've helped brands transform their visual identity and connect with audiences through compelling creative content. From cinematic brand films to scroll-stopping social media content, every project is crafted with meticulous attention to detail.",
      "My approach blends technical expertise with artistic vision — whether it's color grading a documentary, designing a brand identity system, or creating motion graphics that captivate. I believe every frame tells a story, and I'm here to make yours unforgettable."
    ],
    tools: [
      { name: "Premiere Pro", icon: "FaFilm" },
      { name: "After Effects", icon: "FaMagic" },
      { name: "Photoshop", icon: "FaImage" },
      { name: "Lightroom", icon: "FaSun" },
      { name: "DaVinci Resolve", icon: "SiDavinciresolve" },
      { name: "Illustrator", icon: "FaPenNib" },
      { name: "Figma", icon: "SiFigma" },
      { name: "Cinema 4D", icon: "FaCube" }
    ] as ToolItem[]
  },
  
  contact: {
    phone: "+91 9111800236",
    email: "abhiztsarkar@gmail.com",
    location: "Bhopal, Madhya Pradesh, India",
    whatsappUrl: "https://wa.me/919111800236",
    infoList: [
      { icon: "FaPhone", label: "+91 9111800236", href: "tel:+919111800236" },
      { icon: "FaEnvelope", label: "abhiztsarkar@gmail.com", href: "mailto:abhiztsarkar@gmail.com" },
      {
        icon: "FaMapMarkerAlt",
        label: "Bhopal, Madhya Pradesh, India",
        href: "https://maps.google.com/?q=Bhopal,Madhya+Pradesh,India",
        target: "_blank",
        rel: "noopener noreferrer"
      }
    ] as ContactItem[],
    socialLinks: [
      { icon: "FaInstagram", href: "https://www.instagram.com/abhizt_?igsh=N2Izem9zeWg4bmlt", label: "Instagram" },
      { icon: "FaLinkedin", href: "https://www.linkedin.com/in/abhijeetbeep?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
      { icon: "FaFacebook", href: "https://www.facebook.com/share/1BJd7JBkDf/", label: "Facebook" },
      { icon: "FaWhatsapp", href: "https://wa.me/919111800236", label: "WhatsApp" }
    ] as SocialLink[]
  },

  stats: [
    { target: 300, suffix: "+", label: "Projects Completed", icon: "FaFilm" },
    { target: 100, suffix: "+", label: "Happy Clients", icon: "FaUsers" },
    { target: 5, suffix: "+", label: "Years of Experience", icon: "FaCalendarAlt" },
    { target: 50, suffix: "+", label: "Videos Delivered", icon: "FaPlay" }
  ] as StatItem[],

  pricing: [
    {
      icon: "FaDollarSign",
      title: "Custom Pricing",
      description: "Every project receives a personalized quotation based on scope and complexity.",
    },
    {
      icon: "FaBolt",
      title: "Fast Response",
      description: "Get a response within 24 hours to discuss your project requirements.",
    },
    {
      icon: "FaSyncAlt",
      title: "Flexible Solutions",
      description: "Video editing, graphic design, photo editing, reels, YouTube content, and more.",
    },
  ] as PricingFeature[]
};
