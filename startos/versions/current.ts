import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.20.25:2',
  releaseNotes: {
    en_US: `copyparty now sees each visitor's real address instead of the StartOS proxy's, so rate limits and bans apply to the offending client rather than locking out everyone. The service log also updates live.`,
    es_ES: `copyparty ahora ve la dirección real de cada visitante en lugar de la del proxy de StartOS, de modo que los límites de velocidad y los bloqueos se aplican al cliente responsable en vez de dejar fuera a todos. El registro del servicio también se actualiza en tiempo real.`,
    de_DE: `copyparty sieht jetzt die echte Adresse jedes Besuchers statt der des StartOS-Proxys, sodass Ratenlimits und Sperren den verursachenden Client treffen, statt alle auszusperren. Das Dienstprotokoll wird außerdem live aktualisiert.`,
    pl_PL: `copyparty widzi teraz prawdziwy adres każdego odwiedzającego zamiast adresu proxy StartOS, więc limity i blokady dotyczą klienta, który je wywołał, zamiast odcinać wszystkich. Dziennik usługi aktualizuje się też na bieżąco.`,
    fr_FR: `copyparty voit désormais l’adresse réelle de chaque visiteur au lieu de celle du proxy StartOS, si bien que les limites de débit et les bannissements s’appliquent au client fautif au lieu de bloquer tout le monde. Le journal du service se met aussi à jour en direct.`,
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
