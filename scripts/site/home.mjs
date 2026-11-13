import {products, collections, inCollection, esc, arrow} from './catalog.mjs';
import {initialGeometry} from '../../public/assets/geometry.js';

function selection(p) {
  const image = p.home_image || p.screenshot;
  return `<a class="selection selection-${p.slug}" href="/${p.slug}/">
    <div class="selection-image"><img src="${image}" alt="${esc(p.home_image_alt || `${p.name} interface`)}" loading="lazy" width="1200" height="750"></div>
    <div class="selection-copy"><img src="${p.icon}" width="40" height="40" alt="" loading="lazy"><div><span class="eyebrow">${esc(p.category)}</span><h3>${esc(p.name)}</h3></div>${arrow}</div>
    <p>${esc(p.tagline)}</p><span class="selection-platform">${esc(p.platform)}</span>
  </a>`;
}

export function homePage() {
  const featured = products.filter(p=>p.featured).sort((a,b)=>a.featured-b.featured);
  return `
  <section class="hero wrap">
    <div class="hero-copy">
      <p class="eyebrow"><span class="status-dot"></span> Independent ideas, thoughtfully built</p>
      <h1>Small ideas.<br><span class="serif">Remarkable</span><br>possibilities<span class="color-dot">.</span></h1>
      <p class="hero-intro">Apps for everyday life. Tools for your next project. Worlds worth exploring.</p>
      <a class="button primary" href="#products">Find your next thing <span aria-hidden="true">↓</span></a>
    </div>
    <div class="hero-art math-art">
      <svg class="math-wireframe" viewBox="0 0 500 500" role="img" aria-labelledby="math-title math-description"><title id="math-title">A slowly rotating dodecahedron</title><desc id="math-description">A wireframe dodecahedron with twenty vertices, thirty edges, and twelve faces.</desc>${initialGeometry()}</svg>
      <span class="math-note" aria-hidden="true">φ ≈ 1.618</span><span class="euler-note" aria-hidden="true">V − E + F = 2</span><span class="art-caption">A SMALL SPARK. ROOM TO GROW.</span><button class="rotation-toggle" aria-label="Pause rotation" hidden>Ⅱ</button>
    </div>
  </section>
  <section class="home-products wrap" id="products">
    <div class="section-heading"><div><p class="eyebrow">A FEW THINGS WE MAKE</p><h2>Different ideas.<br>Made to be used.</h2></div><p>A reading companion, a clearer comparison,<br>and a little room for adventure.</p></div>
    <div class="selections">${featured.map(selection).join('')}</div>
  </section>
  <section class="browse wrap" aria-labelledby="browse-title">
    <div class="section-heading"><div><p class="eyebrow">THERE’S MORE TO EXPLORE</p><h2 id="browse-title">Find your kind of curious.</h2></div></div>
    <div class="collection-paths">${collections.map((c,i)=>`<a href="/${c.id}/"><span class="collection-index">0${i+1}</span><div><h3>${c.name}</h3><p>${esc(c.description)}</p></div><span class="collection-count">${inCollection(c.id).length}</span>${arrow}</a>`).join('')}</div>
  </section>
  <section class="maker wrap">
    <p class="eyebrow">BEHIND ATOMSPROUT</p><div><h2>Curiosity is<br>a good beginning.</h2><p>An atom is a building block. A sprout is a beginning with room to grow. We start with a concrete question, build something useful, and keep making it better.</p><a class="text-link" href="/founder/">Meet the maker ${arrow}</a></div>
  </section>
  <section class="contact wrap"><div><p class="eyebrow">LET’S TALK</p><h2>Something on your mind<span class="color-dot">?</span></h2><p>Questions, feedback, or a small idea worth exploring.</p></div><a class="button primary" href="/support/">Get in touch ${arrow}</a></section>`;
}
