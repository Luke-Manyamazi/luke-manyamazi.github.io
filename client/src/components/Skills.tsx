import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useSkills } from "@/hooks/use-portfolio";
import { useGitHubData } from "@/hooks/useGitHubData";
import { Skeleton } from "@/components/ui/skeleton";

export function Skills() {
  const { data: skills } = useSkills();
  const { languages, loading: langLoading } = useGitHubData();

  const categories = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="section-padding container mx-auto px-4 md:px-6 section-band">
      <SectionHeader title="Technical Arsenal" subtitle="Skills & Tools" />

      <div className="max-w-5xl mx-auto space-y-12">

        {/* ── Live: Languages from GitHub ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-primary/60">01</span>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
              Languages — derived from GitHub repos
            </h3>
            <div className="flex-1 h-px bg-white/5" />
            {!langLoading && (
              <span className="font-mono text-[11px] text-muted-foreground/50">live</span>
            )}
          </div>

          {langLoading ? (
            <div className="flex flex-wrap gap-3">
              {[1,2,3,4,5,6,7,8].map(i => (
                <Skeleton key={i} className="h-9 w-24 bg-white/5 rounded-full" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {languages.map(({ name, color, pct }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:border-white/15 transition-all cursor-default group"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">
                    {name}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground/50">{pct}%</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* ── Static: Frameworks, Databases, Tools ── */}
        {categories && Object.entries(categories)
          .filter(([cat]) => cat !== "Languages")
          .map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-primary/60">
                  {String(idx + 2).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
                  {category}
                </h3>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill.id} className="tag">{skill.name}</span>
                ))}
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
}
