import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class HistorySummary extends Component {
  static navigationOptions = {
    header: null
  }

  renderHourBank ({ extra }) {
    let distinctionObj = {}
    const getIcon = type => {
      switch (type) {
        case 'green' : {
          distinctionObj.icon = 'add-circle-outline'
          distinctionObj.color = 'green'
          break
        }
        case 'red' : {
          distinctionObj.icon = 'remove-circle-outline'
          distinctionObj.color = 'red'
          break
        }
        default : {
          return null
        }
      }

      return (
        <Icon
          name={distinctionObj.icon}
          style={{ marginTop: 3, marginRight: 4 }}
          color={distinctionObj.color}
          size={14}
        />
      )
    }
    const icon = !extra || extra.asMinutes === 0
      ? getIcon('neutral')
      : extra.isPositive
        ? getIcon('green')
        : getIcon('red')

    return (
      <View style={{ flexDirection: 'row' }}>
        { icon }
        <Text style={styles.itemHeaderText}>{extra.asShortTime}</Text>
      </View>
    )
  }

  render () {
    const { content } = Object.assign({}, this.props)
    const { monthBalance } = content

    return (
      monthBalance.extra
        ? (
          <View style={styles.container}>
            <Text style={styles.itemHeaderText}>SALDO DE HORAS</Text>
            { this.renderHourBank(monthBalance) }
          </View>
        )
        : null
    )
  }
}
