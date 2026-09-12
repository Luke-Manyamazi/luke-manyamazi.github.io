export const SKILLS = [
  // Core Languages
  { id: 1,  name: "TypeScript",         category: "Languages" },
  { id: 2,  name: "JavaScript (ES6+)",  category: "Languages" },
  { id: 3,  name: "Python",             category: "Languages" },
  { id: 4,  name: "SQL",                category: "Languages" },
  { id: 5,  name: "Java",               category: "Languages" },
  { id: 6,  name: "C#",                 category: "Languages" },
  { id: 7,  name: "PHP",                category: "Languages" },
  { id: 8,  name: "HTML5",              category: "Languages" },
  { id: 9,  name: "CSS3",               category: "Languages" },

  // Frontend & Mobile
  { id: 10, name: "React",              category: "Frontend" },
  { id: 11, name: "Next.js",            category: "Frontend" },
  { id: 12, name: "React Native",       category: "Frontend" },
  { id: 13, name: "Vite",               category: "Frontend" },
  { id: 14, name: "Tailwind CSS",       category: "Frontend" },
  { id: 15, name: "Framer Motion",      category: "Frontend" },
  { id: 16, name: "Bootstrap",          category: "Frontend" },

  // Backend & APIs
  { id: 17, name: "Node.js",            category: "Backend & APIs" },
  { id: 18, name: "Express.js",         category: "Backend & APIs" },
  { id: 19, name: "REST APIs",          category: "Backend & APIs" },
  { id: 20, name: "WebSockets",         category: "Backend & APIs" },
  { id: 21, name: "Flask",              category: "Backend & APIs" },
  { id: 22, name: "FastAPI",            category: "Backend & APIs" },

  // Data & Cloud
  { id: 23, name: "PostgreSQL",         category: "Data & Cloud" },
  { id: 24, name: "MySQL",              category: "Data & Cloud" },
  { id: 25, name: "Supabase",           category: "Data & Cloud" },
  { id: 26, name: "Firebase",           category: "Data & Cloud" },
  { id: 27, name: "AWS",                category: "Data & Cloud" },
  { id: 28, name: "Google Cloud",       category: "Data & Cloud" },
  { id: 29, name: "Vercel",             category: "Data & Cloud" },

  // Engineering & Delivery
  { id: 30, name: "Git & GitHub",        category: "Engineering & Delivery" },
  { id: 31, name: "Docker",             category: "Engineering & Delivery" },
  { id: 32, name: "GitHub Actions",     category: "Engineering & Delivery" },
  { id: 33, name: "CI/CD",              category: "Engineering & Delivery" },
  { id: 34, name: "Testing",            category: "Engineering & Delivery" },
  { id: 35, name: "Postman",            category: "Engineering & Delivery" },
  { id: 36, name: "Agile / Scrum",      category: "Engineering & Delivery" },
  { id: 37, name: "UAT",                category: "Engineering & Delivery" },
  { id: 38, name: "Authentication & Authorization", category: "Engineering & Delivery" },
  { id: 39, name: "Database Design",    category: "Engineering & Delivery" },

  // AI & Automation
  { id: 40, name: "Google Gemini",       category: "AI & Automation" },
  { id: 41, name: "Claude (Anthropic)", category: "AI & Automation" },
  { id: 42, name: "AI API Integration", category: "AI & Automation" },
  { id: 43, name: "Prompt Engineering", category: "AI & Automation" },
  { id: 44, name: "AI-assisted Development", category: "AI & Automation" },
];

export const PROJECTS = [
  {
    id: 1,
    title: "CYFOverflow",
    description: "Full-stack Q&A platform enabling question posting, answering, and voting on technical questions. Built with RESTful APIs, PostgreSQL, and mobile-first WCAG-accessible UI.",
    techStack: ["React", "Node.js", "PostgreSQL", "REST APIs"],
    link: "https://cyfoverflow.hosting.codeyourfuture.io/",
    githubLink: "https://github.com/Luke-Manyamazi/CYFoverflow",
  },
  {
    id: 2,
    title: "Pop & Chill TV Explorer",
    description: "Media discovery app with live search, TMDB + YouTube API integration, and trailer playback. Optimised API response handling, improving rendering efficiency by 35%.",
    techStack: ["JavaScript", "TMDB API", "YouTube API", "CSS3"],
    link: "https://popandchill.netlify.app/",
    githubLink: "https://github.com/Luke-Manyamazi/Pop-and-Chill-Movie-Explorer-App",
  },
  {
    id: 3,
    title: "Real-Time Group Chat",
    description: "WebSocket-powered messaging app with instant communication, online user tracking, and polling fallback for reliability. Event-driven Node.js backend.",
    techStack: ["Node.js", "Socket.io", "Express.js", "JavaScript"],
    link: "https://luke-chat-app-frontend.hosting.codeyourfuture.io/",
    githubLink: "https://github.com/Luke-Manyamazi/Chat-App",
  },
  {
    id: 4,
    title: "Ipalo Shop",
    description: "Modern e-commerce storefront with product listings, cart management, and a clean responsive UI built with TypeScript and deployed on Vercel.",
    techStack: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
    link: "https://ipalo-shop.vercel.app",
    githubLink: "https://github.com/Luke-Manyamazi/ipalo-shop",
  },
  {
    id: 5,
    title: "NuSite",
    description: "AI-powered website transformation engine that converts static HTML sites into modern React applications. Features a landing page, dashboard, billing, and deployment workflow.",
    techStack: ["React", "JavaScript", "AI", "SaaS"],
    link: "https://nusite-landing.netlify.app",
    githubLink: "https://github.com/Luke-Manyamazi/nusite",
  },
  {
    id: 6,
    title: "Camluk Technologies",
    description: "Business website for a digital services company. Showcases branding solutions and services with a modern, responsive UI.",
    techStack: ["React", "Tailwind CSS", "JavaScript"],
    link: "https://camluk.co.za/",
    githubLink: "https://github.com/Luke-Manyamazi/camluk_website",
  },
  {
    id: 7,
    title: "Zimbabwe Consulate CPT",
    description: "Modern website redesign for the Zimbabwe Consulate Cape Town — built with React, Tailwind CSS, and Framer Motion for smooth transitions.",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
    link: "",
    githubLink: "https://github.com/Luke-Manyamazi/zimconsulatecpt-website",
  },
  {
    id: 8,
    title: "Boroma Hills",
    description: "Real estate platform presenting a residential development project with interactive sections, image galleries, and smooth navigation.",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://boroma-hills.netlify.app/",
    githubLink: "https://github.com/Luke-Manyamazi/Boroma-Hills-Website-",
  },
];

