---
title: Agents
---

# Agents

![Diagram showing how a preferred agent preset can be reused in local sessions, workflows, HAPI, and remote targets](/img/docs/agent-launch-flow.svg)

Liney can launch agent-backed terminal sessions directly inside the active workspace, so AI tools stay attached to the same repository and worktree context as the rest of your terminal flow.

## Agent presets

An agent preset is a reusable launch definition stored in app settings.

Each preset can include:

- a display name
- launch path
- arguments
- environment variables
- an optional working directory override

Built-in presets currently include:

- Claude Code
- Codex
- OpenCode
- Cursor Agent
- Gemini CLI

These presets are not bundled tools. They are reusable launch recipes for CLIs you already have installed.

## Agent sessions

An agent session in Liney is a terminal-backed session created from a reusable command definition.

This is useful for tools like Codex or other AI CLIs that you run repeatedly in the same kind of repository context.

## Where the preferred preset shows up

Your preferred agent preset becomes the default choice in several places:

- new agent session creation
- workspace workflows that launch an agent pane
- remote targets that bind a remote agent tool

That means one good preset can shape most of your day-to-day launch flow.

## Why this is useful

Without Liney, launching an agent tool usually means:

- opening another terminal window
- making sure you are in the right directory
- remembering the right command variant

With Liney, the agent session is attached to the workspace and worktree that already own the task.

## Practical setup patterns

- **One default preset per machine**: choose the CLI you use most and let Liney surface it first.
- **Custom repo environment**: add environment variables or a working-directory override when one tool needs special context.
- **Workflow-assisted launch**: let a workspace workflow open the shell and the agent side by side instead of doing it manually every morning.
- **Remote execution with the same tool identity**: attach an agent preset to a remote target when the work should happen on another machine.

## Related reading

- [Presets and Reusable Launchers](../guides/presets-and-reusable-launchers.md)
- [Remote Coding](./hapi.md)
- [Workspace Workflows](./workspace-workflows.md)
