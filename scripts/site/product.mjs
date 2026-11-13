import {esc, external, arrow, privacyUrl} from './catalog.mjs';

// Store descriptions are evidence, not page layouts. Keep the full released
// description available while presenting a short, product-specific introduction.
function storeContent(description) {
  return description.split(/\n\s*\n/).map(block => {
    const lines = block.split('\n');
    const heading = lines.length > 1 && /^[A-Z0-9 —,&:+®’'()./–-]+$/.test(lines[0]);
    const title = heading ? `<h3>${esc(lines.shift())}</h3>` : '';
    if (lines.every(line=>/^[•\-] /.test(line))) {
      return `${title}<ul>${lines.map(line=>`<li>${esc(line.replace(/^[•\-] /,''))}</li>`).join('')}</ul>`;
    }
    return `${title}<p>${lines.map(esc).join('<br>')}</p>`;
  }).join('\n');
}

function screenshot(p, shot, i) {
  return `<figure class="app-shot"><a href="${shot.src}" data-preview aria-label="Enlarge ${esc(shot.alt)}"><img src="${shot.thumbnail}" width="${shot.width}" height="${shot.height}" alt="${esc(shot.alt)}" ${i===0?'fetchpriority="high"':'loading="lazy"'}><span class="enlarge" aria-hidden="true">↗</span></a><figcaption>${esc(shot.caption)}</figcaption></figure>`;
}

export function productPage(p) {
  const v = p.presentation;
  if (!v) throw new Error(`Missing product presentation: ${p.slug}`);
  const shots = p.screenshots;
  const heroShot = screenshot(p, p.hero_screenshot || shots[0], 0);
  const highlights = p.highlights.map((f,i)=>`<article><span class="feature-index">0${i+1}</span><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></article>`).join('');
  return `
  <section class="app-hero wrap">
    <div class="app-heading"><a class="back" href="/${p.collection}/">← ${p.collection==='games'?'Games':'Apps'}</a><div class="app-identity"><img src="${p.icon}" width="60" height="60" alt=""><span>${esc(p.name)}</span></div><p class="eyebrow">${esc(v.eyebrow)}</p><h1>${esc(v.headline)}</h1><p class="app-lead">${esc(v.intro)}</p><div class="app-actions"><a class="button primary" href="${p.store_url}" ${external}>${p.collection==='games'?'Play':'Get'} ${esc(p.name)} ${arrow}</a><a class="text-link" href="#features">Take a closer look <span aria-hidden="true">↓</span></a></div><p class="app-platform">${esc(p.platform)} · ${p.platform==='macOS'?'macOS':'iOS / iPadOS'} ${esc(p.minimum_os)}+</p></div>
    <div class="app-hero-visual">${heroShot}</div>
  </section>
  <section class="app-features wrap" id="features"><div class="app-section-heading"><p class="eyebrow">${esc(v.section_label)}</p><h2>${esc(v.section_title)}</h2></div><div class="app-feature-grid">${highlights}</div></section>
  ${shots.length>1?`<section class="app-gallery wrap" aria-labelledby="gallery-title"><div class="app-section-heading"><p class="eyebrow">IN THE APP</p><h2 id="gallery-title">${esc(v.gallery_title)}</h2></div><div class="app-gallery-grid">${shots.slice(1).map((shot,i)=>screenshot(p,shot,i+1)).join('')}</div></section>`:''}
  <section class="app-information wrap"><div><p class="eyebrow">BEFORE YOU BEGIN</p><h2>The useful details.</h2><p>${esc(p.purchase_note)}</p><div class="app-links"><a href="/${p.slug}/support/">Help & support ${arrow}</a><a href="${privacyUrl(p)}">Product privacy ${arrow}</a></div></div><div><details class="release-details"><summary>Features, requirements & release information</summary><div class="prose">${storeContent(p.store_description)}<p class="store-note">Public App Store listing checked <time datetime="${esc(p.verified_at)}">${esc(p.verified_at)}</time>. <a href="${p.store_url}" ${external}>Check current availability and purchases on the App Store.</a></p></div></details><a class="button primary app-final-action" href="${p.store_url}" ${external}>${p.collection==='games'?'Play':'Get'} ${esc(p.name)} ${arrow}</a></div></section>
  <dialog class="image-preview" aria-label="Screenshot preview"><button type="button" class="preview-close" aria-label="Close screenshot preview">Close ×</button><img alt=""><p></p></dialog>`;
}
