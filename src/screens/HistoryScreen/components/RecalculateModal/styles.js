import { StyleSheet } from 'react-native'
import pallete from 'Zaman/src/misc/pallete'

export default StyleSheet.create({
  modalBackground: {
    flex: 1,
    padding: 26,
    backgroundColor: pallete.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructionsContainer: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  instructionsText: {
    color: pallete.accent,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 17,
    lineHeight: 22
  },
  actionsContainer: {
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  instructionsIcon: {
    alignSelf: 'center',
    marginBottom: 18
  },
  policyContainer: {
    marginTop: 16
  },
  policyText: {
    fontSize: 12,
    color: pallete.primary
  }
})
