import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useProjects } from "@/hooks/use-portfolio";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, ExternalLink, Folder, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

const PAGE_SIZE = 6;

const FEATURED_PROJECTS = [
  "BH-Farm-OS",
  "Chenesa",
  "ipalo-shop",
  "rent-it",
  "iSolveAI",
  "CYFoverflow",
];

const FEATURED_ALIASES: Record<string, string> = {
  "bh-farm-os": "BH-Farm-OS",
  "bhfarmos": "BH-Farm-OS",
  "chenesa": "Chenesa",
  "ipalo-shop": "ipalo-shop",
  "rent-it": "rent-it",
  "rentit": "rent-it",
  "isolveai": "iSolveAI",
  "cyfoverflow": "CYFoverflow",
};

const FEATURED_FALLBACKS: Record<string, { description: string; techStack: string[]; language?: string; link?: string }> = {
  "BH-Farm-OS": {
    description:
      "Full-stack farm management platform for livestock, inventory, tasks, finances, alerts, and day-to-day agricultural operations.",
    techStack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    language: "TypeScript",
  },
  Chenesa: {
    description:
      "AI email-cleaning SaaS that helps users organise and tidy inboxes across major email providers using a Next.js and FastAPI architecture.",
    techStack: ["TypeScript", "Next.js", "FastAPI", "Supabase"],
    language: "TypeScript",
    link: "https://chenesa.vercel.app",
  },
  "ipalo-shop": {
    description:
      "Premium lifestyle commerce storefront built for South Africa, with product browsing, cart flows, Supabase data, Prisma and PayFast payments.",
    techStack: ["TypeScript", "Next.js", "Supabase", "Prisma", "PayFast"],
    language: "TypeScript",
    link: "https://ipalo-shop.vercel.app",
  },
  "rent-it": {
    description:
      "Web-first SaaS rental marketplace connecting customers and rental providers through a product-focused marketplace experience.",
    techStack: ["TypeScript", "Firebase", "Supabase", "Vercel"],
    language: "TypeScript",
  },
  iSolveAI: {
    description:
      "AI-assisted troubleshooting tool for IT technicians that explains error messages using Google Gemini with backend fallback support.",
    techStack: ["JavaScript", "Chrome Extension", "Google Gemini", "REST API"],
    language: "JavaScript",
  },
  CYFoverflow: {
    description:
      "Full-stack developer Q&A platform where users ask questions, share answers, vote, and collaborate through a React/Vite frontend, Node/Express API and PostgreSQL database.",
    techStack: ["JavaScript", "React", "Node.js", "PostgreSQL", "REST APIs"],
    language: "JavaScript",
    link: "https://cyfoverflow.hosting.codeyourfuture.io",
  },
};

const STATUS_LABELS: Record<string, string> = {
  shipped: "Shipped",
  inProgress: "In Progress",
  learning: "Learning",
};

function normaliseStatus(status: string | undefined) {
  if (status === "in-progress") return "inProgress";
  return status || "inProgress";
}

function canonicalFeaturedTitle(title: string) {
  return FEATURED_ALIASES[title.toLowerCase().replace(/[^a-z0-9-]/g, "")] || title;
}

