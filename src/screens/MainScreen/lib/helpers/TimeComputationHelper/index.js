import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

export const isOpenPeriod = punches => {
  return punches.length % 2 !== 0
}

export const getDayClosureEstimate = (statistics, punches, hourBank = false) => {
  const { dayBalance, monthBalance } = statistics
  const monthRemainingAsMinutes = !monthBalance.extra.isPositive
    ? Math.abs(monthBalance.extra.asMinutes) * -1
    : monthBalance.extra.asMinutes
  const remainingAsMinutes = hourBank
    ? dayBalance.remaining.asMinutes - monthRemainingAsMinutes
    : dayBalance.remaining.asMinutes
  const lastPunchMoment = moment(
    punches[punches.length - 1],
    'HH:mm'
  )
  const estimate = !isOpenPeriod(punches)
    ? moment().add(remainingAsMinutes, 'minutes')
    : lastPunchMoment.add(remainingAsMinutes, 'minutes')

  return {
    asShortTime: estimate.format('HH:mm')
  }
}

const getMinutesFromLastPunch = (lastPunchMoment) => {
  return Math.floor(moment.duration(
    moment().diff(lastPunchMoment)
  ).asMinutes())
}

export const getRemainingEstimate = ({ dayBalance, weekBalance }, punches) => {
  const dayRemainingAsMinutes = dayBalance.remaining.asMinutes
  const weekRemainingAsMinutes = weekBalance.remaining.asMinutes
  const minutesFromLastPunch = getMinutesFromLastPunch(
    moment(punches[punches.length - 1], 'HH:mm')
  )

  const remainingOfToday = !isOpenPeriod(punches)
    ? moment.duration(dayRemainingAsMinutes, 'minutes')
    : moment.duration(dayRemainingAsMinutes - minutesFromLastPunch, 'minutes')
  const remainingOfThisWeek = !isOpenPeriod(punches)
    ? moment.duration(weekRemainingAsMinutes, 'minutes')
    : moment.duration(weekRemainingAsMinutes - minutesFromLastPunch, 'minutes')

  return {
    remainingOfToday: {
      asMinutes: remainingOfToday.asMinutes(),
      asShortTime: remainingOfToday > 0
        ? remainingOfToday.format('HH:mm', { trim: false })
        : '00:00'
    },
    remainingOfThisWeek: {
      asMinutes: remainingOfThisWeek.asMinutes(),
      asShortTime: remainingOfThisWeek > 0
        ? remainingOfThisWeek.format('HH:mm', { trim: false })
        : '00:00'
    }
  }
}

export const getTotals = ({ dayBalance, weekBalance, monthBalance }, punches) => {
  const dayTotalAsMinutes = dayBalance.completed.asMinutes
  const weekTotalAsMinutes = weekBalance.completed.asMinutes
  const monthTotalAsMinutes = monthBalance.completed.asMinutes
  const minutesFromLastPunch = getMinutesFromLastPunch(
    moment(punches[punches.length - 1], 'HH:mm')
  )
  const totalOfToday = !isOpenPeriod(punches)
    ? moment.duration(dayTotalAsMinutes, 'minutes')
    : moment.duration(dayTotalAsMinutes + minutesFromLastPunch, 'minutes')
  const totalOfThisWeek = !isOpenPeriod(punches)
    ? moment.duration(weekTotalAsMinutes, 'minutes')
    : moment.duration(weekTotalAsMinutes + minutesFromLastPunch, 'minutes')
  const totalOfThisMonth = !isOpenPeriod(punches)
    ? moment.duration(monthTotalAsMinutes, 'minutes')
    : moment.duration(monthTotalAsMinutes + minutesFromLastPunch, 'minutes')

  return {
    totalOfToday: {
      asShortTime: totalOfToday.format('HH:mm', { trim: false })
    },
    totalOfThisWeek: {
      asShortTime: totalOfThisWeek.format('HH:mm', { trim: false })
    },
    totalOfThisMonth: {
      asShortTime: totalOfThisMonth.format('HH:mm', { trim: false })
    }
  }
}

export const getDayPercentage = ({ dayBalance, weekBalance, monthBalance }, punches) => {
  const dayTotalMinutes = dayBalance.remaining.asMinutes + dayBalance.completed.asMinutes
  const { remainingOfToday } = getRemainingEstimate({ dayBalance, weekBalance, monthBalance }, punches)
  const dayRemainingMinutes = remainingOfToday.asMinutes
  const percentage = Math.round(((dayRemainingMinutes / dayTotalMinutes * 100) - 100) * -1)

  if (percentage > 100) return 100
  if (percentage < 0) return 0

  return percentage
}
