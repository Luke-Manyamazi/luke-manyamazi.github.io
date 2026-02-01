import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/5 py-12">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-mono text-sm text-muted-foreground">
            © {currentYear} Luke Manyamazi. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {/* GitHub Link */}
          <a
            href="https://github.com/Luke-Manyamazi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={20} />
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/luke-manyamazi-5632b9331/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a href="mailto:lukemanyamazi1@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
