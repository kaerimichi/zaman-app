import React, { Component } from 'react'
import moment from 'moment'
import { Text, View, TouchableHighlight, Vibration, TextInput } from 'react-native'
import styles from './styles'
import pallete from 'Zaman/src/misc/pallete'

export default class HistoryItem extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    editingIsHidden: true,
    punches: '',
    nonsense: null
  }

  toggleInput = () => {
    const state = !this.state.editingIsHidden

    Vibration.vibrate(20)
    this.setState({
      editingIsHidden: state,
      punches: this.props.punches.join(',')
    })
  }

  processInputContent = () => {
    if (this.state.punches.length > 0){
      this.props.onNewEntryAdded({
        date: this.props.date,
        punches: this.state.punches.split(',')
      })
    }

    this.setState({ editingIsHidden: true })
  }

  render () {
    const { date, weekDay, punches, timeWorked, obs } = Object.assign({}, this.props)
    const formattedDate = moment(date, 'YYYY-MM-DD').format('DD/MM')
    const weekDayInfo = `${weekDay}, ${formattedDate}`.toUpperCase()

    return (
      <TouchableHighlight onLongPress={this.toggleInput} underlayColor={pallete.light}>
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
          {
            !this.state.editingIsHidden
              ? (
                <TextInput
                  style={styles.punchesInput}
                  value={this.state.punches}
                  onChangeText={punches => this.setState({ punches })}
                  onSubmitEditing={this.processInputContent}
                />
              )
              : null
          }
        </View>
      </TouchableHighlight>
    )
  }
}
