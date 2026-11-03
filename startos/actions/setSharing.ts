import { copypartyConf } from '../fileModels/copyparty.conf'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  sharing: Value.toggle({
    name: i18n('Allow Share Links'),
    description: i18n(
      'When enabled, the admin account can create links to chosen files or folders from the share button in the web interface, each with an optional password and expiry. Anyone with a link can open it without signing in.',
    ),
    default: false,
  }),
})

export const setSharing = sdk.Action.withInput(
  'set-sharing',

  async () => ({
    name: i18n('Share Links'),
    description: i18n(
      'Choose whether you can create share links to individual files and folders',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => ({
    sharing: (await copypartyConf.read().once())?.sharing,
  }),

  async ({ effects, input }) =>
    copypartyConf.merge(effects, { sharing: input.sharing }),
)
