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
    // Databases & Cloud
    { id: 10, name: "MySQL", category: "Backend" },
    { id: 11, name: "PostgreSQL", category: "Backend" },
    { id: 12, name: "Firebase", category: "Backend" },
    { id: 13, name: "AWS", category: "Cloud" },
    { id: 14, name: "Google Cloud", category: "Cloud" },
];

export const PROJECTS = [
    {
        id: 1,
        title: "CYFOverflow",
        description: "A Q&A platform enabling question posting, answering, and discussions. Features API-driven data fetching and dynamic rendering.",
        techStack: ["JavaScript", "HTML", "CSS", "REST APIs"],
        link: "https://cyfoverflow.hosting.codeyourfuture.io/",
        githubLink: "https://github.com/Luke-Manyamazi/CYFoverflow",
    },
    {
        id: 2,
        title: "Pop & Chill TV Explorer",
        description: "TV Show finder using TMDB API with YouTube trailer integration. Improved API response and rendering efficiency by 35%.",
        techStack: ["JavaScript", "TMDB API", "YouTube Integration", "Netlify"],
        link: "https://popandchill.netlify.app/",
        githubLink: "https://github.com/Luke-Manyamazi/Pop-and-Chill-Movie-Explorer-App",
    },
    {
        id: 3,
        title: "Real-Time Group Chat",
        description: "Instant messaging app using WebSockets for live updates and online user tracking.",
        techStack: ["WebSocket", "Node.js", "JavaScript", "CSS"],
        link: "https://luke-chat-app-frontend.hosting.codeyourfuture.io/",
        githubLink: "https://github.com/Luke-Manyamazi/Chat-App",
    },
    {
        id: 4,
        title: "Quote Generator",
        description: "Custom backend API fetching random quotes with optimized routes, reducing latency by 20%.",
        techStack: ["Node.js", "JavaScript", "Express"],
        link: "https://luke-quote-app-frontend.hosting.codeyourfuture.io/",
        githubLink: "https://github.com/Luke-Manyamazi/Quote-App",
    }
];

export const EXPERIENCE = [
    {
        id: 1,
        role: "Software & Applications Support",
        company: "Torga Optical",
        duration: "2020 – Present",
        description: [
            "Work directly with external developers on Torga Systems applications, assisting with feature development, bug fixing, and improvements.",
            "Document and report software bugs, reproducing errors to facilitate quick resolution.",
            "Support deployment of apps across branches, maintaining 99.9% uptime.",
            "Conduct deployment testing to ensure smooth release of updates and new features across 170+ branches.",
        ],
    },
    {
        id: 2,
        role: "IT Support Technician",
        company: "Torga Optical",
        duration: "2020 – Present",
        description: [
            "Install, maintain, and troubleshoot 18+ IT systems and network assets.",
            "Conduct staff training, reducing support requests by 30 %.",
            "Provide onsite and remote IT support to 150 + stores",
        ]
    }
];

export const EDUCATION = [
    // Degrees
    {
        id: 1,
        degree: "BSc (Hons) Computer Engineering Degree",
        institution: "Zimbabwe Open University",
        year: "Graduating 2027",
        type: "Degree",
    },
    {
        id: 2,
        degree: "Software Developer Certificate",
        institution: "CodeYourFuture",
        year: "Jan 2026",
        type: "Full Stack Developer Course",
    },
    // Certifications
    {
        id: 3,
        degree: "CS50P - Introduction to Python",
        institution: "Harvard University",
        year: "Dec 2024",
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
    // Badges (Optional - can be included here)
    {
        id: 7,
        degree: "Launch Module & SDC",
        institution: "CodeYourFuture",
        year: "2024",
        type: "Badge",
    }
];