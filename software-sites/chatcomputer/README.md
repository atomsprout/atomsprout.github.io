# chatcomputer website

Canonical website: <https://atomsprout.com/chatcomputer/>.

Maintained in `atomsprout/atomsprout.github.io`, under `software-sites/chatcomputer/`.
Edit the HTML, styles, scripts, assets and data here. Run `npm run build` and
`npm run check` from the company repository; pushes to `main` deploy GitHub Pages.

The former `chatcomputer/chatcomputer.github.io` repository is retired. No build or
runtime request should use it. GitHub app source and release downloads remain
in `chatcomputer/chatcomputer`. Product support is at `/chatcomputer/support/`.

Keep `results.json` as the preserved historical benchmark data. Generate replacements
with the app repository’s `scripts/regress/site-results.py` and review the evidence
before publishing; changing the app version does not revalidate historical results.
