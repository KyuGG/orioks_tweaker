import GetSettingsResponse from '@/interfaces/GetSettingsResponse'
import wakeUpBackground from './wakeUpBackground'

export default async function getSettings() {
    await wakeUpBackground()

    const settings: GetSettingsResponse = await new Promise(resolve =>
        chrome.runtime.sendMessage({ task: 'getSettings' }, response =>
            resolve(response)
        )
    )

    return settings
}
