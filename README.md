# Jaycie Portfolio

Personal portfolio for Janperson Carl M. Lorete (Jaycie) — multimedia artist, graphic designer, and video editor.

## Setup

**Requirements:** Node.js ≥ 18.18

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm start         # serve production build
```

---

## How to add a new video project

Edit [`src/content/projects.ts`](src/content/projects.ts).

1. Find the right category (`ads`, `short_form`, `shot_and_edit`, `long_form`, `product`, `bkfc`, `real_estate`).
2. Add an entry to that category's `items` array:

```ts
{ id: "sf-08", title: "Your title here", drive_id: "YOUR_GOOGLE_DRIVE_FILE_ID" },
```

3. Make sure the Drive file is shared → **Anyone with the link can view**.
4. The tile appears automatically on the next page load. No other changes needed.

---

## How to add graphic design images

Drop image files (`.jpg`, `.png`, `.webp`) into:

```
public/work/graphic-design/
```

Once you have images ready, update `src/content/projects.ts` → `graphic_design.items` with entries pointing to the local files. The category chip and grid are already wired up — just add items to show them.

---

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Next.js**. No env vars needed.
4. Click **Deploy**.

For a custom domain, add it under the Vercel project **Settings → Domains**.

---

## Things Jaycie should personalize

- [ ] **Project titles** — update `title` values in `src/content/projects.ts` (currently "Ad Cut 01", etc.)
- [ ] **Headshot / portrait** — add a photo to `public/` and wire it into the About section
- [ ] **Social handles** — add Instagram, Behance, LinkedIn, or YouTube links to `Footer.tsx` and `Nav.tsx`
- [ ] **Resume PDF** — add `resume.pdf` to `public/` and add a "Download CV" link in the nav or About section
- [ ] **Custom domain** — update the canonical URL in `src/app/layout.tsx` metadata once you have one
- [ ] **OG image** — add an `og.jpg` to `public/` and reference it in metadata for richer social previews
- [ ] **Stat numbers** — update counts in `src/content/profile.ts` if projects or years change
