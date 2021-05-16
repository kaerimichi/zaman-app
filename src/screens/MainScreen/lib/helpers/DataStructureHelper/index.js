import moment from 'moment'

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

function gatherEstimates ({ dayBalance, dayClosureEstimate }) {
  const items = [
    {
      title: `Hoje, ${moment().format('DD/MM')}`,
      text: dayBalance.remaining.asShortTime
    }
  ]
  const hourBankEstimateIsPast = moment()
    .isSameOrAfter(moment(dayClosureEstimate.hourBankBased, 'HH:mm'))

  if (dayBalance.remaining.asMinutes > 0) {
    items.push(
      {
        title: 'Encerramento normal',
        text: dayClosureEstimate.workShiftBased
      }
    )

    if (!hourBankEstimateIsPast) {
      items.push(
        {
          title: 'Encerramento com saldo de horas',
          text: dayClosureEstimate.hourBankBased
        }
      )
    }
  }

  return items
}

function gatherStatistics ({ dayBalance, monthBalance }, dayPunches) {
  return [
    {
      title: `Hoje, ${moment().format('DD/MM')}`,
      text: dayBalance.completed.asShortTime
    },
    {
      title: 'Este mês',
      text: monthBalance.completed.asShortTime
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
        items: statistics ? gatherEstimates(statistics) : []
      },
      {
        listTitle: 'HORAS TRABALHADAS',
        items: statistics ? gatherStatistics(statistics) : []
      }
    ]

    return items
  }
}
