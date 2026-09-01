export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting copyparty': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'The web interface of copyparty, also serving WebDAV': 5,

  // actions/setAdminPassword.ts
  'Set Admin Password': 6,
  'Generate a new random password for the copyparty admin account. Replaces any existing password.': 7,
  'Admin Password': 8,
  'The Web UI and WebDAV use the same password. Save it now; running this action again replaces it.': 9,
  Password: 11,

  // actions/setPublicAccess.ts
  'Public Access': 12,
  'Choose whether visitors can browse and download your files without signing in': 13,
  'Allow Public Downloads': 14,
  'When enabled, anyone who can reach copyparty may browse and download your files without signing in. Uploading, renaming, and deleting always require the admin password.': 15,

  // init/watchCredentials.ts
  'Set the admin password before signing in to copyparty': 16,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
