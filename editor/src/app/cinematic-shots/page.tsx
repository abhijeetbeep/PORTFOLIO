import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import FloatingSocialDock from "@/components/layout/FloatingSocialDock";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/ui/BackButton";
import { personalData } from "@/data/personal";
import { cinematicShots } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Cinematic Shots | ${personalData.logoText}`,
  description: "A premium cinematic shots gallery.",
};

export default function CinematicShotsPage() {
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

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white tracking-tight mb-5 md:mb-6">
              Cinematic Shots
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {cinematicShots.map((shot) => (
                <div
                  key={shot.id}
                  className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_14px_34px_rgba(0,0,0,0.28)]"
                >
                  <Image
                    src={shot.thumbnail}
                    alt={shot.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}