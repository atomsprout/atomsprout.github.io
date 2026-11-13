import {site, origin, esc, external, arrow, primaryUrl} from './catalog.mjs';
import {mainNav} from './components.mjs';

export function createPageRenderer(assetVersion) {
  const logo = `<span class="brand-image"><img src="/assets/brand-nav.png?v=${assetVersion}" width="48" height="48" alt=""></span>`;

  return function page({
    title = 'Small ideas. Remarkable possibilities.',
    description = 'AtomSprout builds thoughtful apps, useful tools, and playful worlds. Explore our apps for iPhone, iPad, and Mac.',
    route = '/', body, product, noindex = false, styles = [], bodyClass = '',
  }) {
    const structured = product ? {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication',
      name: product.name, operatingSystem: product.platform,
      applicationCategory: product.category, url: origin + route,
      downloadUrl: primaryUrl(product),
    } : {
      '@context': 'https://schema.org', '@type': 'Organization',
      name: 'AtomSprout', url: origin, logo: origin + '/assets/brand-light.png',
      sameAs: ['https://github.com/atomsprout'],
    };
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)} — AtomSprout</title>
  <meta name="description" content="${esc(description)}">
  <meta name="theme-color" content="#f8f7f3">
  <meta name="color-scheme" content="light dark">
  ${noindex ? '<meta name="robots" content="noindex">' : ''}
  <link rel="canonical" href="${origin}${route}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)} — AtomSprout">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${origin}${route}">
  <meta property="og:image" content="${origin}/assets/brand-light.png">
  <meta name="twitter:card" content="summary">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png?v=${assetVersion}">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png?v=${assetVersion}">
  <link rel="shortcut icon" href="/favicon.ico?v=${assetVersion}">
  <link rel="apple-touch-icon" href="/assets/brand-light.png">
  <link rel="preload" href="/assets/inter.woff2" as="font" type="font/woff2" crossorigin>
  <script>try{const t=localStorage.getItem('as-theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch{}</script>
  <link rel="stylesheet" href="/assets/site.css?v=${assetVersion}">
  ${styles.map(href => `<link rel="stylesheet" href="${href}?v=${assetVersion}">`).join('\n  ')}
  <script type="application/ld+json">${JSON.stringify(structured).replace(/</g, '\\u003c')}</script>
  <script defer src="/assets/site.js?v=${assetVersion}"></script>
  ${route === '/' ? `<script type="module" src="/assets/hero-math.js?v=${assetVersion}"></script>` : ''}
</head>
<body class="${esc(bodyClass)}">
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header wrap">
    <a class="brand" href="/" aria-label="AtomSprout home">${logo}<span>AtomSprout<span class="brand-dot">.</span></span></a>
    ${mainNav(route, product)}
    <button class="theme-toggle" aria-label="Switch color theme" title="Switch color theme"><span aria-hidden="true">◐</span></button>
  </header>
  <main id="main">${body}</main>
  <footer class="footer wrap">
    <div class="footer-top"><a class="brand" href="/">${logo}<span>AtomSprout.</span></a><p>Small ideas. Remarkable possibilities.</p></div>
    <div class="footer-bottom">
      <p>© ${new Date().getUTCFullYear()} AtomSprout</p>
      <nav aria-label="Footer navigation">
        <a href="/support/">Support</a><a href="/privacy/">Privacy</a>
        <a href="https://github.com/atomsprout" ${external}>GitHub ${arrow}</a>
        <a href="/founder/">About the founder</a>
      </nav>
      <a href="mailto:${esc(site.support_email)}">Say hello ${arrow}</a>
    </div>
  </footer>
</body>
</html>`;
  };
}
