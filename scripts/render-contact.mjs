import fs from 'node:fs';
import path from 'node:path';

// Keep imported product documents on the current shared contact address.
// Their policy wording and effective dates remain in their original sources.
const {support_email: email} = JSON.parse(fs.readFileSync('data/site.json', 'utf8'));
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid support email');
let updated = 0;
for (const file of fs.readdirSync('dist', {recursive: true})) {
  if (!file.endsWith('.html')) continue;
  const target = path.join('dist', file);
  const original = fs.readFileSync(target, 'utf8');
  const current = original.replaceAll('xnuapp@gmail.com', email);
  if (current !== original) {
    fs.writeFileSync(target, current);
    updated++;
  }
}
console.log(`Applied shared contact ${email} to ${updated} generated pages.`);
