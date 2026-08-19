import type { VercelRequest, VercelResponse } from '@vercel/node';
import { rest, USERNAME } from '../lib/github';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { repo, path, content, message } = req.body as {
    repo?: string;
    path?: string;
    content?: string;
    message?: string;
  };

  if (!repo || !path || !content) {
    return res.status(400).json({ error: 'repo, path, and content are required' });
  }

  try {
    // Get existing file SHA if it exists (required for updates)
    let sha: string | undefined;
    try {
      const existing = await rest<{ sha: string }>(`/repos/${USERNAME}/${repo}/contents/${path}`);
      sha = existing.sha;
    } catch {
      // File doesn't exist yet — create it
    }

    const body: Record<string, string> = {
      message: message || `docs: update ${path} via AI portfolio dashboard`,
      content: Buffer.from(content).toString('base64'),
    };
    if (sha) body.sha = sha;

    await rest(`/repos/${USERNAME}/${repo}/contents/${path}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(`push error [${repo}/${path}]:`, err);
    return res.status(500).json({ error: 'Failed to push file to GitHub' });
  }
}
