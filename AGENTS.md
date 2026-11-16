# Company website

- This is AtomSprout’s company site at `https://atomsprout.com`, deployed to GitHub Pages. Company owns formal products intended for long-term operation, including paid products and explicitly selected free products. Maintain their product information, downloads, support, documentation and privacy pages here.
- `https://asp.run` owns the personal entry page, blog, experimental projects, temporary tools and short-term projects. Individual personal repositories normally publish their own Pages under `asp.run/<repository>/`; do not copy those sites into Company or the blog repository.
- Give each project one primary website owner. Avoid duplicate product sites and redirect-only project routes between the two domains. Keep the personal homepage’s **The works** entry to Company and the Company Founder link to the personal blog; add other cross-domain links only for a real product function.
- ScriptWidget is the explicit functional example: Company owns its official product page, app downloads, support, documentation and privacy pages at `/scriptwidget/`. Only `everettjf/scriptwidget` maintains and deploys Web Studio at `https://asp.run/scriptwidget/studio/`, with a two-option entry page at `https://asp.run/scriptwidget/`. Keep useful links between the official website and Studio; never copy the compiled Studio into Company.
- Apply this ownership policy when adding a project or carrying out an explicitly requested migration. Do not automatically move existing projects or change independently maintained domains.
- Maintain the released product catalog in `data/products.json`. Assign one primary collection (`apps`, `games`, `extensions`, or `homebrew`); App Store games belong to `games`. Free Chrome extensions belong to `extensions`, with price recorded separately. Keep contact details in `data/site.json`. Verify availability and feature claims against actual public releases.
- Keep privacy policies product-specific, preserving their commitments and effective dates. Do not infer data handling from branding.
- Do not publish unreleased features, invented metrics, testimonials, legal company names, or trademark-registration claims.
- Reuse the approved full-bleed dodecahedron brand assets. Keep responsive light and dark modes accessible and respect reduced motion.
- Run `npm run build` and `npm run check` before publishing. Browser-check changed layouts and interactions at desktop and mobile sizes.
- Deploy through `.github/workflows/pages.yml`; do not commit `dist/`. Only attach a custom domain after its ownership and DNS are established.
