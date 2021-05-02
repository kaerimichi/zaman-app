import React from 'react'
import { Alert } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import MainScreen from './src/screens/MainScreen'
import CodeScanningScreen from './src/screens/CodeScanningScreen'
import ConfigurationScreen from './src/screens/ConfigurationScreen'
import HistoryScreen from './src/screens/HistoryScreen'
import * as appConfig from 'Zaman/src/config'
import { map } from 'lodash'

const StackNavigator = createStackNavigator(
  {
    home: { screen: MainScreen },
    serviceScan: { screen: CodeScanningScreen },
    settings: { screen: ConfigurationScreen },
    history: { screen: HistoryScreen }
  },
  { initialRouteName: 'home' }
)
const AppNavigator = createAppContainer(StackNavigator)

export default () => {
  if (appConfig.DEBUG_MODE) {
    Alert.alert(
      'Debug Dialog',
      map(appConfig, (value, key) => `${key}\n${value}`).join('\n\n')
    )
  }

  return <AppNavigator />
}
