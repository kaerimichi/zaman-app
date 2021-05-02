import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import Parse from 'parse/react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Loader from 'Zaman/src/components/LoaderComponent'
import StorageService from 'Zaman/src/lib/services/StorageService'
import styles from './styles'
import {
  PARSE_APP_KEY,
  PARSE_APP_URL,
  DEBUG_SERVICE_STATUS,
  DEBUG_SERVICE_UUID
} from 'Zaman/src/config'

export default class CodeScanningScreen extends Component {
  static navigationOptions = {
    header: null
  }

  storage = new StorageService()

  state = {
    fetching: false
  }

  processCode = async ({ data }) => {
    try {
      this.setState({ fetching: true })

      const ServiceConfiguration = Parse.Object.extend('ServiceConfiguration')
      const query = new Parse.Query(ServiceConfiguration)

      query.equalTo('uuid', data)

      const configuration = await query.first()

      if (!configuration) {
        throw new Error('Configuração inválida')
      }

      await this.storage.setItem('serviceConfiguration', configuration)

      this.setState({ fetching: false })
      this.props.navigation.replace('settings')
    } catch (e) {
      await this.storage.removeItem('serviceConfiguration')
      this.props.navigation.pop()
    }
  }

  UNSAFE_componentWillMount () {
    Parse.setAsyncStorage(AsyncStorage)
    Parse.initialize(PARSE_APP_KEY)
    Parse.serverURL = PARSE_APP_URL
  }

  componentDidMount () {
    if (DEBUG_SERVICE_STATUS) {
      setTimeout(() => {
        this.processCode({ data: DEBUG_SERVICE_UUID })
      }, 6000)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {
          this.state.fetching
            ? <Loader loading={this.state.fetching} />
            : (
              <RNCamera style={styles.cameraContainer}
                barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                onBarCodeRead={this.processCode}
                captureAudio={false}
              >
                <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.codeBoundaryContainer}></View>
                    <View style={{ width: 210 }}>
                      <Text style={styles.scanningInstructionsText}>
                        {'Aponte a câmera para o código do serviço desejado'.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <TouchableHighlight
                    style={styles.cancelButtonContainer}
                    underlayColor='transparent'
                    onPress={() => { this.props.navigation.pop() }}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableHighlight>
                </View>
              </RNCamera>
            )
        }
      </View>
    )
  }
}
