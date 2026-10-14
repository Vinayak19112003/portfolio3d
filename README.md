# Vinayak Deshmuk — Client Portfolio

A React + TypeScript + Vite portfolio for websites, video editing, and AI automation.

## Run

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm test
npm run build
```

Deploy `dist/` to static hosting. Production build settings remain `npm run build`, output `dist`.

## Public-facing work

- Groom Room by Asha: live booking-app demo, with clearly identified simulated payments/messages. No private source link.
- TraceReel: public engineering project, with TakeOne attribution and integration limits.
- MathLens: interactive-learning MVP case study; source repository is private and not linked.
- Branzyne promotion: supplied 35-second film only, not a repository showcase. Its internal brand claims are not Vinayak’s results.
- Neo: existing finished introduction film with actual silhouette frame as the cover.

Trading content and footage are excluded. No private repository links are exposed. No invented client metrics, awards, or testimonials.

## Content maintenance

Edit `data/projects.ts` for projects and destination links. The `instagram` field stores each film’s reel URL: Neo uses `DeeDdWPo_aR` and Branzyne uses `Ded3kOWTovl`. Edit `lib/enquiry.mjs` to change the contact email.

The enquiry form prepares an email draft and offers copy-to-clipboard with a manual fallback. It does not send mail, save records, or use a backend. A backend can be connected later if desired.

## Media

Films are displayed through Instagram’s official embed script, loaded only after the visitor selects “Play Instagram reel” on the film’s dedicated page. A persistent “Watch on Instagram” link works even if the embed is unavailable. The MP4 players, download buttons, and hosted MP4 assets have been removed. Original film copies remain in Git history and the previous delivery package. Posters remain extracted from the actual films and converted to WebP.

Instagram controls embed availability and playback. The reels must remain public with embedding allowed; browser restrictions or Instagram sign-in requirements can prevent an embedded player from loading.

Project covers for TraceReel and MathLens are custom illustrative graphics, not claimed product screenshots. Groom Room uses a captured screenshot of the actual public booking demo, presented inside a browser frame.

## Accessibility and motion

Native links and buttons, labelled form fields, a skip link, direct Instagram fallback links, mobile navigation, normal cursors, and reduced-motion styling. No forced autoplay or scroll hijacking.

## Validation limits

Automated UI checks use jsdom and cover server-rendered hydration, direct project routes, navigation, on-demand Instagram embeds, blocked-script fallback links, enquiry preparation, and clipboard fallback. These checks do not measure browser layout or Instagram playback. Browser QA is performed separately.

## Page architecture

The homepage features three major projects and two supporting studies. Each project has a native `/work/<id>/` URL. The build prerenders the homepage, five case studies, and a 404 page into complete HTML with page-specific titles, descriptions, canonical URLs, Open Graph data, and a sitemap. React hydrates the same markup for forms, navigation, and click-to-load films. Native page navigation supports browser history and direct refresh without a router or catch-all rewrite.

The design uses charcoal, warm ivory, vermilion, Manrope, DM Sans, and Instrument Serif. Responsive layouts switch at 1050px and 700px; motion respects `prefers-reduced-motion`. Budget and timeline fields are optional and collapsed by default.
