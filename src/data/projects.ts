export type Project = {
  name: string;
  description: string;
  stack: string[];
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    name: "News App",
    description: "A React Native news reader app pulling live articles from a news API.",
    stack: ["React Native"],
    githubUrl: "https://github.com/HANZALASALEEM/NEWS-APP-REACT-NATIVE",
  },
  {
    name: "Blog Website",
    description: "A full-stack blog platform with post creation, editing, and comments.",
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/HANZALASALEEM/BLOG-WEBSITE",
  },
  {
    name: "E-Commerce App",
    description: "A cross-platform e-commerce shopping app built in React Native.",
    stack: ["React Native"],
    githubUrl: "https://github.com/HANZALASALEEM/E-COMMERCE-APP-REACT-NATIVE",
  },
  {
    name: "Skill Station — University Website",
    description: "A university website built with vanilla HTML, CSS, JavaScript, and PHP.",
    stack: ["HTML5", "CSS3", "JavaScript", "PHP"],
    githubUrl: "https://github.com/HANZALASALEEM/SKILL-STATION",
  },
  {
    name: "Skill Station — React Frontend",
    description: "A React rebuild of the Skill Station university website frontend.",
    stack: ["React"],
    githubUrl: "https://github.com/HANZALASALEEM/SKILL-STATION-REACT-JS-FRONTEND",
  },
  {
    name: "SIS Automation System",
    description: "A student information system automation app built in React Native.",
    stack: ["React Native"],
    githubUrl: "https://github.com/HANZALASALEEM/FINAL-PROJECT",
  },
  {
    name: "School Management App",
    description: "A cross-platform React Native app for school management, with real-time data via Firebase.",
    stack: ["React Native", "Firebase"],
  },
];
