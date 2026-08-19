import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Link } from "react-scroll";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-mono text-lg font-bold text-white">
              LM<span className="text-primary">.</span>
            </span>
            <p className="font-mono text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Luke Manyamazi
            </p>
          </div>

          {/* Back to top */}
          <Link
            to="hero"
            smooth
            duration={600}
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
          >
            Back to top
            <span className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/40 transition-colors">
              <ArrowUp size={12} />
            </span>
          </Link>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github,   href: "https://github.com/Luke-Manyamazi",  label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/luke-manyamazi-5632b9331/", label: "LinkedIn" },
              { icon: Mail,     href: "mailto:lukemanyamazi1@gmail.com",    label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-muted-foreground/60 hover:text-primary transition-colors"
                title={label}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
