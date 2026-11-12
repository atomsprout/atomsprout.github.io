---
title: Lifecycle Hooks
---

# Lifecycle Hooks

Run a command of your choice when the app starts, when it quits, and every time a terminal session begins or ends. Hooks are Liney's built-in answer to "I always do _X_ at the start of a session" or "clean up _Y_ when I close the app."

No external tool is required — Liney reads a single JSON file and dispatches commands itself.

## Hook points

| Name                | Fires                                              |
| ------------------- | -------------------------------------------------- |
| `app.on_launch`     | Once after Liney finishes launching                |
| `app.on_quit`       | Once when Liney is quitting (best effort, 2s)      |
| `session.on_start`  | Each time a terminal session starts                |
| `session.on_exit`   | Each time a terminal session's process exits       |

## Turning hooks on

1. Open **Settings → App → Hooks**.
2. Toggle **Enable lifecycle hooks** on.
3. Click **Open hooks.json**. Liney creates a starter file at `~/.liney/hooks.json` with disabled examples and opens it in your default editor.

The toggle is off by default because the file lets you run arbitrary commands.

## The configuration file

```json
{
  "version": 1,
  "hooks": {
    "app.on_launch": [
      { "enabled": true, "sync": false, "command": "echo \"liney up\" >> ~/.liney/hook.log" }
    ],
    "app.on_quit": [],
    "session.on_start": [
      { "enabled": true, "sync": false, "command": "claude --resume || true" },
      { "enabled": true, "sync": true, "command": "load-project-env", "timeoutSeconds": 5 },
      { "enabled": true, "sync": false, "script": "hooks/on-session-start.sh" }
    ],
    "session.on_exit": []
  }
}
```

Per-command fields:

| Field            | Default                   | Meaning                                                                         |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------- |
| `enabled`        | `true`                    | Skip without removing.                                                          |
| `sync`           | `false`                   | If `true`, the caller blocks until the command finishes.                        |
| `command`        | —                         | Inline shell, passed to `/bin/sh -c`. Mutually exclusive with `script`.         |
| `script`         | —                         | Path to a shell script file. Wins over `command` if both are set.               |
| `timeoutSeconds` | `5` (sync) / `30` (async) | Per-command kill switch. Override when you know what you need.                  |

Each hook holds an array, so you can stack multiple commands per point. They run in declaration order — sync ones inline, async ones on a background queue.

### Inline command vs external script

Use `command` for one-liners. Use `script` when the work is multi-line or you want a real file (proper editor, syntax highlighting, version control, shebang lines).

`script` path resolution:

| Form                          | Resolved as                              |
| ----------------------------- | ---------------------------------------- |
| `/abs/path/to/foo.sh`         | Used as-is                               |
| `~/scripts/foo.sh`            | Tilde expanded against `$HOME`           |
| `hooks/foo.sh` (any relative) | Resolved under `~/.liney/`               |

How Liney launches it:

- **Executable file** (`chmod +x`): runs directly, the shebang picks the interpreter (`#!/usr/bin/env bash`, `#!/usr/bin/env python3`, etc.).
- **Non-executable file**: runs via `/bin/sh <path>` so plain `.sh` files just work without chmod.

Default scripts directory: `~/.liney/hooks/`. **Settings → Hooks → Reveal in Finder** opens it (and creates it on first click).

Example `~/.liney/hooks/on-session-start.sh`:

```sh
#!/bin/sh
set -e

if [ "$LINEY_SESSION_BACKEND" = "localShell" ]; then
  echo "started at $(date) in $LINEY_SESSION_CWD" >> ~/liney-sessions.log
fi
```

## Sync vs async

| Mode             | Use it when                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| async (default)  | The side effect doesn't gate anything — logging, notifications, kicking off background work.             |
| sync             | The outcome must be visible before downstream work proceeds — env injection, resource locks, migrations. |

Sync hooks block the caller. For `session.on_start` that delays the terminal becoming ready; for `app.on_launch` it delays the UI. Use it intentionally, not as a default.

## What runs and how

Each command is invoked as `/bin/sh -c "<your command>"`. Pipes, `&&`, redirects, environment substitution — everything you'd write in `~/.zshrc` works the same way.

