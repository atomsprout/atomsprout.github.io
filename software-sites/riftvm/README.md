# riftvm website

Canonical website: <https://atomsprout.com/riftvm/>.

Maintained in `atomsprout/atomsprout.github.io`, under `software-sites/riftvm/`.
Edit the HTML, styles, scripts, assets and data here. Run `npm run build` and
`npm run check` from the company repository; pushes to `main` deploy GitHub Pages.

The former `riftvm/riftvm.github.io` repository is retired. No build or
runtime request should use it. GitHub app source and release downloads remain
in `riftvm/riftvm`. Product support is at `/riftvm/support/`.

`catalog/linux.json` is retained for legacy clients. Preserve its payload.
Styles and scripts use `?asset=` with the first 12 SHA-256 characters; update
those references when an asset changes. `bin/check-asset-hashes` checks this contract.
