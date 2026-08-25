# copyparty

## Documentation

- [copyparty README](https://github.com/9001/copyparty#readme) — the full upstream manual, including every configuration option.
- [Accounts and volumes](https://github.com/9001/copyparty#accounts-and-volumes) — how copyparty's permission model works, if you want to add more users.

## What you get on StartOS

One address, the **Web UI**, serves both the browser interface and WebDAV, so anything that can mount a network drive reaches the same files as your browser does.

Everything you upload lands in one folder on your server, and StartOS backs it up along with copyparty's search index and the salts that keep your password and any links you have shared working after a restore. Because that folder is the backup, it is as large as what you store — plan the drive you back up to accordingly.

Two settings are yours to make: the admin password, and whether visitors can browse and download without signing in. Everything else copyparty can be told to do is configured for you.

## Getting set up

1. StartOS shows a task asking you to set an admin password. copyparty will not start until you do.
2. Run the **Set Admin Password** action. It generates a strong password and shows it to you once. **Copy it into your password manager now.** You can re-run the action later if you lose it, but that replaces the old password.
3. Start copyparty, then open the **Web UI** and sign in. It asks only for the password — there is no username field until you add a second account.

## Using copyparty

### Web interface

Drag files onto the page to upload them. Large uploads show per-chunk progress and survive a closed laptop lid or a dropped connection — reopen the page and they continue.

The magnifying glass searches by name, and also by media tag once copyparty has finished indexing. A first index of a large folder takes a while; it runs in the background and search improves as it goes.

### Connecting as a network drive

copyparty serves WebDAV on the same address as the web interface, so you can mount it as a drive:

- **Windows** — File Explorer, right-click _This PC_ → _Map network drive_, and enter your copyparty address.
- **macOS** — Finder, _Go_ → _Connect to Server_, and enter your copyparty address.
- **Linux** — in most file managers, _Other Locations_ → _Connect to Server_, prefixing the address with `davs://`.

Sign in with `admin` and your admin password.

### Actions

**Set Admin Password** — generates a new random password. Use it the first time, and any time you want to rotate the credential. The old password stops working immediately, and anyone signed in on another device will have to sign in again.

**Public Access** — off by default. Turn it on and anyone who can reach your copyparty address can browse and download your files without signing in. Uploading, renaming, and deleting still require the admin password. Turn it on if you want to hand out links to people; leave it off if this is only for you.

### Adding more accounts

The package sets up one `admin` account, and that is the only one it manages. Adding a second is possible but manual: it means putting another file ending in `.conf` next to the one StartOS writes, in copyparty's config folder on the server, which you reach over SSH rather than from the StartOS interface. Name it so it sorts after `00-startos.conf` — `99-custom.conf`, say — and copyparty loads it alongside. Leave `00-startos.conf` itself alone; StartOS rewrites it. The [upstream accounts documentation](https://github.com/9001/copyparty#accounts-and-volumes) covers the syntax.
