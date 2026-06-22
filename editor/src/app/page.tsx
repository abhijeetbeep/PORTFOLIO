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
      const before1File = files.find(f => /^before1\.(jpg|jpeg|png|webp)$/i.test(f));
      if (before1File) {
        try {
          const dims = getImageDimensions(path.join(photoDir, before1File));
          refWidth = dims.width;
          refHeight = dims.height;
        } catch (err) {
          console.error("Failed to read before1 dimensions:", err);
        }
      }

      Object.keys(titlesMap).forEach(num => {
        const beforeFile = files.find(f => new RegExp(`^before${num}\\.(webp|png|jpg|jpeg)$`, 'i').test(f));
        const afterFile = files.find(f => new RegExp(`^after${num}\\.(webp|png|jpg|jpeg)$`, 'i').test(f));

        const beforeUrl = beforeFile ? `/photo/${beforeFile}` : `/photo/placeholder.png`;
        const afterUrl = afterFile ? `/photo/${afterFile}` : `/photo/placeholder.png`;

        let width = refWidth;
        let height = refHeight;

        // Try to get dimensions of existing files
        const fileToMeasure = beforeFile || afterFile;
        if (fileToMeasure) {
          try {
            const dims = getImageDimensions(path.join(photoDir, fileToMeasure));
            width = dims.width;
            height = dims.height;
          } catch (err) {
            console.error(`Failed to read dimensions for ${fileToMeasure}:`, err);
          }
        }

        dynamicPhotoEdits.push({
          id: `dynamic-${num}`,
          title: titlesMap[num] || `Photo Retouching Showcase ${num}`,
          description: descriptionsMap[num] || `Before and after photo editing comparison showcase ${num}.`,
          before: beforeUrl,
          after: afterUrl,
          width: width,
          height: height,
        });
      });

      // Sort by id numerically to maintain correct order
      dynamicPhotoEdits.sort((a, b) => {
        const numA = parseInt(a.id.replace("dynamic-", ""), 10);
        const numB = parseInt(b.id.replace("dynamic-", ""), 10);
        return numA - numB;
      });
    }
  } catch (e) {
    console.error("Error reading public/photo dir:", e);
  }

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
        <PhotoEditing dynamicEdits={dynamicPhotoEdits} />
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
