import fs from 'node:fs';
import path from 'node:path';

const out = 'dist';
const origin = 'https://atomsprout.com';
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function write(route, html) {
  const file = path.join(out, route.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(file), {recursive:true}); fs.writeFileSync(file, html);
}
function page(slug, title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} — AtomSprout</title><link rel="canonical" href="${origin}/${slug}/"><link rel="stylesheet" href="/assets/site.css"></head><body><header class="site-header wrap"><a href="/">AtomSprout</a><a href="/support/">Support</a></header><main class="document wrap"><h1>${esc(title)}</h1><div class="prose">${body}</div></main><footer class="footer wrap">© ${new Date().getUTCFullYear()} AtomSprout · <a href="mailto:atomsprout@gmail.com">Contact</a></footer></body></html>`;
}
function redirect(route, target) {
  write(route, `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page moved — AtomSprout</title><link rel="canonical" href="${origin}${target}"><meta http-equiv="refresh" content="0;url=${target}"><meta name="robots" content="noindex"></head><body><a href="${target}">Continue to AtomSprout</a><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script></body></html>`);
}
// These retained products are not additions to the released-product catalog.
for (const [slug, product] of Object.entries(JSON.parse(fs.readFileSync('data/legacy-products.json','utf8')))) {
  if (fs.existsSync(`dist/${slug}/index.html`)) continue;
  const features = (product.features || []).map(f=>`<h2>${esc(f.title)}</h2><p>${esc(f.body)}</p>`).join('');
  const links = (product.links || []).map(l=>`<a href="${esc(l.href)}">${esc(l.label)}</a>`).join(' · ');
  write(slug, page(slug, product.name, `<p>${esc(product.description)}</p><p>${links}</p>${features}<p><a href="/${slug}/privacy/">Privacy policy</a> · <a href="/${slug}/support/">Support</a></p>`));
  if (product.privacy_sections) write(`${slug}/privacy`, page(`${slug}/privacy`, `${product.name} privacy`, product.privacy_sections.map(s=>`<h2>${esc(s.heading)}</h2><p>${esc(s.body)}</p>${s.list?`<ul>${s.list.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}`).join('')));
  write(`${slug}/support`, page(`${slug}/support`, `${product.name} support`, fs.existsSync(`content/${slug}-support.html`) ? fs.readFileSync(`content/${slug}-support.html`,'utf8') : '<p>Email <a href="mailto:atomsprout@gmail.com">atomsprout@gmail.com</a> with the app version, device, operating system and steps to reproduce. Please leave out private content.</p>'));
}
for (const slug of fs.readdirSync('software-sites')) {
  const source = path.join('software-sites',slug);
  fs.cpSync(source, path.join(out,slug), {recursive:true});
  for (const file of fs.readdirSync(path.join(out,slug),{recursive:true})) {
    if (!/\.(html|css|js|mjs|json)$/.test(file)) continue;
    const target = path.join(out,slug,file);
    let text = fs.readFileSync(target,'utf8');
    // Relocate same-site absolute asset and navigation references under the product.
    text = text.replace(/((?:href|src|poster|action)=["'])\/(?!\/)([^"']*)(["'])/g, (match,start,ref,end)=> {
      const local = ref.split(/[?#]/)[0];
      if (local === slug || local.startsWith(`${slug}/`)) return match;
      return (!local || fs.existsSync(path.join(source,decodeURI(local)))) ? `${start}/${slug}/${ref}${end}` : match;
    });
    text = text.replace(/url\((["']?)\/(?!\/)([^)'"\s]+)\1\)/g,(match,q,ref)=>fs.existsSync(path.join(source,ref))?`url(${q}/${slug}/${ref}${q})`:match);
    // Product-site headers consistently link back to the new company home.
    fs.writeFileSync(target,text);
  }
  if (!fs.existsSync(`dist/${slug}/support/index.html`)) write(`${slug}/support`,page(`${slug}/support`,`${slug} support`,'<p>Email <a href="mailto:atomsprout@gmail.com">atomsprout@gmail.com</a>.</p>'));
}
write('x-article-export-pdf/privacy',page('x-article-export-pdf/privacy','X Article Export privacy',fs.readFileSync('content/x-article-export-pdf-privacy.html','utf8')));
const games = ['wedge-storm-chaser','aether-barrage-omega','fivefold-front'];
for (const slug of games) fs.cpSync(`game-site/out/${slug}`,`dist/${slug}`,{recursive:true});
for (const dir of ['_next','games','fonts']) fs.cpSync(`game-site/out/${dir}`,`dist/${dir}`,{recursive:true});
for (const slug of games) redirect(`games/${slug}`,`/${slug}/`);
for (const slug of games) redirect(`games/${slug}/privacy`,`/${slug}/privacy/`);
for (const suffix of ['', 'support/', 'privacy/']) {
  redirect(`cinderwick/${suffix}`,`/foxwick/${suffix}`);
  redirect(`games/foxwick/${suffix}`,`/foxwick/${suffix}`);
}
for (const [old, current] of [['countmydays','dayvella'],['jsondiff','jsoncompare'],['startmyapp','launchdeck']]) redirect(old,`/${current}/`);
// Compatibility URLs used by existing App Store metadata and older app builds.
for (const slug of fs.readdirSync(out)) {
  if (!fs.statSync(path.join(out,slug)).isDirectory()) continue;
  for (const sub of ['privacy','support']) {
    const route = `${slug}/${sub}`;
    if (fs.existsSync(`dist/${route}/index.html`)) {
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Page moved — AtomSprout</title><meta http-equiv="refresh" content="0;url=/${route}/"><link rel="canonical" href="${origin}/${route}/"></head><body><a href="/${route}/">Continue</a></body></html>`;
      fs.writeFileSync(`dist/${slug}/${sub}.html`,html);
    }
  }
}
console.log('Migrated software pages, legacy game pages and compatibility routes built.');

const sitemapURLs = new Set();
for (const file of fs.readdirSync(out,{recursive:true}).filter(f=>f.endsWith('.html'))) {
  const target = path.join(out,file);
  let html = fs.readFileSync(target,'utf8');
  if (file.includes('/studio/') || /name="robots"[^>]*noindex/.test(html)) continue;
  const canonical = `${origin}/${file.replace(/index\.html$/, '')}`;
  if (!/rel="canonical"/.test(html)) {
    html = html.replace('</head>',`<link rel="canonical" href="${canonical}"></head>`);
    fs.writeFileSync(target,html);
  }
  const match=html.match(/rel="canonical" href="([^"]+)"/);
  if (match && match[1].startsWith(origin+'/')) sitemapURLs.add(match[1]);
}
fs.writeFileSync(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...sitemapURLs].sort().map(url=>`<url><loc>${esc(url)}</loc></url>`).join('')}</urlset>`);
