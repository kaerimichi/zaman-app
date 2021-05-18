import React from 'react'
import { View, Modal } from 'react-native'
import styles from './styles'

const DefaultModal = props => {
  const {
    visible,
    content,
    position = 'center',
    animationType = 'fade'
  } = props
  const posMap = {
    'top': 'flex-start',
    'center': 'center',
    'bottom': 'flex-end'
  }

  return (
    <Modal transparent animationType={animationType} visible={visible}>
      <View style={[styles.modalBackground, { alignItems: posMap[position] }]}>
        <View style={styles.mainContainer}>
          { content }
        </View>
      </View>
    </Modal>
  )
}

export default DefaultModal
