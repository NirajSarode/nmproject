"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export const SCRAPBOOK_ASSETS: Record<string, React.ReactNode> = {
  pizza: (
    <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-24 md:h-24 opacity-60 drop-shadow-sm">
      <path d="M50 10 L90 85 L10 85 Z" fill="#fff9e6" stroke="#d4a373" strokeWidth="4" strokeLinejoin="round" />
      <path d="M15 80 Q50 95 85 80" stroke="#d4a373" fill="none" strokeWidth="6" />
      <circle cx="50" cy="45" r="5" fill="#e07a5f"/>
      <circle cx="65" cy="65" r="4.5" fill="#e07a5f"/>
      <circle cx="35" cy="60" r="4" fill="#e07a5f"/>
      <circle cx="50" cy="72" r="5" fill="#e07a5f"/>
    </svg>
  ),
  monument: (
    <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-32 md:h-32 opacity-40">
      <path d="M50 5 L65 45 L80 95 L20 95 L35 45 Z" fill="none" stroke="#475569" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M45 5 L55 5 M35 45 L65 45 M25 75 L75 75" stroke="#475569" strokeWidth="3" strokeLinecap="round"/>
      <path d="M35 95 Q50 75 65 95" fill="none" stroke="#475569" strokeWidth="3"/>
      <path d="M48 5 L48 20 M52 5 L52 20" stroke="#475569" strokeWidth="2"/>
    </svg>
  ),
  coffee: (
    <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-40 md:h-40 opacity-40 mix-blend-multiply">
      <circle cx="50" cy="50" r="35" stroke="#8b5a2b" strokeWidth="4" fill="none" strokeDasharray="150" strokeDashoffset="10" />
      <circle cx="48" cy="52" r="38" stroke="#8b5a2b" strokeWidth="2" fill="none" strokeDasharray="180" strokeDashoffset="40" opacity="0.6"/>
      <circle cx="60" cy="20" r="3" fill="#8b5a2b" opacity="0.8"/>
      <circle cx="20" cy="70" r="2" fill="#8b5a2b" opacity="0.5"/>
      <circle cx="85" cy="60" r="4" fill="#8b5a2b" opacity="0.4"/>
    </svg>
  ),
  polaroid: (
    <svg viewBox="0 0 100 120" className="w-24 h-28 md:w-32 md:h-40 opacity-90 drop-shadow-md">
      <rect x="5" y="5" width="90" height="110" fill="#fff" rx="2" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="10" y="10" width="80" height="75" fill="#f1f5f9" />
      {/* Hand drawn scribble placeholder */}
      <path d="M25 100 Q 40 95 55 102 T 75 97" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  tapePink: (
    <div className="w-14 h-4 sm:w-20 sm:h-6 md:w-32 md:h-8 bg-rose-300/40 opacity-80 mix-blend-multiply border-b border-rose-400/20" style={{ clipPath: 'polygon(2% 0%, 98% 5%, 95% 100%, 0% 95%)' }} />
  ),
  tapeYellow: (
    <div className="w-14 h-4 sm:w-20 sm:h-6 md:w-28 md:h-8 bg-amber-200/50 opacity-80 mix-blend-multiply border-b border-amber-300/30" style={{ clipPath: 'polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)' }} />
  ),
  heart: (
    <svg viewBox="0 0 100 100" className="w-8 h-8 md:w-10 md:h-10 lg:w-16 lg:h-16 opacity-50">
      <path d="M50 90 C 20 60 10 40 10 25 C 10 10 30 5 50 20 C 70 5 90 10 90 25 C 90 40 80 60 50 90 Z" fill="none" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sribble fill */}
      <path d="M30 30 Q 50 40 40 60 T 60 40" stroke="#f43f5e" fill="none" strokeWidth="2" opacity="0.5"/>
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-16 md:h-16 lg:w-24 lg:h-24 opacity-40">
      <path d="M20 80 Q 30 30 80 20 M 60 15 L 80 20 L 75 40" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-16 md:h-16 lg:w-24 lg:h-24 opacity-40">
      <rect x="15" y="30" width="70" height="50" rx="5" fill="none" stroke="#475569" strokeWidth="4"/>
      <path d="M30 30 L35 20 L65 20 L70 30" fill="none" stroke="#475569" strokeWidth="4" strokeLinejoin="round"/>
      <circle cx="50" cy="55" r="14" fill="none" stroke="#475569" strokeWidth="4"/>
      <circle cx="75" cy="40" r="4" fill="#475569"/>
    </svg>
  ),
  nyTaxi: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/ny_taxi.png" alt="Vintage Taxi Sticker" className="w-16 md:w-24 lg:w-36 drop-shadow-xl mix-blend-multiply opacity-90 contrast-110 grayscale-[0.2] -rotate-3" />
  ),
  nyPizza: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/ny_pizza.png" alt="Vintage Pizza Sticker" className="w-20 md:w-28 lg:w-40 drop-shadow-xl mix-blend-multiply opacity-95 contrast-125 saturate-[0.8] rotate-6" />
  ),
  nyStatue: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/ny_statue.png" alt="Vintage Statue Stamp" className="w-8 sm:w-12 md:w-16 lg:w-32 drop-shadow-xl mix-blend-multiply opacity-90 contrast-110 grayscale-[0.3]" />
  ),
  jpSushi: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/japan_sushi.png" alt="Sushi Sticker" className="w-8 sm:w-12 md:w-16 lg:w-32 drop-shadow-xl mix-blend-multiply opacity-95 contrast-125 rotate-2" />
  ),
  nyBridge: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/ny_bridge.png" alt="Brooklyn Bridge Sticker" className="w-14 sm:w-20 md:w-28 lg:w-40 drop-shadow-lg mix-blend-multiply opacity-90 contrast-110 -rotate-2" />
  ),
  nyNyu: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/ny_nyu.png" alt="NYU Logo Sticker" className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 lg:w-28 lg:h-28 drop-shadow-md mix-blend-multiply opacity-85 contrast-110 saturate-[1.2] -rotate-3" />
  ),
  jpTorii: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/japan_torii.png" alt="Torii Gate Sticker" className="w-16 md:w-24 lg:w-36 drop-shadow-xl mix-blend-multiply opacity-90 contrast-110 -rotate-3" />
  ),
  jpFuji: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/japan_mtfuji.png" alt="Mt Fuji Stamp" className="w-14 md:w-20 lg:w-28 drop-shadow-xl mix-blend-multiply opacity-90 contrast-110 rotate-6" />
  ),
  jpRamen: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/japan_ramen.png" alt="Ramen Bowl Sticker" className="w-14 sm:w-20 md:w-24 lg:w-36 drop-shadow-lg mix-blend-multiply opacity-95 contrast-110 -rotate-2" />
  ),
  jpShinkansen: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/japan_shinkansen.png" alt="Shinkansen Sticker" className="w-20 sm:w-24 md:w-32 lg:w-48 drop-shadow-md mix-blend-multiply opacity-90 contrast-[1.1] rotate-2" />
  ),
  jpSakura: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/japan_sakura.png" alt="Sakura Branch Sticker" className="w-16 sm:w-24 md:w-32 lg:w-48 drop-shadow-lg mix-blend-multiply opacity-85 contrast-125 saturate-[1.2] -rotate-6" />
  ),
  blrAuto: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/blr_auto.png" alt="Auto Rickshaw Sticker" className="w-16 md:w-24 lg:w-36 drop-shadow-xl mix-blend-multiply opacity-90 contrast-110 grayscale-[0.1]" />
  ),
  blrCoffee: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/blr_coffee.png" alt="Filter Coffee Dabara Stamp" className="w-14 md:w-20 lg:w-28 drop-shadow-xl mix-blend-multiply opacity-95 contrast-125 saturate-50" />
  ),
  cupcake: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/glens_cupcake.png" alt="Glen's Cupcake Sticker" className="w-8 sm:w-12 md:w-16 lg:w-32 drop-shadow-xl mix-blend-multiply opacity-95 contrast-110 saturate-[0.8] rotate-6" />
  ),
  activa: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/black_activa.png" alt="Black Activa Sticker" className="w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 lg:w-36 lg:h-36 drop-shadow-xl mix-blend-multiply opacity-90 contrast-110 -rotate-3" />
  ),
  goldman: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/goldman_logo.png" alt="Goldman Sachs Sticker" className="w-8 sm:w-10 md:w-12 lg:w-28 drop-shadow-lg mix-blend-multiply opacity-80 contrast-110 rotate-3" />
  ),
  salesforce: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/salesforce_logo_regular.png" alt="Salesforce Sticker" className="w-10 sm:w-14 md:w-24 lg:w-32 drop-shadow-lg mix-blend-multiply opacity-95 contrast-110 -rotate-2" />
  ),
  dosa: (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/dosa.png" alt="Masala Dosa Sticker" className="w-14 sm:w-20 md:w-28 lg:w-36 drop-shadow-xl mix-blend-multiply opacity-95 contrast-110 saturate-[0.9] rotate-12" />
  )
};

