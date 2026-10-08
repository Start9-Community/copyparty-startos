import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.20.25:0',
  releaseNotes: {
    en_US: `Updated copyparty to 1.20.25.

- Security: a fix for folder-key access to subfolders, and filekeys and dirkeys are now verified in constant time.
- Faster uploads on iPhones and iPads affected by an iOS upload bug.
- New \`--redup\` option to convert existing files between deduplication methods.
- Repeated failed logins are banned more aggressively.
- Fix: with deduplication enabled, copying a file between volumes no longer creates a link instead of a full copy.
- Set Admin Password asks for confirmation before it replaces an existing password.

Full release notes: https://github.com/9001/copyparty/releases`,
    es_ES: `Actualiza copyparty a 1.20.25.

- Seguridad: corrección del acceso a subcarpetas con claves de carpeta, y las claves de archivo y de carpeta ahora se verifican en tiempo constante.
- Subidas más rápidas en iPhone y iPad afectados por un error de subida de iOS.
- Nueva opción \`--redup\` para convertir archivos existentes entre métodos de deduplicación.
- Los inicios de sesión fallidos repetidos se bloquean de forma más estricta.
- Corrección: con la deduplicación activada, copiar un archivo entre volúmenes ya no crea un enlace en lugar de una copia completa.
- Establecer contraseña de administrador pide confirmación antes de reemplazar una contraseña existente.

Notas de la versión completas: https://github.com/9001/copyparty/releases`,
    de_DE: `Aktualisiert copyparty auf 1.20.25.

- Sicherheit: Korrektur beim Zugriff auf Unterordner per Ordnerschlüssel; Datei- und Ordnerschlüssel werden jetzt in konstanter Zeit geprüft.
- Schnellere Uploads auf iPhones und iPads, die von einem iOS-Upload-Fehler betroffen sind.
- Neue Option \`--redup\`, um vorhandene Dateien zwischen Deduplizierungsverfahren umzuwandeln.
- Wiederholte fehlgeschlagene Anmeldungen werden konsequenter gesperrt.
- Fehlerbehebung: Bei aktivierter Deduplizierung erzeugt das Kopieren einer Datei zwischen Volumes keinen Link mehr statt einer vollständigen Kopie.
- „Administrator-Passwort festlegen“ fragt vor dem Ersetzen eines vorhandenen Passworts nach einer Bestätigung.

Vollständige Versionshinweise: https://github.com/9001/copyparty/releases`,
    pl_PL: `Aktualizuje copyparty do 1.20.25.

- Bezpieczeństwo: poprawka dostępu do podfolderów za pomocą kluczy folderów, a klucze plików i folderów są teraz weryfikowane w stałym czasie.
- Szybsze wysyłanie na iPhone'ach i iPadach dotkniętych błędem wysyłania w iOS.
- Nowa opcja \`--redup\` do konwersji istniejących plików między metodami deduplikacji.
- Powtarzające się nieudane logowania są blokowane bardziej rygorystycznie.
- Poprawka: przy włączonej deduplikacji kopiowanie pliku między woluminami nie tworzy już dowiązania zamiast pełnej kopii.
- „Ustaw hasło administratora” prosi o potwierdzenie przed zastąpieniem istniejącego hasła.

Pełne informacje o wydaniu: https://github.com/9001/copyparty/releases`,
    fr_FR: `Met à jour copyparty vers 1.20.25.

- Sécurité : correctif pour l’accès aux sous-dossiers par clé de dossier, et les clés de fichier et de dossier sont désormais vérifiées en temps constant.
- Envois plus rapides sur les iPhone et iPad touchés par un bug d’envoi d’iOS.
- Nouvelle option \`--redup\` pour convertir les fichiers existants d’une méthode de déduplication à une autre.
- Les échecs de connexion répétés sont bannis plus strictement.
- Correctif : avec la déduplication activée, copier un fichier d’un volume à un autre ne crée plus un lien au lieu d’une copie complète.
- Définir le mot de passe administrateur demande une confirmation avant de remplacer un mot de passe existant.

Notes de version complètes : https://github.com/9001/copyparty/releases`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
