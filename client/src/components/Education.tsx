import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useEducation } from "@/hooks/use-portfolio";
import { Skeleton } from "@/components/ui/skeleton";

const TYPE_STYLES: Record<string, string> = {
  Degree:      "bg-primary/15 text-primary border-primary/25",
  Course:      "bg-blue-500/15 text-blue-400 border-blue-500/25",
  Certificate: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  AWS:         "bg-orange-500/15 text-orange-400 border-orange-500/25",
};

export function Education() {
  const { data: education, isLoading } = useEducation();

  return (
    <section id="education" className="section-padding container mx-auto px-4 md:px-6">
      <SectionHeader title="Education & Certs" subtitle="Learning" />

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-36 w-full bg-white/5 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {education?.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="glass-card-hover gradient-border rounded-2xl p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${
                    TYPE_STYLES[edu.type] ?? TYPE_STYLES.Certificate
                  }`}
                >
                  {edu.type}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{edu.year}</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white leading-snug">{edu.degree}</h3>
                <p className="text-xs text-muted-foreground mt-1">{edu.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
