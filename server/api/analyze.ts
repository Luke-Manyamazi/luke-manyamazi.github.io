import type { VercelRequest, VercelResponse } from '@vercel/node';
import { rest, getFileContent, USERNAME } from '../lib/github';
import { analyzeRepo } from '../lib/claude';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { repo } = req.query;
  if (!repo || typeof repo !== 'string') {
    return res.status(400).json({ error: 'repo query param required' });
  }

  try {
    const [repoData, langs, topicsData, commits, readme] = await Promise.all([
      rest<Record<string, unknown>>(`/repos/${USERNAME}/${repo}`),
      rest<Record<string, number>>(`/repos/${USERNAME}/${repo}/languages`),
      rest<{ names: string[] }>(`/repos/${USERNAME}/${repo}/topics`, {
        headers: { Accept: 'application/vnd.github.mercy-preview+json' },
      }),
      rest<{ commit: { committer: { date: string } } }[]>(
        `/repos/${USERNAME}/${repo}/commits?per_page=1`
      ),
      getFileContent(repo, 'README.md'),
    ]);

    const lastCommit =
      (commits[0]?.commit?.committer?.date as string) ||
      (repoData.pushed_at as string);

    const analysis = await analyzeRepo({
      name: repoData.name as string,
      description: (repoData.description as string) || null,
      language: (repoData.language as string) || null,
      languages: Object.keys(langs),
      topics: topicsData.names || [],
      lastCommit,
      homepage: (repoData.homepage as string) || null,
      readme,
    });

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json(analysis);
  } catch (err) {
    console.error(`analyze error [${repo}]:`, err);
    return res.status(500).json({ error: 'Failed to analyze repo' });
  }
}
