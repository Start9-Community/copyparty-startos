import { sdk } from './sdk'

export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.withOptions()
    .addVolume('data')
    // th and ac are the thumbnail and audio-transcode caches; copyparty regenerates both.
    .addVolume('config', {
      options: { delete: true, exclude: ['hists/*/th', 'hists/*/ac'] },
    }),
)
