import path from "path";
import fs from "fs";
import { getImageDimensions } from "@/utils/imageMetadata";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import FloatingSocialDock from "@/components/layout/FloatingSocialDock";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import VideoPortfolio from "@/components/sections/VideoPortfolio";
import CinematicShots from "@/components/sections/CinematicShots";
import GraphicDesign from "@/components/sections/GraphicDesign";
import PhotoEditing from "@/components/sections/PhotoEditing";
import AboutMe from "@/components/sections/AboutMe";
import Skills from "@/components/sections/Skills";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";

export default function Home() {
  // Scan public/gallery dynamically with dimensions
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  let galleryImages: { src: string; width: number; height: number }[] = [];
  try {
    if (fs.existsSync(galleryDir)) {
      const files = fs.readdirSync(galleryDir);
      const imageFiles = files.filter(f => /\.(webp|png|jpg|jpeg)$/i.test(f));
      
      // Sort numerically by matching digits after 'gallery'
      imageFiles.sort((a, b) => {
        const numA = parseInt(a.match(/gallery(\d+)/)?.[1] || "0", 10);
        const numB = parseInt(b.match(/gallery(\d+)/)?.[1] || "0", 10);
        return numA - numB;
      });

      galleryImages = imageFiles.map(f => {
        const fullPath = path.join(galleryDir, f);
        let width = 1920;
        let height = 1080;
        try {
          const dims = getImageDimensions(fullPath);
          width = dims.width;
          height = dims.height;
        } catch (err) {
          console.error("Failed to read dims for", f, err);
        }
        return {
          src: `/gallery/${f}`,
          width,
          height
        };
      });
    }
  } catch (e) {
    console.error("Error reading public/gallery dir:", e);
  }

  return (
    <>
      {/* Global chrome */}
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <FloatingSocialDock />

      {/* Page sections */}
      <main>
        <HeroSection />
        <VideoPortfolio />
        <CinematicShots />
        <GraphicDesign />
        <PhotoEditing />
        <AboutMe galleryImages={galleryImages} />
        <Skills />
        <Statistics />
        <Testimonials />
        <Services />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
