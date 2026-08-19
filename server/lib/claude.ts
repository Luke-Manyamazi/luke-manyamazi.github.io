import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

export async function analyzeRepo(repo: {
  name: string;
  description: string | null;
  language: string | null;
  languages: string[];
  topics: string[];
  lastCommit: string;
  homepage: string | null;
  readme: string | null;
}): Promise<RepoAnalysis> {
  const daysSinceCommit = Math.floor(
    (Date.now() - new Date(repo.lastCommit).getTime()) / (1000 * 60 * 60 * 24)
  );

  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    system:
      'You are a senior developer reviewing GitHub repos for a portfolio. Be concise and specific. Return only valid JSON.',
    messages: [
      {
        role: 'user',
        content: `Analyze this repo and return JSON only (no markdown):

name: ${repo.name}
description: ${repo.description || 'none'}
primary language: ${repo.language || 'none'}
all languages: ${repo.languages.join(', ') || 'none'}
topics: ${repo.topics.join(', ') || 'none'}
days since last commit: ${daysSinceCommit}
homepage: ${repo.homepage || 'none'}
readme preview: ${repo.readme ? repo.readme.slice(0, 1200) : 'none'}

Return this exact JSON:
{
  "status": "deployed|shipped|in-progress|learning|archived",
  "summary": "one sentence describing what this project does",
  "suggestions": ["actionable suggestion 1", "actionable suggestion 2", "actionable suggestion 3"],
  "missing": {
    "description": true|false,
    "readme": true|false,
    "topics": true|false,
    "license": true|false,
    "homepage": true|false
  },
  "score": 1-10
}

Status rules:
- deployed: has live homepage URL that works
- shipped: completed, no live URL or URL is a github.com link
- in-progress: commits within last 30 days, clearly unfinished
- learning: is a course assignment, exercise, tutorial, or learning project
- archived: no commits in 90+ days and incomplete`,
      },
    ],
  });

  const raw = msg.content[0].type === 'text' ? msg.content[0].text : '{}';
  const text = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  return JSON.parse(text) as RepoAnalysis;
}

export async function generateReadme(repo: {
  name: string;
  description: string | null;
  language: string | null;
  languages: string[];
  topics: string[];
  homepage: string | null;
  existingReadme: string | null;
}): Promise<string> {
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: `Write a professional README.md for this GitHub repository.

name: ${repo.name}
description: ${repo.description || 'none'}
primary language: ${repo.language || 'none'}
languages: ${repo.languages.join(', ') || 'none'}
topics: ${repo.topics.join(', ') || 'none'}
live URL: ${repo.homepage || 'none'}
existing README: ${repo.existingReadme ? repo.existingReadme.slice(0, 600) : 'none (create from scratch)'}

Write a clean README with: title, short description, tech stack badges, features list, getting started (install + run), and a MIT license note.
Return only the markdown, no code fences wrapping the whole thing.`,
      },
    ],
  });

  return msg.content[0].type === 'text' ? msg.content[0].text : '';
}
