import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/Luke-Manyamazi" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/luke-manyamazi-5632b9331/" },
];

export function Contact() {
  return (
    <section id="contact" className="section-padding container mx-auto px-4 md:px-6 section-band">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeader title="Let's Build Something Useful" subtitle="Get In Touch" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground text-lg leading-relaxed mb-8"
        >
          I’m open to software engineering opportunities, remote work, product collaborations,
          and interesting problems where practical software can create measurable value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <a href="mailto:lukemanyamazi1@gmail.com">
            <Button size="lg" className="h-13 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold gap-2">
              <Mail size={18} />
              Email Me
              <ArrowUpRight size={16} className="opacity-70" />
            </Button>
          </a>
          <a href="https://lukemanyamazi.tech" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="h-13 px-8 rounded-xl border-white/10 hover:border-primary/30 hover:text-primary gap-2">
              View Portfolio
              <ExternalLink size={15} />
            </Button>
          </a>
        </motion.div>

        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground/70 mb-8">
          <span className="flex items-center gap-2"><MapPin size={15} className="text-primary/60" />Zimbabwe · Remote</span>
          <span className="hidden sm:block h-4 w-px bg-white/10" />
          <span>Open to engineering opportunities</span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
              className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/25 transition-all">
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
