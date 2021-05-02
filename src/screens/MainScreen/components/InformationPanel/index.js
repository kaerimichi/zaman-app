import React, { PureComponent } from 'react'
import { Text, View, ScrollView } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import ListItem from './components/ListItem'
import PageIndicator from './components/PageIndicator'
import styles from './styles'

export default class InformationPanel extends PureComponent {
  state = {
    currentPage: 0,
    pages: 3
  }

  renderList (items) {
    return items.map(({ title, text }, index) => {
      return <ListItem key={index} title={title} text={text} />
    })
  }

  renderPages (contents, width, height) {
    return contents.map((entry, index) => {
      return (
        <View key={index + 1} style={[styles.panelContainer, { width: parseInt(width), height: parseInt(height) }]}>
          <View style={styles.panelContentWrapper}>
            <Text style={styles.panelTitle}>{ entry.listTitle }</Text>
            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
              {
                entry.items.length
                  ? this.renderList(entry.items)
                  : <Text style={styles.commonTextItem}>Sem informações.</Text>
              }
            </ScrollView>
          </View>
        </View>
      )
    })
  }

  updatePageIndicator = ({ nativeEvent }) => {
    this.setState({ currentPage: nativeEvent.position })
  }

  render () {
    const { width, height, contents } = Object.assign({}, this.props)

    return (
      <View style={{ width: parseInt(width), height: parseInt(height) }}>
        <ViewPager
          style={{ flex: 1 }}
          initialPage={this.state.currentPage}
          onPageSelected={this.updatePageIndicator}
        >
          { this.renderPages(contents, width, height) }
        </ViewPager>
        {
          contents.length > 0
            ? (
              <View style={styles.pageIndicatorContainer}>
                <PageIndicator
                  pages={ this.state.pages }
                  currentPage={ this.state.currentPage }
                />
              </View>
            )
            : null
        }
      </View>
    )
  }
}
