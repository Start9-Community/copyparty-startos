import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.20.25:1',
  releaseNotes: {
    en_US: `New Share Links action: turn on copyparty's share links to hand out password- and expiry-protected links to individual files and folders.`,
    es_ES: `Nueva acción Enlaces compartidos: activa los enlaces compartidos de copyparty para repartir enlaces a archivos y carpetas concretos, protegidos con contraseña y caducidad.`,
    de_DE: `Neue Aktion „Freigabelinks“: Aktiviert die Freigabelinks von copyparty, um Links zu einzelnen Dateien und Ordnern mit Passwort und Ablaufdatum weiterzugeben.`,
    pl_PL: `Nowa akcja Linki udostępniania: włącza linki udostępniania copyparty, aby przekazywać linki do wybranych plików i folderów chronione hasłem i terminem ważności.`,
    fr_FR: `Nouvelle action Liens de partage : active les liens de partage de copyparty pour distribuer des liens vers des fichiers et dossiers précis, protégés par mot de passe et expiration.`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
