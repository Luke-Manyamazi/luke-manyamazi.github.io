import type { VercelRequest, VercelResponse } from '@vercel/node';
import { rest, getFileContent, USERNAME } from '../lib/github';
import { generateReadme } from '../lib/claude';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { repo, type } = req.body as { repo?: string; type?: string };
  if (!repo || !type) {
    return res.status(400).json({ error: 'repo and type are required' });
  }

  try {
    const [repoData, langs, topicsData, existingReadme] = await Promise.all([
      rest<Record<string, unknown>>(`/repos/${USERNAME}/${repo}`),
      rest<Record<string, number>>(`/repos/${USERNAME}/${repo}/languages`),
      rest<{ names: string[] }>(`/repos/${USERNAME}/${repo}/topics`, {
        headers: { Accept: 'application/vnd.github.mercy-preview+json' },
      }),
      getFileContent(repo, 'README.md'),
    ]);

    if (type === 'readme') {
      const content = await generateReadme({
        name: repoData.name as string,
        description: (repoData.description as string) || null,
        language: (repoData.language as string) || null,
        languages: Object.keys(langs),
        topics: topicsData.names || [],
        homepage: (repoData.homepage as string) || null,
        existingReadme,
      });

      return res.status(200).json({
        type: 'readme',
        path: 'README.md',
        content,
        exists: !!existingReadme,
        previous: existingReadme,
      });
    }

    return res.status(400).json({ error: `Unknown type: ${type}` });
  } catch (err) {
    console.error(`generate error [${repo}/${type}]:`, err);
    return res.status(500).json({ error: 'Failed to generate content' });
  }
}
