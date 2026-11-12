---
title: Agent Control CLI
---

# Agent Control CLI

Liney ships a small `liney` command-line interface that talks to the running
app over a local socket. It turns Liney from a place where you *watch* agents
into a place where agents can *drive* each other: an AI coding agent in one pane
can discover its siblings, read their output, and hand them work — without you
tab-flipping between windows.

This is the surface that makes a Liney workspace self-driving.

## Installing the `liney` command

The Liney app binary is itself the CLI. Expose it on your `PATH`:

```bash
sudo ln -sf /Applications/Liney.app/Contents/MacOS/Liney /usr/local/bin/liney
```

After that, `liney ...` works from any shell, and especially from inside a
Liney pane (where Liney injects the context the commands need).

## The commands

| Command | What it does | Needs a token? |
|---|---|---|
| `liney session list` | Every pane across all workspaces: cwd, branch, listening ports, status | No |
| `liney agents` | Only panes that host a detected or self-reported agent | No |
| `liney read --pane <id>` | The rendered terminal text of a pane | No |
| `liney status <state>` | Report *your own* agent state (running/waiting/done/error) | No |
| `liney notify` | Send a notification to the dynamic island | No |
| `liney send-keys <id> <text>` | Type text / keys into a pane | Yes |
| `liney open <repo>` | Open a repository or switch worktree | Yes |
| `liney split` | Split a pane | Yes |

The read-only and self-report commands need no token — the control socket is
already owner-only. The commands that *change* the workspace (`send-keys`,
`open`, `split`) require a trust token, and Liney injects it into every pane as
`LINEY_CONTROL_TOKEN` once you enable **Settings → URL Scheme**, so an agent
running in a pane needs no manual setup.

## Reporting status (the attention signal)

When an agent in a pane needs you — or finishes — it can say so:

```bash
liney status waiting --title "Approve running the migration?"
liney status done
liney status error --title "build failed"
```

A `waiting`, `done`, or `error` report surfaces on the [Dynamic
Island](../guides/dynamic-island.md) so you can see *which* agent is blocked at a
glance, instead of checking each pane. The state also shows up in
`liney session list` and `liney agents`.

## Reading and coordinating siblings

From one agent's pane, find the others and read what they are doing:

```bash
# Which panes host an agent, and what state are they in?
liney agents --json

# Read a sibling pane's last 80 lines; wait until its TUI stops painting
liney read --pane <uuid> --last 80 --wait-stable --json | jq -r '.text'

# Hand it a command
liney send-keys <uuid> 'npm test\n'
```

`liney agents` combines two signals: passive detection from each pane's process
tree (so an agent that never reports status still appears, marked
`reported: false`) and the authoritative `liney status` self-reports
(`reported: true`). `liney read` pulls text straight from the terminal buffer;
add `--scrollback` to include history, or `--wait-stable` to avoid catching a
half-rendered frame.

## Teaching an agent to use it

The repository ships a `liney-cli` skill (`skills/liney-cli/SKILL.md`) that
packages the inspect → read → send loop, so a coding agent like Claude Code
knows *when* and *how* to drive Liney. Install it into your agent and it will
reach for `liney` on its own when you ask things like "check what the agent in
my other split is doing" or "tell the build pane to rerun the tests."

## See also

- [Agents](./agents-and-hapi.md) — launching agent-backed sessions
- [Dynamic Island](../guides/dynamic-island.md) — where status and notifications surface
- [Worktrees & Sessions](./worktrees-and-sessions.md) — the worktree model agents run in
