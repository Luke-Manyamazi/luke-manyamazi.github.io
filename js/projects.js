async function loadProjects() {
  try {
    const res = await fetch("./data/projects.json");
    const data = await res.json();

    const projects = data.projects;

    const shipped = projects.filter(p => p.status === "shipped");
    const learning = projects.filter(p => p.status === "learning");
    const inProgress = projects.filter(p => p.status === "in-progress");

    renderSection("shipped-projects", shipped, "🚀 Shipped Projects");
    renderSection("learning-projects", learning, "📚 Learning Projects");
    renderSection("inprogress-projects", inProgress, "🔨 In Progress");

  } catch (err) {
    console.error("Failed to load projects:", err);
  }
}

/**
 * Render a section
 */
function renderSection(containerId, projects, title) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = `
    <h3 class="section-title">${title}</h3>
  `;

  projects.forEach(project => {
    container.innerHTML += createCard(project);
  });
}

/**
 * Create project card
 */
function createCard(project) {
  return `
    <div class="project-card">

      <div class="project-header">
        <h4>${project.name}</h4>
        <span class="badge ${project.status}">
          ${project.status}
        </span>
      </div>

      <p class="description">
        ${project.description || "No description provided"}
      </p>

      <div class="meta">
        <span>${project.language || "Unknown"}</span>
      </div>

      <div class="links">
        <a href="${project.url}" target="_blank">
          GitHub
        </a>

        ${
          project.deployedUrl
            ? `<a href="${project.deployedUrl}" target="_blank">
                 Live Demo
               </a>`
            : ""
        }
      </div>

    </div>
  `;
}

// Run on page load
loadProjects();