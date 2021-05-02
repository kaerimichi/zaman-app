import { StyleSheet } from 'react-native'
import pallete from 'Zaman/src/misc/pallete'

export default StyleSheet.create({
  panelContainer: {
    paddingTop: 22,
    paddingLeft: 22,
    paddingRight: 22
  },
  panelContentWrapper: {
    flex: 1,
    padding: 12,
    borderWidth: 2,
    borderColor: pallete.discrete,
    borderRadius: 12
  },
  panelTitle: {
    fontWeight: 'bold',
    color: pallete.accent,
    textAlign: 'center',
    fontSize: 16
  },
  scrollViewContainer: {
    marginTop: 12
  },
  commonTextItem: {
    textAlign: 'center',
    color: pallete.accent
  },
  pageIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 6
  }
})
