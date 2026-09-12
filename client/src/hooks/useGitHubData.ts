import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";
const STATIC_DATA_URL = "/data/github.json";
const CACHE_KEY = "gh_data_v2";
const CACHE_TTL = 60 * 60 * 1000;

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

interface GitHubSnapshot {
  generatedAt: string;
  contributions: ContributionData;
  repos: RawRepo[];
}

export interface GitHubData {
  contributions: ContributionData | null;
  repos: RawRepo[];
  languages: LanguageStat[];
  totalStars: number;
  loading: boolean;
}

let _promise: Promise<GitHubSnapshot> | null = null;

function aggregateLanguages(repos: RawRepo[]): LanguageStat[] {
  const counts: Record<string, { color: string; count: number }> = {};
  repos.forEach((r) => {
    (r.languages?.nodes || []).forEach((l) => {
      if (!counts[l.name]) counts[l.name] = { color: l.color || "#8b8b8b", count: 0 };
      counts[l.name].count++;
    });
  });
  const total = Object.values(counts).reduce((s, v) => s + v.count, 0) || 1;
  return Object.entries(counts)
    .map(([name, { color, count }]) => ({ name, color, count, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 14);
}

function loadCache(): GitHubSnapshot | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw) as { data: GitHubSnapshot; ts: number };
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}

function saveCache(data: GitHubSnapshot) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // Ignore storage failures.
  }
}

async function loadStaticSnapshot(): Promise<GitHubSnapshot> {
  const response = await fetch(`${STATIC_DATA_URL}?v=${Date.now()}`);
  if (!response.ok) throw new Error("Static GitHub snapshot unavailable");
  return response.json() as Promise<GitHubSnapshot>;
}

async function loadApiSnapshot(): Promise<GitHubSnapshot> {
  if (!API_URL) throw new Error("No GitHub API URL configured");

  const [contributions, reposResponse] = await Promise.all([
    fetch(`${API_URL}/api/contributions`).then((r) => r.json()) as Promise<ContributionData>,
    fetch(`${API_URL}/api/repos`).then((r) => r.json()) as Promise<{ repos: RawRepo[] }>,
  ]);

  return { generatedAt: new Date().toISOString(), contributions, repos: reposResponse.repos };
}

export function useGitHubData(): GitHubData {
  const cached = loadCache();
  const [data, setData] = useState<GitHubSnapshot | null>(cached);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    if (data) return;

    if (!_promise) {
      _promise = loadStaticSnapshot().catch(() => loadApiSnapshot());
    }

    _promise
      .then((result) => {
        saveCache(result);
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [data]);

  const repos = data?.repos ?? [];
  const contributions = data?.contributions ?? null;
  const totalStars = repos.reduce((s, r) => s + (r.stargazerCount || 0), 0);
  const languages = aggregateLanguages(repos);

  return { contributions, repos, languages, totalStars, loading };
}
