---
title: Dynamic Island
---

# Dynamic Island

Dynamic Island is a floating notification and control panel that lives at the top of your screen, near the macOS notch area.

It gives you a persistent view of what is happening across workspaces without switching windows or checking the sidebar.

## Why it exists

When you have several workspaces running agents, builds, or long tasks, important events get buried. System notifications disappear. Toast messages are easy to miss.

Dynamic Island solves this by putting a small, always-visible bar at the top of the screen. It shows what just happened, what needs attention, and lets you jump to the right workspace in one click.

## How to enable it

Open **Settings** and turn on **Dynamic Island**.

Once enabled, a small bar appears at the top center of your screen. It stays visible across all spaces and full-screen apps.

## The collapsed bar

The default state is a compact bar that shows:

- the most recent notification with a status icon
- a badge count when multiple notifications are active

The bar auto-sizes to fit the content. When there is nothing to show, it stays minimal.

After a new notification arrives, the bar auto-collapses back to idle after 8 seconds if you do not interact with it.

## The expanded panel

Click or hover over the bar to expand it into a full panel with two tabs.

### Workspaces tab

Shows all your workspaces organized by group:

- workspace groups with folder-style navigation
- individual workspaces with status indicators (running, done, error, waiting for input)
- click any workspace to jump directly to it

This is useful when you want a quick bird's-eye view without opening the sidebar.

### Notifications tab

Lists all active notifications with:

- status icons (running, done, error, waiting for input)
- agent or terminal source tags
- elapsed time since the event
- click-to-navigate to the workspace that triggered the notification

A **Clear All** button at the top lets you dismiss everything at once.

## Interactive prompts

When an agent needs your input, the Dynamic Island shows the prompt inline with quick-select options.

You can respond using keyboard shortcuts (**Command 1**, **Command 2**, etc.) without navigating away from what you are doing.

This means agent prompts do not interrupt your flow. You see them, respond, and stay in the current context.

## Interaction model

- **Click** the collapsed bar to expand the panel
- **Hover** over the bar to expand (with a short delay)
- **Move the mouse away** to collapse (with a short delay)
- **Click** a notification or workspace row to navigate directly to it
- **Command 1 through Command 5** to respond to agent prompts

## When to use it

Dynamic Island works best when you:

- run multiple agents or long builds across workspaces
- want to notice errors or completion without polling each workspace
- prefer a lightweight status indicator over full system notifications
- want to respond to agent prompts quickly from anywhere

## Settings

Two settings control Dynamic Island behavior:

- **Dynamic Island** — enables or disables the feature
- **Keep panel visible when idle** — when on, the collapsed bar stays visible even with no active notifications

Both are in the Settings panel.
