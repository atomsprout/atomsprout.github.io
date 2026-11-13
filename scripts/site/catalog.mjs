import fs from 'node:fs';

export const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
export const site = JSON.parse(fs.readFileSync('data/site.json', 'utf8'));
export const origin = (process.env.SITE_URL || 'https://atomsprout.com').replace(/^http:/, 'https:').replace(/\/$/, '');
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const external = 'target="_blank" rel="noopener noreferrer"';
export const arrow = '<span aria-hidden="true">↗</span>';
export const collections = [
  {id:'apps',name:'Apps',eyebrow:'ON THE APP STORE',title:'Everyday, a little better.',description:'Focused apps for iPhone, iPad, and Mac. Find something that fits the way you work and learn.'},
  {id:'games',name:'Games',eyebrow:'WORLDS TO EXPLORE',title:'Make room for play.',description:'A different kind of curiosity. Explore our released games, one world at a time.'},
  {id:'extensions',name:'Chrome Extensions',navName:'Extensions',eyebrow:'FREE / CHROME WEB STORE',title:'Small tools. Better browsing.',description:'Free Chrome extensions for your tabs, bookmarks, and the articles you want to keep.'},
  {id:'homebrew',name:'Homebrew',eyebrow:'A COMMAND AWAY',title:'Good tools. Within reach.',description:'Mac apps and developer tools, distributed through Homebrew and GitHub Releases.'}
];
export const inCollection = id => products.filter(p=>p.collection===id);
export const primaryUrl = p => p.store_url || p.download_url;
export const distribution = p => p.collection==='extensions' ? 'Chrome Web Store' : p.collection==='homebrew' ? 'Homebrew' : 'App Store';
export const policyExists = p => fs.existsSync(`content/${p.slug}-privacy.json`) || fs.existsSync(`content/${p.slug}-privacy.html`) || fs.existsSync(`software-sites/${p.slug}/privacy/index.html`);
export const privacyUrl = p => policyExists(p) ? `/${p.slug}/privacy/` : p.privacy_url || p.store_url;
