import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { ContributionGraph } from "./ContributionGraph";
import { RepoCard } from "./RepoCard";
import { RepoModal } from "./RepoModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, RefreshCw } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const GITHUB_USERNAME = 'luke-manyamazi';

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  pushedAt: string;
  updatedAt: string;
  stargazerCount: number;
  forkCount: number;
  isArchived: boolean;
  primaryLanguage: { name: string; color: string } | null;
  languages: { name: string; color: string }[];
  topics: string[];
  lastCommitMessage: string | null;
}

export interface RepoAnalysis {
  status: 'deployed' | 'shipped' | 'in-progress' | 'learning' | 'archived';
  summary: string;
  suggestions: string[];
  missing: {
    description: boolean;
    readme: boolean;
    topics: boolean;
    license: boolean;
    homepage: boolean;
  };
  score: number;
}

interface ContributionData {
  name: string;
  bio: string;
  avatarUrl: string;
  followers: { totalCount: number };
  repositories: { totalCount: number };
  contributionsCollection: {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    totalIssueContributions: number;
    contributionCalendar: {
      totalContributions: number;
      months: { name: string; firstDay: string; totalWeeks: number }[];
      weeks: {
        contributionDays: { contributionCount: number; date: string; color: string }[];
      }[];
    };
  };
}

const STATUS_ORDER: Record<string, number> = {
  'in-progress': 0,
  deployed: 1,
  shipped: 2,
  learning: 3,
  archived: 4,
};

function parseAdminSecret(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('admin');
}

