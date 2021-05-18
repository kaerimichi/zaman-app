import React, { Component } from 'react'
import { StatusBar, Vibration, Dimensions, View, Text } from 'react-native'
import PunchButton from './components/PunchButton'
import InformationPanel from './components/InformationPanel'
import styles from './styles'
import moment from 'moment'
import RegistrationFactory from 'Zaman/src/lib/factories/RegistrationFactory'
import AnalyticsService from 'Zaman/src/lib/services/AnalyticsService'
import StorageService from 'Zaman/src/lib/services/StorageService'
import NotificationsService from 'Zaman/src/lib/services/NotificationsService'
import ButtonComponent from 'Zaman/src/components/ButtonComponent'
import { getFormattedPanelContents } from './lib/helpers/DataStructureHelper'
import pallete from 'Zaman/src/misc/pallete'
import InstructionsModal from './components/InstructionsModal'
import { compute } from 'zaman-statistics-generator'
import DefaultModal from '../../components/ModalComponent'

const TOAST_DURATION = 2500

export default class MainScreen extends Component {
  static navigationOptions = {
    title: 'Main',
    header: null
  }

  storage = new StorageService()
  analytics = new AnalyticsService()

  state = {
    intervalId: null,
    dayProgress: 0,
    message: messages.noService,
    fetching: false,
    statistics: null,
    dayPunches: [],
    panelContents: [],
    panelViewHeight: 200,
    serviceConfiguration: null,
    instructionsVisible: false,
    fpColor: pallete.accent,
    timeInfo: null,
    modalVisible: false,
    modalContent: null
  }

  attemptRegistration = async () => {
    try {
      const config = this.state.serviceConfiguration

      Vibration.vibrate(80)
      this.setState({ fetching: true })

      if (!config) {
        throw new Error(messages.noService)
      }

      const serviceType = config.alias === 'offline' ? 'offline' : 'online'
      const serviceFactory = new RegistrationFactory(config)
      const registrationService = serviceFactory.getService(serviceType)
      const { punches, statistics } = await registrationService.register()

      await this.storage.setItem('dayPunches', punches)
      await this.storage.setItem('statistics', statistics)

      if (statistics) {
        notifications = new NotificationsService(punches, statistics)
        notifications.process()
      }

      this.setState({
        dayPunches: punches,
        statistics,
        modalVisible: true,
        modalContent: (
          <Text>{ messages.punchSuccess }</Text>
        )
      })
      this.updatePanelContents()
      
      setTimeout(() => {
        this.setState({ modalVisible: false })
      }, TOAST_DURATION)
      this.showFpFeedback(true)
    } catch (e) {
      this.setState({
        modalVisible: true,
        modalContent: (
          <Text>{ e.message }</Text>
        )
      })
      setTimeout(() => {
        this.setState({ modalVisible: false })
      }, TOAST_DURATION)

      this.showFpFeedback(false)
    } finally {
      this.setState({ fetching: false })
    }
  }

  showFpFeedback = status => {
    this.setState({ fpColor: status ? '#599b47' : '#b53b3b' })
    setTimeout(() => this.setState({ fpColor: pallete.accent }), TOAST_DURATION)
  }

  updateGenericInformation = () => {
    if (this.state.dayPunches && this.state.dayPunches.length > 0) {
      this.updatePanelContents()
      if (this.state.statistics) this.updatePercentage()
    }
  }

  updatePanelContents = async () => {
    const monthEntries = await this.storage.getItem('monthEntries')
    const panelContents = getFormattedPanelContents(
      compute(monthEntries),
      this.state.dayPunches
    )

    this.setState({ panelContents })
  }

  updatePercentage = async () => {
    const monthEntries = await this.storage.getItem('monthEntries')
    const { dayBalance } = compute(monthEntries)
    const dayTotalMinutes = dayBalance.remaining.asMinutes + dayBalance.completed.asMinutes
    const dayRemainingMinutes = dayBalance.remaining.asMinutes
    const percentage = Math.round(
      ((dayRemainingMinutes / dayTotalMinutes * 100) - 100) * -1
    )

    if (percentage > 100) return 100
    if (percentage < 0) return 0

    this.setState({ dayProgress: percentage })
  }

