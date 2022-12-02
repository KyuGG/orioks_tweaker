import StorageSettings from './StorageSettings'

export default interface GetSettingsResponse {
    settings: StorageSettings['settings']
    version: StorageSettings['version']
}
