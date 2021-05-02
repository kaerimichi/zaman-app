import OnlineRegistrationService from '../../services/OnlineRegistrationService'
import OfflineRegistrationService from '../../services/OfflineRegistrationService'

export default class RegistrationFactory {
  constructor (config) {
    this.config = config
  }

  getService (type) {
    return type === 'online'
      ? new OnlineRegistrationService(this.config)
      : new OfflineRegistrationService(this.config)
  }
}
