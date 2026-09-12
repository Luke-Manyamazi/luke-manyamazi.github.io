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
    { icon: GitCommit, value: cc?.totalCommitContributions ?? 0, suffix: "+", label: "Commits", sub: "This calendar year", color: "text-primary" },
    { icon: GitPullRequest, value: cc?.totalPullRequestContributions ?? 0, suffix: "", label: "Pull Requests", sub: "Merged & reviewed", color: "text-blue-400" },
    { icon: Users, value: contributions?.followers?.totalCount ?? 0, suffix: "", label: "Followers", sub: "GitHub community", color: "text-purple-400" },
    { icon: Star, value: totalStars, suffix: "", label: "Stars", sub: "Across all repos", color: "text-yellow-400" },
  ];

  return (
    <section id="about" className="section-padding container mx-auto px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-start">
        <div>
          <SectionHeader title="About Me" subtitle="How I approach software" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-5 text-muted-foreground text-base md:text-[17px] leading-[1.8]"
          >
            <p>
              I'm a full-stack software developer with more than a decade of hands-on experience in enterprise IT. I combine software engineering with a practical understanding of the systems, infrastructure, support, and deployment work that keeps businesses running.
            </p>

            <p>
              My current focus is building <strong className="text-white font-medium">modern web applications, AI-powered tools, cloud services, and business systems</strong> that solve specific operational problems. I enjoy taking a product from requirements and architecture through implementation, deployment, and iteration.
            </p>

            <p>
              My core stack spans <strong className="text-white font-medium">TypeScript, JavaScript, React, Next.js, Node.js, Python, PostgreSQL, Supabase, and AWS</strong>. I also work comfortably with authentication, API integration, database design, automation, responsive UI, and production troubleshooting.
            </p>

            <p>
              My enterprise background includes software, infrastructure, networking, application support, deployments, and user support across <strong className="text-white font-medium">170+ branches</strong>. That experience shapes how I build: software should be reliable, understandable, secure, maintainable, and useful to the people depending on it.
            </p>

            <p>
              I completed CodeYourFuture's intensive full-stack development programme and am pursuing a <strong className="text-white font-medium">BSc Honours in Software Engineering</strong>. I'm especially interested in practical technology for African markets, business automation, agriculture, conservation, and AI-assisted workflows.
            </p>

            <p className="text-white/80">
              <strong className="font-medium">Build. Deploy. Learn. Improve.</strong> That's the loop I bring to every project.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ icon: Icon, value, suffix, label, sub, color }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }} className="glass-card-hover gradient-border rounded-2xl p-5 flex flex-col gap-3">
              <Icon size={18} className={`${color} opacity-80`} />
              <div>
                <div className="text-3xl font-bold text-white font-mono leading-none mb-1">{loading ? <span className="opacity-20 animate-pulse">—</span> : <Counter to={value} suffix={suffix} />}</div>
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
