import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useExperience } from "@/hooks/use-portfolio";
import { MapPin, ChevronDown, ChevronUp, Briefcase } from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
  "full-time": "bg-primary/10 text-primary border-primary/20",
};

export function Experience() {
  const { data: experience } = useExperience();
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="section-padding container mx-auto px-4 md:px-6">
      <SectionHeader title="Career Journey" subtitle="Experience" />

      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden sm:block" />

          <div className="space-y-4">
            {experience?.map((job, idx) => {
              const isOpen = expanded === idx;
              const bullets = job.description.split("\n").filter(Boolean);

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex gap-5"
                >
                  {/* Timeline dot */}
                  <div className="hidden sm:flex flex-col items-center flex-shrink-0 mt-5">
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 transition-colors duration-300 ${
                        isOpen ? "border-primary bg-primary/15" : "border-white/15 bg-background"
                      }`}
                    >
                      <Briefcase size={14} className={isOpen ? "text-primary" : "text-muted-foreground"} />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 glass-card rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen ? "border-primary/20" : "hover:border-white/10"
                    }`}
                  >
                    {/* Header — always visible */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : idx)}
                      className="w-full text-left p-5 md:p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                              {job.duration}
                            </span>
                            {(job as { type?: string }).type && (
                              <span className={`font-mono text-[11px] px-2 py-0.5 rounded-full border ${TYPE_COLORS["full-time"]}`}>
                                Full-time
                              </span>
                            )}
                          </div>
                          <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                            {job.role}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            <MapPin size={12} className="text-primary/50 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {job.company}
                              {(job as { location?: string }).location && (
                                <span className="text-muted-foreground/50"> · {(job as { location?: string }).location}</span>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 mt-1 text-muted-foreground">
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                    </button>

                    {/* Expanded bullets */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 border-t border-white/5">
                            <ul className="space-y-2.5 mt-4">
                              {bullets.map((line, i) => (
                                <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                  <span className="text-primary/40 mt-1.5 flex-shrink-0 text-xs">▸</span>
                                  {line.trim()}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
