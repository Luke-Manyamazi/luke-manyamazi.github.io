import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Phone",
    value: "+263 718 604 286",
    href: "tel:+263718604286",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Zimbabwe",
    href: "https://maps.google.com/?q=Zimbabwe",
  },
];

const SOCIALS = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/Luke-Manyamazi" },
  { icon: Linkedin, label: "LinkedIn",  href: "https://www.linkedin.com/in/luke-manyamazi-5632b9331/" },
];

export function Contact() {
  return (
    <section id="contact" className="section-padding container mx-auto px-4 md:px-6 section-band">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHeader title="Get In Touch" subtitle="What's Next?" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground text-lg leading-relaxed mb-10"
        >
          Whether you have a project in mind, want to collaborate, or just want to
          say hi — my inbox is always open.
        </motion.p>

        {/* Primary email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <a href="mailto:lukemanyamazi1@gmail.com">
            <Button
              size="lg"
              className="h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold text-base gap-2"
            >
              <Mail size={18} />
              lukemanyamazi1@gmail.com
              <ArrowUpRight size={16} className="opacity-70" />
            </Button>
          </a>
        </motion.div>

        {/* Other contact items */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 glass-card rounded-xl text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
            >
              <Icon size={16} className="text-primary/60" />
              <span className="text-sm">{value}</span>
            </a>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/25 transition-all"
              title={label}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
