import React, { Component } from 'react'
import { Modal, View, Text } from 'react-native'
import styles from './styles'
import TextButtonComponent from 'Zaman/src/components/TextButtonComponent'
import StorageService from 'Zaman/src/lib/services/StorageService'
import pallete from 'Zaman/src/misc/pallete'
import QRCode from 'react-native-qrcode-svg'
import { Dimensions } from 'react-native'

export default class ShareConfigModal extends Component {
  state = {
    serviceName: '',
    serviceUuid: '',
    fields: null
  }

  storage = new StorageService()

  async UNSAFE_componentWillMount () {
    const { displayName, uuid } = await this.storage.getItem('serviceConfiguration')
    this.setState({ serviceName: displayName, serviceUuid: uuid })
  }

  render () {
    const { visible, onDismiss } = Object.assign({}, this.props)
    const qrCodeSize = Dimensions.get('window').width - 220

    return (
      <Modal
        onRequestClose={() => {}}
        animationType='slide'
        visible={visible}
      >
        <View style={styles.modalBackground}>
          <View style={styles.instructionsContainer}>
            <View style={styles.qrContainer}>
              <QRCode color={pallete.primary} size={qrCodeSize} value={this.state.serviceUuid} />
              <Text style={styles.serviceName}>{this.state.serviceName}</Text>
            </View>
            <Text style={styles.instructionsText}>Compartilhe o código acima para configuração do mesmo serviço utilizado por você no aplicativo.</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TextButtonComponent label='Fechar' onPress={onDismiss} />
          </View>
        </View>
      </Modal>
    )
  }
}
