export interface Skill {
  name: string;
  percentage: number;
  icon: string;
  color: string;
}

export const skills: Skill[] = [
  { name: "Premiere Pro", percentage: 95, icon: "premiere", color: "#9999FF" },
  { name: "After Effects", percentage: 90, icon: "aftereffects", color: "#CF96FD" },
  { name: "Photoshop", percentage: 92, icon: "photoshop", color: "#31A8FF" },
  { name: "Lightroom", percentage: 88, icon: "lightroom", color: "#31A8FF" },
  { name: "DaVinci Resolve", percentage: 85, icon: "davinci", color: "#FF6B35" },
  { name: "Illustrator", percentage: 80, icon: "illustrator", color: "#FF9A00" },
];
