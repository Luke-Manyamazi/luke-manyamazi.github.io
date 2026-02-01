import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";


export function Contact() {
  const { toast } = useToast();

  return (
    <section id="contact" className="section-padding container mx-auto px-4 md:px-6 mb-20">
      <SectionHeader title="Get In Touch" subtitle="What's Next?" />

      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Let's build something amazing together.</h3>
          <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
            Whether you have a question,
            a project idea, or just want to say hi, my inbox is always open.
          </p>

          <div className="space-y-6">
            <a href="mailto:lukemanyamazi1@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <span className="text-lg">lukemanyamazi1@gmail.com</span>
            </a>
            <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="h-5 w-5" />
              </div>
              <span className="text-lg">+27 62 107 1140</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="text-lg">South Africa</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section >
  );
}
