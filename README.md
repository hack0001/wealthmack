# WealthMack

Options income calculators and articles, built with Next.js.

## Run it

    npm install
    npm run dev      # http://localhost:3000, drafts visible
    npm run build    # static site in /out, drafts left out

## Where things are

- `lib/site.ts`: site name, URL, author details, section names
- `content/options/*.md`, `content/psychology/*.md`: articles (markdown with front matter)
- `lib/options.ts`: covered call maths
- `components/CoveredCallCalculator.tsx`, `components/PayoffChart.tsx`: the calculator
- `app/tools/page.tsx`: list of tools, add new ones here
- `public/_redirects`: redirects from old WordPress URLs
- `wrangler.jsonc`: Cloudflare deploy settings

## Writing an article

Add a file such as `content/options/my-article.md`:

    ---
    title: "Title"
    description: "One sentence shown in lists and search results."
    date: 2026-11-20
    draft: true
    tool: /tools/covered-call-calculator
    ---

`draft: true` keeps it off the live site. `tool` adds a link to that tool at the end.

## Before launch

1. Fill in `author` and `contact.email` in `lib/site.ts`.
2. Finish or remove the draft in `content/psychology/`.
3. Have `app/disclosures/page.tsx` (terms and risk) and `app/privacy/page.tsx` checked.
4. Add redirects for any old WordPress URLs worth keeping to `public/_redirects`.

## After launch (in Cloudflare and Google)

- Cloudflare: SSL/TLS, Edge Certificates, turn on Always Use HTTPS.
- Cloudflare: Web Analytics, add wealthmack.com (cookieless, so no cookie banner needed).
  The privacy policy assumes this is on.
- Google Search Console and Bing Webmaster Tools: verify the domain and submit
  https://wealthmack.com/sitemap.xml.
- Rollback: Cloudflare keeps every deployment, so an earlier one can be restored from the
  Worker's Deployments tab. Reverting the commit in GitHub Desktop and pushing also works.

## Deploying (GitHub + Cloudflare)

The site is fully static: `npm run build` writes plain HTML to `/out`.

1. Push this folder to a GitHub repository.
2. In Cloudflare, go to Workers & Pages, choose Create, then Import a repository, and pick the repo.
3. Build command `npm run build`. Deploy command `npx wrangler deploy` (it reads `wrangler.jsonc`).
4. Under the Worker's Settings, Domains & Routes, add `wealthmack.com` and `www.wealthmack.com`.
   The domain has to be on Cloudflare DNS first.

Every push to `main` then rebuilds and redeploys the site.
