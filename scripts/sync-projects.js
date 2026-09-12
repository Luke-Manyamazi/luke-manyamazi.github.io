import { Octokit } from "@octokit/rest";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required");

const octokit = new Octokit({ auth: token });

const USERNAME = "Luke-Manyamazi";
const PORTFOLIO_REPO = "luke-manyamazi.github.io";
const PORTFOLIO_URL = "https://lukemanyamazi.tech";

const DESCRIPTION_OVERRIDES = {
  CYFoverflow:
    "Full-stack developer Q&A platform built with React and Vite, a Node.js/Express REST API, PostgreSQL, JWT authentication, voting, rich-text answers, and automated testing.",
};

function isLearning(repo) {
  const name = repo.name.toLowerCase();
  return (
    name.includes("cs50") ||
    name.includes("codeyourfuture") ||
    name.includes("freecodecamp") ||
    name.includes("fcc") ||
    name.includes("piscine")
  );
}

function getDeploymentUrl(repo) {
  if (repo.name === PORTFOLIO_REPO) return PORTFOLIO_URL;

  const homepage = repo.homepage?.toLowerCase() || "";
  const deploySignals = [
    "vercel.app",
    "netlify.app",
    "railway.app",
    "github.io",
    "render.com",
    "supabase",
    "coolify",
  ];

  if (deploySignals.some((signal) => homepage.includes(signal))) {
    return repo.homepage;
  }

  if (repo.has_pages) return repo.html_url;
  return null;
}

function getStatusFromTopics(repo) {
  const topics = repo.topics || [];
  const statusTopic = topics.find((topic) =>
    /^status-(deployed|shipped|in-progress|learning|archived)$/.test(topic),
  );
  return statusTopic ? statusTopic.replace("status-", "") : null;
}

function classify(repo, deploymentUrl) {
  const explicitStatus = getStatusFromTopics(repo);
  if (explicitStatus) return explicitStatus;
  if (isLearning(repo)) return "learning";
  if (deploymentUrl) return "shipped";
  return "in-progress";
}

async function main() {
  console.log("Fetching GitHub repositories...");

  const repos = await octokit.paginate(octokit.rest.repos.listForUser, {
    username: USERNAME,
    per_page: 100,
  });

  const projects = repos
    .filter((repo) => !repo.fork)
    .map((repo) => {
      const deploymentUrl = getDeploymentUrl(repo);
      const status = classify(repo, deploymentUrl);

      return {
        id: repo.id,
        title: repo.name,
        description: DESCRIPTION_OVERRIDES[repo.name] || repo.description,
        techStack: (repo.topics || []).filter(
          (topic) => !/^status-(deployed|shipped|in-progress|learning|archived)$/.test(topic),
        ),
        link: repo.homepage || deploymentUrl || "",
        githubLink: repo.html_url,
        deployedUrl: deploymentUrl,
        status,
        language: repo.language,
        updated: repo.updated_at,
      };
    });

  const output = {
    generatedAt: new Date().toISOString(),
    projects,
  };

  const filePath = path.resolve("client/public/data/projects.json");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));

  console.log(`Generated ${projects.length} projects at ${filePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
