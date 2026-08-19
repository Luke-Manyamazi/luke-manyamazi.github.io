const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
export const USERNAME = process.env.GITHUB_USERNAME || 'luke-manyamazi';

export async function graphql<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as { data?: T; errors?: unknown[] };
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}

export async function rest<T = unknown>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...((options?.headers as Record<string, string>) || {}),
    },
  });
  return res.json() as Promise<T>;
}

export async function getFileContent(
  repo: string,
  filePath: string
): Promise<string | null> {
  try {
    const data = await rest<{ content?: string }>(
      `/repos/${USERNAME}/${repo}/contents/${filePath}`
    );
    if (!data.content) return null;
    return Buffer.from(data.content, 'base64').toString('utf-8');
  } catch {
    return null;
  }
}
