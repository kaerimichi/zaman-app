import { StyleSheet, Dimensions } from 'react-native'
import pallete from 'Zaman/src/misc/pallete'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    width: Dimensions.get('window').width,
    borderBottomWidth: 1,
    borderBottomColor: pallete.accent
  },
  itemHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
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
