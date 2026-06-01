import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useProjects } from "@/hooks/use-portfolio";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, ExternalLink, Folder, Search } from "lucide-react";
import { useMemo, useState } from "react";

const PAGE_SIZE = 6; // 2 rows (3 columns × 2 rows)

export function Projects() {
  const { data: projects, isLoading } = useProjects();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset pagination when filters change
  const resetView = () => setVisibleCount(PAGE_SIZE);

  // ---------- FILTER ENGINE ----------
  const filteredProjects = useMemo(() => {
    let data = [...projects];

    // Normalize status
    data = data.map((p: any) => ({
      ...p,
      status: p.status === "in-progress" ? "inProgress" : p.status,
    }));

    if (filter !== "all") {
      data = data.filter((p: any) => p.status === filter);
    }

    if (search.trim()) {
      data = data.filter(
        (p: any) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    data.sort((a: any, b: any) => {
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

  // visible slice
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const canShowMore = visibleCount < filteredProjects.length;

  // ---------- CARD ----------
  const renderProject = (project: any, idx: number) => (
    <motion.div
      key={project.id || project.title}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: idx * 0.02 }}
      className="glass-card p-5 rounded-xl flex flex-col h-full group hover:-translate-y-1 transition"
    >
      <div className="flex justify-between items-center mb-4">
        <Folder size={30} className="text-primary" />

        <div className="flex gap-3 items-center">
          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-primary">
            {project.status}
          </span>

          {project.githubLink && (
            <a href={project.githubLink} target="_blank">
              <Github size={18} />
            </a>
          )}

          {project.link && (
            <a href={project.link} target="_blank">
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-md font-bold text-white mb-2 group-hover:text-primary">
        {project.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-4 flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.techStack?.slice(0, 4).map((tech: string) => (
          <span key={tech} className="text-xs text-primary/80">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section
      id="projects"
      className="section-padding container mx-auto px-4 md:px-6 bg-secondary/20"
    >
      <SectionHeader
        title="Projects Dashboard"
        subtitle="GitHub-style portfolio"
      />

      {/* CONTROLS */}
      {!isLoading && (
        <div className="max-w-5xl mx-auto mb-6 space-y-4">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetView();
              }}
              placeholder="Search projects..."
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {["all", "shipped", "inProgress", "learning"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  resetView();
                }}
                className={`px-3 py-1 text-sm rounded-full border ${
                  filter === f
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LOADING */}
      {isLoading ? (
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-60 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {visibleProjects.map(renderProject)}
          </div>

          {/* SHOW MORE */}
          {canShowMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="text-sm text-primary hover:underline"
              >
                Show more projects
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}