import moment from 'moment'
import { Buffer } from 'buffer'
import { forEach } from 'lodash'

module.exports = {
  processProperty: (propertyName, values, computedProperties) => {
    const tokens = Object.keys(values)
    const functions = {
      currentDate: (...args) => {
        return moment().format(args[0])
      },
      basicAuthHash: (...args) => {
        return Buffer.from(`${args[0]}:${args[1]}`).toString('base64')
      }
    }
    let args

    propertyName = propertyName.replace(/[[\]']+/g, '')
    args = computedProperties[propertyName].map(entry => {
      forEach(tokens, token => {
        entry = entry.replace(`:${token}`, values[token])
      })
      return entry
    })

    return functions[propertyName](...args)
  }
}
