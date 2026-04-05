"use client";
import { milestones } from "@/data/milestones";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function TimelineProgress({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: "x"
  });

  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    // Math.round ensures we hit the exact milestone index as we scroll close to its section
    const index = Math.round(latest * (milestones.length - 1));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Calculate percentage width for the glowing progress line
  const progressPercent = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  // Standard strings (0% to -100%) so Framer Motion interpolates perfectly.
  const trackX = useTransform(scrollXProgress, [0, 1], ["0%", "-100%"]);

  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none flex items-end pb-8 sm:pb-12 md:pb-16 lg:pb-20 bg-transparent">

      {/* Centered Running Avatar - Always stays locked perfectly in the middle of the screen! */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-40 pb-2 md:pb-3 pointer-events-none">
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-[3px] border-[#f1f1f1] bg-[#fafafa] shadow-[0_10px_20px_rgba(0,0,0,0.1)] flex justify-center items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/avatar.png" alt="Couple Tracking" className="object-cover w-[110%] h-[110%] mix-blend-multiply opacity-90" />
        </motion.div>
      </div>

      {/* Wrapper locked to exact center of screen */}
      <div className="absolute inset-y-0 left-1/2 w-full pointer-events-none">
        {/* Endless Translating Treadmill Track moving from 0% to -100% */}
        <motion.div
          className="relative flex items-center shrink-0 h-full pointer-events-auto"
          style={{
            width: `${Math.max(100, milestones.length * 25)}vw`,
            x: trackX
          }}
        >
          <div className="relative w-full h-1 md:h-1.5">
            {/* Base line */}
            <div className="absolute inset-0 bg-stone-300/60 backdrop-blur-sm rounded-full" />

            {/* Glowing progress line perfectly stretches matching track translation */}
            <motion.div
              suppressHydrationWarning
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-pink-400 via-rose-500 to-purple-600 rounded-full"
              style={{ width: progressPercent }}
            >
              {/* Glow shadow */}
              <div className="absolute inset-0 bg-rose-500 blur-sm rounded-full opacity-80" />
            </motion.div>

            {/* Milestones mapped natively across the track width */}
            <div className="absolute inset-0 z-20">
              {milestones.map((milestone, i) => {
                const isReached = activeIndex >= i;
                const isCurrent = activeIndex === i;
                const leftPercent = (i / (milestones.length - 1)) * 100;

                return (
                  <div
                    id={`timeline-node-${i}`}
                    key={milestone.id}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group shrink-0"
                    style={{ left: `${leftPercent}%` }}
                    onClick={() => {
                      const target = document.getElementById(milestone.id);
                      if (containerRef.current && target) {
                        containerRef.current.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
                      }
                    }}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      {isReached ? (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-[#f1f1f1] bg-[#fafafa] flex items-center justify-center shadow-md">
                          <img src="/avatar.png" alt="Milestone Avatar" className="object-cover w-[110%] h-[110%] mix-blend-multiply opacity-80" />
                        </div>
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-white group-hover:bg-rose-300 transition-colors shadow-sm" />
                      )}
                    </div>

                    {/* Milestone text below */}
                    <motion.div
                      className="absolute top-6 sm:top-8 md:top-10 flex flex-col items-center whitespace-nowrap bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg"
                      animate={{
                        opacity: isCurrent ? 1 : 0.7,
                        y: isCurrent ? 0 : -4,
                        scale: isCurrent ? 1.05 : 1
                      }}
                    >
                      <span className={`text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-wider ${isCurrent ? 'text-rose-300 font-extrabold drop-shadow-md' : 'text-white'}`}>
                        {milestone.date}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
