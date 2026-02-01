import { motion } from "framer-motion";
import { useEducation } from "@/hooks/use-portfolio";
import { Skeleton } from "@/components/ui/skeleton";
import { GraduationCap } from "lucide-react";

export function Education() {
  const { data: education, isLoading } = useEducation();

  return (
    <section id="education" className="section-padding container mx-auto px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="text-primary h-8 w-8" />
          <h2 className="text-2xl font-bold text-white">Education & Certifications</h2>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full bg-white/5 rounded-xl" />
            <Skeleton className="h-20 w-full bg-white/5 rounded-xl" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {education?.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-card border border-white/5 p-6 rounded-xl hover:border-primary/20 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-primary px-2 py-1 rounded bg-primary/10 border border-primary/20">
                    {edu.type}
                  </span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {edu.year}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                <p className="text-muted-foreground text-sm">{edu.institution}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
