import { Octokit } from "@octokit/rest";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const USERNAME = "Luke-Manyamazi";

/**
 * Detect learning repos
 */
function isLearning(repo) {
  const name = repo.name.toLowerCase();

  return (
    name.includes("cs50") ||
    name.includes("codeyourfuture") ||
    name.includes("freecodecamp") ||
    name.includes("fcc")
  );
}

/**
 * Detect deployed apps (shipped)
 */
function getDeploymentUrl(repo) {
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

  if (deploySignals.some((d) => homepage.includes(d))) {
    return repo.homepage;
  }

  if (repo.has_pages) {
    return repo.html_url;
  }

  return null;
}

/**
 * Final classification
 */
function classify(repo, deploymentUrl) {
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

  const projects = [];

  for (const repo of repos.filter((r) => !r.fork)) {
    const deploymentUrl = getDeploymentUrl(repo);
    const status = classify(repo, deploymentUrl);

    projects.push({
      id: repo.id,
      title: repo.name,
      description: repo.description,

      techStack: repo.topics || [],

      link: repo.homepage || "",
      githubLink: repo.html_url,

      deployedUrl: deploymentUrl,

      status,

      language: repo.language,
      updated: repo.updated_at,
    });
  }

  const output = {
    generatedAt: new Date().toISOString(),
    projects,
  };

  fs.writeFileSync("./data/projects.json", JSON.stringify(output, null, 2));

  console.log(`Generated ${projects.length} projects`);
}

main();
