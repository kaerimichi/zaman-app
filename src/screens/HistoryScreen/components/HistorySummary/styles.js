import { StyleSheet, Dimensions } from 'react-native'
import pallete from 'Zaman/src/misc/pallete'

export default StyleSheet.create({
  container: {
    padding: 14,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    borderBottomWidth: 1,
    borderBottomColor: pallete.accent,
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  itemHeaderText: {
    fontSize: 14,
    color: pallete.primary
  },
  itemContentText: {
    color: pallete.primary
  },
  lineItem: {
    paddingTop: 2,
    paddingBottom: 2
  }
})
