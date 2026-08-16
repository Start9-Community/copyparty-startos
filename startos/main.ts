import { copypartyConf } from './fileModels/copyparty.conf'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { mounts, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting copyparty'))

  // Both actions write this file while the service is running; re-running main
  // on a change is what restarts copyparty so they take effect.
  await copypartyConf.read().const(effects)

  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'copyparty' },
    mounts,
    'copyparty-sub',
  )

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer,
    exec: { command: sdk.useEntrypoint() },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkWebUrl(effects, `http://localhost:${uiPort}/`, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
