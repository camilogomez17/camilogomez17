export type HomeScene = "book" | "timer" | "gear" | "speaker";

export type Project = {
  title: string;
  description: string;
  href: string;
  cta: string;
  homeQuote?: string;
  homeScene?: HomeScene;
  showInHomeFeed?: boolean;
};

export const projects: Project[] = [
  {
    title: "Habit Analytics",
    description: "A browser-based activity log with timestamps, tags, notes, search, date filtering, a session timer, and JSON backup/import.",
    href: "/habitAnalytics",
    cta: "Open app",
    homeQuote: "Record what you do, then explore your patterns over time.",
    homeScene: "timer",
    showInHomeFeed: true,
  },
  {
    title: "Résumé",
    description: "Education, technical skills, and professional profile links.",
    href: "/resume",
    cta: "View résumé",
    showInHomeFeed: false,
  },
];
