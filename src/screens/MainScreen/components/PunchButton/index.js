import React, { Component } from 'react'
import { View, ActivityIndicator, TouchableHighlight } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import FingerprintSvg from './components/FingerprintSvg'
import pallete from 'Zaman/src/misc/pallete'

export default class PunchButton extends Component {
  generateArc (percentage, radius) {
    if (percentage === 100) percentage = 99.999
    const a = percentage * 2 * Math.PI / 100
    const r = radius
    const rx = r
    const ry = r
    const xAxisRotation = 0
    const sweepFlag = 1
    const x = r + r * Math.sin(a)
    const y = r - r * Math.cos(a)
    const largeArcFlag = percentage <= 50 ? 0 : 1

    return `A${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`
  }

  render () {
    let {
      size,
      loading,
      percentage,
      foregroundColor,
      backgroundColor,
      activityIndicatorColor,
      onLongPress,
      onPress
    } = Object.assign({}, this.props)
    const half = size / 2

    onPress = typeof onPress === 'function' ? onPress : null
    onLongPress = typeof onLongPress === 'function' ? onLongPress : null

    return (
      <TouchableHighlight
        underlayColor='transparent'
        style={{ width: size, height: size }}
        onLongPress={onLongPress}
        onPress={onPress}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Svg height={size} width={size}>
            <Circle
              cx={half}
              cy={half}
              r={half}
              fill={backgroundColor || 'gray'}
            />
            <Path
              d={`M${half} ${half} L${half} 0 ${this.generateArc(percentage, half)} Z`}
              fill={foregroundColor || 'black'}
            />
          </Svg>
          {
            !loading
              ? <FingerprintSvg
                color={this.props.fpColor || pallete.accent}
                size={size - 108}
                style={{ position: 'absolute' }}
              />
              : <ActivityIndicator
                size='large'
                color={activityIndicatorColor || pallete.accent}
                style={{ position: 'absolute' }}
              />
          }
        </View>
      </TouchableHighlight>
    )
  }
}
