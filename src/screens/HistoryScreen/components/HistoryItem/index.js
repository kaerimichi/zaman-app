import React, { Component } from 'react'
import moment from 'moment'
import { Text, View } from 'react-native'
import styles from './styles'

export default class HistoryItem extends Component {
  static navigationOptions = {
    header: null
  }

  render () {
    const { date, weekDay, punches, timeWorked, obs } = Object.assign({}, this.props)
    const formattedDate = moment(date, 'YYYY-MM-DD').format('DD/MM')
    const weekDayInfo = `${weekDay}, ${formattedDate}`.toUpperCase()

    return (
      <View style={styles.container}>
        <View style={styles.lineItem}>
          <Text style={styles.itemHeaderText}>{ weekDayInfo }</Text>
        </View>
        {
          punches.length
            ? (
              <View>
                <View style={styles.lineItem}>
                  <Text style={styles.itemContentText}>
                    Registros: { punches.join(', ') }
                  </Text>
                </View>
                {
                  timeWorked
                    ? (
                      <View style={styles.lineItem}>
                        <Text style={styles.itemContentText}>
                          Horas trabalhadas: { timeWorked }
                        </Text>
                      </View>
                    )
                    : null
                }
              </View>
            )
            : (
              <View>
                <View style={styles.lineItem}>
                  <Text style={styles.itemContentText}>
                    Não existem registros de ponto.
                  </Text>
                </View>
                {
                  obs
                    ? (
                      <View style={styles.lineItem}>
                        <Text style={styles.itemContentText}>
                          Obs.: { obs }
                        </Text>
                      </View>
                    )
                    : null
                }
              </View>
            )
        }
      </View>
    )
  }
}
