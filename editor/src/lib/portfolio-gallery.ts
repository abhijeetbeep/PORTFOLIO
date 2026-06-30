import fs from "fs";
import path from "path";
import { graphicDesigns } from "@/data/portfolio";
import { getImageDimensions } from "@/utils/imageMetadata";

export type PhotoGalleryItem =
  | {
      id: string;
      type: "comparison";
      title: string;
      category: string;
      before: string;
      after: string;
      width: number;
      height: number;
    }
  | {
      id: string;
      type: "image";
      title: string;
      category: string;
      src: string;
      width: number;
      height: number;
    };

export type GraphicGalleryItem = {
  id: number;
  title: string;
  category: string;
  src: string;
  width: number;
  height: number;
  description: string;
};

const photoSeries = [
  { id: "1", title: "Professional Portrait Retouching", category: "Retouching" },
  { id: "2", title: "Advanced Color Correction", category: "Color Grading" },
  { id: "3", title: "Cinematic Photo Enhancement", category: "Product Editing" },
  { id: "4", title: "Creative Visual Transformation", category: "HDR" },
  { id: "5", title: "Premium Photo Restoration", category: "Restoration" },
  { id: "6", title: "Professional Image Finishing", category: "Cinematic" },
];

function getDimensions(filePath: string) {
  try {
    return getImageDimensions(filePath);
  } catch {
    return { width: 1920, height: 1080 };
  }
}

export function scanPhotoGalleryItems(workspacePath = process.cwd()): PhotoGalleryItem[] {
  const photoDir = path.join(workspacePath, "public", "photo");
  if (!fs.existsSync(photoDir)) return [];

  const files = fs.readdirSync(photoDir);
  const items: PhotoGalleryItem[] = [];

  for (const series of photoSeries) {
    const beforeFile = files.find((file) => new RegExp(`^before${series.id}\\.(webp|png|jpg|jpeg)$`, "i").test(file));
    const afterFile = files.find((file) => new RegExp(`^after${series.id}\\.(webp|png|jpg|jpeg)$`, "i").test(file));

    if (!beforeFile && !afterFile) continue;

    const fileToMeasure = beforeFile || afterFile;
    const dims = fileToMeasure ? getDimensions(path.join(photoDir, fileToMeasure)) : { width: 1920, height: 1080 };

    items.push({
      id: `comparison-${series.id}`,
      type: "comparison",
      title: series.title,
      category: series.category,
      before: beforeFile ? `/photo/${beforeFile}` : "/photo/placeholder.png",
      after: afterFile ? `/photo/${afterFile}` : "/photo/placeholder.png",
      width: dims.width,
      height: dims.height,
    });
  }

  const cinematicFiles = files
    .filter((file) => /^cinematic\d+\.(webp|png|jpg|jpeg)$/i.test(file))
    .sort((a, b) => {
      const aNum = parseInt(a.match(/cinematic(\d+)/i)?.[1] || "0", 10);
      const bNum = parseInt(b.match(/cinematic(\d+)/i)?.[1] || "0", 10);
      return aNum - bNum;
    });

  cinematicFiles.forEach((file, index) => {
    const dims = getDimensions(path.join(photoDir, file));
    items.push({
      id: `cinematic-${index + 1}`,
      type: "image",
      title: `Cinematic Shot ${index + 1}`,
      category: "Cinematic",
      src: `/photo/${file}`,
      width: dims.width,
      height: dims.height,
    });
  });

  if (files.includes("placeholder.png")) {
    items.push({
      id: "placeholder",
      type: "image",
      title: "Placeholder Asset",
      category: "Reference",
      src: "/photo/placeholder.png",
      width: 1920,
      height: 1080,
    });
  }

  return items;
}

export function getGraphicGalleryItems(): GraphicGalleryItem[] {
  return graphicDesigns.map((design) => ({
    id: design.id,
    title: design.title,
    category: design.category.replace("-", " "),
    src: design.thumbnail,
    width: design.width,
    height: design.height,
    description: design.description,
  }));
}