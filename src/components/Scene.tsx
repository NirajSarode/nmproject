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
              // Style 4: Elegant Letterpress Blank Canvas "Future"
              <motion.div
                className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Outer parchment frame */}
                <div className="relative w-full" style={{ background: 'linear-gradient(135deg, #faf7f0 0%, #f5f0e8 50%, #faf7f0 100%)' }}>
                  {/* Subtle paper grain overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
                  />

                  {/* Outer border */}
                  <div className="absolute inset-0 border-2 pointer-events-none" style={{ borderColor: 'rgba(180,155,100,0.25)' }} />
                  {/* Inner border inset */}
                  <div className="absolute inset-3 border pointer-events-none" style={{ borderColor: 'rgba(180,155,100,0.15)' }} />

                  {/* Corner flourishes */}
                  {[['top-2 left-2', '0'], ['top-2 right-2', '90deg'], ['bottom-2 right-2', '180deg'], ['bottom-2 left-2', '270deg']].map(([pos, rot], i) => (
                    <div key={i} className={`absolute ${pos} w-6 h-6 md:w-8 md:h-8 pointer-events-none`} style={{ transform: `rotate(${rot})`, opacity: 0.4 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1">
                        <path d="M2 2 L8 2 M2 2 L2 8 M2 2 Q5 5 8 8" strokeLinecap="round" />
                      </svg>
                    </div>
                  ))}

                  {/* Main content */}
                  <div className="relative px-8 sm:px-14 md:px-20 py-12 sm:py-16 md:py-20 flex flex-col items-center text-center">

                    {/* Animated ink quill at top */}
                    <motion.div
                      className="mb-8 md:mb-10"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    >
                      <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 40 40" fill="none" stroke="#a07850" strokeWidth="1.2">
                        <path d="M32 4 C28 8, 12 18, 8 36 M8 36 C10 30, 16 26, 20 24 M20 24 C14 22, 12 28, 10 34 M32 4 C36 6, 38 12, 34 16 C30 20, 20 24 20 24" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>

                    {/* Date as small caps eyebrow */}
                    <motion.div
                      className="tracking-[0.4em] text-[10px] md:text-xs uppercase font-sans mb-5 md:mb-6"
                      style={{ color: '#a07850', opacity: 0.7 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.7 }}
                      transition={{ delay: 0.35, duration: 0.8 }}
                    >
                      {milestone.date}
                    </motion.div>

                    {/* Ornamental rule */}
                    <motion.div
                      className="flex items-center gap-3 mb-8 md:mb-10 w-48 md:w-72"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <div className="flex-1 h-[0.5px]" style={{ background: 'linear-gradient(to right, transparent, rgba(160,120,80,0.4))' }} />
                      <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(160,120,80,0.5)' }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(160,120,80,0.6)' }} />
                      <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(160,120,80,0.5)' }} />
                      <div className="flex-1 h-[0.5px]" style={{ background: 'linear-gradient(to left, transparent, rgba(160,120,80,0.4))' }} />
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 md:mb-8"
                      style={{ color: '#2c2416', letterSpacing: '-0.01em' }}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.9 }}
                    >
                      {milestone.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      className="font-sans text-base sm:text-lg md:text-xl leading-relaxed max-w-xl md:max-w-2xl italic"
                      style={{ color: 'rgba(80,60,40,0.65)' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 1 }}
                    >
                      {milestone.description}
                    </motion.p>

                    {/* Bottom ornament + breathing CTA */}
                    <motion.div
                      className="mt-10 md:mt-14 flex flex-col items-center gap-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                    >
                      <motion.p
                        className="font-serif text-sm md:text-base"
                        style={{ color: 'rgba(160,120,80,0.5)', letterSpacing: '0.12em' }}
                        animate={{ opacity: [0.35, 0.7, 0.35] }}
                        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                      >
                        To be written together…
                      </motion.p>

                      {/* ── STYLE 4 DOODLES ── */}
                      <motion.div className="absolute -top-10 -right-10 opacity-30 pointer-events-none" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#a07850" strokeWidth="1">
                          <path d="M50 10 L55 45 L90 50 L55 55 L50 90 L45 55 L10 50 L45 45 Z" />
                        </svg>
                      </motion.div>
                    </motion.div>

                  </div>
                </div>
              </motion.div>
            )}

            {layoutStyle === 5 && (() => {
              // Style 5: 4-Year Anniversary Timeline
              const yearEntries = [
                { year: "2022", label: "We Met 🫂", icon: "✦", color: "#e8796a", note: "Where it all began" },
                { year: "2023", label: "Grew Closer", icon: "✿", color: "#d4896b", note: "Learning each other" },
                { year: "2024", label: "LDR Chapter", icon: "✈", color: "#b07a8a", note: "Distance, defeated" },
                { year: "2025", label: "The World", icon: "♡", color: "#7a8ab0", note: "NYC & Japan together" },
                { year: "2026", label: "4 Years 🎉", icon: "★", color: "#8B7355", note: "And counting…" },
              ];
              return (
                <motion.div
                  className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center px-4 sm:px-8 py-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Parchment card */}
                  <div
                    className="relative w-full rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.12)] border"
                    style={{
                      background: "linear-gradient(135deg, #faf7f0 0%, #f5f0e8 50%, #faf7f0 100%)",
                      borderColor: "rgba(180,155,100,0.3)"
                    }}
                  >
                    {/* Corner flourishes */}
                    {[["top-2 left-2", "0"], ["top-2 right-2", "90deg"], ["bottom-2 right-2", "180deg"], ["bottom-2 left-2", "270deg"]].map(([pos, rot], i) => (
                      <div key={i} className={`absolute ${pos} w-6 h-6 pointer-events-none`} style={{ transform: `rotate(${rot})`, opacity: 0.4 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1">
                          <path d="M2 2 L8 2 M2 2 L2 8 M2 2 Q5 5 8 8" strokeLinecap="round" />
                        </svg>
                      </div>
                    ))}

                    <div className="px-6 sm:px-12 md:px-16 py-10 md:py-14 flex flex-col items-center text-center">

                      {/* Header */}
                      <motion.div
                        className="tracking-[0.4em] text-[10px] md:text-xs uppercase font-sans mb-3"
                        style={{ color: "#a07850", opacity: 0.7 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.7 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                      >
                        {milestone.location}
                      </motion.div>

                      <motion.h2
                        className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-2"
                        style={{ color: "#2c2416" }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      >
                        {milestone.title}
                      </motion.h2>

                      {/* ── STYLE 5 DOODLES ── */}
                      <motion.div className="absolute top-10 right-10 text-3xl opacity-40 z-20" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }}>🎈</motion.div>
                      <motion.div className="absolute bottom-10 left-10 text-3xl opacity-40 z-20" animate={{ scale: [1.2, 1, 1.2] }} transition={{ repeat: Infinity, duration: 4 }}>🥂</motion.div>

                      <motion.p
                        className="text-sm md:text-base italic font-sans mb-10 md:mb-14"
                        style={{ color: "rgba(80,60,40,0.6)" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.45, duration: 0.8 }}
                      >
                        {milestone.description}
                      </motion.p>

                      {/* Timeline */}
                      <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

                        {/* Connector line (desktop) */}
                        <motion.div
                          className="absolute hidden md:block top-[34px] left-[5%] right-[5%] h-[2px]"
                          style={{ background: "linear-gradient(to right, #e8796a, #d4896b, #b07a8a, #7a8ab0, #8B7355)" }}
                          initial={{ scaleX: 0, originX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        />

                        {yearEntries.map((entry, i) => (
                          <motion.div
                            key={entry.year}
                            className="relative flex flex-col items-center gap-3 z-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + i * 0.12, duration: 0.6, type: "spring", stiffness: 60 }}
                          >
                            {/* Dot / Icon */}
                            <div
                              className="w-16 h-16 md:w-[70px] md:h-[70px] rounded-full flex items-center justify-center shadow-lg border-4 border-white text-2xl"
                              style={{ background: `radial-gradient(circle at 35% 35%, ${entry.color}dd, ${entry.color}99)` }}
                            >
                              {entry.icon}
                            </div>

                            {/* Year badge */}
                            <div
                              className="text-base md:text-lg font-serif font-bold"
                              style={{ color: entry.color }}
                            >
                              {entry.year}
                            </div>

                            {/* Label */}
                            <div className="text-center">
                              <div className="font-sans font-bold text-[11px] md:text-xs uppercase tracking-wider" style={{ color: "#2c2416" }}>
                                {entry.label}
                              </div>
                              <div
                                className="font-sans italic text-[10px] md:text-[11px] mt-0.5 max-w-[90px]"
                                style={{ color: "rgba(80,60,40,0.55)" }}
                              >
                                {entry.note}
                              </div>
                            </div>

                            {/* Connector line (mobile vertical) */}
                            {i < yearEntries.length - 1 && (
                              <div className="md:hidden w-[2px] h-6" style={{ background: `linear-gradient(to bottom, ${entry.color}, ${yearEntries[i + 1].color})` }} />
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {/* Footer tagline */}
                      <motion.p
                        className="font-serif text-sm md:text-base mt-10 md:mt-14"
                        style={{ color: "rgba(160,120,80,0.55)", letterSpacing: "0.1em" }}
                        animate={{ opacity: [0.4, 0.75, 0.4] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      >
                        Here's to every year that follows ♡
                      </motion.p>

                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {layoutStyle === 6 && (
              // Style 6: Present — Split journal with live date counter
              <motion.div
                className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-0 shadow-[0_30px_80px_rgba(0,0,0,0.18)] rounded-sm overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* LEFT: Photo panel */}
                <div className="relative w-full md:w-[45%] min-h-[300px] md:min-h-0 shrink-0 overflow-hidden">
                  {milestone.backgroundUrl ? (
                    <Image
                      src={milestone.backgroundUrl}
                      alt={milestone.title}
                      fill
                      className="object-cover sepia-[0.15] brightness-90"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-stone-200 flex items-center justify-center">
                      <span className="text-stone-400 font-mono text-xs uppercase tracking-widest">Photo</span>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, rgba(250,247,240,0.95))" }} />
                  <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(250,247,240,0.98))" }} />

                  {/* TODAY stamp */}
                  <motion.div
                    className="absolute top-5 left-5 border-4 rounded-sm px-3 py-1.5 rotate-[-6deg]"
                    style={{ borderColor: "rgba(220,80,60,0.75)", color: "rgba(220,80,60,0.85)" }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    <span className="font-black tracking-[0.35em] uppercase text-sm md:text-base select-none">Today</span>
                  </motion.div>

                  {/* Live time badge */}
                  <div
                    className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 border border-stone-200 shadow-md"
                  >
                    <span className="font-mono text-stone-700 text-sm font-bold tracking-wider">{currentTime || "--:--"}</span>
                  </div>
                </div>

                {/* RIGHT: Journal card */}
                <div
                  className="relative flex-1 flex flex-col justify-between px-7 sm:px-10 md:px-12 py-8 md:py-12"
                  style={{ background: "linear-gradient(160deg, #faf7f0 0%, #f5f0e8 100%)" }}
                >
                  {/* Corner flourishes */}
                  {[["top-2 right-2", "90deg"], ["bottom-2 right-2", "180deg"]].map(([pos, rot], i) => (
                    <div key={i} className={`absolute ${pos} w-5 h-5 pointer-events-none`} style={{ transform: `rotate(${rot})`, opacity: 0.35 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1"><path d="M2 2 L8 2 M2 2 L2 8 M2 2 Q5 5 8 8" strokeLinecap="round" /></svg>
                    </div>
                  ))}

                  {/* Top: eyebrow + location */}
                  <div>
                    <motion.div
                      className="tracking-[0.4em] text-[10px] uppercase font-sans mb-1"
                      style={{ color: "#a07850" }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {milestone.location}
                    </motion.div>

                    {/* Live date */}
                    <motion.p
                      className="text-[11px] md:text-xs font-sans text-stone-500 italic mb-5"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {currentDate || milestone.date}
                    </motion.p>

                    {/* Title */}
                    <motion.h2
                      className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-900 leading-tight mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.8 }}
                    >
                      {milestone.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      className="font-sans italic text-sm md:text-base text-stone-600 leading-relaxed mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      {milestone.description}
                    </motion.p>

                    {/* Ornamental rule */}
                    <motion.div
                      className="flex items-center gap-2 mb-6 w-36"
                      style={{ originX: 0 }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.55, duration: 0.7 }}
                    >
                      <div className="flex-1 h-[0.5px]" style={{ background: "rgba(160,120,80,0.4)" }} />
                      <div className="w-1 h-1 rounded-full" style={{ background: "rgba(160,120,80,0.5)" }} />
                      <div className="flex-1 h-[0.5px]" style={{ background: "rgba(160,120,80,0.4)" }} />
                    </motion.div>
                  </div>

                  {/* Bottom: Days counter */}
                  <motion.div
                    className="flex flex-col items-start gap-1"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.8 }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] font-sans" style={{ color: "#a07850" }}>Days Together</span>
                    <div className="flex items-end gap-2">
                      <span
                        className="font-serif font-black leading-none"
                        style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)", color: "#2c2416" }}
                      >
                        {daysCount > 0 ? daysCount.toLocaleString() : "···"}
                      </span>
                      <span className="font-sans text-xs text-stone-500 italic mb-2">& counting</span>
                    </div>

                    {/* Heartbeat line */}
                    <svg viewBox="0 0 200 40" className="w-full max-w-[220px] mt-1" fill="none">
                      <motion.path
                        d="M0 20 L30 20 L40 5 L50 35 L60 20 L80 20 L90 10 L100 30 L110 20 L140 20 L150 8 L160 32 L170 20 L200 20"
                        stroke="#e8796a"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.7 }}
                        transition={{ delay: 0.8, duration: 1.4, ease: "easeInOut" }}
                      />
                    </svg>
                  </motion.div>
                </div>
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
