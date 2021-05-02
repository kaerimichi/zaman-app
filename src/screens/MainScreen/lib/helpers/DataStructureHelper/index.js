import moment from 'moment'
import {
  getDayClosureEstimate,
  getTotals,
  getRemainingEstimate
} from '../TimeComputationHelper'

function gatherPunches (punches) {
  const normalizeTime = time => time.replace(':', 'h')
  const descriptions = {
    openPeriod: 'Em andamento',
    closedPeriod: 'Concluído'
  }

  return punches.reduce((acc, current, index, punches) => {
    const entry = { title: descriptions.openPeriod, text: current }

    if (index % 2 !== 0) {
      acc.pop()

      entry.title = descriptions.closedPeriod
      entry.text = `das ${normalizeTime(punches[index - 1])} às ${normalizeTime(current)}`

      acc.push(entry)
    } else {
      entry.title = descriptions.openPeriod
      entry.text = `iniciado às ${normalizeTime(current)}`

      acc.push(entry)
    }

    return acc
  }, []).reverse()
}

function gatherEstimates ({ dayBalance, weekBalance, monthBalance }, dayPunches) {
  const { remainingOfToday } = getRemainingEstimate(
    { dayBalance, weekBalance, monthBalance },
    dayPunches
  )
  const dayClosureEstimate = getDayClosureEstimate(
    { dayBalance, monthBalance },
    dayPunches
  )
  const dayClosureEstimateWithHourBank = getDayClosureEstimate(
    { dayBalance, monthBalance },
    dayPunches,
    true
  )
  const items = [
    {
      title: `Hoje, ${moment().format('DD/MM')}`,
      text: `${remainingOfToday.asShortTime}`
    }
  ]
  const hourBankEstimateIsPast = moment()
    .isSameOrAfter(moment(dayClosureEstimateWithHourBank.asShortTime, 'HH:mm'))

  if (remainingOfToday.asMinutes > 0) {
    items.push(
      {
        title: 'Encerramento normal',
        text: `${dayClosureEstimate.asShortTime}`
      }
    )

    if (!hourBankEstimateIsPast) {
      items.push(
        {
          title: 'Encerramento com saldo de horas',
          text: `${dayClosureEstimateWithHourBank.asShortTime}`
        }
      )
    }
  }

  return items
}

function gatherStatistics ({ dayBalance, weekBalance, monthBalance }, dayPunches) {
  const { totalOfToday, totalOfThisMonth } = getTotals(
    { dayBalance, weekBalance, monthBalance },
    dayPunches
  )
  const items = [
    {
      title: `Hoje, ${moment().format('DD/MM')}`,
      text: `${totalOfToday.asShortTime}`
    },
    {
      title: 'Este mês',
      text: `${totalOfThisMonth.asShortTime}`
    }
  ]

  return items
}

module.exports = {
  getFormattedPanelContents: (statistics, dayPunches) => {
    const items = [
      {
        listTitle: 'PERÍODOS',
        items: dayPunches.length ? gatherPunches(dayPunches) : []
      },
      {
        listTitle: 'HORAS RESTANTES',
        items: statistics ? gatherEstimates(statistics, dayPunches) : []
      },
      {
        listTitle: 'HORAS TRABALHADAS',
        items: statistics ? gatherStatistics(statistics, dayPunches) : []
      }
    ]

    return items
  }
}
