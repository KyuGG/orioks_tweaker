import DefaultRequest from '@/interfaces/DefaultRequest'
import SetSettingsRequest from '@/interfaces/SetSettingsRequest'
import SetScheduleRequest from '@/interfaces/SetScheduleRequest'

import GetScheduleResponse from '@/interfaces/GetScheduleResponse'
import GetSettingsResponse from '@/interfaces/GetSettingsResponse'

import { StorageSettings } from '@/interfaces/StorageSettings'

const storageTemplate: StorageSettings = {
    version: chrome.runtime.getManifest().version,
    settings: {
        fixScore: true,
        fixDownload: true,
        schedule: true,
        disciplineNames: true,
        darkTheme: true,
    },
    schedule: [],
    group: '',
}

let storage = (await chrome.storage.local.get()) as StorageSettings

//update local storage
if (storage.version !== storageTemplate.version) {
    storage = storageTemplate
    await chrome.storage.local.set(storage)
}

chrome.runtime.onMessage.addListener(
    async (request: DefaultRequest, sender, sendResponse) => {
        switch (request.task) {
            case 'setSettings':
                const settingsRequest = request as SetSettingsRequest
                storage.settings = settingsRequest.settings
                chrome.storage.local.set(storage)
                sendResponse({ answer: 'settings have been changed' })
                break

            case 'getSettings':
                const settingsResponse: GetSettingsResponse = {
                    answer: 'settings sent',
                    settings: storage.settings,
                    version: storage.version,
                }

                if (storage.settings.darkTheme)
                    chrome.tabs.query(
                        { url: 'https://orioks.miet.ru/*' },
                        tabs => {
                            for (const tab of tabs)
                                chrome.scripting.insertCSS({
                                    target: { tabId: tab.id as number },
                                    files: ['styles/styles.css'],
                                })
                        }
                    )

                sendResponse(settingsResponse)
                break

            case 'getSchedule':
                const scheduleResponse: GetScheduleResponse = {
                    answer: 'settings sent',
                    schedule: storage.schedule,
                    group: storage.group,
                }
                sendResponse(scheduleResponse)
                break

            case 'setSchedule':
                const scheduleRequest = request as SetScheduleRequest
                storage.schedule = scheduleRequest.schedule
                storage.group = scheduleRequest.group
                chrome.storage.local.set(storage)
                sendResponse({ answer: 'settings have been changed' })
                break

            case 'wakeUp':
                sendResponse({ answer: 'woke up' })
                break
        }
    }
)

export {}
