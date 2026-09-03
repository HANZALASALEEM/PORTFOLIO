export type Project = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  stack: string[];
  features: string[];
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "news-app",
    name: "News App",
    summary: "A React Native news reader pulling live articles from a news API.",
    description:
      "A mobile news reader built during university to practice consuming a third-party REST API and shipping a real cross-platform app with Expo. Articles are fetched live, formatted, and opened in an in-app browser for reading.",
    stack: ["React Native", "Expo", "React Navigation", "Axios", "Moment.js"],
    features: [
      "Live article feed fetched over REST with Axios",
      "Tab-based navigation between news categories",
      "Human-readable timestamps via Moment.js",
      "In-app browser (Expo WebBrowser) for full articles",
    ],
    githubUrl: "https://github.com/HANZALASALEEM/NEWS-APP-REACT-NATIVE",
  },
  {
    slug: "blog-website",
    name: "Blog Website",
    summary: "A full-stack blog platform with post creation, editing, and comments.",
    description:
      "A MERN-style blog platform built during university with a separate client and API. The frontend is a Vite-powered React app styled with Tailwind CSS; the backend is a Node.js API with a standard controllers/models/routes structure.",
    stack: ["React", "Vite", "Tailwind CSS", "Firebase", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Post creation and editing",
      "Comment system on posts",
      "Firebase integration on the client",
      "Node.js API with MVC-style controllers, models, and routes",
    ],
    githubUrl: "https://github.com/HANZALASALEEM/BLOG-WEBSITE",
  },
  {
    slug: "ecommerce-app",
    name: "E-Commerce App",
    summary: "A cross-platform e-commerce shopping app built in React Native.",
    description:
      "A React Native shopping app built during university with TypeScript and a Redux Toolkit store for cart and app state, backed by Firebase Firestore for product and order data.",
    stack: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "React Navigation",
      "Firebase",
      "Firestore",
      "Jest",
    ],
    features: [
      "Firestore-backed product catalog",
      "Redux Toolkit store for cart and app state",
      "Drawer and stack navigation across screens",
      "Type-checked with TypeScript, tested with Jest",
    ],
    githubUrl: "https://github.com/HANZALASALEEM/E-COMMERCE-APP-REACT-NATIVE",
  },
  {
    slug: "skill-station-website",
    name: "Skill Station (University Website)",
    summary: "A university website built with vanilla HTML, CSS, JavaScript, and PHP.",
    description:
      "A traditional server-rendered university website built during university, without any frontend framework. PHP handles authentication and comment submission server-side.",
    stack: ["HTML5", "CSS3", "JavaScript", "PHP"],
    features: [
      "Login and registration handled in PHP",
      "Course catalog page",
      "Blog page with a PHP-backed comment system",
      "About and contact pages",
    ],
    githubUrl: "https://github.com/HANZALASALEEM/SKILL-STATION",
  },
  {
    slug: "skill-station-react",
    name: "Skill Station (React Frontend)",
    summary: "A React rebuild of the Skill Station university website frontend.",
    description:
      "A Create React App rebuild of the Skill Station site's frontend, done during university to practice moving a static PHP site's UI into a React single-page app.",
    stack: ["React", "Create React App", "Jest", "Testing Library"],
    features: [
      "React rebuild of the original static site's UI",
      "Component-based structure in place of server-rendered PHP pages",
      "Testing set up with Jest and React Testing Library",
    ],
    githubUrl: "https://github.com/HANZALASALEEM/SKILL-STATION-REACT-JS-FRONTEND",
  },
  {
    slug: "suffah-school",
    name: "Suffah School Management System",
    summary: "A school management platform with a mobile app, admin web dashboard, and AI-assisted chat.",
    description:
      "A full school-management system built during university: a React Native mobile app for students/staff and a separate React admin web dashboard, sharing a Firebase backend. The mobile app includes an AI-assisted chat feature and push notifications; the web dashboard can generate and export documents as PDFs.",
    stack: [
      "React Native",
      "Expo",
      "Firebase",
      "Firebase Cloud Messaging",
      "Google Generative AI",
      "React",
      "Chakra UI",
      "Ant Design",
      "React Router",
      "jsPDF",
    ],
    features: [
      "AI-assisted chat support (Google Generative AI + react-native-gifted-chat)",
      "Push notifications via Firebase Cloud Messaging",
      "Calendar and scheduling in the mobile app",
      "Admin web dashboard with PDF export (jsPDF, html2canvas)",
      "Shared Firebase backend across mobile and web",
    ],
    githubUrl: "https://github.com/HANZALASALEEM/FINAL-PROJECT",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
