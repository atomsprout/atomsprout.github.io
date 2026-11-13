import {collections, products, site, esc, external, arrow, inCollection, distribution} from './catalog.mjs';

export function mainNav(route, product) {
  return `<nav aria-label="Main navigation">${collections.map(c=>`<a href="/${c.id}/" ${route===`/${c.id}/`||product?.collection===c.id?'aria-current="page"':''}>${c.navName || c.name}</a>`).join('')}<a href="/support/" ${route==='/support/'?'aria-current="page"':''}>Support</a></nav>`;
}
export function supportChannels(product) {
  const subject=product ? '?subject='+encodeURIComponent(product.name+' support') : '';
  return `<div class="support-channels"><a class="support-channel" href="mailto:${esc(site.support_email)}${subject}"><span class="channel-icon" aria-hidden="true">@</span><span><strong>Email us</strong><small>${esc(site.support_email)}</small><span class="channel-description">For app issues, purchase questions, or a private conversation.</span></span>${arrow}</a><a class="support-channel" href="${esc(site.discord_url)}" ${external}><span class="channel-icon discord-icon" aria-hidden="true">↗</span><span><strong>Join Discord</strong><small>Our community</small><span class="channel-description">Ask a question, share feedback, and talk with other users.</span></span>${arrow}</a></div>`;
}
export function installBlock(p) {
  return `<div class="install-block"><span class="eyebrow">INSTALL WITH HOMEBREW</span><div><code>${esc(p.install)}</code><button type="button" data-copy="${esc(p.install)}" aria-label="Copy ${esc(p.name)} install command">Copy</button></div><span class="copy-status" role="status" aria-live="polite"></span></div>`;
}
export function gameFeature() {
  const p=inCollection('games')[0];
  return `<a class="game-feature" href="/${p.slug}/"><img src="${p.home_image || p.screenshot}" width="1600" height="900" alt="${esc(p.home_image_alt || p.name)}" loading="lazy"><div class="game-feature-copy"><span class="pill">AVAILABLE ON THE APP STORE</span><h3>${esc(p.name)}</h3><p>Carry the light.<br>Find your next adventure.</p><span class="text-link">Explore the game ${arrow}</span></div></a>`;
}
export function collectionNav(active) {
  return `<nav class="collection-tabs" aria-label="Product collections">${collections.map(c=>`<a href="/${c.id}/" ${active===c.id?'aria-current="page"':''}>${c.navName || c.name}<span>${inCollection(c.id).length}</span></a>`).join('')}</nav>`;
}
export function card(p, i) {
  return `<a class="product-card" href="/${p.slug}/" data-name="${esc(p.name)}" data-search="${esc([p.name,p.category,p.tagline,p.description].join(' ').toLowerCase())}" data-platform="${esc(p.platform.toLowerCase())}"><div class="card-top"><img src="${p.icon}" width="64" height="64" alt="" loading="lazy"><span class="card-number">${p.price==='free'?'<span class="free-label">Free</span> ':''}${String(i+1).padStart(2,'0')} ${arrow}</span></div><div><p class="eyebrow">${esc(p.category)}</p><h3>${esc(p.name)}${p.status?` <span class="release-status">${esc(p.status)}</span>`:''}</h3><p class="card-tagline">${esc(p.tagline)}</p></div><div class="card-bottom"><span>${esc(p.platform)}</span><span class="distribution-label">${distribution(p)} <span aria-hidden="true">↗</span></span></div></a>`;
}