export const EXPERIENCE = [
  {
    id: 1,
    role: "Software & Application Support Specialist",
    company: "Torga Optical Lens Manufacturing",
    location: "Cape Town, South Africa",
    duration: "2023 – Present",
    type: "full-time",
    description:
      "Collaborate with external software developers to support and enhance proprietary business applications used across 170+ branches, reducing critical issue resolution times by 25%.\nManage deployment testing and software release cycles across 170+ branches, ensuring zero-downtime transitions and business continuity.\nDocument, reproduce, and track software defects — partnering with developers to accelerate resolutions.\nIntegrate digital content solutions with marketing teams, increasing customer engagement by 30%.\nCoordinate User Acceptance Testing (UAT) for new software releases and system enhancements.\nMonitor application performance and drive process improvements across the branch network.\nCollaborate with business stakeholders to gather requirements and improve system functionality.",
  },
  {
    id: 2,
    role: "IT Support Technician",
    company: "Torga Optical Lens Manufacturing",
    location: "Cape Town, South Africa",
    duration: "2020 – 2023",
    type: "full-time",
    description:
      "Maintained and troubleshot 18+ critical IT systems, sustaining 99.9% system uptime across all locations.\nDeveloped and delivered technical training programmes that reduced support tickets by 30%.\nConfigured and maintained workstations, printers, network devices, and Microsoft 365 environments.\nProvided first- and second-line technical support to staff across multiple locations.\nSupported software deployments, upgrades, and maintenance activities organisation-wide.\nDocumented technical procedures and troubleshooting guides to improve team support efficiency.\nAssisted with user account administration, security controls, and access management.",
  },
  {
    id: 3,
    role: "Provincial Vehicle Licensing Supervisor",
    company: "Zimbabwe National Roads Administration (ZINARA)",
    location: "Zimbabwe",
    duration: "2013 – 2019",
    type: "full-time",
    description:
      "Supervised daily vehicle licensing operations and ensured compliance with national regulations across the province.\nMonitored and maintained the ZIMLIC vehicle licensing system — ensuring reliable transaction processing and system availability.\nAdministered user accounts, permissions, and access controls within licensing and banking systems.\nIdentified, documented, and reported software defects, contributing to measurable improvements in system performance.\nProvided first-line technical support to licensing officers and administrative staff.\nGenerated operational, financial, and compliance reports for provincial management and regulatory stakeholders.\nTrained and supported staff on licensing systems, operational procedures, and technology platforms.",
  },
];

export const EDUCATION = [
  {
    id: 1,
    degree: "BSc (Hons) Software Engineering",
    institution: "Zimbabwe Open University",
    year: "Expected 2027",
    type: "Degree",
    detail: "Currently in Year 3. Covering software architecture, engineering principles, networks, and systems design.",
  },
  {
    id: 2,
    degree: "Software Developer",
    institution: "CodeYourFuture",
    year: "Completed Jan 2026",
    type: "Course",
    detail: "Full-stack programming course: JavaScript, React, Node.js, SQL, APIs, Agile, Git, pair programming, and real-world project delivery.",
  },
  {
    id: 3,
    degree: "CS50's Introduction to Python",
    institution: "Harvard University",
    year: "2024",
    type: "Certificate",
    detail: "",
  },
  {
    id: 4,
    degree: "AWS Cloud Practitioner Essentials",
    institution: "Amazon Web Services",
    year: "2024",
    type: "AWS",
    detail: "",
  },
  {
    id: 5,
    degree: "Responsive Web Design",
    institution: "FreeCodeCamp",
    year: "2023",
    type: "Certificate",
    detail: "",
  },
  {
    id: 6,
    degree: "Cloud Computing 101",
    institution: "Coursera",
    year: "2023",
    type: "Certificate",
    detail: "",
  },
];