export function GitHubDashboard() {
  const [contributions, setContributions] = useState<ContributionData | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [analyses, setAnalyses] = useState<Record<string, RepoAnalysis>>({});
  const [loadingAnalyses, setLoadingAnalyses] = useState<Set<string>>(new Set());
  const [loadingContribs, setLoadingContribs] = useState(true);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [adminSecret] = useState<string | null>(parseAdminSecret);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(6);

  // Topic-based status overrides — add status-deployed / status-learning etc. as a topic on GitHub
  function getEffectiveStatus(repo: GitHubRepo, analysis?: RepoAnalysis): RepoAnalysis['status'] {
    const statusTopic = repo.topics.find(t =>
      /^status-(deployed|shipped|in-progress|learning|archived)$/.test(t)
    );
    if (statusTopic) return statusTopic.replace('status-', '') as RepoAnalysis['status'];
    return analysis?.status ?? 'in-progress';
  }

  const fetchContributions = useCallback(async () => {
    setLoadingContribs(true);
    try {
      const res = await fetch(`${API_URL}/api/contributions`);
      const data = await res.json() as ContributionData;
      setContributions(data);
    } catch (err) {
      console.error('Failed to fetch contributions:', err);
    } finally {
      setLoadingContribs(false);
    }
  }, []);

  const fetchRepos = useCallback(async () => {
    setLoadingRepos(true);
    try {
      const res = await fetch(`${API_URL}/api/repos`);
      const { repos: rawRepos } = await res.json() as {
        repos: {
          name: string;
          description: string | null;
          url: string;
          homepageUrl: string | null;
          pushedAt: string;
          updatedAt: string;
          stargazerCount: number;
          forkCount: number;
          isArchived: boolean;
          primaryLanguage: { name: string; color: string } | null;
          languages: { nodes: { name: string; color: string }[] };
          repositoryTopics: { nodes: { topic: { name: string } }[] };
          defaultBranchRef: { target: { history: { nodes: { committedDate: string; message: string }[] } } } | null;
        }[];
      };

      const normalised: GitHubRepo[] = rawRepos.map((r) => ({
        name: r.name,
        description: r.description,
        url: r.url,
        homepageUrl: r.homepageUrl,
        pushedAt: r.pushedAt,
        updatedAt: r.updatedAt,
        stargazerCount: r.stargazerCount,
        forkCount: r.forkCount,
        isArchived: r.isArchived,
        primaryLanguage: r.primaryLanguage,
        languages: r.languages?.nodes || [],
        topics: r.repositoryTopics?.nodes?.map((n) => n.topic.name) || [],
        lastCommitMessage:
          r.defaultBranchRef?.target?.history?.nodes?.[0]?.message || null,
      }));

      setRepos(normalised);
      queueAnalyses(normalised);
    } catch (err) {
      console.error('Failed to fetch repos:', err);
    } finally {
      setLoadingRepos(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function queueAnalyses(repoList: GitHubRepo[]) {
    const CONCURRENCY = 3;
    let idx = 0;

    async function runNext() {
      if (idx >= repoList.length) return;
      const repo = repoList[idx++];

      setLoadingAnalyses((prev) => new Set(prev).add(repo.name));
      try {
        const res = await fetch(`${API_URL}/api/analyze?repo=${repo.name}`);
        if (res.ok) {
          const analysis = await res.json() as RepoAnalysis;
          setAnalyses((prev) => ({ ...prev, [repo.name]: analysis }));
        }
      } catch {
        // silently skip failed analysis
      } finally {
        setLoadingAnalyses((prev) => {
          const next = new Set(prev);
          next.delete(repo.name);
          return next;
        });
        runNext();
      }
    }

    for (let i = 0; i < CONCURRENCY; i++) runNext();
  }

  useEffect(() => {
    fetchContributions();
    fetchRepos();
  }, [fetchContributions, fetchRepos]);

  const filteredRepos = repos
    .filter((r) => {
      // hide archived repos entirely
      if (getEffectiveStatus(r, analyses[r.name]) === 'archived') return false;
      if (filterStatus === 'all') return true;
      return getEffectiveStatus(r, analyses[r.name]) === filterStatus;
    })
    .sort((a, b) => {
      const sa = STATUS_ORDER[getEffectiveStatus(a, analyses[a.name])] ?? 5;
      const sb = STATUS_ORDER[getEffectiveStatus(b, analyses[b.name])] ?? 5;
      return sa - sb;
    });

  const visibleRepos = filteredRepos.slice(0, visibleCount);
  const hasMore = filteredRepos.length > visibleCount;

  const statusCounts = repos.reduce<Record<string, number>>((acc, r) => {
    const s = getEffectiveStatus(r, analyses[r.name]);
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const contribData = contributions?.contributionsCollection;
  const calendar = contribData?.contributionCalendar;

  return (
    <section id="github" className="section-padding container mx-auto px-4 md:px-6 section-band">
      <div className="flex items-start justify-between mb-0">
        <SectionHeader title="GitHub Activity" subtitle="Open Source" />
        <div className="flex items-center gap-2 mt-1">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            <Github size={14} />
            @{GITHUB_USERNAME}
          </a>
          {adminSecret && (
            <button
              onClick={() => { fetchContributions(); fetchRepos(); }}
              className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-white/5"
              title="Refresh data"
            >
              <RefreshCw size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Contribution graph */}
      {loadingContribs ? (
        <Skeleton className="h-48 w-full bg-white/5 rounded-2xl mb-8" />
      ) : calendar && contribData ? (
        <div className="mb-8">
          <ContributionGraph
            weeks={calendar.weeks}
            months={calendar.months}
            totalContributions={calendar.totalContributions}
            totalCommits={contribData.totalCommitContributions}
            totalPRs={contribData.totalPullRequestContributions}
            totalIssues={contribData.totalIssueContributions}
            totalRepos={contributions?.repositories.totalCount || 0}
          />
        </div>
      ) : null}

      {/* Filter tabs */}
      {!loadingRepos && repos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {[
            { key: 'all',         label: `All (${filteredRepos.length})` },
            { key: 'in-progress', label: `In Progress (${statusCounts['in-progress'] || 0})` },
            { key: 'deployed',    label: `Deployed (${statusCounts['deployed'] || 0})` },
            { key: 'shipped',     label: `Shipped (${statusCounts['shipped'] || 0})` },
            { key: 'learning',    label: `Learning (${statusCounts['learning'] || 0})` },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setFilterStatus(key); setVisibleCount(6); }}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                filterStatus === key
                  ? 'bg-primary/20 text-primary border-primary/30'
                  : 'bg-white/[0.03] text-muted-foreground border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Repo grid */}
      {loadingRepos ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-52 w-full bg-white/5 rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleRepos.map((repo, i) => (
              <RepoCard
                key={repo.name}
                repo={repo}
                analysis={analyses[repo.name] ? { ...analyses[repo.name], status: getEffectiveStatus(repo, analyses[repo.name]) } : null}
                analysisLoading={loadingAnalyses.has(repo.name)}
                index={i}
                onClick={() => setSelectedRepo(repo)}
              />
            ))}
          </div>

          {/* Show more / less */}
          {filteredRepos.length > 6 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              {hasMore ? (
                <button
                  onClick={() => setVisibleCount(c => c + 6)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl glass-card text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
                >
                  Show {Math.min(6, filteredRepos.length - visibleCount)} more
                  <span className="text-xs text-muted-foreground/50">
                    ({visibleCount} / {filteredRepos.length})
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setVisibleCount(6)}
                  className="text-xs font-mono text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                >
                  Show less
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Classification hint */}
      <p className="text-center text-xs text-muted-foreground/30 font-mono mt-6">
        {adminSecret
          ? "Admin mode active — click any card to generate missing files"
          : "Tip: add a topic like status-deployed or status-learning to any GitHub repo to set its classification"}
      </p>

      {/* Repo modal */}
      {selectedRepo && (
        <RepoModal
          repo={selectedRepo}
          analysis={analyses[selectedRepo.name] || null}
          adminSecret={adminSecret}
          onClose={() => setSelectedRepo(null)}
        />
      )}
    </section>
  );
}
