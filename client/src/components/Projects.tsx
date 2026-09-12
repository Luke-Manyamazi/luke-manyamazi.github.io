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

const STATUS_LABELS: Record<string, string> = {
  shipped: "Shipped",
  inProgress: "In Progress",
  learning: "Learning",
};

function normaliseStatus(status: string | undefined) {
  if (status === "in-progress") return "inProgress";
  return status || "inProgress";
}

export function Projects() {
  const { data: projects, isLoading } = useProjects();

  const [filter, setFilter] = useState("featured");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredProjects = useMemo(() => {
    let data = [...projects].map((project: any) => ({
      ...project,
      status: normaliseStatus(project.status),
    }));

    if (filter === "featured") {
      data = data.filter((project: any) => FEATURED_PROJECTS.includes(project.title));
    } else if (filter !== "all") {
      data = data.filter((project: any) => project.status === filter);
    }

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
        const aIndex = FEATURED_PROJECTS.indexOf(a.title);
        const bIndex = FEATURED_PROJECTS.indexOf(b.title);
        return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) -
          (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
      }

      if (sort === "newest") {
        return new Date(b.updated).getTime() - new Date(a.updated).getTime();
      }

      if (sort === "oldest") {
        return new Date(a.updated).getTime() - new Date(b.updated).getTime();
      }

      return a.title.localeCompare(b.title);
    });

    return data;
  }, [projects, filter, search, sort]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const canShowMore = visibleCount < filteredProjects.length;

  const statusCounts = useMemo(
    () =>
      projects.reduce<Record<string, number>>((acc: Record<string, number>, project: any) => {
        const status = normaliseStatus(project.status);
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {}),
    [projects],
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
            {isFeatured && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-primary/80">Featured</span>
            )}
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
          {project.techStack?.filter((tech: string) => !["shipped", "inprogress", "in-progress", "learning"].includes(tech)).slice(0, 4).map((tech: string) => (
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
              { key: "all", label: `All (${projects.length})` },
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
