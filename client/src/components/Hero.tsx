import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-scroll";
import { ArrowRight, Download } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="font-mono text-primary text-lg md:text-xl">Hi, my name is</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6"
            >
              Luke Manyamazi.
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-muted-foreground mb-8"
            >
              I build things for the web.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
            >
              I'm a software developer and systems administrator specializing in building
              exceptional digital experiences. Currently, I'm focused on creating accessible,
              human-centered products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="projects" smooth={true} duration={500} offset={-100}>
                <Button size="lg" className="text-lg px-8 h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                  Check out my work <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="/resume.pdf" download="Luke_Manyamazi_Resume.pdf">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary">
                  Download Resume <Download className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative w-full max-w-[500px] aspect-square lg:aspect-[4/5]"
          >
            {/* Gradient Merge */}
            <div className="relative w-full h-full bg-gradient-to-b from-primary/20 to-transparent rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-primary/30 rounded-2xl">
                <span className="text-primary/50 font-mono text-sm"></span>
              </div>


              {<img
                src="/hero-image.png"
                alt="Luke Manyamazi"
                className="w-full h-full object-cover"
              />}

              {/* Gradient overlay to merge at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </div>

            {/* Decorative element */}
            <div className="absolute -inset-4 border-2 border-primary/10 rounded-3xl -z-10 group-hover:border-primary/20 transition-colors" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
