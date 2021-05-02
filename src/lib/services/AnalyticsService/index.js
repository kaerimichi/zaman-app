export default class AnalyticsService {
  constructor () {
    this.trackers = {
      main: {
        trackScreenView: (screenName) => {
          // this is a placeholder
        },
        trackEvent: (category, action) => {
          // this is a placeholder
        }
      }
    }
  }

  trackScreenView (screenName, trackerAlias = 'main') {
    this.trackers[trackerAlias].trackScreenView(screenName)
  }

  trackEvent (category, action, trackerAlias = 'main') {
    this.trackers[trackerAlias].trackEvent(category, action)
  }
}
