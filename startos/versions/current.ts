import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.20.20:2',
  releaseNotes: {
    en_US: `Fixes Web UI login through the StartOS reverse proxy and clarifies when the admin username is required.

- Set Admin Password asks for confirmation before it replaces an existing password.`,
    es_ES: `Corrige el inicio de sesión en la interfaz web a través del proxy inverso de StartOS y aclara cuándo se necesita el nombre de usuario administrador.

- Establecer contraseña de administrador pide confirmación antes de reemplazar una contraseña existente.`,
    de_DE: `Behebt die Anmeldung an der Weboberfläche über den StartOS-Reverse-Proxy und erklärt, wann der Administrator-Benutzername benötigt wird.

- „Administrator-Passwort festlegen“ fragt vor dem Ersetzen eines vorhandenen Passworts nach einer Bestätigung.`,
    pl_PL: `Naprawia logowanie do interfejsu webowego przez reverse proxy StartOS i wyjaśnia, kiedy wymagana jest nazwa użytkownika administratora.

- „Ustaw hasło administratora” prosi o potwierdzenie przed zastąpieniem istniejącego hasła.`,
    fr_FR: `Corrige la connexion à l’interface web via le proxy inverse StartOS et précise quand le nom d’utilisateur administrateur est nécessaire.

- Définir le mot de passe administrateur demande une confirmation avant de remplacer un mot de passe existant.`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
