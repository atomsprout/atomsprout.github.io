import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const files=fs.readdirSync(root,{recursive:true}).filter(f=>f.endsWith('.html'));
const failures=[];
for(const f of files){
  const html=fs.readFileSync(path.join(root,f),'utf8');
  if(!/<title>.+<\/title>/.test(html))failures.push(`${f}: missing title`);
  if(/\{%|\{\{/.test(html))failures.push(`${f}: unrendered template`);
  for(const match of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){
    const ref=match[1].split('?')[0];
    if(!ref.startsWith('/')||ref.startsWith('//'))continue;
    const p=path.join(root,decodeURIComponent(ref));
    if(!fs.existsSync(p))failures.push(`${f}: broken local link ${ref}`);
  }
}
const data=JSON.parse(fs.readFileSync('data/products.json','utf8'));
if(new Set(data.map(p=>p.slug)).size!==data.length)failures.push('Duplicate product slugs');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Checked ${files.length} HTML pages: internal links, assets, titles, and template rendering passed.`);
