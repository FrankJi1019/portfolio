# Frank Ji — Portfolio

Personal developer portfolio built with Next.js, Tailwind CSS, and TypeScript.

**Live:** [www.frankji.com](https://www.frankji.com)

## Tech Stack

- Next.js 16 (App Router, standalone output)
- React 19
- Tailwind CSS 4
- TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Hosted on [Vercel](https://vercel.com) with automatic deploys on push to `master`. Custom domain managed via AWS Route 53.

## Docker

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```
