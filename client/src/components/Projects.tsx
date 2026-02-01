import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useProjects } from "@/hooks/use-portfolio";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, ExternalLink, Folder } from "lucide-react";

export function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <section id="projects" className="section-padding container mx-auto px-4 md:px-6 bg-secondary/20">
      <SectionHeader title="Select Projects" subtitle="Portfolio" />

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-80 w-full bg-white/5 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects?.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <Folder size={40} className="text-primary" />
                <div className="flex gap-4">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-white transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
                {project.techStack.map((tech) => (
                  <span key={tech} className="font-mono text-xs text-primary/80">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
