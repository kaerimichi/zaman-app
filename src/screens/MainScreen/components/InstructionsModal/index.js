import React, { Component } from 'react'
import { Modal, View, Text, TouchableHighlight, Linking } from 'react-native'
import styles from './styles'
import TextButtonComponent from 'Zaman/src/components/TextButtonComponent'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import pallete from 'Zaman/src/misc/pallete'
import { PRIVACY_URL } from 'Zaman/src/config'

export default class InstructionsModal extends Component {
  displayPrivacyPolicy () {
    Linking.canOpenURL(PRIVACY_URL).then(supported => {
      if (supported) Linking.openURL(PRIVACY_URL)
    })
  }

  render () {
    const {
      visible,
      onOptionServiceConfig,
      onOptionWithNoService
    } = Object.assign({}, this.props)

    return (
      <Modal
        onRequestClose={() => {}}
        animationType='slide'
        visible={visible}
      >
        <View style={styles.modalBackground}>
          <View style={styles.instructionsContainer}>
            <Icon style={styles.instructionsIcon} name='qrcode-scan' size={84} color={pallete.primary} />
            <Text style={styles.instructionsText}>Zaman é um aplicativo que pode ser utilizado com diferentes serviços de controle de ponto. Para configurar o aplicativo você deve escanear o QR code de algum serviço.</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TextButtonComponent label='Escanear um código' onPress={onOptionServiceConfig} primary />
            <TextButtonComponent label='Agora não' onPress={onOptionWithNoService} />
          </View>
          <TouchableHighlight
            style={styles.policyContainer}
            onPress={this.displayPrivacyPolicy}
            underlayColor='transparent'
          >
            <Text style={styles.policyText}>
              {'Privacidade'.toUpperCase()}
            </Text>
          </TouchableHighlight>
        </View>
      </Modal>
    )
  }
}
