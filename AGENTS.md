# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **The image runs as root** (it declares no `USER`), so mounted volumes need no ownership fixup and there is no `chown` oneshot. If you ever switch to a non-root user you must add one — copyparty degrades quietly rather than failing, writing salts and filekeys to the ephemeral overlay so they reset on every restart.
- **copyparty logs its full volume and permission table at startup.** That is the fastest way to confirm the generated config parsed as intended, and the first thing to read after changing the renderer.