export function Projects() {
  const { data: projects, isLoading } = useProjects();

  const [filter, setFilter] = useState("featured");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const featuredProjects = useMemo(() => {
    const source = [...projects].map((project: any) => {
      const canonicalTitle = canonicalFeaturedTitle(project.title || "");
      const fallback = FEATURED_FALLBACKS[canonicalTitle];

      return {
        ...project,
        title: canonicalTitle,
        description:
          fallback && (!project.description || project.description === "Q&A Website")
            ? fallback.description
            : project.description || fallback?.description || "Project details coming soon.",
        techStack:
          project.techStack?.length > 0
            ? project.techStack
            : fallback?.techStack || [],
        language: project.language || fallback?.language,
        link: project.link || fallback?.link || "",
        status: normaliseStatus(project.status),
      };
    });

    const byTitle = new Map(source.map((project: any) => [project.title, project]));

    FEATURED_PROJECTS.forEach((title) => {
      if (!byTitle.has(title) && FEATURED_FALLBACKS[title]) {
        const fallback = FEATURED_FALLBACKS[title];
        byTitle.set(title, {
          id: `featured-${title}`,
          title,
          description: fallback.description,
          techStack: fallback.techStack,
          language: fallback.language,
          link: fallback.link || "",
          githubLink: `https://github.com/Luke-Manyamazi/${title}`,
          status: "inProgress",
          updated: new Date(0).toISOString(),
        });
      }
    });

    return FEATURED_PROJECTS.map((title) => byTitle.get(title)).filter(Boolean);
  }, [projects]);

  const allProjects = useMemo(() => {
    const featuredByTitle = new Map(featuredProjects.map((project: any) => [project.title, project]));
    return [...projects].map((project: any) => {
      const canonicalTitle = canonicalFeaturedTitle(project.title || "");
      const featured = featuredByTitle.get(canonicalTitle);
      return {
        ...project,
        title: canonicalTitle,
        description:
          featured?.description || project.description || "Project details coming soon.",
        techStack: featured?.techStack?.length ? featured.techStack : project.techStack || [],
        language: project.language || featured?.language,
        link: project.link || featured?.link || "",
        status: normaliseStatus(project.status),
      };
    });
  }, [projects, featuredProjects]);

  const filteredProjects = useMemo(() => {
    let data = filter === "featured"
      ? [...featuredProjects]
      : filter === "all"
        ? [...allProjects]
        : allProjects.filter((project: any) => project.status === filter);

    if (search.trim()) {
      const query = search.toLowerCase();
      data = data.filter(
        (project: any) =>
          project.title.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query) ||
          project.language?.toLowerCase().includes(query) ||
          project.techStack?.some((tech: string) => tech.toLowerCase().includes(query)),
      );
    }

    data.sort((a: any, b: any) => {
      if (sort === "featured") {
        return FEATURED_PROJECTS.indexOf(a.title) - FEATURED_PROJECTS.indexOf(b.title);
      }
      if (sort === "newest") return new Date(b.updated).getTime() - new Date(a.updated).getTime();
      if (sort === "oldest") return new Date(a.updated).getTime() - new Date(b.updated).getTime();
      return a.title.localeCompare(b.title);
    });

    return data;
  }, [allProjects, featuredProjects, filter, search, sort]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const canShowMore = visibleCount < filteredProjects.length;

  const statusCounts = useMemo(
    () =>
      allProjects.reduce<Record<string, number>>((acc, project: any) => {
        acc[project.status] = (acc[project.status] || 0) + 1;
        return acc;
      }, {}),
    [allProjects],
  );

  const renderProject = (project: any, idx: number) => {
    const isFeatured = FEATURED_PROJECTS.includes(project.title);
    const statusLabel = STATUS_LABELS[project.status] || project.status;

    return (
      <motion.article
        key={project.id || project.title}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: idx * 0.02 }}
        className="glass-card p-5 rounded-xl flex flex-col h-full group hover:-translate-y-1 transition duration-300"
      >
        <div className="flex justify-between items-start mb-4 gap-3">
          <div className="flex items-center gap-2">
            {isFeatured ? <Sparkles size={18} className="text-primary" /> : <Folder size={20} className="text-primary" />}
            {isFeatured && <span className="text-[10px] font-mono uppercase tracking-wider text-primary/80">Featured</span>}
          </div>

          <div className="flex gap-3 items-center">
            <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-primary whitespace-nowrap">{statusLabel}</span>
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={18} />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`} className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-md font-bold text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 items-center">
          {project.language && <span className="text-[11px] font-medium text-white/80">{project.language}</span>}
          {project.language && project.techStack?.length > 0 && <span className="text-white/20">•</span>}
          {project.techStack?.filter((tech: string) => !["shipped", "inprogress", "in-progress", "learning"].includes(tech)).slice(0, 5).map((tech: string) => (
            <span key={tech} className="text-[11px] text-primary/80">{tech}</span>
          ))}
        </div>
      </motion.article>
    );
  };

  return (
    <section id="projects" className="section-padding container mx-auto px-4 md:px-6 bg-secondary/20">
      <SectionHeader title="Selected Projects" subtitle="A curated view of my software work" />

      {!isLoading && (
        <div className="max-w-5xl mx-auto mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg flex-1">
              <Search size={16} className="shrink-0" />
              <input
                value={search}
                onChange={(event) => { setSearch(event.target.value); setVisibleCount(PAGE_SIZE); }}
                placeholder="Search projects, technologies, or skills..."
                aria-label="Search projects"
                className="bg-transparent w-full outline-none text-sm placeholder:text-muted-foreground/50"
              />
            </div>

            <label className="flex items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-mono text-muted-foreground">
              <span>Sort</span>
              <select
                value={sort}
                onChange={(event) => { setSort(event.target.value); setVisibleCount(PAGE_SIZE); }}
                className="bg-transparent text-white outline-none py-2"
                aria-label="Sort projects"
              >
                <option value="featured" className="bg-slate-900">Featured</option>
                <option value="newest" className="bg-slate-900">Newest</option>
                <option value="oldest" className="bg-slate-900">Oldest</option>
                <option value="title" className="bg-slate-900">A–Z</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { key: "featured", label: `Featured (${FEATURED_PROJECTS.length})` },
              { key: "all", label: `All (${allProjects.length})` },
              { key: "shipped", label: `Shipped (${statusCounts.shipped || 0})` },
              { key: "inProgress", label: `In Progress (${statusCounts.inProgress || 0})` },
              { key: "learning", label: `Learning (${statusCounts.learning || 0})` },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => { setFilter(key); setSort(key === "featured" ? "featured" : sort); setVisibleCount(PAGE_SIZE); }}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all ${filter === key ? "bg-primary/20 text-primary border-primary/30" : "text-white/60 border-white/10 hover:text-white hover:border-white/20"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-60 w-full rounded-xl" />)}
        </div>
      ) : (
        <>
          {visibleProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">{visibleProjects.map(renderProject)}</div>
          ) : (
            <div className="max-w-3xl mx-auto text-center py-12 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-sm text-muted-foreground">No projects match that search or filter.</p>
            </div>
          )}

          {canShowMore && (
            <div className="text-center mt-10">
              <button onClick={() => setVisibleCount((previous) => previous + PAGE_SIZE)} className="text-sm text-primary hover:underline">Show more projects</button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
