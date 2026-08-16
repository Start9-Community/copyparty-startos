export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting copyparty': 0,
  'Public downloads are enabled': 1,
  'Web Interface': 2,
  'The web interface is ready': 3,
  'The web interface is not ready': 4,

  // interfaces.ts
  'Web UI': 5,
  'The web interface of copyparty, also serving WebDAV': 6,

  // actions/setAdminPassword.ts
  'Set Admin Password': 7,
  'Generate a new random password for the copyparty admin account. Replaces any existing password.': 8,
  'Admin Credentials': 9,
  'Use these credentials to sign in to copyparty. Write them down or save them to a password manager.': 10,
  Username: 11,
  Password: 12,

  // actions/setPublicAccess.ts
  'Public Access': 13,
  'Choose whether visitors can browse and download your files without signing in': 14,
  'Allow Public Downloads': 15,
  'When enabled, anyone who can reach copyparty may browse and download your files without signing in. Uploading, renaming, and deleting always require the admin password.': 16,

  // init/watchCredentials.ts
  'Set the admin password before signing in to copyparty': 17,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
