import type { VercelRequest, VercelResponse } from '@vercel/node';
import { graphql, USERNAME } from '../lib/github';

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      name
      bio
      avatarUrl
      followers { totalCount }
      following { totalCount }
      repositories(privacy: PUBLIC, first: 1) { totalCount }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoriesWithContributedCommits
        contributionCalendar {
          totalContributions
          months {
            name
            firstDay
            totalWeeks
          }
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const data = await graphql<{ user: unknown }>(QUERY, { username: USERNAME });
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(data.user);
  } catch (err) {
    console.error('contributions error:', err);
    return res.status(500).json({ error: 'Failed to fetch contribution data' });
  }
}
