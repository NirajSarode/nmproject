export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  backgroundUrl: string;
  charactersUrl: string;
  animationType: 'fade-slide' | 'zoom-in' | 'parallax';
  location?: string;
  layoutId?: number;
  images?: string[];
}

export const milestones: Milestone[] = [
  {
    id: "we-met",
    date: "April 2022",
    title: "Where It All Began",
    description: "You don't find love, it finds you. It's got a little bit to do with destiny, fate, and what's written in the stars.",
    backgroundUrl: "/begins.jpeg",
    charactersUrl: "/couple.svg",
    animationType: "fade-slide",
    location: "Bangalore, India",
    layoutId: 0
  },
  {
    id: "collage-memories",
    date: "2023-2024",
    title: "The Ones Who Knew",
    description: "Nobody will ever understand our inside jokes. That's the whole point",
    backgroundUrl: "",
    images: [
      "/photo1.jpg",
      "/photo2.jpg",
      "/photo3.HEIC",
      "/photo4.HEIC"
    ],
    charactersUrl: "/couple.svg",
    animationType: "zoom-in",
    location: "Memory Board",
    layoutId: 3
  },
  {
    id: "collage-memories-2",
    date: "The LDR Phase",
    title: "Waiting. Wanting. Worth It.",
    description: "We are playing a game most people quit. We don't quit.",
    backgroundUrl: "",
    images: [
      "/blr-photo.HEIC",
      "/nyc-photo.png"
    ],

    charactersUrl: "/couple.svg",
    animationType: "zoom-in",
    location: "Personal Archive",
    layoutId: 10
  },
  {
    id: "new-york",
    date: "July 2025",
    title: "You, Me, New York",
    description: "You didn't just show me New York. You showed me how to see it.",
    backgroundUrl: "",
    charactersUrl: "/couple.svg",
    animationType: "zoom-in",
    location: "New York City, USA",
    images: [
      "/nyc1.jpeg",
      "/nyc1.jpeg"
    ],
    layoutId: 1
  },
  {
    id: "trips-together",
    date: "December 2025",
    title: "Adventures Together",
    description: "Japan is not a place you visit. It's a place that happens to you — and it happened to us together.",
    backgroundUrl: "/japan.jpg",
    charactersUrl: "/couple.svg",
    animationType: "parallax",
    location: "Tokyo, Japan",
    layoutId: 2
  },
  {
    id: "today",
    date: "Present",
    title: "Our Story Continues",
    description: "We have more road ahead than behind. Looking forward to all the tomorrows.",
    backgroundUrl: "/present.HEIC",
    charactersUrl: "/couple.svg",
    animationType: "fade-slide",
    location: "Everywhere",
    layoutId: 6
  },
  {
    id: "four-years",
    date: "April 2022 – April 2026",
    title: "4 Years of Us",
    description: "To four years of chaos, growth, distance, laughter, and everything in between.",
    backgroundUrl: "",
    charactersUrl: "/couple.svg",
    animationType: "fade-slide",
    location: "Everywhere We've Been",
    layoutId: 5
  },
  {
    id: "our-future",
    date: "The Future",
    title: "The Unwritten Chapter",
    description: "The most beautiful pages of our story haven't even been written yet. We're just getting started.",
    backgroundUrl: "",
    charactersUrl: "/couple.svg",
    animationType: "zoom-in",
    location: "Someday, Somewhere",
    layoutId: 4
  }
];
