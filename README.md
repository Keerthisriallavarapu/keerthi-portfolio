# Keerthi's Portfolio

An interactive 3D office portfolio with a RAG-powered AI assistant. Visitors enter through a 3D office, click the monitor, and land on a search-engine-style portfolio with a chat assistant that answers questions about Keerthi's work using Claude.

## Stack

- **Next.js 15** + React 19 + TypeScript
- **Three.js** + React Three Fiber + Drei (3D office scene)
- **Framer Motion** (animations and transitions)
- **Tailwind CSS** (styling)
- **Anthropic SDK** + Claude Haiku 4.5 (chat assistant with streaming)

## Run locally

```bash
# Install dependencies (use --legacy-peer-deps due to React 19 RC packages)
npm install --legacy-peer-deps

# Set your Anthropic key
cp .env.example .env.local
# edit .env.local and add your ANTHROPIC_API_KEY

# Start the dev server
npm run dev
```

Open http://localhost:3000 — the 3D office loads, then the monitor highlights. Click it to enter the portfolio.

## Deploy to Vercel (free tier)

The fastest path. Total time: ~5 minutes.

**Step 1**: Push this folder to a GitHub repo.

```bash
cd portfolio
git init
git branch -M main
git add .
git commit -m "Initial commit: portfolio site"
git remote add origin https://github.com/Keerthisriallavarapu/portfolio.git
git push -u origin main
```

(Create the empty repo on github.com first.)

**Step 2**: Connect to Vercel.

1. Go to https://vercel.com/new
2. Import the `portfolio` repo
3. Vercel auto-detects Next.js
4. Expand "Build & Output Settings" → set Install Command to: `npm install --legacy-peer-deps`
5. **Important**: in "Environment Variables" add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key from https://console.anthropic.com
6. Click Deploy

In ~2 minutes you'll have a live URL like `keerthi-portfolio.vercel.app`.

**Step 3** (optional, $12/year): custom domain.

1. Buy a domain at Namecheap, Cloudflare, or Porkbun.
2. In Vercel: project → Settings → Domains → add your domain.
3. Vercel shows you exact DNS records to add at your registrar.
4. Within 5-30 min you have `keerthi.dev` (or whatever) live.

## Customizing

- **Projects**: edit `lib/projects.ts` to change project descriptions, highlights, GitHub URLs.
- **Bio**: edit `components/desktop/AboutPanel.tsx`.
- **Knowledge base**: edit `lib/knowledge.ts` — this is what the AI assistant cites from. Add interview-relevant context here.
- **Colors**: edit `tailwind.config.ts` and `app/globals.css`.
- **3D office**: each piece of furniture is its own component under `components/office/`.
- **Resume PDF**: add yours as `public/resume.pdf` so the download button works.

## Project structure

```
portfolio/
├── app/
│   ├── api/chat/route.ts     # Anthropic streaming endpoint (Edge)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Orchestrates office → desktop flow
├── components/
│   ├── office/               # Three.js 3D office scene
│   │   ├── Office.tsx
│   │   ├── OfficeScene.tsx
│   │   ├── Monitor.tsx       # The clickable focal point
│   │   ├── CameraRig.tsx     # Cinematic zoom into monitor
│   │   ├── Desk.tsx
│   │   ├── Chair.tsx
│   │   ├── Lamp.tsx
│   │   ├── Plant.tsx
│   │   ├── Bookshelf.tsx
│   │   ├── Window.tsx        # City skyline at night
│   │   └── Particles.tsx
│   ├── desktop/              # The "keerthi.google" interface
│   │   ├── Desktop.tsx
│   │   ├── SearchHero.tsx    # Google-inspired colorful logo
│   │   ├── ProjectsGrid.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── ChatPanel.tsx     # AI assistant slide-in
│   │   └── AboutPanel.tsx
│   └── LoadingScreen.tsx
├── lib/
│   ├── projects.ts           # Project content
│   └── knowledge.ts          # RAG corpus for Claude system prompt
└── public/
    └── resume.pdf            # Add your resume here
```

## Performance notes

- The 3D scene is loaded client-only via `next/dynamic`. First Load JS: ~144 KB.
- On mobile, the Three.js scene works but is rendered at lower DPR.
- The chat uses Claude Haiku 4.5: about $0.25 per million input tokens. Expected cost at moderate traffic: $1-5/month.

## Cost of running

- Vercel: $0 (free tier covers hobby projects easily)
- Domain: $0-12/year (optional)
- Anthropic API: $1-5/month at typical recruiter-only traffic. Set a monthly cap in the Anthropic console to be safe.

## License

Personal portfolio. Code is MIT-licensed if you want to adapt it for your own use.
