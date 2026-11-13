import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const files=fs.readdirSync(root,{recursive:true}).filter(f=>f.endsWith('.html'));
const failures=[];
const retiredHosts=new Set(['dustaxiom.github.io','riftvm.com','riftvm.github.io','chatcomputer.github.io','aspt.dev']);
const blogHosts=new Set(['xnu.app','www.xnu.app','everettjf.github.io']);
const isBlogPath=p=>/^\/(?:$|about\/?$|archive\/?$|feed\.xml$|(?:19|20)\d{2}\/)/.test(p);
for(const f of files){
  const html=fs.readFileSync(path.join(root,f),'utf8');
  if(!/<title\b[^>]*>.+<\/title>/.test(html))failures.push(`${f}: missing title`);
  if(/\{%|\{\{/.test(html))failures.push(`${f}: unrendered template`);
  if (/(?:xnuapp@gmail\.com|everettjf@live\.com)/.test(html)) failures.push(`${f}: legacy public email`);
  for(const match of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)){
    let url;
    try { url = new URL(match[1], `https://atomsprout.com/${f}`); }
    catch { failures.push(`${f}: invalid URL ${match[1]}`); continue; }
    if(retiredHosts.has(url.hostname)||(blogHosts.has(url.hostname)&&!isBlogPath(url.pathname)))failures.push(`${f}: legacy product URL ${match[1]}`);
    if(url.hostname==='github.com'&&/^\/(?:chatcomputer\/chatcomputer|riftvm\/riftvm)\.github\.io(?:\/|$)/.test(url.pathname))failures.push(`${f}: retired website repository ${match[1]}`);
    if(url.hostname !== 'atomsprout.com') continue;
    const p=path.join(root,decodeURIComponent(url.pathname));
    if(!fs.existsSync(p))failures.push(`${f}: broken local link ${match[1]}`);
  }
}
const data=JSON.parse(fs.readFileSync('data/products.json','utf8'));
for(const f of ['chatcomputer/results.json','riftvm/catalog/linux.json']){
  try{JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));}
  catch{failures.push(`${f}: missing or invalid migrated product data`);}
}
if(new Set(data.map(p=>p.slug)).size!==data.length)failures.push('Duplicate product slugs');
for(const p of data){
  if(!['apps','games','extensions','homebrew'].includes(p.collection))failures.push(`${p.slug}: unknown collection`);
  if(p.collection==='extensions'){
    if(!['free','paid','freemium'].includes(p.price))failures.push(`${p.slug}: missing pricing type`);
    if(!/^[a-p]{32}$/.test(p.store_id)||p.store_url!==`https://chromewebstore.google.com/detail/${p.store_id}`)failures.push(`${p.slug}: invalid Chrome Web Store URL`);
    if(p.privacy_url!==`https://atomsprout.com/${p.slug}/privacy/`)failures.push(`${p.slug}: privacy URL must use the company site`);
  }
}
// Product page ownership is explicit: copying a product site must never silently
// replace a generated landing page. Validate the final assembled output as well.
let routeManifest = [];
try { routeManifest = JSON.parse(fs.readFileSync(path.join(root, 'product-routes.json'), 'utf8')); }
catch { failures.push('Missing product route manifest'); }
for (const product of data) {
  const landing = path.join(root, product.slug, 'index.html');
  if (!fs.existsSync(landing)) { failures.push(`${product.slug}: missing landing page`); continue; }
  const entry = routeManifest.find(r => r.route === `/${product.slug}/`);
  if (!entry || entry.source !== product.page_source) failures.push(`${product.slug}: page source mismatch`);
  if (!['generated','static','liney'].includes(product.page_source)) failures.push(`${product.slug}: invalid page source`);
  if (product.page_source !== 'generated') continue;
  const html = fs.readFileSync(landing, 'utf8');
  if (!html.includes(`product-${product.slug}`)) failures.push(`${product.slug}: generated page was replaced`);
  if (!product.presentation || product.highlights?.length !== 3 || !product.purchase_note) failures.push(`${product.slug}: incomplete presentation`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(product.verified_at)) failures.push(`${product.slug}: missing release verification date`);
  for (const shot of [...(product.screenshots || []), ...(product.hero_screenshot ? [product.hero_screenshot] : [])]) {
    if (!(shot.width > 0 && shot.height > 0) || !shot.alt || !shot.caption) failures.push(`${product.slug}: incomplete screenshot metadata`);
    for (const asset of [shot.src, shot.thumbnail]) {
      if (!asset?.startsWith('/assets/') || !fs.existsSync(path.join(root, asset))) failures.push(`${product.slug}: missing screenshot ${asset}`);
    }
  }
  if (!html.includes(`datetime="${product.verified_at}"`)) failures.push(`${product.slug}: stale verification date in page`);
}
if (new Set(data.filter(p=>p.featured).map(p=>p.featured)).size !== data.filter(p=>p.featured).length) failures.push('Duplicate homepage feature order');

if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Checked ${files.length} HTML pages: internal links, assets, titles, product routing, and presentation metadata passed.`);
