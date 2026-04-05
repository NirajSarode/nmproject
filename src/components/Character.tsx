"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Character({ imageUrl, animationType }: { imageUrl: string; animationType: string }) {
  // Determine variant based on animation string
  const initial = animationType === 'fade-slide' ? { opacity: 0, x: -50 } : { opacity: 0, y: 50 };
  const visible = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div 
      initial={initial}
      whileInView={visible}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 1, type: "spring", bounce: 0.2, delay: 0.3 }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-full max-w-lg h-[40vh] md:h-[50vh] pointer-events-none"
    >
      <div className="relative w-full h-full flex justify-center items-end mix-blend-lighten">
        <Image
          src={imageUrl}
          alt="Characters"
          width={400}
          height={600}
          className="object-contain h-full w-auto drop-shadow-2xl opacity-90"
        />
      </div>
    </motion.div>
  );
}
