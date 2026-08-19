import type { VercelRequest, VercelResponse } from '@vercel/node';
import { graphql, USERNAME } from '../lib/github';

const QUERY = `
  query($username: String!, $after: String) {
    user(login: $username) {
      repositories(
        first: 100
        after: $after
        privacy: PUBLIC
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          homepageUrl
          pushedAt
          updatedAt
          stargazerCount
          forkCount
          isArchived
          primaryLanguage { name color }
          languages(first: 6) { nodes { name color } }
          repositoryTopics(first: 10) { nodes { topic { name } } }
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 1) {
                  nodes { committedDate message }
                }
              }
            }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const repos: unknown[] = [];
    let after: string | null = null;
    let hasNextPage = true;

    while (hasNextPage) {
      const data: {
        user: {
          repositories: {
            nodes: unknown[];
            pageInfo: { hasNextPage: boolean; endCursor: string | null };
          };
        };
      } = await graphql(QUERY, { username: USERNAME, after });

      repos.push(...data.user.repositories.nodes);
      ({ hasNextPage, endCursor: after } = data.user.repositories.pageInfo);
    }

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    return res.status(200).json({ repos });
  } catch (err) {
    console.error('repos error:', err);
    return res.status(500).json({ error: 'Failed to fetch repos' });
  }
}
