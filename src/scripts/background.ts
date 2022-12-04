import GetSettingsResponse from '../interfaces/getSettingsResponse'
import { StorageSettings } from '../interfaces/StorageSettings'

const storageTemplate: StorageSettings = {
    version: '1.0.12',
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
if (storage?.version !== storageTemplate.version) {
    storage = storageTemplate
    await chrome.storage.local.set(storage)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.task) {
        case 'changeSettings':
            storage.settings = request.settings
            chrome.storage.local.set(storage)
            sendResponse({ answer: 'settings have been changed' })
            break

        case 'settings':
            if (storage.settings.darkTheme)
                chrome.tabs.query({ url: 'https://orioks.miet.ru/*' }, tabs => {
                    for (const tab of tabs)
                        chrome.scripting.insertCSS({
                            target: { tabId: tab.id as number },
                            files: ['newCSSRules/styles.scss'],
                        })
                })

        case 'getSettings':
            const settingsResponse: GetSettingsResponse = {
                settings: storage.settings,
                version: storage.version,
            }
            sendResponse(settingsResponse)
            break

        case 'getSchedule':
            sendResponse({
                answer: storage.schedule,
                group: storage.group,
            })
            break

        case 'setSchedule':
            storage.schedule = request.schedule
            storage.group = request.group
            chrome.storage.local.set(storage)
            sendResponse({ answer: 'settings have been changed' })
            break
    }
})

export {}
