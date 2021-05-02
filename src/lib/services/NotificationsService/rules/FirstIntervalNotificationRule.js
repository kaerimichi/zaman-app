import BaseNotificationRule from './BaseNotificationRule'
import pallete from 'Zaman/src/misc/pallete'

export default class FirstIntervalNotificationRule extends BaseNotificationRule {
  shouldSchedule () {
    return this.punches.length === 2 && this.isWeekDay()
  }

  shouldCancel () {
    return this.punches.length > 2
  }

  getConfig () {
    const secondPunch = this.punches[1]
    const secondPunchMoment = this.getPunchMoment(secondPunch)

    return {
      title: 'Intervalo',
      message: 'Você já fez um intervalo de uma hora.',
      date: this.getMomentPlusMinutes(60, secondPunchMoment).toDate(),
      color: pallete.primary
    }
  }
}
