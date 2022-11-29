interface StorageSettings {
    version: string
    settings: {
        fixScore: boolean
        fixDownload: boolean
        schedule: boolean
        disciplineNames: boolean
        darkTheme: boolean
    }
    schedule: []
    group: string
}

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
    switch (request.data) {
        case 'changeSettings':
            storage.settings.fixScore = request.settings.fixScore
            storage.settings.fixDownload = request.settings.fixDownload
            storage.settings.schedule = request.settings.schedule
            storage.settings.disciplineNames = request.settings.disciplineNames
            storage.settings.darkTheme = request.settings.darkTheme
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

        case 'settingsPopup':
            sendResponse({ answer: storage.settings })
            break

        case 'getSchedule':
            sendResponse({ answer: storage.schedule, group: storage.group })
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
