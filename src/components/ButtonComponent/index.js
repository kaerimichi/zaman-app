import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import pallete from 'Zaman/src/misc/pallete'

const defaultTintColor = pallete.primary

export default class ButtonComponent extends Component {
  render () {
    const {
      onPress,
      iconName,
      iconSize,
      tintColor,
      label
    } = Object.assign({}, this.props)

    return (
      <TouchableHighlight underlayColor='transparent' onPress={onPress}>
        <View style={styles.buttonContainer}>
          <Icon name={iconName} size={iconSize || 30} color={tintColor || defaultTintColor} />
          <Text style={{ color: tintColor || defaultTintColor, fontSize: 10 }}>
            { label ? label.toUpperCase() : '' }
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}
