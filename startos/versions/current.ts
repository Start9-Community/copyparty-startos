import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.20.20:1',
  releaseNotes: {
    en_US:
      'Fixes Web UI login through the StartOS reverse proxy and clarifies when the admin username is required.',
    es_ES:
      'Corrige el inicio de sesión en la interfaz web a través del proxy inverso de StartOS y aclara cuándo se necesita el nombre de usuario administrador.',
    de_DE:
      'Behebt die Anmeldung an der Weboberfläche über den StartOS-Reverse-Proxy und erklärt, wann der Administrator-Benutzername benötigt wird.',
    pl_PL:
      'Naprawia logowanie do interfejsu webowego przez reverse proxy StartOS i wyjaśnia, kiedy wymagana jest nazwa użytkownika administratora.',
    fr_FR:
      'Corrige la connexion à l’interface web via le proxy inverse StartOS et précise quand le nom d’utilisateur administrateur est nécessaire.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
