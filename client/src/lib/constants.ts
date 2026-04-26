// client/src/lib/constants.ts

export const SKILLS = [
  // Languages
  { id: 1, name: "JavaScript", category: "Languages" },
  { id: 2, name: "Python", category: "Languages" },
  { id: 3, name: "TypeScript", category: "Languages" },
  { id: 4, name: "Java", category: "Languages" },
  { id: 5, name: "C/C++/C#", category: "Languages" },
  // Frameworks/Libraries
  { id: 6, name: "React", category: "Frameworks" },
  { id: 7, name: "Node.js", category: "Frameworks" },
  { id: 8, name: "Express.js", category: "Frameworks" },
  { id: 9, name: "Tailwind CSS", category: "Frameworks" },
  { id: 16, name: "Flask", category: "Frameworks" },
  // Databases & Cloud
  { id: 10, name: "MySQL", category: "Backend" },
  { id: 11, name: "PostgreSQL", category: "Backend" },
  { id: 12, name: "Firebase", category: "Backend" },
  { id: 13, name: "AWS", category: "Cloud" },
  { id: 14, name: "Google Cloud", category: "Cloud" },
  { id: 15, name: "Azure", category: "Cloud" },
];

export const PROJECTS = [
  {
    id: 1,
    title: "CYFOverflow",
    description:
      "A Q&A platform enabling question posting, answering, and discussions. Features API-driven data fetching and dynamic rendering.",
    techStack: ["JavaScript", "HTML", "CSS", "REST APIs"],
    link: "https://cyfoverflow.hosting.codeyourfuture.io/",
    githubLink: "https://github.com/Luke-Manyamazi/CYFoverflow",
  },
  {
    id: 2,
    title: "Pop & Chill TV Explorer",
    description:
      "TV Show finder using TMDB API with YouTube trailer integration. Improved API response and rendering efficiency by 35%.",
    techStack: ["JavaScript", "TMDB API", "YouTube Integration", "Netlify"],
    link: "https://popandchill.netlify.app/",
    githubLink:
      "https://github.com/Luke-Manyamazi/Pop-and-Chill-Movie-Explorer-App",
  },
  {
    id: 3,
    title: "Real-Time Group Chat",
    description:
      "Instant messaging app using WebSockets for live updates and online user tracking.",
    techStack: ["WebSocket", "Node.js", "JavaScript", "CSS"],
    link: "https://luke-chat-app-frontend.hosting.codeyourfuture.io/",
    githubLink: "https://github.com/Luke-Manyamazi/Chat-App",
  },
  {
    id: 4,
    title: "Quote Generator",
    description:
      "Custom backend API fetching random quotes with optimized routes, reducing latency by 20%.",
    techStack: ["Node.js", "JavaScript", "Express"],
    link: "https://luke-quote-app-frontend.hosting.codeyourfuture.io/",
    githubLink: "https://github.com/Luke-Manyamazi/Quote-App",
  },
  {
    id: 5,
    title: "Camluk Technologies",
    description:
      "Business website showcasing digital services, branding solutions, and modern responsive UI for client engagement.",
    techStack: ["React", "Tailwind CSS", "JavaScript"],
    link: "https://camluk.co.za/",
    githubLink: "https://github.com/Luke-Manyamazi/camluk_website.git",
  },
  {
    id: 6,
    title: "Dinas Day Care",
    description:
      "Responsive daycare website featuring service information, gallery sections, and a clean parent-friendly interface.",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://dinasgroup.co.za/",
    githubLink: "https://github.com/Luke-Manyamazi/dinasgroup-website.git",
  },
  {
    id: 7,
    title: "Boroma Hills",
    description:
      "Modern real estate platform designed to present residential development projects with interactive sections and smooth navigation.",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://boroma-hills.netlify.app/",
    githubLink: "https://github.com/Luke-Manyamazi/Boroma-Hills-Website-.git",
  },
  {
    id: 8,
    title: "My Portfolio",
    description:
      "Personal developer portfolio highlighting projects, technical skills, certifications, and deployed applications with a modern UI.",
    techStack: ["React", "Tailwind CSS", "JavaScript"],
    link: "https://luke-manyamazi.github.io/",
    githubLink: "https://github.com/Luke-Manyamazi/luke-manyamazi.github.io.git",
  },
];

export const EXPERIENCE = [
  {
    id: 1,
    role: "Software & Deployment Specialist",
    company: "Torga Optical",
    duration: "2020 – Present",
    description:
      "Collaborate with developers on feature development and bug fixing. Conduct deployment testing for 170+ branches and created automation scripts for asset tracking.",
  },
  {
    id: 2,
    role: "IT Support Technician",
    company: "Torga Optical",
    duration: "2020 – Present",
    description:
      "Maintain 18+ IT systems with 99.9% uptime. Reduced support requests by 30% through staff training.",
  },
];

export const EDUCATION = [
  // Degrees
  {
    id: 1,
    degree: "BSc (Hons) Computer Engineering",
    institution: "Zimbabwe Open University",
    year: "Graduating 2027",
    type: "Degree",
  },
  {
    id: 2,
    degree: "Software Developer",
    institution: "CodeYourFuture",
    year: "Jan 2026",
    type: "Bootcamp",
  },
  // Certifications
  {
    id: 3,
    degree: "CS50’s Introduction to Python",
    institution: "Harvard University",
    year: "2024",
    type: "Certificate",
  },
  {
    id: 4,
    degree: "AWS Cloud Practitioner Essentials",
    institution: "Amazon Web Services",
    year: "2024",
    type: "AWS",
  },
  {
    id: 5,
    degree: "Responsive Web Design",
    institution: "FreeCodeCamp",
    year: "2023",
    type: "Certificate",
  },
  {
    id: 6,
    degree: "Cloud Computing 101",
    institution: "Coursera",
    year: "2023",
    type: "Certificate",
  },
];
