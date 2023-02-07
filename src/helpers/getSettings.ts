import GetSettingsResponse from '@/interfaces/GetSettingsResponse'
import wakeUpBackground from './wakeUpBackground'

/** Получение всех настроек из background скрипта */
export default async function getSettings() {
    await wakeUpBackground()

    const settings: GetSettingsResponse = await new Promise(resolve =>
        chrome.runtime.sendMessage(
            { task: 'getSettings' },
            (response: GetSettingsResponse) => resolve(response)
        )
    )

    return settings
}
