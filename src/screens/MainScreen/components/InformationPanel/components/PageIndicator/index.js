import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

export default class PageIndicator extends Component {
  render () {
    const { currentPage, pages } = Object.assign({}, this.props)

    return (
      <View style={styles.indicatorContainer}>
        {
          Array.from(new Array(pages), (x,i) => i + 1)
            .map(e => {
              return (
                <View
                  key={e}
                  style={
                    e === currentPage + 1
                      ? styles.circleActive
                      : styles.circle
                  }
                />
              )
            })
        }
      </View>
    )
  }
}
