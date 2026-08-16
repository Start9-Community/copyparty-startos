# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `copyparty`.** One `ui` interface on the `main` host, port 3923, serving both the web UI and WebDAV.
- **The image runs as root** (no `USER` in the image), so mounted volumes need no ownership fixup and there is no `chown` oneshot. If you ever switch to a non-root user you must add one — copyparty degrades quietly rather than failing, writing salts and filekeys to the ephemeral overlay so they reset on every restart.
- **`/cfg/00-startos.conf` is generated, not authored.** The image's bootstrap ends in `% /cfg`, which includes every `*.conf` in that directory alphabetically. The `00-` prefix reserves ordering for the package and leaves later filenames to the user. Never write to a filename a user might also pick.
- **The config format is not YAML.** Upstream's examples carry a `# -*- mode: yaml -*-` modeline purely for editor highlighting. The parser strips every line, so indentation is cosmetic, and an inline comment needs *two* spaces before the `#`. `startos/fileModels/copyparty.conf.ts` renders and re-parses this format by hand.
- **`main.ts` reads the config with `.const(effects)`** so that changing the admin password or the public-access toggle restarts the daemon and takes effect immediately. Dropping that read would leave both actions inert until a manual restart.

## Inspecting a running install

To run a command inside the service's container, use `start-cli package attach copyparty -n copyparty-sub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `copyparty-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".

copyparty logs its full volume/permission table at startup — that is the fastest way to confirm the generated config parsed as intended.
