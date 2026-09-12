import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useEducation } from "@/hooks/use-portfolio";
import { Skeleton } from "@/components/ui/skeleton";
import { GraduationCap, ExternalLink } from "lucide-react";

const TYPE_STYLES: Record<string, string> = {
  Degree:      "bg-primary/15 text-primary border-primary/25",
  Programme:   "bg-blue-500/15 text-blue-400 border-blue-500/25",
  Certificate: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  AWS:         "bg-orange-500/15 text-orange-400 border-orange-500/25",
};

const TYPE_LABELS: Record<string, string> = {
  Degree: "Academic degree",
  Programme: "Professional programme",
  Certificate: "Additional training",
  AWS: "Cloud training",
};

export function Education() {
  const { data: education, isLoading } = useEducation();

  return (
    <section id="education" className="section-padding container mx-auto px-4 md:px-6 section-band">
      <SectionHeader title="Education & Certifications" subtitle="Academic foundation and continuous technical development" />

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-48 w-full bg-white/5 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
          {education?.map((edu, idx) => (
            <motion.article
              key={edu.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-card-hover gradient-border rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground/60">
                      {TYPE_LABELS[edu.type] ?? "Professional development"}
                    </span>
                  </div>
                </div>
                <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${TYPE_STYLES[edu.type] ?? TYPE_STYLES.Certificate}`}>
                  {edu.type}
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base md:text-lg font-bold text-white leading-snug">{edu.degree}</h3>
                  <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">{edu.year}</span>
                </div>
                <p className="text-sm text-primary/80 mt-1.5">{edu.institution}</p>
              </div>

              {edu.detail && (
                <p className="text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                  {edu.detail}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="max-w-5xl mx-auto mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-primary/10 bg-primary/[0.04] px-5 py-4"
      >
        <div>
          <div className="text-sm font-semibold text-white">Continuous learning is part of the work.</div>
          <div className="text-xs text-muted-foreground mt-1">Combining formal software engineering study with practical full-stack, cloud, Python and web development training.</div>
        </div>
        <a
          href="https://github.com/Luke-Manyamazi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-white transition-colors"
        >
          Explore GitHub <ExternalLink size={13} />
        </a>
      </motion.div>
    </section>
  );
}
