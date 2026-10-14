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

Edit `data/projects.ts` for projects and destination links. Edit `lib/enquiry.mjs` to change the contact email. Neo’s Instagram URL is not yet supplied; add a verified public URL as the Neo project’s `live` field when available.

The enquiry form prepares an email draft and offers copy-to-clipboard with a manual fallback. It does not send mail, save records, or use a backend. A backend can be connected later if desired.

## Media

`public/media/branzyne-promo.mp4` is byte-for-byte identical to the supplied video. Neo’s existing final film is also copied unchanged. Neither downloads on initial page load: video elements mount only inside their project dialog and use `preload="none"`. Posters are extracted from the actual films, converted to WebP, and separate from the video masters.

Project covers for TraceReel and MathLens are custom illustrative graphics, not claimed product screenshots. The Groom Room cover uses its supplied app hero image with editorial cover text.

## Accessibility and motion

Native buttons, labelled form fields, skip link, explicit video controls, escape-to-close native dialog, filter pressed states, normal cursors, and reduced-motion styling. No forced autoplay or scroll hijacking.

## Validation limits

Automated UI checks use jsdom; native dialog is polyfilled there. They exercise state changes and DOM behaviour, not real layout, focus trapping, codec playback, or clipboard/browser policy. Browser visual verification still needs to run on the deployment preview at desktop and mobile sizes.
