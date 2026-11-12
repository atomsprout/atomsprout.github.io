# AtomSprout

Company website for AtomSprout. Publicly released apps and games live here; Everett’s writing and open-source explorations stay at [xnu.app](https://xnu.app).

- Website: https://atomsprout.github.io
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

- `data/products.json`: released product catalog, checked against Apple’s public US App Store lookup API on November 11, 2026. Storefront availability can vary. Recheck store metadata before making release or pricing claims.
- `content/`: product-specific support and privacy content migrated from the existing product sites. Privacy JSON files are the source of truth for their policies; HTML files preserve existing policies and help articles. Do not replace a product’s actual policy with a blanket claim about all apps.
- `public/assets/`: self-hosted brand assets, product icons, official App Store screenshots, and the Inter font copied from the existing site. There are no analytics or remote font dependencies.
- `scripts/build.mjs`: shared layouts and static page generation.
- `public/assets/site.css` and `site.js`: responsive styles, saved light/dark preference, and category filters.

The public catalog includes 11 confirmed releases. Unreleased products and company registration/trademark claims are not presented as established facts. ScriptWidget’s privacy link points to its App Store privacy information until a dedicated company-hosted policy is supplied.

## Domains

The initial live domain is `atomsprout.github.io`. Neither `atomsprout.com` nor `aspt.dev` resolved during setup, so no unverified custom domain is attached to Pages.

To connect the primary domain after registration:

1. Set `www.atomsprout.com` to a CNAME of `atomsprout.github.io`.
2. Set the apex `atomsprout.com` to GitHub Pages’ current documented A/AAAA records, or the DNS provider’s supported ALIAS/flattened CNAME to `atomsprout.github.io`. Follow [GitHub’s current custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
3. Set `atomsprout.com` as the repository’s Pages custom domain and enable HTTPS after DNS and certificate checks pass.
4. Run the workflow again to regenerate canonical URLs and the sitemap using the custom domain.
5. Configure `aspt.dev` as an HTTPS redirect to `https://atomsprout.com` at the registrar or DNS/redirect provider. A DNS CNAME alone does not create an HTTP redirect. Preserve paths and query strings.

## Migration

Product URLs on the personal blog redirect to their matching company pages. Historical blog articles and the personal RSS feed remain at their original URLs. Embedded old links continue through those redirects. Product repository ownership and App Store Connect marketing/support/privacy settings have not been changed by this website deployment.
