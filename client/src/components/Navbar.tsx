import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "About", to: "about" },
  { name: "Skills", to: "skills" },
  { name: "Experience", to: "experience" },
  { name: "Projects", to: "projects" },
  { name: "Contact", to: "contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Luke-Manyamazi", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/luke-manyamazi-5632b9331/", icon: Linkedin },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="hero" smooth duration={500} className="cursor-pointer font-mono text-xl font-bold tracking-tighter text-white" aria-label="Back to home">
          LM<span className="text-primary">.</span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth
              duration={500}
              offset={-100}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {item.name}
            </Link>
          ))}

          <div className="w-px h-5 bg-white/10" />

          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={label} title={label}>
              <Icon size={17} />
            </a>
          ))}

          <a href="/resume.pdf" download="Luke_Manyamazi_Resume.pdf">
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 hover:text-primary font-mono text-xs h-9 px-4">Resume</Button>
          </a>
        </div>

        <button className="lg:hidden text-white rounded-lg p-2 hover:bg-white/5" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  smooth
                  duration={500}
                  offset={-100}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors cursor-pointer block py-3"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex gap-4 py-3 border-t border-white/5 mt-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label={label}>
                    <Icon size={19} />
                  </a>
                ))}
              </div>

              <a href="/resume.pdf" download="Luke_Manyamazi_Resume.pdf">
                <Button className="w-full mt-2 font-mono">Download CV</Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
