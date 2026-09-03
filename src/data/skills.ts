export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "React Native", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Data & State",
    skills: ["SWR", "React Query", "MobX"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "OpenAPI Design", "JWT Auth", "Webhooks & HMAC Signing"],
  },
  {
    title: "Databases & ORMs",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Sequelize", "Firebase", "Redis"],
  },
  {
    title: "Automation & Scraping",
    skills: ["Playwright", "Puppeteer"],
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS S3", "Google Cloud Storage", "Wasabi"],
  },
  {
    title: "Payments",
    skills: ["Stripe", "Creem"],
  },
  {
    title: "Tools & Practices",
    skills: ["Git", "Postman", "Wondershare Mockitt", "Agile / Scrum"],
  },
];
