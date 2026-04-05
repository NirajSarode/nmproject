"use client";
import TimelineSection from "@/components/TimelineSection";
import TimelineProgress from "@/components/TimelineProgress";
import DoodleCanvas from "@/components/DoodleCanvas";
import { milestones } from "@/data/milestones";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative w-full h-screen bg-[#fdfbf7] text-stone-900 font-sans overflow-hidden">

      {/* 1. Bottom-most layer: Massive Background Canvas */}
      <DoodleCanvas containerRef={containerRef} totalMilestones={milestones.length} />

      {/* 2. Middle layer: Native Scroller rendering the Text Cards (Scenes) */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-x-scroll overflow-y-hidden flex snap-x snap-mandatory scroll-smooth z-20"
      >
        {milestones.map((milestone, index) => (
          <TimelineSection
            key={milestone.id}
            milestone={milestone}
            index={index}
            containerRef={containerRef}
          />
        ))}
      </div>

      {/* 3. Top-most layer: The Floating Timeline */}
      <div className="absolute bottom-0 left-0 w-full z-40 pointer-events-none bg-transparent h-44 shadow-[0_-40px_60px_-15px_rgba(253,251,247,0.8)] backdrop-blur-[2px]">
        {/* We pass the background blend up to the Timeline component */}
        <TimelineProgress containerRef={containerRef} />
      </div>

    </main>
  );
}
