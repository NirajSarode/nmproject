"use client";
import { milestones } from "@/data/milestones";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProgressIndicator({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = milestones.map(m => document.getElementById(m.id));
      let currentIdx = 0;
      let minDistance = Infinity;
      
      const scrollContainer = containerRef.current;
      if (!scrollContainer) return;

      sections.forEach((section, idx) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        // Distance from center of screen horizontally
        const distance = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);
        if (distance < minDistance) {
          minDistance = distance;
          currentIdx = idx;
        }
      });

      setActiveSection(currentIdx);
    };

    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      // Initial call
      handleScroll();
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [containerRef]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 bg-white/40 p-3 rounded-full backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-white/50">
      {milestones.map((_, idx) => (
        <motion.div
          key={idx}
          className={`w-3 h-3 rounded-full transition-colors duration-500 cursor-pointer ${
            activeSection === idx ? "bg-rose-500" : "bg-stone-400/50 hover:bg-rose-300"
          }`}
          animate={{ scale: activeSection === idx ? 1.5 : 1 }}
          onClick={() => {
            const target = document.getElementById(milestones[idx].id);
            if (containerRef.current && target) {
              containerRef.current.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
            }
          }}
        />
      ))}
    </div>
  );
}
