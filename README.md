# 🥭 Nir & Mango

A personal, hand-crafted storytelling website — a horizontal-scrolling scrapbook of our journey together. Built with love (and quite a few late nights).

---

## ✨ Tech Stack

| Layer | Tool |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Runtime | Node.js ≥ 18 |

---

## 🚀 Running Locally

### 1. Prerequisites

Make sure you have the following installed:

- **Node.js** `v18` or higher — [Download](https://nodejs.org/)
- **npm** `v9` or higher (comes with Node.js)

Verify by running:

```bash
node -v
npm -v
```

---

### 2. Clone the Repository

```bash
git clone <your-repo-url>
cd nirandmango
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start the Dev Server

```bash
npm run dev
```

The site will be live at **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 📂 Project Structure

```
nirandmango/
├── public/               # Static assets (sticker PNGs, images)
├── src/
│   ├── app/
│   │   ├── page.tsx      # Main page — orchestrates all components
│   │   └── layout.tsx    # Root layout & global fonts
│   ├── components/
│   │   ├── DoodleCanvas.tsx     # Parallax background doodles & stickers
│   │   ├── Scene.tsx            # Milestone slide layouts (layoutId 0–10)
│   │   ├── TimelineSection.tsx  # Horizontal scroll container
│   │   └── TimelineProgress.tsx # Side progress bar & milestone markers
│   └── data/
│       └── milestones.ts        # ✏️ Edit your story here
└── package.json
```

---

## 🗓️ Customising the Timeline

All milestone content lives in **`src/data/milestones.ts`**. Each entry looks like this:

```ts
{
  id: "your-milestone-id",
  date: "April 2022",
  title: "Where It All Began",
  description: "Your quote or memory here.",
  backgroundUrl: "https://your-photo-url.jpg",  // or "" for none
  charactersUrl: "/couple.svg",
  animationType: "fade-slide",                  // fade-slide | zoom-in | parallax
  location: "Bangalore, India",
  layoutId: 0                                   // see layout guide below
}
```

### Layout Guide

| `layoutId` | Style | Best for |
|---|---|---|
| `0` | Yellow sticky note | Short memories |
| `1` | Polaroid front note | Photo moments |
| `2` | Airline boarding pass | Travel milestones |
| `3` | Scattered polaroid collage | Memory boards |
| `4` | Letterpress blank canvas | Future / open chapters |
| `5` | 4-year anniversary timeline | Milestone summaries |
| `6` | Split journal with live counter | The "Present" slide |
| `10` | LDR scrapbook connection | Long distance moments |

---

## 🔧 Other Commands

```bash
npm run build    # Build for production
npm run start    # Run the production build locally
npm run lint     # Check for linting errors
```

---

## 💛 Made with love, for Mango.
