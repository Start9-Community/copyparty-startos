import { utils } from '@start9labs/start-sdk'
import { copypartyConf } from '../fileModels/copyparty.conf'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { randomPassword } from '../utils'

export const setAdminPassword = sdk.Action.withoutInput(
  'set-admin-password',

  async ({ effects }) => ({
    name: i18n('Set Admin Password'),
    description: i18n(
      'Generate a new random password for the copyparty admin account. Replaces any existing password.',
    ),
    warning: (await copypartyConf.read((c) => c.adminPassword).const(effects))
      ? i18n(
          'Replaces the current admin password. The old password stops working for the Web UI and WebDAV once copyparty restarts.',
        )
      : null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const adminPassword = utils.getDefaultString(randomPassword)
    await copypartyConf.merge(effects, { adminPassword })

    return {
      version: '1',
      title: i18n('Admin Password'),
      message: i18n(
        'The Web UI and WebDAV use the same password. Save it now; running this action again replaces it.',
      ),
      result: {
        type: 'single',
        name: i18n('Password'),
        description: null,
        value: adminPassword,
        masked: true,
        copyable: true,
        qr: false,
      },
    }
  },
)
