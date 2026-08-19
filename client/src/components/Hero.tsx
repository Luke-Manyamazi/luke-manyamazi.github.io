import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-scroll";
import { ArrowRight, Download, Github, Linkedin, Mail, GitCommit, GitPullRequest, Star, BookOpen } from "lucide-react";
import { useGitHubData } from "@/hooks/useGitHubData";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || !to) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return controls.stop;
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export function Hero() {
  const { contributions, totalStars, loading } = useGitHubData();
  const cc = contributions?.contributionsCollection;

  const liveStats = [
    {
      icon: GitCommit,
      value: cc?.totalCommitContributions ?? 0,
      suffix: "+",
      label: "Commits this year",
      loading,
    },
    {
      icon: GitPullRequest,
      value: cc?.totalPullRequestContributions ?? 0,
      suffix: "",
      label: "Pull Requests",
      loading,
    },
    {
      icon: BookOpen,
      value: contributions?.repositories?.totalCount ?? 0,
      suffix: "",
      label: "Public Repos",
      loading,
    },
    {
      icon: Star,
      value: totalStars,
      suffix: "",
      label: "GitHub Stars",
      loading,
    },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 -left-32 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(210 40% 98% / 1) 1px, transparent 1px), linear-gradient(90deg, hsl(210 40% 98% / 1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)] py-12">

          {/* ── Text column ── */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">

            {/* Role label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-10 bg-primary/60" />
              <span className="font-mono text-sm text-primary tracking-widest uppercase">
                Software Engineer
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tighter leading-[1.0] text-white">
                Luke
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tighter leading-[1.0]"
                style={{
                  background: "linear-gradient(135deg, #4ade80 0%, #22d3ee 50%, #4ade80 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Manyamazi.
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl mb-8"
            >
              Full-stack developer and IT specialist based in{" "}
              <span className="text-white font-medium">Cape Town, South Africa</span>.
              Building modern web applications and keeping enterprise systems
              running across 170+ branches.
            </motion.p>

            {/* Live GitHub stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
            >
              {liveStats.map(({ icon: Icon, value, suffix, label, loading: l }) => (
                <div
                  key={label}
                  className="glass-card rounded-xl p-3 flex flex-col gap-1 hover:border-primary/20 transition-colors"
                >
                  <Icon size={14} className="text-primary/60 mb-0.5" />
                  <div className="text-xl font-bold text-white font-mono">
                    {l ? (
                      <span className="opacity-30 animate-pulse">—</span>
                    ) : (
                      <Counter to={value} suffix={suffix} />
                    )}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-tight">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link to="projects" smooth duration={500} offset={-100}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-7 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold text-sm"
                >
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="/resume.pdf" download="Luke_Manyamazi_Resume.pdf">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-7 h-12 rounded-xl border-white/10 hover:border-primary/30 hover:bg-primary/8 hover:text-primary text-sm"
                >
                  Download CV <Download className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-5"
            >
              {[
                { icon: Github,   href: "https://github.com/Luke-Manyamazi",               label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/luke-manyamazi-5632b9331/", label: "LinkedIn" },
                { icon: Mail,     href: "mailto:lukemanyamazi1@gmail.com",                 label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-muted-foreground/50 hover:text-primary transition-colors"
                  title={label}
                >
                  <Icon size={19} />
                </a>
              ))}
              <div className="w-px h-5 bg-white/10" />
              <span className="font-mono text-xs text-muted-foreground/40">@luke-manyamazi</span>
            </motion.div>
          </div>

          {/* ── Image column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 relative w-full"
          >
            {/* Glow */}
            <div className="absolute -inset-8 bg-primary/5 rounded-3xl blur-2xl" />

            {/* Image wrapper — no circle, rectangular portrait */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full max-w-sm mx-auto lg:max-w-none">
              <img
                src="/hero-image-cutout.png"
                alt="Luke Manyamazi"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const el = e.currentTarget;
                  el.style.display = "none";
                  const p = el.parentElement;
                  if (p) p.style.background = "linear-gradient(135deg, hsl(222 47% 16%), hsl(222 47% 20%))";
                }}
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background/80 via-background/20 to-transparent pointer-events-none" />
              {/* Top-left accent border */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/50 rounded-tl-2xl pointer-events-none" />
              {/* Bottom-right accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-2xl pointer-events-none" />
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -right-4 top-8 glass-card px-4 py-2.5 rounded-xl hidden lg:block"
            >
              <div className="text-xl font-bold text-white font-mono">10+</div>
              <div className="text-xs text-muted-foreground">Years in Tech</div>
            </motion.div>

            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -left-4 bottom-16 glass-card px-4 py-2.5 rounded-xl hidden lg:block"
            >
              <div className="text-xs font-mono text-primary mb-0.5">📍 Based in</div>
              <div className="text-sm font-semibold text-white">Zimbabwe</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
