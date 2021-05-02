import { StyleSheet } from 'react-native'
import pallete from 'Zaman/src/misc/pallete'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 6,
    paddingLeft: 6,
    backgroundColor: pallete.fading,
    borderRadius: 4,
    marginBottom: 6,
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  textItem: {
    color: pallete.accent
  }
})
