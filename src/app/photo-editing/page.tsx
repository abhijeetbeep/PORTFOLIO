import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import FloatingSocialDock from "@/components/layout/FloatingSocialDock";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/ui/BackButton";
import PhotoEditingGallery from "@/components/portfolio/PhotoEditingGallery";
import { personalData } from "@/data/personal";
import { scanPhotoGalleryItems } from "@/lib/portfolio-gallery";

export const metadata: Metadata = {
  title: `Photo Editing Projects | ${personalData.logoText}`,
  description: "A premium collection of photo editing, retouching, and before/after transformations.",
};

export default function PhotoEditingPage() {
  const items = scanPhotoGalleryItems().filter((item) => item.type === "comparison");

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <FloatingSocialDock />

      <main className="pt-24 md:pt-28">
        <section className="pb-10 md:pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-5 md:mb-6 flex items-start justify-start">
              <BackButton />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-white tracking-tight mb-5 md:mb-6">
              Photo Editing Projects
            </h1>

            <PhotoEditingGallery items={items} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}