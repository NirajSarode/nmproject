"use client";
import { useState, useRef } from "react";
import { Music, Music4 } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} loop src="/music/music.mp3" />
      <motion.button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white/40 backdrop-blur-md text-stone-800 border border-white/50 hover:bg-white/60 transition-all shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Music size={24} className="animate-pulse text-rose-500" /> : <Music4 size={24} />}
      </motion.button>
    </>
  );
}
