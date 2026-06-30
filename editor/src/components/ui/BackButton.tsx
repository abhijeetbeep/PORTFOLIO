"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

type BackButtonProps = {
  className?: string;
};

export default function BackButton({ className = "" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-blue-400/30 hover:bg-white/10 hover:text-white ${className}`}
    >
      <FaArrowLeft size={14} />
      Back
    </button>
  );
}