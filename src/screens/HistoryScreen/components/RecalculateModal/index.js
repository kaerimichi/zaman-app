import React, { Component } from 'react'
import { Modal, View, Text } from 'react-native'
import styles from './styles'
import TextButtonComponent from 'Zaman/src/components/TextButtonComponent'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import pallete from 'Zaman/src/misc/pallete'

export default class RecalculateModal extends Component {
  render () {
    const {
      visible,
      onOptionDismiss
    } = Object.assign({}, this.props)

    return (
      <Modal
        onRequestClose={() => {}}
        animationType='slide'
        visible={visible}
      >
        <View style={styles.modalBackground}>
          <View style={styles.instructionsContainer}>
            <Icon style={styles.instructionsIcon} name='alert-circle-outline' size={84} color={pallete.accent} />
            <Text style={styles.instructionsText}>As batidas do histórico estão diferentes para o dia de hoje. Isto pode prejudicar as estimativas e o agendamento de notificações no aplicativo. Um novo cálculo foi feito com base no histórico.</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TextButtonComponent
              label='Entendido'
              onPress={onOptionDismiss}
              outlineColor={pallete.primary}
              fillColor={pallete.accent}
              primary
            />
          </View>
        </View>
      </Modal>
    )
  }
}
