import AsyncStorage from '@react-native-community/async-storage'

const DEFAULT_STORAGE_CLASS = '@ZamanMainStorage'

export default class StorageService {
  constructor (storageClass) {
    this.storageClass = storageClass || DEFAULT_STORAGE_CLASS
  }

  parseData (asyncStoragePromise) {
    return asyncStoragePromise.then(content => {
      try {
        return content ? JSON.parse(content) : null
      } catch (e) {
        return null
      }
    })
  }

  stringifyData (content) {
    return JSON.stringify(content)
  }

  clear () {
    return AsyncStorage.clear()
  }

  getItem (alias) {
    return this.parseData(AsyncStorage.getItem(`${this.storageClass}:${alias}`))
  }

  setItem (alias, content) {
    return AsyncStorage.setItem(`${this.storageClass}:${alias}`, this.stringifyData(content))
  }

  removeItem (alias) {
    return AsyncStorage.removeItem(`${this.storageClass}:${alias}`)
  }
}
