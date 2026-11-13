import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {products, site, origin, esc, external, arrow, collections, inCollection, policyExists, privacyUrl} from './site/catalog.mjs';
import {supportChannels, installBlock, collectionNav, card, gameFeature} from './site/components.mjs';
import {createPageRenderer} from './site/shell.mjs';
import {homePage} from './site/home.mjs';
import {productPage} from './site/product.mjs';

const out = 'dist';
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.cpSync('public', out, { recursive: true });
const assetVersion = createHash('sha256').update(['site.css','home.css','product.css','site.js','hero-math.js','geometry.js',...fs.readdirSync('public/assets/products').filter(n=>n.endsWith('.css')).sort().map(n=>`products/${n}`)].map(name=>fs.readFileSync(`public/assets/${name}`,'utf8')).join('')).update(fs.readFileSync('public/assets/brand-nav.png')).digest('hex').slice(0,12);
fs.writeFileSync(path.join(out,'assets/hero-math.js'),fs.readFileSync('public/assets/hero-math.js','utf8').replace("from './geometry.js'",`from './geometry.js?v=${assetVersion}'`));
const page = createPageRenderer(assetVersion);
const routes = [];
function write(route, html, index = true) {
  const file = route.endsWith('.html') ? route.slice(1) : path.join(route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(path.join(out, file)), { recursive: true });
  fs.writeFileSync(path.join(out, file), html);
  if (routes.includes(route)) throw new Error(`Duplicate generated route: ${route}`);
  if (index) routes.push(route);
}
write('/', page({body:homePage(), styles:['/assets/home.css']}));

