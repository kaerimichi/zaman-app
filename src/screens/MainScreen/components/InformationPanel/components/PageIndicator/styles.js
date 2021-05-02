import { StyleSheet } from 'react-native'
import pallete from 'Zaman/src/misc/pallete'

const circleSize = 6
const margin = 4

export default StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: pallete.discrete,
    marginLeft: margin,
    marginRight: margin
  },
  circleActive: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: pallete.accent,
    marginLeft: margin,
    marginRight: margin
  }
})
