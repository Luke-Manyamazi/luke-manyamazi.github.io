# Luke Manyamazi — Portfolio

> Personal portfolio for Luke Manyamazi — Full-Stack Software Developer building practical software, cloud applications, AI-assisted tools, and business systems.

🌐 **Live portfolio:** https://lukemanyamazi.tech

💻 **Source repository:** https://github.com/Luke-Manyamazi/luke-manyamazi.github.io

## About

This repository contains the source code for my personal developer portfolio. It brings together selected software projects, technical skills, experience, and professional links in one place.

I build full-stack applications with a focus on practical products, operational systems, cloud platforms, AI-assisted workflows, and software for real-world problems.

## Featured Work

The portfolio highlights projects across:

- 🌾 Agriculture and farm-management technology
- 🤖 AI-powered applications and automation
- 🛒 Commerce and business systems
- 📊 Operational dashboards and data-driven applications
- 🌐 Client and public-facing web platforms
- 📱 Responsive and application-focused user experiences

Selected project repositories include **BH-Farm-OS, RentIT, iSolveAI, CYFOverflow, Chenesa, ipalo-shop, Fitter Dashboard**, and other production-oriented or exploratory projects.

## Technology

- **Languages:** TypeScript, JavaScript, Python, SQL
- **Frontend:** React, Next.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express, FastAPI
- **Data:** PostgreSQL, Supabase, Firebase / Firestore
- **Cloud & DevOps:** AWS, Vercel, Netlify, Docker, GitHub Actions
- **Engineering:** REST APIs, authentication, authorization, database design, automation, responsive UI, testing

## Deployment

The portfolio is deployed at **https://lukemanyamazi.tech** using AWS.

The repository uses GitHub Actions to automate deployment to Amazon S3 and invalidate the Amazon CloudFront cache after successful builds. AWS authentication is handled through GitHub Actions with an IAM role rather than long-lived access keys stored in the repository.

## Repository Structure

The main application source lives in the repository root, with supporting configuration for development, build, and deployment.

```text
luke-manyamazi.github.io/
├── src/                # Portfolio application
├── public/             # Static assets
├── server/             # Development/server-side support where applicable
├── .github/
│   └── workflows/      # Automated AWS deployment
├── package.json        # Scripts and dependencies
└── README.md
```

## Local Development

```bash
git clone https://github.com/Luke-Manyamazi/luke-manyamazi.github.io.git
cd luke-manyamazi.github.io
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Run TypeScript checks:

```bash
npm run check
```

## Professional Links

- **Portfolio:** https://lukemanyamazi.tech
- **GitHub:** https://github.com/Luke-Manyamazi
- **LinkedIn:** https://www.linkedin.com/in/luke-manyamazi-5632b9331/
- **Company:** https://camluk.co.za/

## Purpose

The portfolio is designed to make it easy for recruiters, employers, collaborators, and clients to understand what I build, how I approach software engineering, and how to explore the source code behind selected projects.

---

Built and maintained by **Luke Manyamazi**.
