import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.20.20:2',
  releaseNotes: {
    en_US: `- Set Admin Password asks for confirmation before it replaces an existing password.`,
    es_ES: `- Establecer contraseña de administrador pide confirmación antes de reemplazar una contraseña existente.`,
    de_DE: `- „Administrator-Passwort festlegen“ fragt vor dem Ersetzen eines vorhandenen Passworts nach einer Bestätigung.`,
    pl_PL: `- „Ustaw hasło administratora” prosi o potwierdzenie przed zastąpieniem istniejącego hasła.`,
    fr_FR: `- Définir le mot de passe administrateur demande une confirmation avant de remplacer un mot de passe existant.`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