for (const p of products) {
  const privacyFile = `content/${p.slug}-privacy`;
  const hasPolicy = fs.existsSync(privacyFile+'.json') || fs.existsSync(privacyFile+'.html');
  const isBrew=p.collection==='homebrew';
  const isExtension=p.collection==='extensions';
  if (p.page_source === 'generated') write(`/${p.slug}/`, page({title:p.name, description:p.tagline, route:`/${p.slug}/`, product:p, body:productPage(p), bodyClass:`product-page product-${p.slug}`, styles:['/assets/product.css', `/assets/products/${p.slug}.css`]}));
  if (hasPolicy) {
    let body;
    if(fs.existsSync(privacyFile+'.json')) {
      const sections=JSON.parse(fs.readFileSync(privacyFile+'.json','utf8'));
      body=sections.map(s=>`<section><h2>${esc(s.heading)}</h2>${s.body?`<p>${esc(s.body)}</p>`:''}${s.list?`<ul>${s.list.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`:''}</section>`).join('');
    } else body=fs.readFileSync(privacyFile+'.html','utf8');
    write(`/${p.slug}/privacy/`,page({title:`Privacy — ${p.name}`,route:`/${p.slug}/privacy/`,body:`<article class="document wrap"><a class="back" href="/${p.slug}/">← ${esc(p.name)}</a><p class="eyebrow">PRODUCT PRIVACY</p><h1>${esc(p.name)}<br>Privacy policy</h1><div class="prose">${body}</div></article>`}));
    write(`/${p.slug}/privacy.html`,redirect(`/${p.slug}/privacy/`),false);
  }
  let support=isExtension ? `<h2>Install or update</h2><p>${esc(p.name)} is free on the <a href="${p.store_url}" ${external}>Chrome Web Store</a>. Chrome manages extension updates.</p><h2>Help with the extension</h2><p>For setup and usage, visit the <a href="/${p.slug}/">product website</a> or the <a href="${p.source_url}" ${external}>project README</a>. Report a problem through <a href="${p.source_url}/issues" ${external}>GitHub issues</a>, email or Discord. Do not post private tabs, bookmarks or article content in public reports.</p><p><a href="/${p.slug}/privacy/">Read the privacy policy</a>.</p>` : isBrew ? `<h2>Install or update</h2><p>Install the Mac package using the command below. To update, run <code>brew update</code> and <code>brew upgrade --cask ${esc(p.slug)}</code>.</p>${installBlock(p)}<h2>Releases and project documentation</h2><p>Find available packages on <a href="${p.download_url}" ${external}>GitHub Releases</a>, or read the <a href="${p.source_url}" ${external}>project README</a> for requirements and setup.</p><h2>Report a problem</h2><p>Open an <a href="${p.source_url}/issues" ${external}>issue on GitHub</a> or contact us below. Include the app version, operating system, and steps to reproduce the issue.</p>` : fs.existsSync(`content/${p.slug}-support.html`) ? fs.readFileSync(`content/${p.slug}-support.html`,'utf8') : `<h2>Get help with ${esc(p.name)}</h2><p>Email <a href="mailto:${esc(site.support_email)}?subject=${encodeURIComponent(p.name+' support')}">${esc(site.support_email)}</a> with the app version, device and operating system, and the steps that led to the problem. Please leave out sensitive documents or personal information.</p><h2>Downloads and purchases</h2><p>Install the latest version from the <a href="${p.store_url}" ${external}>App Store</a>. For purchase restoration, use Restore Purchases in the app where available. Apple manages App Store billing, subscriptions, and refund requests.</p>`;
  write(`/${p.slug}/support/`,page({title:`Support — ${p.name}`,route:`/${p.slug}/support/`,body:`<article class="document wrap"><a class="back" href="/${p.slug}/">← ${esc(p.name)}</a><p class="eyebrow">PRODUCT SUPPORT</p><h1>Here to help.</h1><p class="document-intro">${esc(p.name)} support</p>${supportChannels(p)}<div class="prose">${support}</div></article>`}));
  write(`/${p.slug}/support.html`,redirect(`/${p.slug}/support/`),false);
}
function redirect(target) {return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${origin}${target}"><title>Page moved — AtomSprout</title></head><body><a href="${target}">Continue to AtomSprout →</a><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script></body></html>`;}
write('/support/',page({title:'Support',route:'/support/',body:`<section class="document wide wrap"><p class="eyebrow">A LITTLE HELP</p><h1>Let’s work it out.</h1><p class="document-intro">Find help for your app, or get in touch directly.</p>${supportChannels()}${collections.map(c=>`<section class="support-collection" aria-labelledby="support-${c.id}"><h2 id="support-${c.id}">${c.name}<span>${inCollection(c.id).length}</span></h2><div class="support-grid">${inCollection(c.id).map(p=>`<a href="/${p.slug}/support/"><img src="${p.icon}" width="44" height="44" alt=""><span><strong>${esc(p.name)}</strong><small>${esc(p.platform)}</small></span>${arrow}</a>`).join('')}</div></section>`).join('')}<div class="prose"><h2>Help us understand the issue</h2><p>Include your app version, device model, operating system, and steps to reproduce the problem. Please avoid sending private documents, passwords, or API keys.</p></div></section>`}));
write('/privacy/',page({title:'Privacy',route:'/privacy/',body:`<section class="document wrap"><p class="eyebrow">CLEAR BY DESIGN</p><h1>Privacy, by product.</h1><p class="document-intro">Each app has its own data practices. Find its policy below.</p>${collections.map(c=>{const entries=inCollection(c.id).filter(p=>p.collection!=='homebrew'||policyExists(p)||p.privacy_url);return entries.length?`<section class="policy-collection" aria-labelledby="policies-${c.id}"><h2 id="policies-${c.id}">${c.name}</h2><div class="policy-links">${entries.map(p=>`<a href="${privacyUrl(p)}" ${policyExists(p)?'':external}>${esc(p.name)} <span>${policyExists(p)?'Privacy policy':p.privacy_url?'Project privacy information':'App Store privacy details'} ${arrow}</span></a>`).join('')}</div></section>`:''}).join('')}<div class="prose"><h2>This website</h2><p>This static website does not use advertising or third-party analytics scripts. Your color-theme preference is saved in your browser. GitHub Pages hosts this site; requests are subject to <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" ${external}>GitHub’s privacy statement</a>.</p><h2>Questions</h2><p>Email <a href="mailto:${esc(site.support_email)}">${esc(site.support_email)}</a> for privacy questions. The policies linked above retain their existing product-specific terms.</p></div></section>`}));
for(const c of collections) {
  const entries=inCollection(c.id);
  write(`/${c.id}/`,page({title:c.name,description:c.description,route:`/${c.id}/`,body:`<section class="collection-page wrap" data-collection="${c.id}"><p class="eyebrow">${c.eyebrow}</p><h1>${c.name}</h1><p class="collection-tagline">${c.title}</p><p class="document-intro">${c.description}</p>${collectionNav(c.id)}${c.id==='apps'?`<div class="catalog-controls"><label for="product-search">Find an app<input id="product-search" type="search" placeholder="Search by name or use…" autocomplete="off"></label><label for="platform-filter">Platform<select id="platform-filter"><option value="">All platforms</option><option value="iphone">iPhone</option><option value="ipad">iPad</option><option value="mac">Mac</option></select></label><p class="search-status" role="status" aria-live="polite">${entries.length} apps</p></div>`:''}${c.id==='games'?gameFeature():`<div class="product-grid">${entries.map(card).join('')}</div><p class="empty-results" hidden>No apps found. Try another name or platform.</p>`}${c.id==='homebrew'?'<p class="catalog-note">Commands use each project’s own Homebrew tap. Open a tool for its install command, available downloads, and platform requirements.</p>':''}</section>`}));
}
write('/founder/',page({title:'About the founder',route:'/founder/',description:'Meet Everett, the developer behind AtomSprout.',body:`<article class="document founder-page wrap"><p class="eyebrow">ABOUT THE FOUNDER</p><h1>Everett<span class="color-dot">.</span></h1><p class="founder-handle">@everettjf / Founder of AtomSprout</p><div class="prose"><p class="large-copy">A developer, a curious mind,<br>and a habit of making things.</p><p>I build apps, developer tools, and games. Many begin with something I want to understand or a task I wish were easier.</p><p>AtomSprout is the home for that work: small ideas, thoughtfully built, with room to grow. The name brings together an atom’s building blocks and a sprout’s sense of possibility.</p><p lang="zh-CN">我也在微信公众号「吃灰思考」记录开发与思考：不要让设备吃灰，也不要让好奇心吃灰。</p></div><div class="founder-links"><a class="button primary" href="https://github.com/everettjf" ${external}>Find me on GitHub ${arrow}</a><a class="text-link" href="/support/">Get in touch ${arrow}</a></div></article>`}));
write('/privacy/remoboard/',redirect('/remoboard/privacy/'),false);
write('/projects/',redirect('/#products'),false);
write('/404.html',page({title:'Page not found',route:'/404.html',noindex:true,body:'<section class="document wrap"><p class="eyebrow">404 / A SMALL DETOUR</p><h1>A new direction?</h1><p class="document-intro">That page isn’t here. Let’s find something useful.</p><a class="button primary" href="/">Back to AtomSprout →</a></section>'}),false);
fs.writeFileSync(path.join(out,'.nojekyll'),'');
fs.writeFileSync(path.join(out,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${origin}${r}</loc></url>`).join('')}</urlset>`);
console.log(`Built ${routes.length} pages for ${products.length} products → ${out}/ (${origin})`);
