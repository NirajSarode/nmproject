"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Milestone } from "@/data/milestones";

export default function Scene({
  milestone,
  scrollProgress,
  index
}: {
  milestone: Milestone;
  scrollProgress: MotionValue<number>;
  index: number;
}) {

  const layoutStyle = milestone.layoutId ?? (index % 3);
  const isEven = index % 2 === 0;

  const dateParts = milestone.date.split(" ");
  const month = dateParts.length > 1 ? dateParts[0].slice(0, 3) : milestone.date.slice(0, 4);
  const year = dateParts.length > 1 ? dateParts[1] : "NOW";

  // Hooks for Present Slide (6) - MUST be at top level
  const [daysCount, setDaysCount] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    if (layoutStyle !== 6 && layoutStyle !== 10) return;
    const startDate = new Date("2022-04-07");
    const update = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      setDaysCount(diff);
      setCurrentDate(now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [layoutStyle]);

  return (
    <motion.div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Light Overlay - subtle fade for text legibility */}
      <div className="absolute inset-0 z-10 bg-transparent" />
      {/* Dynamic Content wrapper - Overlapping Collage Composition */}
      <div className="relative z-20 flex items-center justify-center p-4 md:p-12 h-full w-full max-w-6xl mx-auto">

        <div className="relative flex flex-col md:flex-row items-center justify-center w-full h-full">

          {/* POLAROID PHOTO AREA - Hidden for Layouts that provide their own integrated images */}
          {layoutStyle !== 1 && layoutStyle !== 3 && layoutStyle !== 4 && layoutStyle !== 5 && layoutStyle !== 6 && layoutStyle !== 10 && (
            <div className={`relative w-full max-w-[70vw] sm:max-w-[240px] md:max-w-[320px] lg:max-w-[380px] shrink-0 z-10 transition-transform ${isEven ? 'md:-mr-16 md:-translate-y-6' : 'md:-ml-16 md:translate-y-6 md:order-2'}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30, rotate: isEven ? -10 : 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: isEven ? -4 : 6 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 45, delay: 0.05 }}
                className="relative p-4 pb-12 md:p-5 md:pb-16 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm w-full group border border-stone-200"
              >
                {/* Taped corner holding the photo to the background */}
                <div className={`absolute -top-4 w-20 h-6 bg-pink-200/50 mix-blend-multiply ${isEven ? '-left-2 rotate-12' : '-right-2 -rotate-12'}`} style={{ clipPath: 'polygon(5% 0%, 98% 5%, 95% 100%, 0% 95%)' }} />

                {/* The Photo Container / Placeholder */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 border border-stone-200/50 flex flex-col items-center justify-center grayscale-[0.3] sepia-[0.2] contrast-110 group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700 shadow-inner">
                  {milestone.backgroundUrl ? (
                    <Image src={milestone.backgroundUrl} alt={milestone.title} fill className="object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-stone-400 opacity-60">
                      <svg className="w-10 h-10 md:w-12 md:h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold">Paste Photo</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* DYNAMIC TEXT PRESENTATION BOX */}
          <div className={`relative w-full ${(layoutStyle === 3 || layoutStyle === 4 || layoutStyle === 5 || layoutStyle === 6 || layoutStyle === 10) ? 'max-w-full md:max-w-5xl' : 'max-w-[85vw] sm:max-w-[300px] md:max-w-[450px] lg:max-w-[550px]'} shrink-0 z-30 transition-transform mt-8 md:mt-0 ${isEven ? 'md:-ml-16 md:translate-y-8' : 'md:-mr-16 md:-translate-y-8 md:order-1'}`}>

            {layoutStyle === 0 && (
              // Style 0: Yellow Sticky Note
              <motion.div
                className="w-full bg-amber-100 shadow-[4px_6px_20px_rgba(0,0,0,0.12)] p-4 sm:p-6 md:p-8 lg:p-10 rotate-[-2deg] relative text-center md:text-left"
                initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
              >
                {/* Tape Strip */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-pink-200/50 mix-blend-multiply rotate-3" style={{ clipPath: 'polygon(5% 0%, 98% 5%, 95% 100%, 0% 95%)' }} />

                {/* Calendar Date Badge */}
                <div className="absolute -top-6 -right-4 md:-top-10 md:-right-8 flex flex-col items-center w-16 md:w-20 bg-[#fdfbf7] rounded-sm shadow-xl border border-stone-300 overflow-hidden z-30 transform rotate-6">
                  <div className="absolute top-1 w-full flex justify-around px-2 z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-800 shadow-inner" />
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-800 shadow-inner" />
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-800 shadow-inner" />
                  </div>
                  <div className="w-full bg-red-600/90 text-white text-[8px] md:text-[10px] font-bold uppercase py-1 pt-3 text-center border-b-2 border-red-800">
                    {year}
                  </div>
                  <div className="flex-1 w-full flex items-center justify-center py-2 text-stone-800 font-serif font-black text-xl md:text-2xl uppercase">
                    {month}
                  </div>
                </div>

                {milestone.location && (
                  <div className="flex items-center gap-1.5 text-rose-500 font-bold text-[9px] sm:text-[10px] md:text-sm uppercase tracking-widest mt-1 mb-1">
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {milestone.location}
                  </div>
                )}
                <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-serif text-stone-800 mb-2 md:mb-3 mt-1 md:pr-10 leading-tight">{milestone.title}</h2>
                <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-stone-700 leading-relaxed font-sans italic opacity-90">{milestone.description}</p>
              </motion.div>
            )}

            {layoutStyle === 1 && (
              // Style 1: Polaroid Front Note
              <motion.div
                className="w-full max-w-[70vw] sm:max-w-[240px] md:max-w-[320px] lg:max-w-[380px] mx-auto bg-[#fafafa] shadow-[0_15px_30px_rgba(0,0,0,0.15)] p-3 pb-6 md:p-5 md:pb-10 relative text-center md:text-left rotate-2"
                initial={{ opacity: 0, y: -20, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 2 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 40, delay: 0.1 }}
              >
                {/* Tape holding the polaroid */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-sky-100/60 mix-blend-multiply rotate-[-4deg] border-b border-sky-200/50" style={{ clipPath: 'polygon(2% 0%, 98% 3%, 95% 100%, 0% 95%)' }} />

                {/* Photo Area */}
                <div className="relative mb-4 md:mb-6">
                  <div className="w-full aspect-[4/3] bg-stone-100 border border-stone-200 flex items-center justify-center overflow-hidden shadow-md">
                    {milestone.images && milestone.images[0] ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={milestone.images[0]} alt={milestone.title} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Scrawled Description underneath */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-stone-700 font-sans rotate-[-2deg] font-medium text-center opacity-90 leading-snug uppercase tracking-wide mb-3 md:mb-5">
                  "{milestone.description}"
                </p>

                <div className="flex justify-between items-end border-t-2 border-stone-100 pt-3 md:pt-4 px-1 md:px-2 relative">
                  <div className="flex flex-col text-left">
                    {milestone.location && (
                      <div className="flex items-center gap-1 text-sky-600/90 font-bold text-[8px] sm:text-[9px] md:text-xs uppercase tracking-widest mb-0.5">
                        <svg className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {milestone.location}
                      </div>
                    )}
                    <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif text-stone-900 leading-tight font-bold capitalize">{milestone.title}</h2>
                  </div>
                  <div className="flex flex-col items-center w-10 md:w-12 bg-white rounded-sm shadow-md border border-stone-200 overflow-hidden transform -rotate-3">
                    <div className="w-full bg-sky-600/90 text-white text-[7px] md:text-[8px] font-bold uppercase py-0.5 md:py-1 text-center border-b border-sky-800">{year}</div>
                    <div className="w-full text-center py-0.5 md:py-1 text-stone-800 font-serif font-bold text-xs md:text-sm uppercase">{month}</div>
                  </div>
                </div>

                {/* ── STYLE 1 DOODLES ── */}
                <motion.div className="absolute top-2 right-2 text-lg z-20" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 4 }}>✨</motion.div>
                <div className="absolute -bottom-6 right-4 rotate-12 opacity-60">
                  <svg width="60" height="30" viewBox="0 0 60 30" fill="none" stroke="#e8796a" strokeWidth="1.5">
                    <path d="M5 25 Q15 5 30 15 T55 5" strokeLinecap="round" strokeDasharray="4 2" />
                  </svg>
                </div>
              </motion.div>
            )}

            {layoutStyle === 2 && (
              // Style 2: Airline Boarding Pass
              <motion.div
                className="w-full max-w-[85vw] sm:max-w-full bg-slate-50 flex flex-col md:flex-row rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.2)] border-2 border-slate-200 overflow-hidden rotate-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 40, delay: 0.1 }}
              >
                {/* Main Ticket Body */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative bg-white">
                  {/* Header line */}
                  <div className="flex justify-between items-center border-b-2 border-slate-800 pb-3 mb-5">
                    <div className="flex items-center gap-2 text-rose-500">
                      <svg className="w-5 h-5 md:w-6 md:h-6 rotate-45 transform -translate-y-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                      </svg>
                      <span className="font-bold tracking-widest uppercase text-xs md:text-sm text-slate-800">Stamp Collective</span>
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-slate-400 hidden md:inline-block">FIRST CLASS PASSENGER</span>
                  </div>

                  {/* Boarding Info */}
                  <div className="mb-4 md:mb-6">
                    <span className="text-[8px] sm:text-[9px] md:text-xs text-rose-400 font-bold uppercase tracking-wider block mb-1">Destination: {milestone.location || 'Forever'}</span>
                    <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-serif text-slate-900 font-bold leading-tight uppercase tracking-wide">{milestone.title}</h2>
                  </div>

                  <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-slate-600 leading-relaxed font-sans">{milestone.description}</p>

                  <div className="mt-8 flex justify-between gap-2 border-t border-slate-100 pt-4">
                    <div>
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date</span>
                      <span className="font-mono text-xs md:text-sm font-bold text-slate-800">{milestone.date}</span>
                    </div>
                    <div>
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Gate</span>
                      <span className="font-mono text-xs md:text-sm font-bold text-slate-800">A4</span>
                    </div>
                    <div>
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Seat</span>
                      <span className="font-mono text-xs md:text-sm font-bold text-slate-800">1A</span>
                    </div>
                  </div>
                  {/* ── STYLE 2 DOODLE ── */}
                  <motion.div className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl opacity-20 pointer-events-none" animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }}>☁️</motion.div>
                </div>

                {/* Detachable Stub */}
                <div className="w-full md:w-20 border-t-2 md:border-t-0 border-l-0 md:border-l-2 border-dashed border-slate-300 bg-slate-100 flex flex-row md:flex-col items-center justify-between py-4 px-6 md:px-0 md:py-6 shrink-0">
                  <div className="md:[writing-mode:vertical-rl] md:rotate-180 text-[10px] md:text-xs font-bold text-slate-400 tracking-widest uppercase mb-0 md:mb-4">
                    Admit Two
                  </div>
                  {/* Fake Barcode */}
                  <div className="flex-1 w-full flex flex-row md:flex-col items-center justify-center gap-[2px] opacity-70 overflow-hidden">
                    {[1, 3, 2, 1, 2, 1, 4, 1, 2, 1, 3, 2, 1, 4, 2, 3, 1, 2].map((height, i) => (
                      <div key={i} className="h-6 md:h-auto md:w-10 bg-slate-800" style={typeof window !== 'undefined' && window.innerWidth < 768 ? { width: `${height}px` } : { height: `${height}px` }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {layoutStyle === 3 && (
              // Style 3: Scattered Polaroid Collage
              <div className="relative w-full h-[65vh] min-h-[450px] flex items-center justify-center overflow-visible">
                {/* Center Title Tile */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", delay: 0.05 }}
                  className="absolute z-40 bg-white p-5 md:p-8 shadow-2xl border border-stone-200 rotate-[-1deg] max-w-[280px] md:max-w-[350px] text-center"
                >
                  <h2 className="text-xl md:text-3xl font-serif text-stone-900 leading-tight mb-3 tracking-wide">{milestone.title}</h2>
                  <p className="text-sm text-stone-600 font-sans italic">{milestone.description}</p>
                </motion.div>

                {/* Scattered Pictures */}
                {[
                  { top: '0%', left: '0%', rotate: -12, delay: 0.1, caption: "Coorg" },
                  { top: '65%', left: '5%', rotate: 8, delay: 0.15, caption: "Spiti Valley" },
                  { top: '5%', left: '70%', rotate: 15, delay: 0.2, caption: "Goaaaa" },
                  { top: '60%', left: '65%', rotate: -6, delay: 0.25, caption: "Kerala" },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-32 sm:w-40 md:w-56 bg-zinc-50 p-3 pb-10 md:pb-14 shadow-xl border border-stone-200 z-10"
                    style={{ top: pos.top, left: pos.left }}
                    initial={{ opacity: 0, scale: 0.6, rotate: pos.rotate - 20 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: pos.rotate }}
                    transition={{ type: "spring", delay: pos.delay }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-amber-100/50 mix-blend-multiply rotate-3 border-b border-amber-200/30" style={{ clipPath: 'polygon(5% 0%, 98% 5%, 95% 100%, 0% 95%)' }} />
                    <div className="w-full aspect-[4/3] bg-stone-200/80 flex items-center justify-center overflow-hidden shadow-inner border border-stone-300/50">
                      {milestone.images && milestone.images[i] ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={milestone.images[i]}
                          alt={pos.caption}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-stone-400 font-black text-xs md:text-sm tracking-widest opacity-50 uppercase">Photo {i + 1}</span>
                      )}
                    </div>
                    <div className="absolute bottom-2 md:bottom-4 left-0 w-full text-center text-stone-600 font-sans font-medium text-[8px] md:text-[11px] px-2 italic uppercase">"{pos.caption}"</div>
                  </motion.div>
                ))}
              </div>
            )}

            {layoutStyle === 4 && (
              // Style 4: Ripped Sketchpad Blank Canvas "Future"
              <motion.div
                className="relative w-full max-w-[85vw] sm:max-w-2xl mx-auto flex flex-col items-center justify-center rotate-1 mt-8 md:mt-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              >
                {/* Tape holding the sketchpad */}
                <div className="absolute -top-5 left-1/4 w-28 h-10 bg-amber-200/60 mix-blend-multiply -rotate-3 z-30" style={{ clipPath: 'polygon(2% 0%, 98% 3%, 95% 100%, 0% 95%)' }} />
                <div className="absolute -top-4 right-1/4 w-24 h-8 bg-amber-200/60 mix-blend-multiply rotate-4 z-30" style={{ clipPath: 'polygon(0% 0%, 100% 5%, 90% 100%, 5% 90%)' }} />

                <div className="relative w-full bg-[#fdfaf5] shadow-2xl p-8 sm:p-12 md:p-16 border-l-4 border-stone-200/70"
                     style={{
                       clipPath: 'polygon(0 0, 100% 1%, 99% 99%, 0 100%)' // Slightly irregular shape
                     }}>
                  
                  {/* Spiral rings effect on left edge */}
                  <div className="absolute left-[-12px] top-0 bottom-0 flex flex-col justify-evenly">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-5 h-2 bg-stone-300 rounded-full shadow-inner rotate-3" />
                    ))}
                  </div>

                  {/* Date Badge like a quick scribble */}
                  <div className="inline-block text-stone-600 font-sans italic opacity-80 border-b-2 border-stone-400 border-dashed mb-6 md:mb-8 text-sm md:text-md">
                    {milestone.date}
                  </div>

                  {/* Title */}
                  <motion.h2
                    className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6 md:mb-8 text-stone-800 tracking-tight"
                  >
                    {milestone.title}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    className="font-sans text-base sm:text-lg md:text-xl leading-relaxed text-stone-600 mb-10"
                  >
                    {milestone.description}
                  </motion.p>
                  
                  {/* Big Doodle Arrow pointing right/down */}
                  <div className="absolute bottom-6 right-6 opacity-40 rotate-[20deg]">
                    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" stroke="#2c2416" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 40 Q 50 10 90 70 M 70 70 L 90 70 L 85 50" strokeDasharray="5 3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}

            {layoutStyle === 5 && (() => {
              // Style 5: Scrapbook Timeline (Hand-drawn style)
              const yearEntries = [
                { year: "2022", label: "We Met 🫂", note: "Where it all began", rotate: -4 },
                { year: "2023", label: "Grew Closer", note: "Learning each other", rotate: 2 },
                { year: "2024", label: "LDR Chapter", note: "Distance, defeated", rotate: -2 },
                { year: "2025", label: "The World", note: "NYC & Japan together", rotate: 5 },
                { year: "2026", label: "4 Years 🎉", note: "And counting…", rotate: -3 },
              ];
              return (
                <motion.div
                  className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center px-4 py-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <div className="text-center mb-16 relative">
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-stone-800 -rotate-2 bg-amber-100 px-4 py-2 inline-block shadow-sm">
                      {milestone.title}
                    </h2>
                    <p className="text-md italic text-stone-600 mt-4 max-w-md mx-auto">{milestone.description}</p>
                    {/* Wavy underline doodle */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-50">
                      <svg width="200" height="20" viewBox="0 0 200 20" fill="none" stroke="#e8796a" strokeWidth="2">
                        <path d="M 0 10 Q 25 0 50 10 T 100 10 T 150 10 T 200 10" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4 mt-8">
                    {/* Scrawled Connector Line */}
                    <motion.div
                      className="absolute hidden md:block top-12 left-10 right-10 h-0"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.5 }}
                    >
                      <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none">
                        <path d="M 0 0 C 100 -20, 300 20, 500 0 S 700 -20, 1000 0" fill="none" stroke="#2c2416" strokeWidth="2" strokeDasharray="6 4" />
                      </svg>
                    </motion.div>

                    {yearEntries.map((entry, i) => (
                      <motion.div
                        key={entry.year}
                        className="relative flex flex-col items-center z-10 w-full md:w-32"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15, type: "spring" }}
                      >
                        {/* Polaroid-like year badge */}
                        <div 
                          className="bg-white p-3 shadow-md mb-4 border border-stone-200"
                          style={{ transform: `rotate(${entry.rotate}deg)` }}
                        >
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-red-200/50 mix-blend-multiply rotate-4" />
                          <span className="font-serif font-black text-xl md:text-2xl text-stone-800 tracking-tighter">{entry.year}</span>
                        </div>

                        {/* Hand-written labels */}
                        <div className="text-center mt-2">
                          <div className="font-sans font-bold text-sm text-stone-800 uppercase tracking-widest">{entry.label}</div>
                          <div className="font-sans italic text-xs text-stone-500 mt-1">{entry.note}</div>
                        </div>

                        {/* Vertical line for mobile */}
                        {i < yearEntries.length - 1 && (
                          <div className="md:hidden mt-6 opacity-30">
                            <svg width="2" height="40" viewBox="0 0 2 40" fill="none" stroke="#2c2416" strokeWidth="2" strokeDasharray="4 4">
                              <path d="M 1 0 L 1 40" />
                            </svg>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })()}

            {layoutStyle === 6 && (
              // Style 6: Collage "Present" Board
              <motion.div
                className="relative w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 py-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* LEFT: Polaroid Photo pinned */}
                <motion.div 
                  className="relative w-[70vw] max-w-[300px] sm:max-w-[350px] shrink-0 bg-white p-4 pb-16 shadow-[0_15px_30px_rgba(0,0,0,0.15)] -rotate-3 z-20 border border-stone-200"
                  initial={{ x: -30, rotate: -10 }}
                  whileInView={{ x: 0, rotate: -3 }}
                >
                  {/* Push pin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 z-30">
                    <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm mx-auto border border-red-700" />
                    <div className="w-1 h-3 bg-stone-300 mx-auto -mt-1" />
                  </div>
                  
                  <div className="w-full aspect-[4/5] bg-stone-100 flex items-center justify-center overflow-hidden border border-stone-200">
                    {milestone.backgroundUrl ? (
                      <Image src={milestone.backgroundUrl} alt={milestone.title} fill className="object-cover sepia-[0.1]" />
                    ) : (
                      <span className="font-bold text-stone-400 uppercase tracking-widest text-sm text-center">Current<br/>Photo</span>
                    )}
                  </div>
                  <div className="absolute bottom-5 w-full left-0 text-center text-stone-800 font-sans font-medium text-lg rotate-1 italic">
                    {currentDate || milestone.date}
                  </div>
                </motion.div>

                {/* RIGHT: Tape note with text */}
                <motion.div 
                  className="relative flex-1 bg-[#fefce8] p-6 sm:p-8 shadow-lg rotate-2 border border-yellow-100 w-full max-w-[85vw] md:max-w-none mx-auto"
                  initial={{ x: 30, rotate: 10 }}
                  whileInView={{ x: 0, rotate: 2 }}
                >
                  <div className="absolute -top-4 right-10 w-20 h-8 bg-blue-200/50 mix-blend-multiply rotate-6" style={{ clipPath: 'polygon(0% 0%, 100% 5%, 90% 100%, 5% 90%)' }} />
                  
                  <div className="inline-block px-2 py-1 bg-black text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest mb-4 rotate-[-2deg]">
                    {milestone.location || "Today"}
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 mb-4 tracking-tight leading-none">
                    {milestone.title}
                  </h2>
                  <p className="font-sans text-stone-600 text-base sm:text-lg italic leading-relaxed mb-6">
                    "{milestone.description}"
                  </p>

                  <div className="mt-8 border-t-2 border-stone-200 border-dashed pt-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif font-black text-4xl sm:text-5xl md:text-6xl text-rose-500">
                        {daysCount > 0 ? daysCount.toLocaleString() : "···"}
                      </span>
                      <span className="font-sans text-stone-500 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest">
                        Days & Counting
                      </span>
                    </div>
                  </div>
                  
                  {/* Scribble Doodle */}
                  <div className="absolute bottom-2 right-4 opacity-40 w-12 sm:w-16">
                    <svg viewBox="0 0 100 100" fill="none" stroke="#2c2416" strokeWidth="3">
                      <path d="M10 50 Q 30 20 50 50 T 90 50" strokeLinecap="round" strokeDasharray="4 2" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {layoutStyle === 10 && (
              // Style 10: LDR — The Scrapbook Connection (Floating on Global Background)
              <div className="relative w-full max-w-5xl mx-auto h-[75vh] min-h-[550px] flex items-center justify-center p-6 overflow-visible">

                {/* ── CENTRAL SCRIBBLE LINK ── */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 800 500">
                  <motion.path
                    d="M 180 280 C 240 340, 200 440, 400 380 S 560 440, 620 280"
                    stroke="#e8796a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                  {/* Little "doodle airplane" moving along the jagged path */}
                  <motion.text
                    fontSize="24"
                    animate={{ x: [180, 240, 400, 560, 620], y: [280, 340, 380, 440, 280] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="opacity-60"
                  >
                    ✈
                  </motion.text>
                </svg>

                {/* ── LEFT POLAROID: BANGALORE WINDOW ── */}
                <motion.div
                  className="relative z-20 bg-white p-3 pb-12 shadow-xl border border-stone-200 -rotate-6 w-[180px] md:w-[220px]"
                  initial={{ x: -100, opacity: 0, rotate: -20 }}
                  whileInView={{ x: 0, opacity: 1, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 40, delay: 0.1 }}
                >
                  <div className="absolute -top-4 -left-2 w-16 h-6 bg-pink-200/40 mix-blend-multiply rotate-12 z-30" style={{ clipPath: 'polygon(0% 0%, 100% 5%, 90% 100%, 5% 90%)' }} />
                  <div className="w-full aspect-[1/1.2] bg-sky-50 overflow-hidden relative border border-stone-100 flex items-center justify-center">
                    {milestone.images && milestone.images[0] ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={milestone.images[0]} alt="Bangalore" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-full h-full p-4 opacity-50" viewBox="0 0 200 240">
                        <path d="M20 220 V160 H60 V120 H100 V180 H140 V150 H180 V220" stroke="#8B7355" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <circle cx="150" cy="60" r="15" stroke="#fcd34d" strokeWidth="2" fill="none" strokeDasharray="4 2" />
                      </svg>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-xl font-serif text-stone-900 leading-none">Bangalore</span>
                    <div className="mt-2 text-[9px] font-mono text-stone-400 italic">{currentTime || "--:--"} IST</div>
                  </div>
                </motion.div>

                {/* ── CENTRE JOURNAL CARD ── */}
                <motion.div
                  className="relative z-30 mx-[-40px] bg-[#fdfaf5] p-7 md:p-10 shadow-2xl border-x-4 border-stone-100 w-[240px] md:w-[340px] text-center"
                  initial={{ y: 30, opacity: 0, scale: 0.9 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {/* Metal Paper Clip Sticker (using SVG) */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-12 opacity-80 z-40 rotate-12">
                    <svg viewBox="0 0 24 64" fill="none" stroke="#94a3b8" strokeWidth="2.5">
                      <path d="M4 48 V8 C4 4, 20 4, 20 8 V56 C20 60, 4 60, 4 56 V16 C4 12, 12 12, 12 16 V48" strokeLinecap="round" />
                    </svg>
                  </div>

                  <h2 className="font-serif text-2xl md:text-4xl text-stone-900 leading-tight mb-4 tracking-tighter">{milestone.title}</h2>
                  <p className="font-sans text-xs md:text-sm text-stone-700 italic leading-relaxed opacity-85">
                    "{milestone.description}"
                  </p>
                </motion.div>

                {/* ── RIGHT POLAROID: NYC WINDOW ── */}
                <motion.div
                  className="relative z-20 bg-white p-3 pb-12 shadow-xl border border-stone-200 rotate-6 w-[180px] md:w-[220px]"
                  initial={{ x: 100, opacity: 0, rotate: 20 }}
                  whileInView={{ x: 0, opacity: 1, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 40, delay: 0.2 }}
                >
                  <div className="absolute -top-4 -right-2 w-16 h-6 bg-blue-200/40 mix-blend-multiply -rotate-12 z-30" style={{ clipPath: 'polygon(10% 5%, 100% 0%, 95% 90%, 0% 100%)' }} />
                  <div className="w-full aspect-[1/1.2] bg-indigo-50/30 overflow-hidden relative border border-stone-100 flex items-center justify-center">
                    {milestone.images && milestone.images[1] ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={milestone.images[1]} alt="New York" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-full h-full p-4 opacity-50" viewBox="0 0 200 240">
                        <path d="M40 220 V60 H80 V20 H120 V100 H160 V40 H200 V220" stroke="#1e1b4b" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <motion.circle cx="160" cy="50" r="10" stroke="#e8796a" strokeWidth="1" fill="none" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} />
                      </svg>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-xl font-serif text-stone-900 leading-none">New York</span>
                    <div className="mt-2 text-[9px] font-mono text-stone-400 italic">9:41 PM EST</div>
                  </div>
                </motion.div>

                {/* ── SCATTERED TOUCHES: Tape & Hearts ── */}
                <motion.div
                  className="absolute bottom-[5%] left-[5%] opacity-40 z-10 scale-75"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <div className="w-16 h-16 border-2 border-stone-200 rounded-lg p-2 rotate-12">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <path d="M50 90 C 20 60 10 40 10 25 C 10 10 30 5 50 20 C 70 5 90 10 90 25 C 90 40 80 60 50 90 Z" fill="#f43f5e" opacity="0.4" />
                    </svg>
                  </div>
                </motion.div>

              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
