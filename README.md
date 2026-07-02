# Portfolio & CMS

Personal portfolio website with a custom content management system. All content (experience, projects, skills, education, etc.) is managed through the CMS and served dynamically to the portfolio site.

**Portfolio**: [frankji.com](https://www.frankji.com)  
**CMS**(read-only for guests): [cms.frankji.com](https://cms.frankji.com)

## How It Works

The portfolio site fetches all its content at render time from an API backed by S3. The CMS lets me (admin) edit that content through a web UI — updating a section in the CMS writes JSON to S3, and the portfolio picks up changes on the next request.

Resume syncing pulls from Google Drive: the CMS triggers a Lambda that exports a Google Doc as PDF and stores it in S3.

## Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              Users / Browsers                                │
│                    www.frankji.com       cms.frankji.com                     │
└────────────────────────┬─────────────────────────┬───────────────────────────┘
                         │                         │
                         ▼                         ▼
┌────────────────────────────────┐   ┌─────────────────────────────────────────┐
│     Portfolio (Next.js)        │   │         CMS (React SPA)                 │
│  - Server Components           │   │  - React Router + TanStack Query        │
│  - Tailwind + Font Awesome     │   │  - React Hook Form + dnd-kit            │
│  - SEO (JSON-LD, sitemap)      │   │  - AWS Amplify (Cognito auth)           │
└────────────────┬───────────────┘   └──────────────────┬──────────────────────┘
                 │                                      │
                 │ fetch all sections                    │ CRUD sections / resume ops
                 ▼                                      ▼
┌────────────────────────────────────────────────────────────────────────────────┐
│                           API Gateway (REST)                                   │
│                                                                                │
│  GET  /portfolio/all          → portfolio-fetch-all                            │
│  GET  /portfolio/sections/:s  → portfolio-sections                             │
│  PUT  /portfolio/sections/:s  → portfolio-sections                             │
│  GET  /portfolio/resumes      → portfolio-list-resumes                         │
│  POST /portfolio/sync-resume  → portfolio-sync-resume                          │
└───────┬──────────────┬──────────────────┬────────────────────┬─────────────────┘
        │              │                  │                    │
        ▼              ▼                  ▼                    ▼
┌──────────────┐ ┌──────────────┐ ┌────────────────┐ ┌─────────────────────┐
│ portfolio-   │ │ portfolio-   │ │ portfolio-     │ │ portfolio-          │
│ fetch-all    │ │ sections     │ │ list-resumes   │ │ sync-resume         │
│              │ │              │ │                │ │                     │
│ Lists all    │ │ GET/PUT a    │ │ Lists Google   │ │ Exports Google Doc  │
│ S3 content   │ │ single       │ │ Drive files    │ │ as PDF → uploads    │
│ objects and  │ │ section JSON │ │ via Drive API  │ │ to S3               │
│ returns them │ │ in S3        │ │                │ │                     │
└──────┬───────┘ └──────┬───────┘ └───────┬────────┘ └──┬──────────────┬───┘
       │                │                 │             │              │
       │                │                 │             │              ▼
       │                │                 │             │     ┌────────────────┐
       │                │                 │             │     │ SSM Parameter  │
       │                │                 │             │     │ Store          │
       │                │                 │             │     │                │
       │                │                 │             │     │ Google service │
       │                │                 │             │     │ account creds  │
       │                │                 │             │     └────────────────┘
       │                │                 │             │
       ▼                ▼                 ▼             ▼
┌────────────────────────────────┐   ┌──────────────────────────────────────────┐
│          S3 Bucket             │   │            Google Drive API              │
│                                │   │                                          │
│  content/*.json  (sections)    │   │  List Docs / Export as PDF               │
│  Frank-Ji-CV.pdf (resume)      │   │                                          │
└────────────────────────────────┘   └──────────────────────────────────────────┘

┌────────────────────────────────┐
│        AWS Cognito             │
│                                │
│  User pool for CMS auth        │
│  Guest vs Authenticated roles  │
└────────────────────────────────┘
```

## Repo Structure

```
portfolio/              → Next.js 16 (App Router) — the public-facing site
cms/                    → React + Vite — the content management UI
cms-service-functions/  → AWS Lambda handlers for the API layer
```

## Tech

**Portfolio** — Next.js 16, React 19, TypeScript, Tailwind CSS 4, Font Awesome. Runs as a standalone Node server (Docker-ready). Includes SEO setup with structured data (JSON-LD), sitemap, robots.txt, and Open Graph metadata — all driven from CMS-managed content.

**CMS** — React 19, Vite, TypeScript, Tailwind CSS 4, React Router, TanStack Query, React Hook Form, dnd-kit (drag-and-drop ordering), AWS Amplify (Cognito auth). Supports authenticated (full CRUD) and guest (read-only) access.

**Backend** — AWS Lambda (Node 22) + API Gateway + S3. Four Lambda functions:
- `portfolio-sections` — GET/PUT individual content sections
- `portfolio-fetch-all` — GET all sections in one call (used by the portfolio site)
- `portfolio-list-resumes` — list available resumes from Google Drive
- `portfolio-sync-resume` — export a Google Doc to PDF and upload to S3

Auth is handled by AWS Cognito. Google Drive integration uses a service account credential stored in SSM Parameter Store.
