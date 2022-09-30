chrome.storage.local.get().then(storage => {
    if (storage.settings == undefined) {
        const storageTemplate = { settings: { checkbox1: true, checkbox2: true, checkbox3: true, checkbox4: true, checkbox5: true }, schedule: [], group: '' }
        chrome.storage.local.set(storageTemplate)
        storage = storageTemplate
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.data) {
            case 'changeSettings':
                storage.settings.checkbox1 = request.settings.checkbox1
                storage.settings.checkbox2 = request.settings.checkbox2
                storage.settings.checkbox3 = request.settings.checkbox3
                storage.settings.checkbox4 = request.settings.checkbox4
                storage.settings.checkbox5 = request.settings.checkbox5
                chrome.storage.local.set(storage)
                sendResponse({ answer: 'settings have been changed' })
                break

            case 'settings':
                if (storage.settings.checkbox5)
                    chrome.tabs.query({ url: 'https://orioks.miet.ru/*' }, tabs => {
                        for (const tab of tabs)
                            chrome.scripting.insertCSS({
                                target: { tabId: tab.id },
                                files: ['newCSSRules/styles.css']
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
})