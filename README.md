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
- Branzyne: confirmed client brand-film work, using the supplied original 35-second promo with muted autoplay and an Instagram link. Its internal brand claims are not Vinayak’s results.
- Neo: original finished 34-second introduction film, with muted autoplay and an Instagram link.

Trading content and footage are excluded. No private repository links are exposed. No invented client metrics, awards, or testimonials.

## Content maintenance

Edit `data/projects.ts` for projects and destination links. The `instagram` field stores each film’s reel URL: Neo uses `DeeDdWPo_aR` and Branzyne uses `Ded3kOWTovl`. Edit `lib/enquiry.mjs` to change the contact email.

The enquiry form prepares an email draft and offers copy-to-clipboard with a manual fallback. It does not send mail, save records, or use a backend. A backend can be connected later if desired.

## Media

Branzyne and Neo use their supplied original MP4s, unchanged byte for byte, for native muted autoplay. The files are restored from the existing Git history. The homepage previews and film pages load each video only when visible, pause it outside the viewport, and provide native playback and sound controls. Reduced-motion preferences disable automatic playback. Browser autoplay restrictions leave manual controls available. The original Instagram links remain visible on both film pages.

Neo uses the original 1080 × 1920, 24 fps MP4 without re-encoding. Its direct Instagram link remains available as another way to watch.

TraceReel’s cover is a screenshot of its public interactive pitching site. MathLens uses a custom illustrative graphic, not a claimed product screenshot. Groom Room uses a captured screenshot of the actual public booking demo, presented inside a browser frame.

## Accessibility and motion

Native links and buttons, labelled form fields, a skip link, direct Instagram fallback links, mobile navigation, normal cursors, and reduced-motion styling. Muted autoplay is limited to the explicitly requested Branzyne promo and Neo film. No scroll hijacking.

## Validation limits

Automated UI checks use jsdom and cover server-rendered hydration, direct project routes, navigation, visibility-controlled film autoplay, Instagram fallback links, enquiry preparation, and clipboard fallback. These checks do not measure browser layout or Instagram playback. Browser QA is performed separately.

## Page architecture

The homepage separates work into Websites & coding (TraceReel, Groom Room, MathLens), Video editing (Branzyne, Neo), and Open source. Category links jump directly to each section. Projects within each group have equal-size previews; descriptions and service names use plain language. Each project has a native `/work/<id>/` URL. The build prerenders the homepage, five case studies, and a 404 page into complete HTML with page-specific titles, descriptions, canonical URLs, Open Graph data, and a sitemap. React hydrates the same markup for forms, navigation, and click-to-load films. Native page navigation supports browser history and direct refresh without a router or catch-all rewrite.

The design uses charcoal, warm ivory, vermilion, Manrope, DM Sans, and Instrument Serif. Responsive layouts switch at 1050px and 700px; motion respects `prefers-reduced-motion`. Budget and timeline fields are optional and collapsed by default.

## Open-source contributions

`data/contributions.ts` holds seven selected merged upstream pull requests across six external repositories, verified on 14 October 2026. The homepage features NodeSecure, Pylint, and PDM; `/open-source/` lists every selected contribution and its merge date. Skfolio’s financial-library contribution is excluded from the curated display to preserve the no-trading portfolio scope. Own repository PRs are not counted as upstream contributions.

SpoonOS recognition links to the two supplied X posts, merged showcase PR #22, and SpoonOS’s official LinkedIn feature crediting Vinayak. The X post contents could not be extracted during verification; no award, prize, rank, or result is attributed to those posts. Feature wording is supported by the official LinkedIn update. No third-party social SDK is loaded for these links.
