import React, { Component } from 'react'
import { Text, TouchableHighlight } from 'react-native'
import styles from './styles'
import pallete from 'Zaman/src/misc/pallete'

export default class TextButtonComponent extends Component {
  render () {
    const {
      onPress,
      label,
      primary,
      outlineColor,
      fillColor
    } = Object.assign({}, this.props)
    const containerStyles = [ styles.container ]
    const textStyles = [ styles.labelText ]

    if (primary) {
      containerStyles.push({
        backgroundColor: pallete.primary
      })
      textStyles.push({
        fontWeight: 'bold',
        color: 'white'
      })
    }

    if (outlineColor) {
      containerStyles.push({
        borderColor: outlineColor
      })
      textStyles.push({
        color: outlineColor
      })
    }

    if (fillColor) {
      containerStyles.push({
        backgroundColor: fillColor
      })
    }

    return (
      <TouchableHighlight
        style={containerStyles}
        underlayColor='transparent'
        onPress={onPress}
      >
        <Text style={textStyles}>{ label.toUpperCase() }</Text>
      </TouchableHighlight>
    )
  }
}
