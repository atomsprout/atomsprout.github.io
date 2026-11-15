# AtomSprout

Company website for AtomSprout: product information, downloads, support and product-specific privacy pages.

- Website: https://atomsprout.com
- Source: https://github.com/atomsprout/atomsprout.github.io
- Personal entry, blog and projects: https://asp.run
- Runtime: Node.js 22 or newer. The company generator uses Node built-ins; the game and Liney sites use Next.js and Docusaurus. Deployment is static.

## Develop and deploy

```sh
npm ci --prefix game-site
npm ci --prefix liney-site
npm run build
npm run check
npm run dev
```

GitHub Actions builds, checks and publishes `dist/` on pushes to `main` using `.github/workflows/pages.yml`. Do not commit generated output. The workflow derives canonical URLs from the configured Pages URL.

## Product directory

`data/products.json` owns the released Company directory. It currently contains 19 products:

- Apps: GrapeCompare, Folucent, ScriptWidget, Remoboard, BSSID SCAN, Dayvella, BabelTable and SixUp.
- Games: Foxwick, Wedge Storm Chaser, Aether Barrage: Omega and Fivefold Front. Existing Windows game entries are retained until the owner explicitly changes their classification.
- Homebrew: Liney, TypeTide, Hexlora and ChatComputer.
- Free Chrome extensions: TabCarry, NotbadBookmark and X Article Export.

ScriptWidget and the three extensions remain Company products despite being free. Each product has one primary collection; pricing and distribution are separate metadata. Keep published release descriptions, feature claims, screenshot provenance and actual verification dates intact. Do not infer release availability or pricing from source code alone.

## Personal website split

`everettjf/everettjf.github.io` uses `asp.run` for the personal entry page, `/blog/`, `/projects/`, dated articles and RSS feeds. Individual personal repositories publish their own sites under `asp.run/<repository>/`; they do not need website copies in Company or the blog repository. Cloudflare forwards `xnu.app` to asp.run, preserving paths and query strings. `www.asp.run` resolves to the same GitHub user site.

AppleTrace, BeanBao, Copy APP, Crab Stick, ezjev, iOS Atlas, ipatool-rs, MachOExplorer, Pixel6iOS and XcodeFit are independently maintained personal sites. Palmino and Rho PDF landing, support and original privacy content are maintained by the personal site. Their historical Company HTML entry points redirect to asp.run using `data/personal-site-redirects.json`. Compatibility redirects are not Company product entries and are excluded from the sitemap.

RiftVM is classified as personal. Its existing site is temporarily retained in `software-sites/riftvm/`, outside the Company directory, so old links and clients keep working. The owner will arrange its publisher migration; do not create a new publisher repository or remove the retained site before that handoff.

Titled, JSONCompare and VoiceDraft are retained legacy product/support pages generated from `data/legacy-products.json`, outside the released directory. Their future classification is pending. EditSmith and LaunchDeck are retired and removed.

The existing rea.tools, microclaw.org, liney.dev and e7lang.github.io domains are not changed by this migration.

## ScriptWidget Web Studio

Company owns the product landing page and support/privacy/documentation pages at `/scriptwidget/`. It links to the functional Web Studio at https://asp.run/scriptwidget/studio/.

The Studio, sandbox runtime, templates and Gallery are built from `everettjf/scriptwidget` by that repository's Pages workflow. Company must not store a compiled Studio copy. Historical `/scriptwidget/studio/` HTML entry points redirect to the personal publisher and preserve query strings and fragments.

## Content and source ownership

- `data/products.json`: the released Company directory, descriptions, verification dates, screenshot sources and product page ownership (`generated`, `static`, `liney` or `game`).
- `data/site.json`: shared contact details.
- `data/personal-site-redirects.json`: HTML compatibility paths for relocated personal sites.
- `scripts/site/`: catalog helpers, company shell, navigation, homepage and generated product landing pages.
- `scripts/build.mjs`: builds the Company shell and generated product pages.
- `scripts/build-software.mjs`: assembles retained sites, compatibility redirects, route manifest and sitemap.
- `software-sites/<slug>/`: authored retained Company product sites; RiftVM is the temporary exception described above.
- `liney-site/`: Liney's Docusaurus landing page and documentation, published under `/liney/`.
- `game-site/`: retained game pages built as static exports. Development/archive pages are noindex.
- `content/`: original product-specific privacy and support content. Preserve policy commitments and effective dates.
- `public/assets/`: company brand, product icons, published screenshots and self-hosted font files.

The main build emits only generated landing pages. Assembly validates ownership before copying retained sites, records `product-routes.json`, and builds a combined sitemap. Product routes must not silently overwrite one another.

## Contact and privacy

`data/site.json` owns the shared email and Discord invitation. Public support email is `atomsprout@gmail.com`. Company navigation uses the founder page; the personal blog is a separate website. Product-specific privacy promises and effective dates are preserved. Store account URLs and app release metadata require their own release/update process; changing this website does not change installed application binaries or store settings.

## Company domain

The custom domain remains `atomsprout.com`. Cloudflare DNS uses DNS-only records so GitHub can validate DNS and issue its certificate:

| Type | Name | Content |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | atomsprout.github.io |

The tracked `public/CNAME` records the intended domain. GitHub handles the www/apex redirect and HTTPS. Canonical links and sitemaps use HTTPS. `aspt.dev` remains deferred.

## Brand and presentation

Keep the approved transparent dodecahedron brand assets and their original masters. The homepage geometry uses golden-ratio coordinates, 20 vertices and 30 edges. The animation respects reduced motion, can be paused and stops while hidden or offscreen. The static SVG remains visible without JavaScript. Favicon preparation notes are in `docs/favicon-prompt.txt`.

Product screenshots retain full-size files for zoom and smaller thumbnails for loading, with recorded dimensions, alternative text and source URLs. Company navigation and screenshot dialogs progressively enhance static HTML; directory contents, download links and release details remain available without JavaScript.
