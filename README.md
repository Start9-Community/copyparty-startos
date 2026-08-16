<p align="center">
  <img src="icon.svg" alt="copyparty Logo" width="21%">
</p>

# copyparty on StartOS

> Everything not listed in this document should behave the same as upstream
> copyparty. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

copyparty is a self-hosted file server with a browser UI, resumable chunked uploads, a media indexer, thumbnails, and WebDAV — all from a single process. Upstream: <https://github.com/9001/copyparty>.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One prebuilt upstream image, run in a single subcontainer named `copyparty-sub`. The package launches the image's own entrypoint via `sdk.useEntrypoint()`, which applies the baked bootstrap config (`chdir: /w`, `no-crt`) and then includes every `*.conf` file in `/cfg`.

| | |
| --- | --- |
| Image id | `copyparty` |
| Upstream image | `copyparty/ac` |
| Architectures | `x86_64`, `aarch64` |
| Subcontainer | `copyparty-sub` |
| Runs as | root (the image declares no `USER`) |

The `ac` edition is upstream's recommended general-purpose build; it bundles FFmpeg, Pillow and Mutagen, which is what makes media thumbnails, audio transcoding and tag indexing work. Because the container runs as root, mounted volumes need no ownership fixup and there is no `chown` oneshot.

No StartOS-managed environment variables are set. Everything is driven by the generated config file.

## Volume and Data Layout

Two volumes, deliberately split so the user's files stay separate from server state.

| Volume | Mount | Contents |
| --- | --- | --- |
| `data` | `/w` | The user's files — the single tree copyparty serves |
| `config` | `/cfg` | Generated config, password/filekey salts, sessions, and the search index |

`/cfg` is also `XDG_CONFIG_HOME` in the image, so copyparty's runtime state lands under `/cfg/copyparty/`. The config sets `hist: /cfg/hists/`, which moves the per-volume index and thumbnail cache off the data volume; without it copyparty creates a `.hist` directory at the root of `/w`, in among the user's files.

## File Models

One model, `startos/fileModels/copyparty.conf.ts`, bound to `/cfg/00-startos.conf`.

copyparty's config is a bespoke indented format — not YAML, despite the modeline upstream puts in its examples — so the model is a `FileHelper.raw` with an explicit renderer and parser. It exposes exactly two fields, `adminPassword` and `publicRead`; everything else in the rendered file is fixed.

The `00-` prefix is load-bearing. The image's bootstrap ends in `% /cfg`, which includes every `*.conf` in that directory in alphabetical order, so a user can drop a `99-custom.conf` beside this one to add settings the package does not expose, and it will not be overwritten.

## Dependencies

None.

## Network Access and Interfaces

A single HTTP interface. copyparty serves its web UI and WebDAV on the same port, so both reach the user over the one address StartOS assigns.

| Interface | Type | Port |
| --- | --- | --- |
| `ui` | ui | 3923 |

The config sets `http-only`. TLS termination is StartOS's job, and leaving it on would make copyparty generate and serve its own self-signed certificate.

## Installation and First-Run Flow

On install the package seeds `/cfg/00-startos.conf` with no account defined, then raises a critical task to set the admin password. Because the task is critical, the service cannot start until it is done, and an unconfigured copyparty is fail-closed in any case: with a config file present but no accounts, nobody — including anonymous visitors — has any permission.

Running **Set Admin Password** generates the credential, writes it into the config, and clears the task. `main.ts` reads the config with `.const(effects)`, so later changes to the password or the public-access toggle restart the service automatically and take effect without user intervention.

## Actions

Two, matching the two decisions a user actually has to make.

| Action | When to run | Effect |
| --- | --- | --- |
| `set-admin-password` | At install, or to rotate the credential | Generates a new random password and writes it to the config. Repeat-safe; the previous password stops working immediately. |
| `set-public-access` | Any time | Toggles anonymous read. Cheap, repeat-safe, and reversible. |

`set-public-access` maps one boolean onto copyparty's per-volume ACL model: off leaves only `A: admin`, on adds `r: *`. copyparty has no global public switch, so this mapping is the package's own.

## Tasks

| Task | Severity | Raised when |
| --- | --- | --- |
| `set-admin-password` | critical | The config has no admin password |

## Health Checks

The `primary` daemon's `ready` check requests `GET /` and expects 200.

That path is chosen deliberately. copyparty answers `/` with a login splash at 200 whether or not the caller is authenticated and whether or not public access is on, but returns 500 when its docker failsafe has tripped — so the check distinguishes "serving" from "started but refusing to serve". `/?h` and `/?hc` bypass that failsafe and would report healthy on a broken config. Deeper paths return 401 or 403 to unauthenticated callers and are not usable as health checks.

## Backups and Restore

Both volumes are backed up by direct volume sync. There is no database to dump — copyparty's state is plain files.

`config` is backed up with `hists/*/th` excluded: that subtree is the thumbnail cache and is regenerated on demand. The search index under `hists/` **is** included, because rebuilding it means a full rescan of the data volume.

Two files in `/cfg/copyparty/` matter more than their size suggests: `ah-salt.txt` and `fk-salt.txt`. Losing the first invalidates every hashed password; losing the second breaks every previously shared file link. Both are inside the backup set.

## Limitations and Differences

- **Only the web UI and WebDAV are exposed.** copyparty can also speak FTP, SFTP, TFTP and SMB. All are off. FTP needs a passive port range and NAT-aware configuration, SMB requires a dependency absent from every published image and is described by upstream as unsafe, and TFTP wants a privileged UDP port.
- **Zeroconf (mDNS/SSDP) is off** — it depends on LAN multicast, which does not usefully cross the StartOS container bridge.
- **The upstream version check is not enabled.** StartOS owns updates.
- **User management is config-only.** The package provisions a single `admin` account. copyparty has no in-app user administration, so additional accounts mean adding a `99-custom.conf`.
- **Password hashing is not enabled.** The admin password is stored in the config file on the service's own encrypted volume. Upstream's argon2 defaults cost roughly 256 MiB of RAM per login attempt, which is a poor trade on small hardware for a credential StartOS generates and stores anyway.

## Troubleshooting

**The web UI returns a 500 and the health check fails.** copyparty found no `.conf` file in `/cfg` and tripped its failsafe, which denies all access rather than defaulting to open. Re-running `set-admin-password` rewrites the config.

**Uploads fail while browsing works.** copyparty strips write access from volumes it believes are not backed by real storage, logging `write-access was removed`. This should not happen with a normal StartOS volume; if it does, the data volume did not mount.

**A hand-written `99-custom.conf` had no effect.** Inline comments need two spaces before the `#`, and an account with no matching entry in an `accs:` block has guest-level access. Both are logged at startup — check the service logs.

To inspect the running container: `start-cli package attach copyparty -n copyparty-sub -- <cmd>`.

## Contributing

Build and development workflow follow the StartOS packaging guide: <https://docs.start9.com/packaging>. Keep `README.md`, `instructions.md`, and `AGENTS.md` in sync with any change to user-visible behavior or package structure.

---

## Quick Reference for AI Consumers

```yaml
package_id: copyparty
image: copyparty/ac
architectures: [x86_64, aarch64]
subcontainers: [copyparty-sub]
volumes:
  data: /w
  config: /cfg
file_models:
  - /cfg/00-startos.conf
startos_managed_env_vars: []
dependencies: none
interfaces:
  ui: { type: ui, port: 3923 }
actions:
  - set-admin-password
  - set-public-access
tasks:
  - { action: set-admin-password, severity: critical }
health_checks:
  - primary
```
