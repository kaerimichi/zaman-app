import BaseNotificationRule from './BaseNotificationRule'
import pallete from 'Zaman/src/misc/pallete'

export default class EndOfDayNotificationRule extends BaseNotificationRule {
  shouldSchedule () {
    const { asMinutes } = this.statistics.dayBalance.remaining
    const isBalancePositive = asMinutes <= 0

    return this.punches.length % 2 !== 0 && !isBalancePositive && this.isWeekDay()
  }

  shouldCancel () {
    return this.punches.length % 2 === 0
  }

  getConfig () {
    const { remaining } = this.statistics.dayBalance
    const remainingAsMinutes = remaining.asMinutes
    const lastPunch = this.punches[this.punches.length - 1]
    const scheduleTo = this.getMomentPlusMinutes(
      remainingAsMinutes,
      this.getMoment(lastPunch, 'HH:mm')
    )

    return {
      title: 'Fim do Expediente',
      message: 'Você já trabalhou todas as horas necessárias hoje.',
      date: scheduleTo.toDate(),
      color: pallete.primary
    }
  }
}
