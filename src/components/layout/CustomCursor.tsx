"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const ringX = useSpring(0, { stiffness: 200, damping: 20 });
  const ringY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    /* Hide on touch devices */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    window.addEventListener("mousemove", move);

    /* Watch for interactive elements */
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-cursor-hover], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    document.querySelectorAll("a, button, [data-cursor-hover], input, textarea, select").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: hovering ? 12 : 8,
          height: hovering ? 12 : 8,
          borderRadius: "50%",
          backgroundColor: "#fff",
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.6)",
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
      />
    </>
  );
}
