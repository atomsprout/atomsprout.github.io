import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const files=fs.readdirSync(root,{recursive:true}).filter(f=>f.endsWith('.html'));
const failures=[];
for(const f of files){
  const html=fs.readFileSync(path.join(root,f),'utf8');
  if(!/<title>.+<\/title>/.test(html))failures.push(`${f}: missing title`);
  if(/\{%|\{\{/.test(html))failures.push(`${f}: unrendered template`);
  if (/(?:xnuapp@gmail\.com|everettjf@live\.com)/.test(html)) failures.push(`${f}: legacy public email`);
  for(const match of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)){
    let url;
    try { url = new URL(match[1], `https://atomsprout.com/${f}`); }
    catch { failures.push(`${f}: invalid URL ${match[1]}`); continue; }
    if(url.hostname !== 'atomsprout.com') continue;
    const p=path.join(root,decodeURIComponent(url.pathname));
    if(!fs.existsSync(p))failures.push(`${f}: broken local link ${match[1]}`);
  }
}
const data=JSON.parse(fs.readFileSync('data/products.json','utf8'));
if(new Set(data.map(p=>p.slug)).size!==data.length)failures.push('Duplicate product slugs');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Checked ${files.length} HTML pages: internal links, assets, titles, and template rendering passed.`);
