# Company website

- This is AtomSprout’s company site, deployed to GitHub Pages. Keep personal blog content at xnu.app.
- Maintain the released product catalog in `data/products.json`. Assign one primary collection (`apps`, `games`, or `homebrew`); App Store games belong to `games`. Keep contact details in `data/site.json`. Verify availability and feature claims against actual public releases.
- Keep privacy policies product-specific, preserving their commitments and effective dates. Do not infer data handling from branding.
- Do not publish unreleased features, invented metrics, testimonials, legal company names, or trademark-registration claims.
- Reuse the approved full-bleed dodecahedron brand assets. Keep responsive light and dark modes accessible and respect reduced motion.
- Run `npm run build` and `npm run check` before publishing. Browser-check changed layouts and interactions at desktop and mobile sizes.
- Deploy through `.github/workflows/pages.yml`; do not commit `dist/`. Only attach a custom domain after its ownership and DNS are established.
