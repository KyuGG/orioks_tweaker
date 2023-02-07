import DefaultRequest from './DefaultRequest'
import { Settings } from './StorageSettings'

export default interface SetSettingsRequest extends DefaultRequest {
    settings: Settings
}
