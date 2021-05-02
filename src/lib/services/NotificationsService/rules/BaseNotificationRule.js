import moment from 'moment'

export default class BaseNotificationRule {
  constructor (punches, statistics) {
    this.punches = punches
    this.statistics = statistics
  }

  getPunchMoment (simpleTime = '00:00') {
    return moment(simpleTime, 'HH:mm')
  }

  getMomentPlusMinutes (minutes = 0, momentObj = null) {
    const momentToAddMinutes = momentObj ? moment(momentObj) : moment()
    return momentToAddMinutes.add(minutes, 'minutes')
  }

  isWeekDay () {
    return ['0', '6'].indexOf(moment().format('e')) === -1
  }

  getMoment (...momentParams) {
    return moment(...momentParams)
  }
}
