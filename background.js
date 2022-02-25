//конструктор с дефолтными настройками
if (!localStorage.length) {
    localStorage.setItem('checkbox1', true)
    localStorage.setItem('checkbox2', true)
    localStorage.setItem('checkbox3', true)
    localStorage.setItem('checkbox4', true)
}

//связь между content.js и router.js
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.data === 'settings')
            sendResponse({ answer: localStorage })
        if (request.data === 'changeSettings') {
            localStorage.setItem('checkbox1', request.settings.checkbox1)
            localStorage.setItem('checkbox2', request.settings.checkbox2)
            localStorage.setItem('checkbox3', request.settings.checkbox3)
            localStorage.setItem('checkbox4', request.settings.checkbox4)
            sendResponse({ answer: 'settings have been changed' })
        }
        if (request.data === 'bugReport') {
            chrome.tabs.create({ url: 'https://orioks.miet.ru/bugreport' })
            sendResponse({ answer: 'page was opened successfully' })
        }
    }
)