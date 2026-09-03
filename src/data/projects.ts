import type { ArchitectureLayer } from "@/components/architecture-diagram";

export type Project = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  stack: string[];
  features: string[];
  architecture: ArchitectureLayer[];
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
    architecture: [
      { title: "Client", nodes: [{ label: "Mobile App", detail: "React Native + Expo screens", kind: "client" }] },
      {
        title: "Data Fetching",
        nodes: [
          { label: "Axios Client", detail: "Fetches and parses articles", kind: "service" },
          { label: "News API", detail: "Third-party REST news source", kind: "external" },
        ],
      },
      { title: "Navigation", nodes: [{ label: "Tab Navigator", detail: "Category-based navigation", kind: "service" }] },
      {
        title: "Display",
        nodes: [
          { label: "Article List", detail: "Timestamps formatted with Moment.js", kind: "output" },
          { label: "In-App Browser", detail: "Full article view (Expo WebBrowser)", kind: "output" },
        ],
      },
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
    architecture: [
      { title: "Client", nodes: [{ label: "Browser", detail: "React + Vite single-page app", kind: "client" }] },
      {
        title: "Frontend",
        nodes: [
          { label: "React App", detail: "Tailwind CSS UI", kind: "service" },
          { label: "Firebase Client", detail: "Auth / storage integration", kind: "external" },
        ],
      },
      { title: "API", nodes: [{ label: "Node.js API", detail: "Express-style controllers and routes", kind: "service" }] },
      { title: "Data", nodes: [{ label: "MongoDB", detail: "Post and comment collections", kind: "datastore" }] },
      { title: "Response", nodes: [{ label: "Rendered Post / Comments", detail: "Returned to the client", kind: "output" }] },
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
    architecture: [
      { title: "Client", nodes: [{ label: "Mobile App", detail: "React Native + TypeScript", kind: "client" }] },
      { title: "Navigation", nodes: [{ label: "React Navigation", detail: "Drawer + stack navigation", kind: "service" }] },
      { title: "State", nodes: [{ label: "Redux Toolkit Store", detail: "Cart + app state management", kind: "service" }] },
      { title: "Backend", nodes: [{ label: "Firebase Firestore", detail: "Product catalog + orders", kind: "datastore" }] },
      { title: "Output", nodes: [{ label: "Product & Checkout UI", detail: "Rendered from store state", kind: "output" }] },
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
    architecture: [
      { title: "Client", nodes: [{ label: "Browser", detail: "Static HTML/CSS pages", kind: "client" }] },
      {
        title: "Server",
        nodes: [
          { label: "login.php / register.php", detail: "Authentication handling", kind: "service" },
          { label: "comment.php", detail: "Comment submission handling", kind: "service" },
        ],
      },
      { title: "Data", nodes: [{ label: "Server-side data store", detail: "Login and comment records", kind: "datastore" }] },
      { title: "Response", nodes: [{ label: "Rendered Page", detail: "Course, blog, and contact pages", kind: "output" }] },
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
    architecture: [
      { title: "Client", nodes: [{ label: "Browser", detail: "Loads the React bundle", kind: "client" }] },
      { title: "App", nodes: [{ label: "React SPA", detail: "Create React App component tree", kind: "service" }] },
      { title: "Testing", nodes: [{ label: "Jest + Testing Library", detail: "Component test suite", kind: "service" }] },
      { title: "Output", nodes: [{ label: "Rendered UI", detail: "Rebuilt Skill Station interface", kind: "output" }] },
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
    architecture: [
      {
        title: "Clients",
        nodes: [
          { label: "Mobile App", detail: "React Native + Expo (students/staff)", kind: "client" },
          { label: "Admin Dashboard", detail: "React + Chakra UI + Ant Design", kind: "client" },
        ],
      },
      {
        title: "Shared Backend",
        nodes: [
          { label: "Firebase Auth / Firestore", detail: "Shared across mobile and web", kind: "datastore" },
          { label: "Firebase Cloud Messaging", detail: "Push notifications", kind: "service" },
        ],
      },
      {
        title: "Features",
        nodes: [
          { label: "Generative AI Chat", detail: "Google Generative AI + gifted-chat UI", kind: "external" },
          { label: "Calendar", detail: "Scheduling in the mobile app", kind: "service" },
        ],
      },
      { title: "Output", nodes: [{ label: "PDF Export", detail: "jsPDF + html2canvas reports", kind: "output" }] },
    ],
    githubUrl: "https://github.com/HANZALASALEEM/FINAL-PROJECT",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
