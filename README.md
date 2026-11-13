# AtomSprout

Company website for AtomSprout. Product websites live here; Everett’s personal writing stays at [xnu.app](https://xnu.app).

- Website: https://atomsprout.com
- Source: https://github.com/atomsprout/atomsprout.github.io
- Runtime: Node.js 22 or newer. The company generator uses Node built-ins; retained product sites use Next.js and Docusaurus builders. The deployed output is static.

## Develop and deploy

```sh
npm ci --prefix game-site
npm ci --prefix liney-site
npm run dev       # http://127.0.0.1:4173
npm run build     # Generate dist/
npm run check     # Validate generated local links and assets
git push origin main
```

GitHub Actions builds, checks, and publishes `dist/` to GitHub Pages on every push to `main`. Pages uses the **GitHub Actions** publishing source. The workflow derives canonical URLs from the configured Pages URL.

## Content

- `data/products.json`: product catalog, organized into `apps`, `games`, `extensions`, and `homebrew`. App Store releases were checked against Apple’s public US lookup API, and the five Homebrew tools against live casks and published release assets, on November 11, 2026. Storefront availability can vary. Recheck store metadata before making release or pricing claims.
- `content/`: product-specific support and privacy content migrated from the existing product sites. Privacy JSON files are the source of truth for their policies; HTML files preserve existing policies and help articles. Do not replace a product’s actual policy with a blanket claim about all apps.
- `public/assets/`: self-hosted brand assets, product icons, official App Store screenshots, and the Inter font copied from the existing site. The company pages use no analytics or remote fonts; independent product sites retain their own assets and implementation.
- `scripts/build.mjs`: build orchestration; `scripts/site/` contains the catalog helpers, company shell, components, homepage, and generated product pages.
- `public/assets/site.css` and `site.js`: responsive styles, saved light/dark preference, and copyable Homebrew installation commands.

The catalog contains 10 App Store apps, one released game, three free Chrome extensions, and five Homebrew tools. Games have their own collection even when distributed through the App Store. The `/apps/`, `/games/`, `/extensions/`, and `/homebrew/` pages work without JavaScript. Unreleased products and company registration/trademark claims are not presented as established facts.

## Support and founder

`data/site.json` owns the shared email and Discord invitation, copied from the existing XNU site. `/support/` and each product’s support page offer both channels. `/founder/` introduces Everett; company navigation links to this page rather than directly to the personal blog.

## Domains

The primary domain is `https://atomsprout.com`. GitHub Pages is configured with this custom domain. Cloudflare DNS uses DNS-only records (no proxy) so GitHub can validate DNS and issue its certificate directly:

| Type | Name | Content |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | atomsprout.github.io |

TTL is Auto. GitHub Pages handles the `www` → apex redirect and HTTPS enforcement after certificate issuance. The tracked `public/CNAME` records the intended domain; the repository Pages setting controls the Actions deployment domain. Canonical links and the sitemap always use HTTPS.

`asp.run` is the active short domain. Cloudflare redirects it to `https://atomsprout.com`, preserving paths and query strings. `www.asp.run` redirects through `asp.run`. `aspt.dev` is deferred at the owner’s request.

## Migration

Product URLs on the personal blog redirect to their matching company pages. Historical blog articles and the personal RSS feed remain at their original URLs. Embedded old links continue through those redirects. Product repository ownership and App Store Connect marketing/support/privacy settings have not been changed by this website deployment.

The Homebrew selection is Liney, TypeTide, Hexlora, RiftVM, and ChatComputer. Both RiftVM and ChatComputer are published, installable products and use their project-specific taps. LaunchDeck, XcodeFit, and MachOExplorer are omitted at the owner’s request.

When updating download links, verify that each target release and platform asset is public. Do not infer a Windows package from a macOS release or promote a GitHub prerelease as the stable download. The product-specific imported pages under `software-sites/` may contain their own download buttons in addition to `data/products.json`.

## Mathematical hero

The homepage renders a regular dodecahedron from golden-ratio coordinates, with 20 vertices and 30 equal-length edges. `public/assets/geometry.js` is shared by the static build and animation. `hero-math.js` rotates it once every 90 seconds, supports pausing, honors reduced motion, and suspends work while hidden or outside the viewport. A static SVG remains visible without JavaScript. Header and footer retain the approved brand logo.

## Favicon

The favicon uses the transparent cutout in `public/assets/favicon-source.png`, prepared as a centered `favicon-master.png` plus 16/32/48px PNGs and `public/favicon.ico`. Background extraction used the built-in image generation tool; the exact prompt and preparation notes are in `docs/favicon-prompt.txt`. PNG and ICO references share the build asset version so browsers request the updated transparent version.

Header/footer marks use the transparent cutout with a small horizontal optical correction inside square slots. This removes the old crop and balances the slightly taller source silhouette without changing the source artwork.


## Public identity migration (2026-11-12)

Software pages are maintained here. `software-sites/` contains the relocated static websites, including the privacy-reviewed iOS Atlas public data export. `game-site/` contains the former game website's authored Next source and media. Its development/archive pages are not part of the released-product catalog and are marked noindex. Update these sources rather than the retired websites.

`npm ci --prefix game-site` and `npm ci --prefix liney-site` install the product builders; `npm run build` builds the company, game, and Liney sites, then assembles the software routes. `npm run check` checks the complete export. The only public support email is `atomsprout@gmail.com`; product-specific privacy promises and effective dates are preserved. Contact addresses are authored directly, with no post-build email substitution.

The personal blog and RSS remain on xnu.app. rea.tools, microclaw.org, liney.dev and e7lang.github.io retain their domains. Source repositories, App Store URLs, Homebrew identities and application storage identifiers remain service-specific.

Old website publishers generate redirects only after the new destination has been deployed. The former game website no longer supplies assets or content and can be retired separately when the owner is ready.

## Liney product website

`liney-site/` contains the Docusaurus source imported from `everettjf/web-liney` at `6a096c5333ce67f09b3f9799e4c4d73481433e7e`. Its landing page and documentation are published at `https://atomsprout.com/liney/`. Docusaurus builds assets and client-side routes with `/liney/` as the base URL. Run `npm ci --prefix liney-site` before building. Existing product-specific support and privacy pages are retained.

## Chrome extensions

`extensions` is a distribution collection; `price: "free"` labels the three extensions without mixing price and product type. TabCarry, NotbadBookmark and X Article Export link to their existing product websites and Chrome Web Store listings. Their support and privacy links appear in grouped company directories; product-specific privacy policies remain unchanged.

## ChatComputer and RiftVM website ownership

Both product websites are maintained entirely in `software-sites/chatcomputer/`
and `software-sites/riftvm/`. Their images, JavaScript, styles, historical benchmark
`results.json`, legacy `catalog/linux.json`, and RiftVM asset-hash validator are
kept here. The old `chatcomputer/chatcomputer.github.io` and
`riftvm/riftvm.github.io` repositories are no longer sources or runtime dependencies.
Keep their existing redirects until the owner retires the repositories. Removing
them will remove the old GitHub Pages URLs; current clients and documentation
use the company URLs. GitHub app repositories, release assets, and taps remain.

## Source ownership

- `data/products.json`: released catalog, public release descriptions, verification
  dates, screenshot sources, and short editorial introductions. Each product has
  one primary collection; distribution and price are separate metadata.
- `data/site.json`: company contact details.
- `scripts/site/`: catalog helpers, company document shell, cards, homepage, and
  generated product landing pages. `scripts/build.mjs` assembles the main site.
- `public/assets/site.css`: company navigation, directory, support, and document
  styles. `home.css` styles the homepage. Each generated product owns a separate
  stylesheet in `public/assets/products/`; `product.css` supplies functional page
  and image-preview behavior without imposing a single product art direction.
- `software-sites/<slug>/`: independent, retained product sites.
- `liney-site/`: Liney's Docusaurus product site and documentation.
- `game-site/`: retained game pages, built as static exports.
- `content/`: product-specific policies and support content. Preserve policy
  commitments and effective dates when changing presentation.

`page_source` in the product catalog declares `generated`, `static`, or `liney`.
The main build emits only generated product landing pages. The final assembly
validates ownership before copying independent sites, writes a product route
manifest, and builds the combined sitemap. This prevents silent page overwrites.

## Product content and images

Verify feature and availability changes against public releases. Keep the full
release description and its actual `verified_at` date; use short `highlights` for
browsing. Do not advance verification dates merely because a page was rebuilt.
The App Store lookup API can supply published descriptions, versions, and screenshot
URLs. `source_url` on screenshot entries records the public source.

Retain full-size screenshots for zoom, with smaller WebP thumbnails for page load.
Record image dimensions and descriptive alternative text in the catalog. The
navigation logo is a small derivative of the approved brand asset; original brand
masters remain in `public/assets/`. Preserve an original asset if recompression
would increase its size.

Company navigation, search/filtering, and native screenshot dialogs progressively
enhance static HTML. Without JavaScript the complete catalog, download links,
release details, and full-size screenshots remain available.
