import PushNotification from 'react-native-push-notification'

import FirstIntervalNotificationRule from './rules/FirstIntervalNotificationRule'
import EndOfDayNotificationRule from './rules/EndOfDayNotificationRule'
import EndOfDayWithBalanceNotificationRule from './rules/EndOfDayWithBalanceNotificationRule'

export default class NotificationsService {
  constructor (punches, statistics) {
    this.rules = [
      new FirstIntervalNotificationRule(punches, statistics),
      new EndOfDayNotificationRule(punches, statistics),
      new EndOfDayWithBalanceNotificationRule(punches, statistics)
    ]

    PushNotification.configure({
      onNotification (notification) {
        //
      }
    })
  }

  process () {
    this.cancelAll()
    this.rules.forEach(notification => {
      if (notification.shouldSchedule()) {
        PushNotification.localNotificationSchedule(
          notification.getConfig()
        )
      }
    })
  }

  cancelAll () {
    PushNotification.cancelAllLocalNotifications()
  }
}
