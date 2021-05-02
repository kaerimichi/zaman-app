import { StyleSheet } from 'react-native'
import pallete from 'Zaman/src/misc/pallete'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 10
  },
  mainContent: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noDataText: {
    color: pallete.primary,
    textAlign: 'center'
  }
})
