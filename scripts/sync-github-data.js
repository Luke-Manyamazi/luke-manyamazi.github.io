import fs from "fs";
import path from "path";

const TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = "Luke-Manyamazi";

if (!TOKEN) throw new Error("GITHUB_TOKEN is required");

const query = `
query($username: String!) {
  user(login: $username) {
    name
    avatarUrl
    followers { totalCount }
    repositories(privacy: PUBLIC, first: 100) {
      totalCount
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
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      contributionCalendar {
        totalContributions
        months { name firstDay totalWeeks }
        weeks {
          contributionDays { contributionCount date color }
        }
      }
    }
  }
}`;

async function main() {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({ query, variables: { username: USERNAME } }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed: ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(JSON.stringify(payload.errors));
  }

  const user = payload.data?.user;
  if (!user) throw new Error("GitHub user data was not returned");

  const output = {
    generatedAt: new Date().toISOString(),
    contributions: {
      name: user.name,
      avatarUrl: user.avatarUrl,
      followers: user.followers,
      repositories: { totalCount: user.repositories.totalCount },
      contributionsCollection: user.contributionsCollection,
    },
    repos: user.repositories.nodes,
  };

  const filePath = path.resolve("client/public/data/github.json");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
  console.log(`Generated GitHub snapshot with ${output.repos.length} repositories at ${filePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
