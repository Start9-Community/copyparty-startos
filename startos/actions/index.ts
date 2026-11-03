import { sdk } from '../sdk'
import { setAdminPassword } from './setAdminPassword'
import { setPublicAccess } from './setPublicAccess'
import { setSharing } from './setSharing'

export const actions = sdk.Actions.of()
  .addAction(setAdminPassword)
  .addAction(setPublicAccess)
  .addAction(setSharing)
