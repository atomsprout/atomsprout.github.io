---
title: Remote Sessions and SSH
---

# Remote Sessions and SSH

![Diagram showing how SSH presets and saved remote targets combine into a reusable remote launch flow](/img/docs/ssh-launch-flow.svg)

Liney can open remote sessions directly from a workspace, so remote shells stay connected to the same repository context as your local work.

## What is reusable in this flow

There are two different reusable layers in remote launch:

- **SSH preset**: a reusable template for SSH connection fields
- **Saved remote target**: a workspace-specific named host that can also remember SSH and agent preset links

This split matters because sometimes you want a quick prefilled login template, and sometimes you want a named machine that belongs to one repository.

## What a remote session includes

When you create an SSH session in Liney, you can define:

- host
- user
- port
- identity file
- remote working directory
- optional remote command

You can also save the connection as a reusable remote target directly from the SSH sheet.

Saved targets show up again in future SSH sheets, in the sidebar menu, and in the command palette.

## The practical value

The point is simple:

- fill in host, user, port, identity file, and working directory ahead of time
- reopen that setup later without typing everything again
- when the server asks for a password, you only need to enter the password

This is the fastest path when you repeatedly connect to the same environment.

## How presets and targets combine

The usual flow is:

1. open **New SSH Session**
2. pick an SSH preset if you want to preload common connection fields
3. pick a saved target if you want to preload a known host for this workspace
4. adjust fields if needed
5. optionally save the result back as a reusable target

If an SSH preset does not define a remote working directory, Liney falls back to the active worktree path for the workspace when it preloads the sheet.

## Why remote targets matter

The useful part is not only "open SSH."

The useful part is that the remote target becomes part of the workspace model:

- each repository can keep its own remote destinations
- the active local worktree still provides context
- remote sessions can be reopened without rebuilding the same command line every time

This is the level to use when the question is "which machine belongs to this repo?"

## Remote repository browser

Liney also has a lightweight repository-browser mode for remote targets.

That mode opens a remote session and starts with a practical overview:

- `pwd`
- `ls -la`
- `git status --short --branch`

Then it drops you into your login shell.

This is a good fit when you want a quick state check before doing deeper work.

## Remote file tree

The right-hand file tree follows whichever pane is focused. When you focus an SSH
session, the tree lists the **remote host** over SFTP — not your local disk — so
you can browse the remote project right next to the terminal. This works even
when the SSH session was opened inside an ordinary local workspace.

A few things to know:

- The tree roots on the remote working directory. If the remote shell reports its
  current directory (shell integration / OSC 7), the tree also re-roots when you
  `cd` in the terminal. Otherwise it starts at the configured remote working
  directory, falling back to the remote login directory.
- Right-click a remote entry to `cd` there or copy its path; dragging a remote
  entry onto the terminal inserts its path. Local-only actions (reveal in Finder,
  open with the default app, preview) are hidden for remote entries.
- Focus a local pane again and the tree switches back to your local files.

## Remote agent sessions

If a remote target is paired with an agent preset, Liney can launch the agent remotely too.

That lets you keep the same idea of:

- repository context
- working directory
- reusable tool launch

even when the session is not local.

## Recommended patterns

- **One machine you visit often**: save the SSH fields once so you do not keep retyping host, user, port, and key path.
- **Several similar servers**: keep SSH presets for repeated connection parameters, then apply them to whichever saved target belongs to the repo you are working on.
- **Remote AI helper**: bind an agent preset to the target so remote agent launch does not need to be rebuilt by hand.

## Recommended use cases

- connecting to a Linux host that runs the actual app or jobs
- opening a remote shell in the same repo-specific flow as your local work
- reusing one known-good SSH target instead of rebuilding connection fields every time
- launching a remote agent in a prepared working directory

## Related reading

- [Presets and Reusable Launchers](../guides/presets-and-reusable-launchers.md)
- [Agents](./agents-and-hapi.md)
- [Remote Coding](./hapi.md)
