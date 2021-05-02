import React, { Component } from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import StorageService from 'Zaman/src/lib/services/StorageService'
import RegistrationFactory from 'Zaman/src/lib/factories/RegistrationFactory'
import AnalyticsService from 'Zaman/src/lib/services/AnalyticsService'
import HistoryItem from './components/HistoryItem'
import HistorySummary from './components/HistorySummary'
import pallete from 'Zaman/src/misc/pallete'
import moment from 'moment'
import styles from './styles'
import { isEqual } from 'lodash'
import RecalculateModal from './components/RecalculateModal'

export default class HistoryScreen extends Component {
  static navigationOptions = {
    title: 'Histórico',
    headerTintColor: pallete.primary
  }

  state = {
    fetching: false,
    monthPunches: [],
    statistics: {},
    info: '',
    dayPunches: null,
    recalculateVisible: false
  }

  storage = new StorageService()
  analytics = new AnalyticsService()

  renderList = items => {
    const onlyFromToday = ({ date }) => {
      return moment(date, 'YYYY-MM-DD').isBefore(moment())
    }
    const monthPunches = items ? items.reverse().filter(onlyFromToday)
      .map(({ date, punches, weekDayAsText, timeWorked, obs }, index) => {
        return (
          <HistoryItem
            key={index}
            date={date}
            punches={punches || []}
            weekDay={weekDayAsText}
            timeWorked={timeWorked}
            obs={obs}
          />
        )
      }) : []

    return monthPunches.length
      ? (
        <ScrollView style={{ flex: 1 }}>
          {
            this.state.statistics
              ? <HistorySummary content={this.state.statistics} />
              : null
          }
          { monthPunches }
        </ScrollView>
      )
      : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.noDataText}>{this.state.info}</Text>
        </View>
      )
  }

  async UNSAFE_componentWillMount () {
    try {
      this.setState({ fetching: true, info: 'Sem informações ainda.' })

      const config = await this.storage.getItem('serviceConfiguration')
      const localPunches = await this.storage.getItem('dayPunches')
      const serviceType = config && config.alias === 'offline' ? 'offline' : 'online'
      const serviceFactory = new RegistrationFactory(config)
      const registrationService = serviceFactory.getService(serviceType)
      const { punches, statistics } = await registrationService.retrieveHistory()
      const todayPunchesObjectFromService = punches
        ? punches.find(e => e.date === moment().format('YYYY-MM-DD'))
        : null
      const todayPunches = todayPunchesObjectFromService
        ? todayPunchesObjectFromService.punches
        : null

      if (todayPunches && !isEqual(localPunches, todayPunches)) {
        await this.storage.setItem('dayPunches', todayPunches)
        await this.storage.setItem('statistics', statistics)

        setTimeout(() => {
          this.setState({ recalculateVisible: true })
        }, 500)
      }

      this.analytics.trackScreenView('History')

      this.setState({ monthPunches: punches, statistics })
    } catch (e) {
      this.setState({ info: e.message })
    } finally {
      this.setState({ fetching: false })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <RecalculateModal
          visible={this.state.recalculateVisible}
          onOptionDismiss={() => this.setState({ recalculateVisible: false })}
        />
        <View style={styles.mainContent}>
          {
            !this.state.fetching
              ? this.renderList(this.state.monthPunches)
              : <ActivityIndicator size='large' color={pallete.primary} animating={this.state.fetching} />
          }
        </View>
      </View>
    )
  }
}
