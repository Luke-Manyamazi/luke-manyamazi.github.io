import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useGitHubData } from "@/hooks/useGitHubData";
import { GitCommit, GitPullRequest, Users, Star } from "lucide-react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || !to) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return controls.stop;
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export function About() {
  const { contributions, totalStars, loading } = useGitHubData();
  const cc = contributions?.contributionsCollection;

  const stats = [
    {
      icon: GitCommit,
      value: cc?.totalCommitContributions ?? 0,
      suffix: "+",
      label: "Commits",
      sub: "This calendar year",
      color: "text-primary",
    },
    {
      icon: GitPullRequest,
      value: cc?.totalPullRequestContributions ?? 0,
      suffix: "",
      label: "Pull Requests",
      sub: "Merged & reviewed",
      color: "text-blue-400",
    },
    {
      icon: Users,
      value: contributions?.followers?.totalCount ?? 0,
      suffix: "",
      label: "Followers",
      sub: "GitHub community",
      color: "text-purple-400",
    },
    {
      icon: Star,
      value: totalStars,
      suffix: "",
      label: "Stars",
      sub: "Across all repos",
      color: "text-yellow-400",
    },
  ];

  return (
    <section id="about" className="section-padding container mx-auto px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-start">

        {/* Text */}
        <div>
          <SectionHeader title="About Me" subtitle="Who I Am" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-5 text-muted-foreground text-base md:text-[17px] leading-[1.8]"
          >
            <p>
  					I'm a full-stack software developer with over a decade of hands-on experience
  					in enterprise IT, combining software engineering with a strong understanding
  					of the systems and infrastructure that power modern businesses.
						</p>

						<p>
  					I'm currently pursuing a{" "}
  					<strong className="text-white font-medium">BSc Honours in Software Engineering</strong>{" "}
  					while building modern web applications, SaaS platforms, and business solutions
  					for clients and personal projects. My development work spans technologies
  					including React, TypeScript, Node.js, Python, PostgreSQL, and cloud platforms.
						</p>

						<p>
  					My professional background includes extensive experience supporting enterprise
					  technology at scale. At Torga Optical, I've worked across software,
  					infrastructure, networking, application support, deployments, and user support,
  					contributing to technology operations across{" "}
  					<strong className="text-white font-medium">170+ branches</strong>. This experience
  					has given me a practical understanding of how software needs to perform in
  					real business environments — not just in development.
						</p>

						<p>
  					I also completed{" "}
  					<strong className="text-white font-medium">
    				CodeYourFuture's intensive full-stack development programme
  					</strong>
  					, strengthening my foundation in modern software engineering and collaborative
  					development practices.
						</p>

						<p>
  					I enjoy turning real-world problems into practical software solutions, from
  					business applications and SaaS platforms to tools that improve everyday
  					workflows.
						</p>

						<p>
  					When I'm away from the keyboard, I spend time working on a small farm — a
  					welcome change of pace and a reminder that not everything needs a screen.
						</p>
          </motion.div>
        </div>

        {/* Live stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ icon: Icon, value, suffix, label, sub, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="glass-card-hover gradient-border rounded-2xl p-5 flex flex-col gap-3"
            >
              <Icon size={18} className={`${color} opacity-80`} />
              <div>
                <div className="text-3xl font-bold text-white font-mono leading-none mb-1">
                  {loading ? (
                    <span className="opacity-20 animate-pulse">—</span>
                  ) : (
                    <Counter to={value} suffix={suffix} />
                  )}
                </div>
                <div className="text-sm font-semibold text-white/80">{label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
