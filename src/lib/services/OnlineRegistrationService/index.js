import { forEach, mapValues, get } from 'lodash'
import axios from 'axios'
import messages from './messages'
import { processProperty } from './helpers/ComputedPropertiesHelper'

const DEFAULT_ERR_MSG = 'Ocorreu um erro!'
const DEFAULT_TIMEOUT = 20000

export default class OnlineRegistrationService {
  constructor (config) {
    this.config = config
  }

  getPreparedAction (config, actionAlias) {
    const getCustomValues = config => {
      if (!config) return null

      const values = config.data

      forEach(config.fields, entry => {
        values[entry.alias] = entry.value
      })

      return values
    }
    const values = getCustomValues(config)
    const getParsedConfig = (config, values, actionName) => {
      const { actions, computedProperties } = config
      const requestComputedProperties = computedProperties
      const action = actions.find(entry => entry.alias === actionName)

      forEach(['data', 'headers', 'queryParams', 'endpoint'], replaceableAlias => {
        const tokens = Object.keys(values)

        if (typeof action[replaceableAlias] === 'string') {
          forEach(tokens, token => {
            let computedProperties = action[replaceableAlias].match(/\[(.*?)\]/gm)

            action[replaceableAlias] = action[replaceableAlias].replace(`:${token}`, values[token])

            if (computedProperties) {
              forEach(computedProperties, computedProperty => {
                action[replaceableAlias] = action[replaceableAlias].replace(
                  computedProperty, processProperty(computedProperty, values, requestComputedProperties)
                )
              })
            }
          })
        } else {
          action[replaceableAlias] = mapValues(action[replaceableAlias], entry => {
            forEach(tokens, token => {
              let computedProperties = entry.match(/\[(.*?)\]/gm)

              entry = entry.replace(`:${token}`, values[token])

              if (computedProperties) {
                forEach(computedProperties, computedProperty => {
                  entry = entry.replace(
                    computedProperty, processProperty(computedProperty, values, requestComputedProperties)
                  )
                })
              }
            })

            return entry
          })
        }
      })

      return action
    }

    return config && config.actions && this.config.actions.find(c => c.alias === actionAlias)
      ? getParsedConfig(config, values, actionAlias)
      : null
  }

  register () {
    try {
      const registerAction = this.getPreparedAction(this.config, 'registration')

      if (!registerAction) {
        throw new Error('Configuração inválida.')
      }

      const url = `${this.config.apiBaseUrl}/${registerAction.endpoint}`
      const options = { headers: registerAction.headers, timeout: DEFAULT_TIMEOUT }

      return axios.post(url, registerAction.data, options)
        .then(({ data }) => {
          return {
            punches: get(data, registerAction.responseTokens.success.punches),
            statistics: get(data, registerAction.responseTokens.success.statistics)
          }
        })
        .catch(({ response }) => {
          const errorMessage = response
            ? get(response.data, registerAction.responseTokens.failure.message)
            : DEFAULT_ERR_MSG

          throw new Error(errorMessage)
        })
    } catch (e) {
      throw e
    }
  }

  retrieveHistory () {
    try {
      const historyRetrieval = this.getPreparedAction(this.config, 'history')

      if (!historyRetrieval) {
        throw new Error(messages.history.invalidConfiguration)
      }

      const url = `${this.config.apiBaseUrl}/${historyRetrieval.endpoint}`
      const options = { headers: historyRetrieval.headers, timeout: DEFAULT_TIMEOUT }

      return axios.get(url, options)
        .then(({ data }) => {
          return {
            punches: get(data, historyRetrieval.responseTokens.success.punches),
            statistics: get(data, historyRetrieval.responseTokens.success.statistics)
          }
        })
        .catch(({ response }) => {
          const errorMessage = response
            ? get(response.data, historyRetrieval.responseTokens.failure.message)
            : DEFAULT_ERR_MSG

          throw new Error(errorMessage)
        })
    } catch (e) {
      throw e
    }
  }
}
