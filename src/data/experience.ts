export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "JFreaks Software Solutions",
    role: "Software Engineer",
    period: "07/2024 to Present",
    location: "Bahria Town, Lahore",
    bullets: [
      "Design and build responsive UI components with React, Tailwind CSS, and TypeScript",
      "Build scraping and automation features with Playwright and Puppeteer for data extraction and screenshot capture",
      "Develop backend services with Node.js and Express.js for API integration",
      "Manage client-side data fetching and caching with SWR, React Query, and MobX",
      "Integrate Stripe and Creem for subscription-based billing",
      "Work with PostgreSQL to handle large-scale datasets efficiently",
      "Collaborate in Agile sprints: planning, stand-ups, and code reviews",
    ],
  },
  {
    company: "Vespert Tech",
    role: "React Native Developer",
    period: "06/2023 to 09/2023",
    location: "Master City, Gujranwala",
    bullets: [
      "Built a Travel App and an Income & Loan tracking app in React Native",
      "Used Firebase, React Navigation, and native stylesheets to ship functional cross-platform apps",
      "Worked the full application lifecycle from concept to deployment",
    ],
  },
];
