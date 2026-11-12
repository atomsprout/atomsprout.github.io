---
title: Workspace Workflows
---

# Workspace Workflows

Liney workflows are reusable playbooks for a repository.

They let you turn a repeated startup sequence into one command.

## What a workflow can do

A workspace workflow can chain together several actions:

- choose how to prepare the local shell
- run the workspace setup script
- run the workspace run script
- launch an agent preset

For local shell behavior, workflows support modes like:

- reuse the focused session
- create a new session
- split right
- split down

Agent launch has similar modes, plus the option to skip agent launch entirely.

## Why workflows matter

Many repositories have the same startup ceremony every day:

- open the repo
- run setup
- start the app
- launch an AI tool or helper shell

Doing that manually every time is slow and inconsistent.

Workflows make it explicit and repeatable.

## How workflows relate to presets

Workflows sit above presets rather than replacing them.

The workflow decides **when** to open a shell, run scripts, and launch an agent pane.

The preset still decides **what command** the agent pane should run.

If you want to understand the reusable building blocks first, read [Presets and Reusable Launchers](../guides/presets-and-reusable-launchers.md).

## Preferred workflow

Each workspace can have a preferred workflow.

That matters because the preferred workflow is promoted in the command palette and overview, making the most common startup path one action away.

## Good examples

- **Daily dev**: reuse focused shell, run setup, run app script
- **Bug hunt**: split down, run setup, open logs in one pane
- **Agent assist**: create local shell, then open Codex in a split
- **Release prep**: run setup, run checks, keep the terminal layout consistent

## Recommended approach

Start with one workflow per repository that matches the path you take most often.

Do not model every edge case at first. One strong default workflow is already enough to remove a lot of friction.
