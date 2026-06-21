import fs from "fs";
import path from "path";
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
import Photography from "@/components/sections/Photography";
import AboutMe from "@/components/sections/AboutMe";
import Skills from "@/components/sections/Skills";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const photoDir = path.join(process.cwd(), "public", "photo");
  let dynamicPhotoEdits: any[] = [];
  
  const titlesMap: Record<string, string> = {
    "1": "Professional Portrait Retouching",
    "2": "Advanced Color Correction",
    "3": "Cinematic Photo Enhancement",
    "4": "Creative Visual Transformation",
    "5": "Premium Photo Restoration",
    "6": "Professional Image Finishing"
  };

  const descriptionsMap: Record<string, string> = {
    "1": "Advanced color correction, skin retouching, lighting enhancement, and professional-quality image refinement.",
    "2": "Professional-grade color grading, exposure balance, and dynamic range optimization.",
    "3": "Cinematic atmosphere creation, selective color grading, and dramatic lighting enhancement.",
    "4": "High-impact visual effects, artistic styling, and creative composite transformations.",
    "5": "Meticulous damage restoration, detail reconstruction, and quality enhancement.",
    "6": "Precision adjustments, clarity sharpening, noise reduction, and high-fidelity output polishing."
  };

  let refWidth = 2592;
  let refHeight = 1728;

  try {
    if (fs.existsSync(photoDir)) {
      const files = fs.readdirSync(photoDir);
      
      // Get reference dimensions from before1 (which is the first card)
      const before1File = files.find(f => /^before1\.(jpg|jpeg|png)$/i.test(f));
      if (before1File) {
        try {
          const dims = getImageDimensions(path.join(photoDir, before1File));
          refWidth = dims.width;
          refHeight = dims.height;
        } catch (err) {
          console.error("Failed to read before1 dimensions:", err);
        }
      }

      const beforeFiles = files.filter(f => /^before\d+\.(jpg|jpeg|png)$/i.test(f));
      
      // Sort numerically (e.g. before1, before2, ..., before6)
      beforeFiles.sort((a, b) => {
        const numA = parseInt(a.match(/^before(\d+)/i)?.[1] || "0", 10);
        const numB = parseInt(b.match(/^before(\d+)/i)?.[1] || "0", 10);
        return numA - numB;
      });

      beforeFiles.forEach(beforeFile => {
        const match = beforeFile.match(/^before(\d+)\.(jpg|jpeg|png)$/i);
        if (match) {
          const num = match[1];
          const afterFile = files.find(f => new RegExp(`^after${num}\\.(png|jpg|jpeg)$`, 'i').test(f));
          if (afterFile) {
            dynamicPhotoEdits.push({
              id: `dynamic-${num}`,
              title: titlesMap[num] || `Photo Retouching Showcase ${num}`,
              description: descriptionsMap[num] || `Before and after photo editing comparison showcase ${num}.`,
              before: `/photo/${beforeFile}`,
              after: `/photo/${afterFile}`,
              width: refWidth,
              height: refHeight,
            });
          }
        }
      });
    }
  } catch (e) {
    console.error("Error reading public/photo dir:", e);
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
        <Photography />
        <PhotoEditing dynamicEdits={dynamicPhotoEdits} />
        <AboutMe />
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