// Generous scattering of scrapbook doodles across up to 10 sections (~1000vw)
const SCRAPBOOK_ITEMS = [
  // Intro / Slide 0
  { type: 'polaroid', top: '8%', left: '2vw', rotate: -6 },
  { type: 'tapeYellow', top: '6%', left: '3vw', rotate: 5 },
  
  // Slide 1 (Bangalore)
  { type: 'blrCoffee', top: '18%', left: '4vw', rotate: 12 },
  { type: 'goldman', top: '75%', left: '14vw', rotate: -8 },
  { type: 'dosa', top: '10%', left: '28vw', rotate: 4 },
  { type: 'activa', top: '64%', left: '72vw', rotate: 11 },
  { type: 'cupcake', top: '22%', left: '86vw', rotate: -15 },
  { type: 'salesforce', top: '72%', left: '94vw', rotate: 6 },
  
  // Collages (Slides 1 & 2) - Minimal doodles, let the polaroids shine
  { type: 'heart', top: '15%', left: '115vw', rotate: -15 },
  { type: 'tapePink', top: '68%', left: '215vw', rotate: 5 },
  { type: 'polaroid', top: '12%', left: '275vw', rotate: 8 },

  // Slide 3 (New York - Pushed by +200vw)
  { type: 'nyStatue', top: '22%', left: '308vw', rotate: -6 },
  { type: 'nyNyu', top: '62%', left: '318vw', rotate: 8 },
  { type: 'monument', top: '76%', left: '366vw', rotate: 5 },
  { type: 'nyBridge', top: '16%', left: '384vw', rotate: -7 },
  { type: 'nyPizza', top: '68%', left: '394vw', rotate: 22 },
  
  // Slide 4 (Japan - Pushed by +200vw)
  { type: 'jpFuji', top: '12%', left: '402vw', rotate: 7 },
  { type: 'jpRamen', top: '76%', left: '425vw', rotate: -6 },
  { type: 'jpShinkansen', top: '20%', left: '476vw', rotate: -3 },
  { type: 'jpTorii', top: '64%', left: '492vw', rotate: 5 },
  { type: 'polaroid', top: '70%', left: '420vw', rotate: 12 },
  { type: 'tapePink', top: '68%', left: '425vw', rotate: -5 },
  { type: 'arrow', top: '25%', left: '440vw', rotate: -30 },
  { type: 'coffee', top: '55%', left: '460vw', rotate: 0 },
  { type: 'camera', top: '15%', left: '480vw', rotate: -25 },
  { type: 'pizza', top: '30%', left: '540vw', rotate: -5 },
  { type: 'tapePink', top: '28%', left: '538vw', rotate: 20 },
  { type: 'monument', top: '65%', left: '570vw', rotate: -4 },
];

