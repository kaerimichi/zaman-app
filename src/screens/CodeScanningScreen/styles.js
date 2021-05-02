import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7d3b8a'
  },
  cameraContainer: {
    flex: 1
  },
  codeBoundaryContainer: {
    width: 240,
    height: 240,
    backgroundColor: 'white',
    opacity: 0.35
  },
  scanningInstructionsText: {
    marginTop: 14,
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
    lineHeight: 20
  },
  cancelButtonContainer: {
    alignItems: 'center',
    padding: 38
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18
  }
})