  resetData = async (punches, statistics) => {
    const timeInfo = this.state.timeInfo
    const lastDate = timeInfo ? timeInfo.lastDate : null
    const today = moment().format('YYYY-MM-DD')

    if (lastDate !== today) {
      await this.storage.setItem('dayPunches', [])
      await this.storage.setItem('timeInfo', { lastDate: today })

      notifications = new NotificationsService(punches, statistics)
      notifications.cancelAll()

      this.setState({ dayPunches: [] })
    }
  }

  async UNSAFE_componentWillMount () {
    try {
      const { addListener } = this.props.navigation
      const timeInfo = await this.storage.getItem('timeInfo')
      const dayPunches = await this.storage.getItem('dayPunches')
      const statistics = await this.storage.getItem('statistics')
      const serviceConfiguration = await this.storage.getItem('serviceConfiguration')
      let intervalId = null

      addListener('willFocus', async () => {
        const dayPunches = await this.storage.getItem('dayPunches')
        const statistics = await this.storage.getItem('statistics')
        const serviceConfiguration = await this.storage.getItem('serviceConfiguration')

        if (dayPunches && statistics) {
          notifications = new NotificationsService(
            dayPunches,
            statistics
          )
          notifications.process()
        }

        this.setState({ dayPunches: dayPunches || [], statistics, serviceConfiguration })
      })

      this.setState({
        timeInfo,
        intervalId,
        dayPunches: dayPunches || [],
        statistics,
        serviceConfiguration
      })

      this.analytics.trackScreenView('Main')

      await this.resetData(dayPunches, statistics)

      this.updateGenericInformation()
      intervalId = setInterval(this.updateGenericInformation, 1000)
    } catch (e) {
      this.setState({
        modalVisible: true,
        modalContent: (
          <Text>{ e.message }</Text>
        )
      })

      setTimeout(() => {
        this.setState({ modalVisible: false })
      }, TOAST_DURATION)
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId)
  }

  updatePanelViewHeight = (evt) => {
    const { height } = evt.nativeEvent.layout
    this.setState({ panelViewHeight: parseInt(height) })
  }

  showServiceScanScreen = async () => {
    const config = await this.storage.getItem('serviceConfiguration')

    if (config) {
      this.props.navigation.navigate('settings')
    } else {
      this.props.navigation.navigate('serviceScan')
    }
  }

  showHistoryScreen = () => {
    this.props.navigation.navigate('history')
  }

  showInstructionsModal = () => {
    if (!this.state.serviceConfiguration) {
      this.setState({ instructionsVisible: true })
    } else {
      this.showServiceScanScreen()
    }
  }

  goToServiceScan = () => {
    this.setState({ instructionsVisible: false })
    setTimeout(this.showServiceScanScreen, 250)
  }

  render () {
    const { width } = Dimensions.get('window')

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={pallete.primary} barStyle='light-content' />
        <DefaultModal
          visible={this.state.modalVisible}
          content={this.state.modalContent}
          position='top'
        />
        <InstructionsModal
          visible={this.state.instructionsVisible}
          onOptionServiceConfig={this.goToServiceScan}
          onOptionWithNoService={() => { this.setState({ instructionsVisible: false }) }}
        />
        <View style={styles.clockSection}>
          <PunchButton
            size={200}
            loading={this.state.fetching}
            percentage={this.state.dayProgress}
            activityIndicatorColor={pallete.accent}
            foregroundColor={pallete.darker}
            backgroundColor={pallete.dark}
            onLongPress={this.attemptRegistration}
            fpColor={this.state.fpColor}
          />
        </View>
        <View onLayout={this.updatePanelViewHeight} style={styles.summaryContainer}>
          <InformationPanel
            contents={this.state.panelContents}
            width={width}
            height={this.state.panelViewHeight}
          />
        </View>
        <View style={styles.actionsContainer}>
          <ButtonComponent
            style={styles.actionButton}
            onPress={this.showInstructionsModal}
            label='configurações'
            iconName='settings'
            tintColor={pallete.accent}
          />
          <ButtonComponent
            style={styles.actionButton}
            onPress={this.showHistoryScreen}
            label='histórico'
            iconName='history'
            tintColor={pallete.accent}
          />
        </View>
      </View>
    )
  }
}

const messages = {
  punchSuccess: 'Batida registrada com sucesso!',
  punchFailure: 'Ocorreu um erro!',
  serviceNotReady: 'Configure o serviço de marcação de ponto primeiro.',
  noService: 'Nenhum serviço foi configurado.'
}
