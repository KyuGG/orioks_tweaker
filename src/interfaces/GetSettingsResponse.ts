import DefaultResponse from './DefaultResponse'
import { Settings } from './StorageSettings'

export default interface GetSettingsResponse extends DefaultResponse {
    settings: Settings
    version: string
}
