"use client";
import { useRef } from "react";
import { useScroll, motion } from "framer-motion";
import { Milestone } from "@/data/milestones";
import Scene from "./Scene";

export default function TimelineSection({
  milestone,
  index,
  containerRef
}: {
  milestone: Milestone;
  index: number;
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: ref,
    container: containerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  return (
    <section
      ref={ref}
      id={milestone.id}
      className="relative min-w-[100vw] w-full h-screen flex-shrink-0 flex items-center justify-center overflow-hidden snap-center snap-always"
    >
      <Scene milestone={milestone} scrollProgress={scrollXProgress} index={index} />
    </section>
  );
}
