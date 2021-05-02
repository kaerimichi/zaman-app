import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

export default class ListItem extends Component {
  render () {
    const { title, text } = Object.assign({}, this.props)

    return (
      <View style={styles.container}>
        <Text style={[styles.textItem, { fontWeight: 'bold' }]}>{ title }</Text>
        <Text style={styles.textItem}>{ text }</Text>
      </View>
    )
  }
}
