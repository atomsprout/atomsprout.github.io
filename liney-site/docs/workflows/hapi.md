---
title: Remote Coding
---

# Remote Coding

Liney includes first-class HAPI integration when the `hapi` executable is available on your machine.

If you are new to the tool itself, start with the official site:

- [HAPI](https://hapi.run/)

For relay and tunnel-related setup, the relevant networking background is here:

- [Cloudflare Tunnel documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)

## What HAPI integration does

When Liney detects `hapi` in your shell path, HAPI actions become available inside the app.

Liney checks for:

- `hapi`
- `cloudflared` for tunnel-related actions

Once detected, the command palette can offer workspace-aware HAPI actions such as:

- launch HAPI in the current workspace
- start HAPI Hub
- start `hapi hub --relay`

The key detail is that Liney launches HAPI in the active worktree, so the session opens in the repository context you are already using.

## Additional HAPI actions

The app also exposes several HAPI-related commands:

- HAPI Codex
- HAPI Cursor
- HAPI Gemini
- HAPI OpenCode
- HAPI auth status
- HAPI auth login
- HAPI auth logout
- HAPI show settings
- Cloudflared tunnel actions when `cloudflared` is installed

## Why this is useful

Without workspace-aware integration, a HAPI launch usually means:

- opening another terminal
- switching to the right repository
- making sure you are in the right worktree
- remembering which HAPI variant you wanted

With Liney, the command is tied to the workspace context you already selected.

## A practical HAPI flow

1. Select the workspace or worktree you want to work in.
2. Open the command palette.
3. Launch HAPI in that workspace.
4. If you need relay mode or hub setup, start HAPI Hub from the same workspace-aware actions.

If `hapi` is not installed, those actions stay unavailable, which keeps the UI honest instead of showing broken launchers.

## Related reading

- [Agents](./agents-and-hapi.md)
- [Workspace Workflows](./workspace-workflows.md)
