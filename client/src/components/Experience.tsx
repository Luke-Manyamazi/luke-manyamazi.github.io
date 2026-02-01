import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useExperience } from "@/hooks/use-portfolio";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase } from "lucide-react";

export function Experience() {
  const { data: experience, isLoading } = useExperience();

  return (
    <section id="experience" className="section-padding container mx-auto px-4 md:px-6">
      <SectionHeader title="Where I've Worked" subtitle="Experience" />

      <div className="max-w-4xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

        {isLoading ? (
          <div className="space-y-12">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-64 w-full bg-white/5 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-12 md:space-y-24">
            {experience?.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col md:flex-row gap-8 ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full bg-background border-2 border-primary z-10">
                  <Briefcase size={14} className="text-primary" />
                </div>

                {/* Content */}
                <div className={`flex-1 ${idx % 2 === 0 ? "md:text-right" : ""}`}>
                  <div className="glass-card p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-colors group">
                    <span className="font-mono text-sm text-primary mb-2 block">
                      {job.duration}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                      {job.role}
                    </h3>
                    <h4 className="text-lg text-muted-foreground font-medium mb-6">
                      {job.company}
                    </h4>
                    
                    <div className="text-muted-foreground space-y-2 text-sm leading-relaxed">
                      {job.description.split("\n").map((line, i) => (
                        <p key={i}>{line.trim()}</p>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
