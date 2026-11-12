---
title: Presets and Reusable Launchers
---

# Presets and Reusable Launchers

![Diagram showing how agent presets, SSH presets, remote targets, and workflows layer on top of each other](/img/docs/preset-stack.svg)

Liney is much better when you stop treating every shell launch as a one-off action.

The app now has several reusable layers that solve different parts of the problem:

- **Agent preset**: how to launch a local agent CLI
- **SSH preset**: how to prefill an SSH session
- **Remote target**: which machine or environment belongs to a workspace
- **Workspace workflow**: which sequence of local and agent actions should happen together

Use the smallest reusable layer that matches the problem.

## The four reusable layers

### Agent presets

Agent presets are global app settings for tools you launch repeatedly.

Each preset can define:

- display name
- launch path
- arguments
- environment variables
- optional working directory override

Built-in agent presets currently include:

- Claude Code
- Codex
- OpenCode
- Cursor Agent
- Gemini CLI

These presets are launch recipes, not bundled binaries. The corresponding CLI still needs to exist on your machine.

### SSH presets

SSH presets are reusable templates for the New SSH Session sheet.

Each preset can define:

- name
- optional host
- optional user
- optional port
- optional identity file
- optional remote working directory

This is useful when you want to prefill the connection details once, then come back later and only enter the password.

### Remote targets

Remote targets are workspace-specific saved hosts.

They answer questions like:

- which server belongs to this repository
- which SSH destination should I reopen tomorrow
- which remote agent preset should launch on that machine

Remote targets can also point at an SSH preset and an agent preset, so the workspace remembers both the machine and the preferred tool.

### Workspace workflows

Workflows are reusable playbooks for repository startup.

A workflow can combine:

- local shell behavior
- setup script execution
- run script execution
- agent launch mode

Use a workflow when the full startup ceremony matters, not only one command.

## How to decide which layer to use

- use an **agent preset** when you keep typing the same local AI CLI command
- use an **SSH preset** when the same SSH connection fields should be reused
- use a **remote target** when the machine itself is meaningful to the repository
- use a **workflow** when several steps should always launch together

## Recommended setup patterns

### One laptop, several agent CLIs

Keep one preferred agent preset for the tool you use most often, then add secondary presets for specialized cases.

Example:

- Codex for general implementation
- Claude Code for long-form reasoning
- Gemini CLI for provider-specific checks

### One host, several remote entry points

If you keep connecting to the same environment, use an SSH preset or a saved target so the connection fields are already filled in.

Example:

- host and user already filled in
- non-default SSH port already stored
- identity file path already stored
- remote working directory already stored

### One repository, repeatable startup

Use a workflow when the repo always needs the same opening sequence.

Example:

1. select the workspace
2. reuse or create a local shell
3. run setup or run scripts
4. open the preferred agent preset in a split

## Practical rule of thumb

Presets reduce typing.

Targets reduce lookup.

Workflows reduce ceremony.

If you keep repeating all three, Liney can store all three.

## Related reading

- [Remote Sessions and SSH](../workflows/remote-sessions-and-ssh.md)
- [Agents](../workflows/agents-and-hapi.md)
- [Remote Coding](../workflows/hapi.md)
- [Workspace Workflows](../workflows/workspace-workflows.md)
