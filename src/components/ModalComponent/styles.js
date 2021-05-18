import { StyleSheet } from 'react-native'
import pallete from 'Zaman/src/misc/pallete'

export default StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#00000000'
  },
  mainContainer: {
    backgroundColor: pallete.accent,
    padding: 12,
    margin: 28,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})
