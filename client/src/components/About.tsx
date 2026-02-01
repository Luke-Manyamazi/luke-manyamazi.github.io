import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="section-padding container mx-auto px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="About Me" subtitle="Who I Am" />

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 prose prose-invert prose-lg text-muted-foreground leading-relaxed"
          >
            <p className="mb-6">
              I am a passionate and versatile Software Developer with a robust background in
              Systems Administration. My journey in tech has equipped me with a unique
              perspective that bridges the gap between efficient code and reliable infrastructure.
            </p>
            <p className="mb-6">
              With experience spanning multiple domains, I've honed my skills in creating
              scalable web applications and maintaining complex systems. I thrive in
              environments where I can solve challenging problems and continuously learn
              new technologies.
            </p>
            <p>
              When I'm not coding, you can find me exploring new tech trends, optimizing
              workflows, or contributing to open-source projects.
            </p>
          </motion.div>


        </div>
      </div>
    </section>
  );
}
