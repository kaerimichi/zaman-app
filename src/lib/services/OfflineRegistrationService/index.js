import moment from 'moment'
import 'moment-duration-format'
import localization from 'moment/locale/pt-br'
import StorageService from '../StorageService'
import { sortBy } from 'lodash'
import {
  compute,
  getStringTime,
  getTimeWorked
} from 'zaman-statistics-generator'

const STORED_PUNCHES_OFFSET = 45

export default class OfflineRegistrationService {
  constructor (config) {
    this.config = config
    this.storage = new StorageService('@ZamanOfflineStorage')
  }

  sleep (ms = 1000) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

  getTemplate (date = null) {
    const dateFormat = 'YYYY-MM-DD'
    const momentDate = date ? moment(date) : moment()
    const weekDayAsText = momentDate
      .locale('pt-br', localization)
      .format('dddd')
      .toLowerCase()

    return {
      date: momentDate.format(dateFormat),
      weekDay: momentDate.format('d'),
      weekDayAsText,
      punches: [],
      timeWorked: null,
      holiday: false,
      obs: false
    }
  }

  fillEmptyDays (monthPunches) {
    const dates = monthPunches.map(e => e.date)

    for (let day = 1; day <= moment().daysInMonth(); day++) {
      const dateToCheck = moment(day, 'DD').format('YYYY-MM-DD')

      if (dates.indexOf(dateToCheck) === -1) {
        monthPunches.push(this.getTemplate(dateToCheck))
      }
    }

    return sortBy(
      monthPunches, entry => {
        return moment(entry.date, 'YYYY-MM-DD').format('DD')
      }
    )
  }

  async register () {
    try {
      let monthEntries = await this.storage.getItem('monthEntries')
      let currentDayEntry

      if (!monthEntries) monthEntries = []

      monthEntries = monthEntries
        .filter(e => moment(e.date, 'YYYY-MM-DD').format('M') === moment().format('M'))

      currentDayEntry = monthEntries.find(e => e.date === moment().format('YYYY-MM-DD'))

      if (!currentDayEntry) {
        currentDayEntry = this.getTemplate()
        monthEntries.push(currentDayEntry)
      }

      monthEntries.map(monthEntry => {
        if (monthEntry.date === moment().format('YYYY-MM-DD')) {
          currentDayEntry.punches.push(moment().format('HH:mm'))
          currentDayEntry.timeWorked = getStringTime(
            getTimeWorked(currentDayEntry.punches, this.config.data.workShift)
          )
          monthEntry = currentDayEntry
        }

        return monthEntry
      })
      
      if (monthEntries.length > STORED_PUNCHES_OFFSET) {
        monthEntries.shift()
      }

      await this.sleep()
      await this.storage.setItem('monthEntries', monthEntries)

      return Promise.resolve({
        punches: currentDayEntry.punches,
        statistics: compute(monthEntries)
      })
    } catch (e) {
      throw e
    }
  }

  async retrieveHistory () {
    try {
      let monthEntries = await this.storage.getItem('monthEntries')
      let monthEntriesToCompute = JSON.parse(JSON.stringify(monthEntries))

      monthEntries = this.fillEmptyDays(monthEntries || [])
      
      await this.sleep()
      
      if (monthEntries) {
        monthEntries = monthEntries
          .filter(e => moment(e.date, 'YYYY-MM-DD').format('M') === moment().format('M'))
        monthEntries.forEach(monthEntry => {
          monthEntry.timeWorked = getStringTime(
            getTimeWorked(monthEntry.punches, this.config.data.workShift)
          )
        })
      }

      return Promise.resolve({
        punches: monthEntries,
        statistics: monthEntriesToCompute
          ? compute(monthEntriesToCompute)
          : null
      })
    } catch (e) {
      throw e
    }
  }
}