| Hook              | Sync command          | Async command          |
| ----------------- | --------------------- | ---------------------- |
| `app.on_launch`   | Blocks launch flow    | Runs in background     |
| `session.on_start`| Blocks until done     | Runs in background     |
| `session.on_exit` | Blocks until done     | Runs in background     |
| `app.on_quit`     | Blocks until done     | **Forced sync**        |

`app.on_quit` runs every command synchronously against a shared **2 second total budget** — async commands started during quit would die with the app anyway. Each command also has its own timeout; whichever fires first wins.

## Variables passed to your hook

Liney exports these as environment variables before running the command:

| Variable                  | Available on        | Description                                          |
| ------------------------- | ------------------- | ---------------------------------------------------- |
| `LINEY_HOOK`              | All                 | Name of the hook (e.g. `session.on_start`)           |
| `LINEY_APP_VERSION`       | All                 | Liney version string                                 |
| `LINEY_SESSION_ID`        | Session hooks       | Session UUID                                         |
| `LINEY_SESSION_CWD`       | Session hooks       | Session working directory                            |
| `LINEY_SESSION_SHELL`     | Session hooks       | Launch path (shell, SSH binary, agent binary, etc.)  |
| `LINEY_SESSION_BACKEND`   | Session hooks       | `localShell`, `ssh`, `agent`, or `tmuxAttach`        |
| `LINEY_SESSION_EXIT_CODE` | `session.on_exit`   | Process exit code, when Liney captured one           |

## Activity log

Every hook invocation is appended to `~/.liney/hook.log` with timing breakdown:

```
2026-05-01T20:42:17.345Z hook config: loaded 3 commands in 1ms
2026-05-01T20:42:17.346Z hook session.on_start [async]: spawn=2ms total=14ms exit=0 cmd="echo hi"
2026-05-01T20:42:18.001Z hook session.on_start [sync]: spawn=3ms total=42ms exit=0 cmd="load-project-env"
2026-05-01T20:42:30.500Z hook app.on_quit [blocking]: spawn=2ms total=512ms exit=0 cmd="rsync ..."
```

- **mode**: `sync`, `async`, or `blocking` (`app.on_quit` only).
- **spawn**: time from `Process.run()` to the child running. Useful when fork is slow.
- **total**: wall-clock time from invocation to completion.
- **exit**: process exit code. Non-zero and timeouts also include the first 400 bytes of stderr/stdout.

The `hook config: loaded ...` line fires only when the runner actually re-reads `hooks.json` (first use and whenever the file's mtime changes). Cache hits are silent.

The log is capped at 256 KB. Open it from **Settings → Hooks → Open hook.log**, or `tail -f ~/.liney/hook.log`.

## Recipes

### Auto-resume Claude Code in every new session

```json
"session.on_start": [
  { "enabled": true, "command": "claude --resume || true" }
]
```

### Show a macOS notification when a session ends

```json
"session.on_exit": [
  { "enabled": true, "command": "osascript -e 'display notification \"Session exited\" with title \"Liney\"'" }
]
```

### Start a background tunnel on launch and tear it down on quit

```json
"app.on_launch": [
  { "enabled": true, "command": "launchctl load ~/Library/LaunchAgents/dev.local.tunnel.plist 2>/dev/null || true" }
],
"app.on_quit": [
  { "enabled": true, "command": "launchctl unload ~/Library/LaunchAgents/dev.local.tunnel.plist 2>/dev/null || true" }
]
```

### Per-session journal

```json
"session.on_start": [
  { "enabled": true, "command": "echo \"[$LINEY_SESSION_ID] $(date) start cwd=$LINEY_SESSION_CWD\" >> ~/liney-sessions.log" }
],
"session.on_exit": [
  { "enabled": true, "command": "echo \"[$LINEY_SESSION_ID] $(date) exit code=$LINEY_SESSION_EXIT_CODE\" >> ~/liney-sessions.log" }
]
```

## Tips

- **Use `|| true`** when you don't care whether a command succeeds. Otherwise non-zero exits clutter `hook.log`.
- **Liney inherits the GUI process environment**, which is leaner than a login shell. If a command works in your terminal but not from Liney, run it through `bash -lc '...'` to get your shell rc loaded.
- **Disable hooks before troubleshooting.** Toggling **Enable lifecycle hooks** off makes the file inert without deleting your work.
- Treat `hooks.json` as a sensitive file. Anything you put there will run as your user.
