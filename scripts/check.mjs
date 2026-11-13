import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const files=fs.readdirSync(root,{recursive:true}).filter(f=>f.endsWith('.html'));
const failures=[];
const retiredHosts=new Set(['dustaxiom.github.io','riftvm.com','chatcomputer.github.io','aspt.dev']);
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
    if(url.hostname !== 'atomsprout.com') continue;
    const p=path.join(root,decodeURIComponent(url.pathname));
    if(!fs.existsSync(p))failures.push(`${f}: broken local link ${match[1]}`);
  }
}
const data=JSON.parse(fs.readFileSync('data/products.json','utf8'));
if(new Set(data.map(p=>p.slug)).size!==data.length)failures.push('Duplicate product slugs');
for(const p of data){
  if(!['apps','games','extensions','homebrew'].includes(p.collection))failures.push(`${p.slug}: unknown collection`);
  if(p.collection==='extensions'){
    if(!['free','paid','freemium'].includes(p.price))failures.push(`${p.slug}: missing pricing type`);
    if(!/^[a-p]{32}$/.test(p.store_id)||p.store_url!==`https://chromewebstore.google.com/detail/${p.store_id}`)failures.push(`${p.slug}: invalid Chrome Web Store URL`);
    if(p.privacy_url!==`https://atomsprout.com/${p.slug}/privacy/`)failures.push(`${p.slug}: privacy URL must use the company site`);
  }
}
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Checked ${files.length} HTML pages: internal links, assets, titles, and template rendering passed.`);
