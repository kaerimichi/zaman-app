import BaseNotificationRule from './BaseNotificationRule'
import pallete from 'Zaman/src/misc/pallete'

export default class EndOfDayWithBalanceNotificationRule extends BaseNotificationRule {
  shouldSchedule () {
    const { asMinutes: remAsMinutes } = this.statistics.dayBalance.remaining
    const { asMinutes: extraAsMinutes } = this.statistics.monthBalance.extra
    const balanceIsNeutral = (remAsMinutes - extraAsMinutes) === 0

    return this.punches.length % 2 !== 0 && !balanceIsNeutral && this.isWeekDay()
  }

  shouldCancel () {
    return this.punches.length % 2 === 0
  }

  getConfig () {
    const { remaining } = this.statistics.dayBalance
    const remainingAsMinutes = remaining.asMinutes
    const { asMinutes: extraAsMinutes } = this.statistics.monthBalance.extra
    const lastPunch = this.punches[this.punches.length - 1]
    const scheduleTo = this.getMomentPlusMinutes(
      remainingAsMinutes - extraAsMinutes,
      this.getMoment(lastPunch, 'HH:mm')
    )

    return {
      title: 'Fim do Expediente (com saldo)',
      message: 'Considerando seu saldo de horas, você já trabalhou todas as horas necessárias hoje.',
      date: scheduleTo.toDate(),
      color: pallete.primary
    }
  }
}
