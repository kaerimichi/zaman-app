import { StyleSheet } from 'react-native'
import pallete from 'Zaman/src/misc/pallete'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7d3b8a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  clockSection: {
    flex: 7,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  summaryContainer: {
    flex: 4
  },
  actionsContainer: {
    height: 66,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  infoText: {
    fontSize: 16,
    color: '#af78ba'
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 64 / 2,
    width: 64,
    height: 64
  },
  genericToast: {
    backgroundColor: pallete.accent,
    padding: 12
  },
  genericToastText: {
    textAlign: 'center',
    color: pallete.primary,
    fontSize: 14,
    fontWeight: 'bold'
  }
})
