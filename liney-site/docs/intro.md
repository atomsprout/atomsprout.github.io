---
id: intro
title: Documentation
slug: /intro
---

# Liney Documentation

![Diagram showing how Liney connects a workspace to worktrees and terminal sessions](/img/docs/workspace-topology.svg)

Liney is a native workspace for macOS and Windows (Beta) for repositories, worktrees, terminal sessions, and parallel coding flow.

:::note On Windows?
[liney-win](https://github.com/everettjf/liney-win) is a separate Windows port, currently in **beta**. It is a from-scratch build (Win32 + Direct2D) that reuses Ghostty's `libghostty-vt` as the terminal core, so it isn't fully on par with the macOS app yet. This documentation describes the macOS app.
:::

This documentation is organized around how you actually use the product:

- start with one repository
- create worktrees for parallel tasks
- keep terminal sessions attached to the worktree that owns them
- use the sidebar as a live map of what is active
- add remote and agent-backed sessions when local shells are not enough
- reuse workflows instead of rebuilding the same setup every day

## If you are coming back to Liney

The latest product surface is much stronger around reusable launch setup.

If you already know the basics, start here:

- [Presets and Reusable Launchers](./guides/presets-and-reusable-launchers.md)
- [Remote Sessions and SSH](./workflows/remote-sessions-and-ssh.md)
- [Agents](./workflows/agents-and-hapi.md)
- [Agent Control CLI](./workflows/agent-control-cli.md)
- [Remote Coding](./workflows/hapi.md)

## Start here

If you are new to Liney, read these in order:

1. [Getting Started](./guides/getting-started.md)
2. [Worktrees & Sessions](./workflows/worktrees-and-sessions.md)
3. [Command Palette & Quick Commands](./guides/command-palette-and-quick-commands.md)
4. [Presets and Reusable Launchers](./guides/presets-and-reusable-launchers.md)
5. [Overview & Canvas](./guides/overview-and-canvas.md)
6. [Hidden Features](./guides/hidden-features.md)

## Quick routes by goal

If you want the shortest path to a specific outcome, use these routes:

- get a repository running inside Liney this afternoon: [Getting Started](./guides/getting-started.md) plus [Worktrees & Sessions](./workflows/worktrees-and-sessions.md)
- turn repeated shell and agent launches into reusable setup: [Presets and Reusable Launchers](./guides/presets-and-reusable-launchers.md)
- standardize remote access, remote shells, and saved SSH targets: [Remote Sessions and SSH](./workflows/remote-sessions-and-ssh.md)
- attach AI tools to the active workspace instead of opening extra terminals by hand: [Agents](./workflows/agents-and-hapi.md)
- let agents inspect and drive each other from the command line: [Agent Control CLI](./workflows/agent-control-cli.md)
- use remote coding from the current worktree without manually rebuilding context: [Remote Coding](./workflows/hapi.md)
- see notifications and agent prompts without switching windows: [Dynamic Island](./guides/dynamic-island.md)
- make one-click startup flows for a repository: [Workspace Workflows](./workflows/workspace-workflows.md)

## Guides

Use the guides section when you want to understand a surface in the app:

- [Getting Started](./guides/getting-started.md)
- [Command Palette & Quick Commands](./guides/command-palette-and-quick-commands.md)
- [Presets and Reusable Launchers](./guides/presets-and-reusable-launchers.md)
- [Overview & Canvas](./guides/overview-and-canvas.md)
- [Dynamic Island](./guides/dynamic-island.md)
- [Diff & Review](./guides/diff-and-review.md)
- [Lifecycle Hooks](./guides/lifecycle-hooks.md)
- [Hidden Features](./guides/hidden-features.md)

## Workflows

Use the workflows section when you want to shape your daily operating model:

- [Worktrees & Sessions](./workflows/worktrees-and-sessions.md)
- [Remote Sessions & SSH](./workflows/remote-sessions-and-ssh.md)
- [Agents](./workflows/agents-and-hapi.md)
- [Remote Coding](./workflows/hapi.md)
- [Workspace Workflows](./workflows/workspace-workflows.md)

## What makes Liney different

Most terminal tools give you shells.

Liney gives you:

- repository-aware workspace structure
- visible worktree state
- pane and tab context that stays attached to the right checkout
- workflows, remote targets, and agent presets that stay attached to the repository
- a faster way to re-enter active work without rebuilding context

## Who this is for

Liney is best suited for developers who:

- juggle multiple branches or worktrees
- keep several terminal tasks alive at once
- switch often between coding, review, testing, and debugging
- want native app behavior instead of a browser shell

## A good upgrade path

You do not need to adopt every feature at once.

A practical path is:

1. add one repository
2. open one local session
3. split active work into worktrees
4. save one SSH target or one agent preset you reuse often
5. turn your daily startup path into a workflow
