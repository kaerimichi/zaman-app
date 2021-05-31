import React, { Component } from 'react'
import { TextInput, Text, View, ScrollView, SafeAreaView, Image } from 'react-native'
import ButtonComponent from 'Zaman/src/components/ButtonComponent'
import StorageService from 'Zaman/src/lib/services/StorageService'
import ShareConfigModal from './components/ShareConfigModal'
import pallete from 'Zaman/src/misc/pallete'
import styles from './styles'

export default class ConfigurationScreen extends Component {
  static navigationOptions = {
    title: 'Configurações',
    headerTintColor: pallete.primary
  }

  storage = new StorageService()

  state = {
    serviceName: '',
    serviceDescription: null,
    logoUrl: null,
    fields: null,
    shareConfigVisible: false
  }

  async UNSAFE_componentWillMount () {
    const {
      fields,
      displayName,
      description,
      logoUrl
    } = await this.storage.getItem('serviceConfiguration')

    this.setState({
      fields,
      logoUrl,
      serviceName: displayName,
      serviceDescription: description
    })
  }

  renderInputs () {
    const updateState = (value, index) => {
      let { fields } = this.state
      fields[index].value = value
      this.setState({ fields })
    }

    return this.state.fields.map((entry, index) => {
      return (
        <View key={entry.alias} style={{ marginTop: 26 }}>
          <Text style={styles.inputLabel}>{entry.displayName}:</Text>
          {
            entry.description
              ? <Text style={styles.inputDescription}>entry.description</Text>
              : null
          }
          <TextInput
            value={entry.value}
            style={styles.textInputs}
            keyboardType={entry.keyboardType}
            secureTextEntry={entry.secure}
            onChangeText={value => updateState(value, index)}
            underlineColorAndroid='transparent'
          />
        </View>
      )
    })
  }

  saveConfiguration = async () => {
    let configuration = await this.storage.getItem('serviceConfiguration')

    configuration.fields = this.state.fields

    await this.storage.setItem('serviceConfiguration', configuration)

    this.props.navigation.pop()
  }

  displayConfigCode = () => {
    this.setState({ shareConfigVisible: true })
  }

  dismissConfigModal = () => {
    this.setState({ shareConfigVisible: false })
  }

  render () {
    const { replace } = this.props.navigation

    return (
      <View style={styles.container}>
        <ShareConfigModal visible={this.state.shareConfigVisible} onDismiss={this.dismissConfigModal} />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.companyInfo}>
              <Text style={styles.companyInfoText}>
                {this.state.serviceName}
              </Text>
              {
                this.state.logoUrl
                  ? <Image style={styles.logo} source={{ uri: this.state.logoUrl }}></Image>
                  : null
              }
              {
                this.state.serviceDescription
                  ? <Text style={styles.companyInfoDescriptionText}>{this.state.serviceDescription}</Text>
                  : null
              }
            </View>
            <View style={styles.inputsSection}>
              {
                !this.state.fields
                  ? (
                    <View style={styles.noAdditionalConfigContainer}>
                      <Text style={styles.noFieldsText}>Não há configurações adicionais.</Text>
                    </View>
                  )
                  : this.renderInputs()
              }
            </View>
          </ScrollView>
        </SafeAreaView>
        <View style={styles.actionsContainer}>
          <ButtonComponent iconName='refresh' label='reconfigurar' onPress={() => replace('serviceScan')} />
          <ButtonComponent iconName='share' label='compartilhar' onPress={this.displayConfigCode} />
          <ButtonComponent iconName='save' label='salvar' onPress={this.saveConfiguration} />
        </View>
      </View>
    )
  }
}
