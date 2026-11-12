# AtomSprout

Company website for AtomSprout. Publicly released apps and games live here; Everett’s writing and open-source explorations stay at [xnu.app](https://xnu.app).

- Website: https://atomsprout.com
- Source: https://github.com/atomsprout/atomsprout.github.io
- Runtime: Node.js 22 or newer. No third-party runtime or build dependencies.

## Develop and deploy

```sh
npm run dev       # http://127.0.0.1:4173
npm run build     # Generate dist/
npm run check     # Validate generated local links and assets
git push origin main
```

GitHub Actions builds, checks, and publishes `dist/` to GitHub Pages on every push to `main`. Pages uses the **GitHub Actions** publishing source. The workflow derives canonical URLs from the configured Pages URL.

## Content

- `data/products.json`: product catalog, organized into `apps`, `games`, and `homebrew`. App Store releases were checked against Apple’s public US lookup API, and the five Homebrew tools against live casks and published release assets, on November 11, 2026. Storefront availability can vary. Recheck store metadata before making release or pricing claims.
- `content/`: product-specific support and privacy content migrated from the existing product sites. Privacy JSON files are the source of truth for their policies; HTML files preserve existing policies and help articles. Do not replace a product’s actual policy with a blanket claim about all apps.
- `public/assets/`: self-hosted brand assets, product icons, official App Store screenshots, and the Inter font copied from the existing site. There are no analytics or remote font dependencies.
- `scripts/build.mjs`: shared layouts and static page generation.
- `public/assets/site.css` and `site.js`: responsive styles, saved light/dark preference, and copyable Homebrew installation commands.

The catalog contains 10 App Store apps, one released game, and five Homebrew tools. Games have their own collection even when distributed through the App Store. The `/apps/`, `/games/`, and `/homebrew/` pages work without JavaScript. Unreleased products and company registration/trademark claims are not presented as established facts. ScriptWidget’s privacy link points to its App Store privacy information until a dedicated company-hosted policy is supplied.

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

`aspt.dev` is deferred at the owner’s request. No DNS or redirect changes have been made for that domain. When it is connected later, configure an HTTPS redirect that preserves paths and query strings.

## Migration

Product URLs on the personal blog redirect to their matching company pages. Historical blog articles and the personal RSS feed remain at their original URLs. Embedded old links continue through those redirects. Product repository ownership and App Store Connect marketing/support/privacy settings have not been changed by this website deployment.

The Homebrew selection is Liney, TypeTide, Hexlora, RiftVM, and ChatComputer. Both RiftVM and ChatComputer are published, installable products and use their project-specific taps. LaunchDeck, XcodeFit, and MachOExplorer are omitted at the owner’s request.

## Mathematical hero

The homepage renders a regular dodecahedron from golden-ratio coordinates, with 20 vertices and 30 equal-length edges. `public/assets/geometry.js` is shared by the static build and animation. `hero-math.js` rotates it once every 90 seconds, supports pausing, honors reduced motion, and suspends work while hidden or outside the viewport. A static SVG remains visible without JavaScript. Header and footer retain the approved brand logo.

## Favicon

The favicon uses the transparent cutout in `public/assets/favicon-source.png`, prepared as a centered `favicon-master.png` plus 16/32/48px PNGs and `public/favicon.ico`. Background extraction used the built-in image generation tool; the exact prompt and preparation notes are in `docs/favicon-prompt.txt`. PNG and ICO references share the build asset version so browsers request the updated transparent version.

Header/footer marks use the transparent cutout with a small horizontal optical correction inside square slots. This removes the old crop and balances the slightly taller source silhouette without changing the source artwork.
