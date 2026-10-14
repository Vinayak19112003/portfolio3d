# Deployment

Run `npm ci`, `npm test`, and `npm run build`. Deploy `dist/`. The existing Vercel project builds GitHub main automatically.

The build runs TypeScript, Vite, and `scripts/prerender.mjs`. It emits complete static HTML for `/`, five `/work/<id>/` case studies, `/open-source/`, and `404.html`. Serve directory index files normally; do not add an SPA catch-all rewrite. No environment variables, API keys, or backend are required.

Canonical origin: https://www.vinayakdeshmuk.in. The root domain redirects to www through the existing domain configuration. Individual metadata and the sitemap are generated during build; update the origin in the prerender script and index template together if the domain changes.

Verification: direct-load and refresh case-study URLs, use browser Back, open the mobile menu, activate each Instagram film, and prepare an enquiry. Check keyboard focus, reduced motion, and narrow-width layout. Instagram is loaded only after a visitor chooses playback; external reel links remain available if an embed is blocked.

The enquiry form prepares a mailto draft; it does not send or store enquiries. Budget and timeline fields remain optional.
