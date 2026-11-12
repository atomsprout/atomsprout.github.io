# Liney company website

Imported from `everettjf/web-liney` at commit `6a096c5333ce67f09b3f9799e4c4d73481433e7e`. This copy is built with the company website and published at https://atomsprout.com/liney/.

```sh
npm ci --prefix liney-site
npm --prefix liney-site run build
npm --prefix liney-site run typecheck
```

Run the company root `npm run build` and `npm run check` for the complete deployment. Docusaurus uses `/liney/` for static assets, canonical URLs, and client-side routes. Update documentation under `docs/`, navigation in `sidebars.ts`, and the landing page under `src/pages/`.
