import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const CACHE_KEY = 'gh_data_v1';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export interface ContributionData {
  name: string;
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
      weeks: { contributionDays: { contributionCount: number; date: string; color: string }[] }[];
    };
  };
}

export interface RawRepo {
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
}

export interface LanguageStat {
  name: string;
  color: string;
  count: number;
  pct: number;
}

export interface GitHubData {
  contributions: ContributionData | null;
  repos: RawRepo[];
  languages: LanguageStat[];
  totalStars: number;
  loading: boolean;
}

// Module-level cache so multiple components share one fetch
let _promise: Promise<{ contributions: ContributionData; repos: RawRepo[] }> | null = null;

function aggregateLanguages(repos: RawRepo[]): LanguageStat[] {
  const counts: Record<string, { color: string; count: number }> = {};
  repos.forEach((r) => {
    (r.languages?.nodes || []).forEach((l) => {
      if (!counts[l.name]) counts[l.name] = { color: l.color || '#8b8b8b', count: 0 };
      counts[l.name].count++;
    });
  });
  const total = Object.values(counts).reduce((s, v) => s + v.count, 0) || 1;
  return Object.entries(counts)
    .map(([name, { color, count }]) => ({ name, color, count, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 14);
}

function loadCache(): { contributions: ContributionData; repos: RawRepo[] } | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw) as { data: { contributions: ContributionData; repos: RawRepo[] }; ts: number };
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch { return null; }
}

function saveCache(data: { contributions: ContributionData; repos: RawRepo[] }) {
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch { /* noop */ }
}

export function useGitHubData(): GitHubData {
  const cached = loadCache();
  const [data, setData] = useState<{ contributions: ContributionData; repos: RawRepo[] } | null>(cached);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    if (data) return;

    if (!_promise) {
      _promise = Promise.all([
        fetch(`${API_URL}/api/contributions`).then((r) => r.json()) as Promise<ContributionData>,
        fetch(`${API_URL}/api/repos`).then((r) => r.json()).then((d: { repos: RawRepo[] }) => d.repos),
      ]).then(([contributions, repos]) => {
        const result = { contributions, repos };
        saveCache(result);
        return result;
      });
    }

    _promise.then((result) => {
      setData(result);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [data]);

  const repos = data?.repos ?? [];
  const contributions = data?.contributions ?? null;
  const totalStars = repos.reduce((s, r) => s + (r.stargazerCount || 0), 0);
  const languages = aggregateLanguages(repos);

  return { contributions, repos, languages, totalStars, loading };
}
