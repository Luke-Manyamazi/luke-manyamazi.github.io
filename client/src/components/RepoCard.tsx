import { motion } from "framer-motion";
import { Github, ExternalLink, Star, AlertTriangle } from "lucide-react";
import type { GitHubRepo, RepoAnalysis } from "./GitHubDashboard";

export type RepoStatus = 'deployed' | 'shipped' | 'in-progress' | 'learning' | 'archived';

const STATUS_CONFIG: Record<RepoStatus, { label: string; dot: string; badge: string }> = {
  deployed:     { label: 'Deployed',     dot: 'bg-green-400',          badge: 'bg-green-400/10 text-green-400 border-green-400/20' },
  shipped:      { label: 'Shipped',      dot: 'bg-blue-400',           badge: 'bg-blue-400/10 text-blue-400 border-blue-400/20' },
  'in-progress':{ label: 'In Progress',  dot: 'bg-yellow-400 animate-pulse', badge: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
  learning:     { label: 'Learning',     dot: 'bg-purple-400',         badge: 'bg-purple-400/10 text-purple-400 border-purple-400/20' },
  archived:     { label: 'Archived',     dot: 'bg-white/20',           badge: 'bg-white/5 text-muted-foreground border-white/10' },
};

interface RepoCardProps {
  repo: GitHubRepo;
  analysis: RepoAnalysis | null;
  analysisLoading: boolean;
  index: number;
  onClick: () => void;
}

export function RepoCard({ repo, analysis, analysisLoading, index, onClick }: RepoCardProps) {
  const status = (analysis?.status ?? 'in-progress') as RepoStatus;
  const cfg = STATUS_CONFIG[status];
  const missingCount = analysis
    ? Object.values(analysis.missing).filter(Boolean).length
    : 0;

  const lastCommitDays = repo.pushedAt
    ? Math.floor((Date.now() - new Date(repo.pushedAt).getTime()) / 86400000)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      onClick={onClick}
      className="glass-card p-5 rounded-2xl flex flex-col h-full group hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full border ${cfg.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
        <div className="flex gap-3">
          {repo.homepageUrl && (
            <a
              href={repo.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-primary transition-colors"
              title="Live site"
            >
              <ExternalLink size={14} />
            </a>
          )}
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-white transition-colors"
            title="GitHub repo"
          >
            <Github size={14} />
          </a>
        </div>
      </div>

      {/* Repo name */}
      <h3 className="font-mono font-semibold text-sm text-white mb-2 group-hover:text-primary transition-colors leading-snug">
        {repo.name}
      </h3>

      {/* Summary / description */}
      <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-grow line-clamp-3">
        {analysisLoading ? (
          <span className="inline-flex gap-1 items-center">
            <span className="w-24 h-3 bg-white/5 rounded animate-pulse inline-block" />
            <span className="w-16 h-3 bg-white/5 rounded animate-pulse inline-block" />
          </span>
        ) : (
          analysis?.summary || repo.description || 'No description.'
        )}
      </p>

      {/* Footer row */}
      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
        {repo.primaryLanguage && (
          <div className="flex items-center gap-1.5 min-w-0">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: repo.primaryLanguage.color || '#8b8b8b' }}
            />
            <span className="text-[11px] text-muted-foreground font-mono truncate">
              {repo.primaryLanguage.name}
            </span>
          </div>
        )}
        <div className="flex items-center gap-3 ml-auto flex-shrink-0">
          {repo.stargazerCount > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground/60">
              <Star size={11} />
              <span className="text-[11px] font-mono">{repo.stargazerCount}</span>
            </div>
          )}
          {lastCommitDays !== null && (
            <span className="text-[11px] font-mono text-muted-foreground/50">
              {lastCommitDays === 0 ? 'today' : lastCommitDays < 30 ? `${lastCommitDays}d ago` : lastCommitDays < 365 ? `${Math.floor(lastCommitDays / 30)}mo ago` : `${Math.floor(lastCommitDays / 365)}y ago`}
            </span>
          )}
          {missingCount > 0 && (
            <div className="flex items-center gap-1 text-yellow-400/60" title={`${missingCount} items missing`}>
              <AlertTriangle size={11} />
              <span className="text-[11px] font-mono">{missingCount}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
