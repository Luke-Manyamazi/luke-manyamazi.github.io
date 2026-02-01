import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingSkills = await storage.getSkills();
  if (existingSkills.length === 0) {
    console.log("Seeding database with CV data...");

    // Skills
    const skillsData = [
      { category: "Languages", names: ["JavaScript", "Python", "HTML", "CSS", "Java", "C/C#/C++"] },
      { category: "Frameworks", names: ["React", "Node.js", "Express.js", "Tailwind CSS"] },
      { category: "Databases", names: ["MySQL", "Firebase", "Postgres"] },
      { category: "Cloud", names: ["AWS", "Google Cloud"] },
      { category: "Tools", names: ["Git", "VSCode", "Netlify", "Postman"] },
      { category: "Practices", names: ["Agile", "MVP Development", "API Integration"] }
    ];

    for (const cat of skillsData) {
      for (const name of cat.names) {
        await storage.createSkill({ name, category: cat.category });
      }
    }

    // Projects
    await storage.createProject({
      title: "CYFOverflow",
      description: "A Q&A platform for CodeYourFuture, enabling question posting, answering, and discussions. Built with a responsive UI and API-driven data fetching.",
      techStack: ["JavaScript", "HTML", "CSS", "REST APIs"],
      link: "#", 
      githubLink: "#"
    });
    
    await storage.createProject({
      title: "TV Show Finder App",
      description: "Movie and TV show explorer using TMDB API. Features in-page YouTube trailer playback, live search, and filtering.",
      techStack: ["JavaScript", "HTML", "CSS", "TMDB API", "YouTube Integration"],
      link: "#",
      githubLink: "#"
    });

    await storage.createProject({
      title: "Real-time Chat App",
      description: "Group chat application using WebSockets for instant messaging with live updates and online user count.",
      techStack: ["WebSocket", "Node.js", "JavaScript", "HTML", "CSS"],
      link: "#",
      githubLink: "#"
    });

    await storage.createProject({
      title: "Quote Generator",
      description: "Random quote generator fetching from a custom backend API with optimized routes.",
      techStack: ["Node.js", "JavaScript", "HTML", "CSS"],
      link: "#",
      githubLink: "#"
    });

    // Experience
    await storage.createExperience({
      role: "Software & Application Support / Deployment Specialist",
      company: "Torga Optical Lens Manufacturing",
      duration: "2020 – Present",
      description: "Collaborated with external developers on feature development and bug fixing. Conducted deployment testing across 170+ branches. Created automation scripts improving efficiency by 25%."
    });

    await storage.createExperience({
      role: "IT Support Technician",
      company: "Torga Optical Lens Manufacturing",
      duration: "2020 – Present",
      description: "Managed IT assets and network systems. Supported app deployment with 99.9% uptime. Reduced support requests by 30% through staff training."
    });

    // Education
    await storage.createEducation({
      degree: "BSc (Hons) Computer Engineering",
      institution: "Zimbabwe Open University",
      year: "2027 (Expected)",
      type: "Degree"
    });

    await storage.createEducation({
      degree: "Software Development Course",
      institution: "CodeYourFuture",
      year: "Jan 2026 (Expected)",
      type: "Certificate"
    });

    await storage.createEducation({
      degree: "CS50’s Introduction to Python",
      institution: "Harvard University",
      year: "Completed",
      type: "Certificate"
    });

    await storage.createEducation({
      degree: "AWS Cloud Practitioner Essentials",
      institution: "AWS",
      year: "Completed",
      type: "Certificate"
    });

    console.log("Seeding complete!");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed Data on startup
  seedDatabase();

  // Skills
  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Projects
  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Experience
  app.get(api.experience.list.path, async (_req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  // Education
  app.get(api.education.list.path, async (_req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createMessage(input);
      res.json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", field: err.errors[0].path.join('.') });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}
