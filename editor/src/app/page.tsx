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
        <Photography />
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
