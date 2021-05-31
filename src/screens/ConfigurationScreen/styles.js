import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import pallete from 'Zaman/src/misc/pallete'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  actionsContainer: {
    height: 66,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  inputsSection: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 40
  },
  textInputs: {
    color: pallete.dark,
    backgroundColor: pallete.light,
    padding: 8,
    fontSize: 18,
    width: Dimensions.get('window').width - 40
  },
  companyInfo: {
    padding: 18,
    width: Dimensions.get('window').width,
    backgroundColor: pallete.light
  },
  companyInfoText: {
    color: pallete.dark,
    fontWeight: 'bold',
    fontSize: 28
  },
  companyInfoDescriptionText: {
    color: pallete.dark,
    marginTop: 8,
    fontSize: 16
  },
  configurationTip: {
    color: pallete.dark,
    fontSize: 14
  },
  noFieldsText: {
    textAlign: 'center',
    color: pallete.dark,
    fontSize: 14,
    padding: 16
  },
  inputLabel: {
    color: pallete.primary,
    fontSize: 16,
    paddingBottom: 8
  },
  inputDescription: {
    color: pallete.discrete,
    paddingBottom: 8,
    fontSize: 14
  },
  noAdditionalConfigContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  logo: {
    width: 32,
    height: 32,
    marginTop: -34,
    flexDirection: 'column',
    resizeMode: 'stretch',
    alignSelf: 'flex-end'
  }
})
