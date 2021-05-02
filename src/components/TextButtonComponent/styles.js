import { StyleSheet } from 'react-native'
import pallete from 'Zaman/src/misc/pallete'

export default StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: pallete.primary,
    borderRadius: 6,
    margin: 12,
    width: 194
  },
  labelText: {
    fontSize: 14,
    color: pallete.primary
  }
})
