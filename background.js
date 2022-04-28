chrome.storage.local.get().then(storage => {
    if (storage.settings == undefined) {
        const storageTemplate = { settings: { checkbox1: true, checkbox2: true, checkbox3: true, checkbox4: true, checkbox5: true } }
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
            case 'bugReport':
                chrome.tabs.create({ url: 'https://orioks.miet.ru/bugreport' })
                sendResponse({ answer: 'page was opened successfully' })
                break
            case 'settings':
                if (storage.settings.checkbox4)
                    chrome.tabs.query({ url: 'https://orioks.miet.ru/*', active: true }, tabs => {
                        chrome.scripting.insertCSS({
                            target: { tabId: tabs[0].id },
                            files: ['newCSSRules/styles.css']
                        })
                    })
            case 'settingsPopup':
                sendResponse({ answer: storage.settings })
                break
        }
    })
})