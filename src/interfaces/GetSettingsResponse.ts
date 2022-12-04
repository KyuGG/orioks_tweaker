import { Settings } from './StorageSettings'

export default interface GetSettingsResponse {
    settings: Settings
    version: string
}