export default function DoodleCanvas({ 
  containerRef, 
  totalMilestones 
}: { 
  containerRef: React.RefObject<HTMLDivElement | null>;
  totalMilestones: number;
}) {
  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: "x"
  });

  // Calculate parallax mapping for the massive continuous background width
  const xMovement = useTransform(scrollXProgress, [0, 1], ["0%", `-${100 - (100 / totalMilestones)}%`]);

  return (
    <motion.div 
      className="absolute top-0 bottom-0 left-0 h-full pointer-events-none"
      style={{ 
        width: `${totalMilestones * 100}vw`,
        x: xMovement,
        // Dot grid background
        backgroundImage: "radial-gradient(#d6d3d1 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}
    >
      {/* Render all scattered scrapbook items */}
      {SCRAPBOOK_ITEMS.map((item, idx) => (
        <motion.div
           key={idx}
           className="absolute pointer-events-none"
           style={{
             top: item.top,
             left: item.left,
             rotate: `${item.rotate}deg`
           }}
        >
          {SCRAPBOOK_ASSETS[item.type]}
        </motion.div>
      ))}

      {/* Dashed trail sweeping through the background dynamically weaving between the elements */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="none">
        <path 
          d={`M -100 500 Q 500 800, 1000 400 T 2500 600 T ${totalMilestones * 1500} 300`} 
          fill="none" 
          stroke="#475569" 
          strokeWidth="3" 
          strokeDasharray="15 15"
          className="animate-[dash_60s_linear_infinite]"
        />
      </svg>
    </motion.div>
  );
}
