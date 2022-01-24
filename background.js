//конструктор с дефолтными настройками
if (localStorage.length == 0) {
    localStorage.setItem('checkbox1', false)
    localStorage.setItem('checkbox2', false)
}

//связь между content.js и router.js
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.data === 'settings')
            sendResponse({ answer: localStorage })
        if (request.data === 'changeSettings') {
            localStorage.setItem('checkbox1', request.settings.checkbox1)
            localStorage.setItem('checkbox2', request.settings.checkbox2)
            sendResponse({ answer: 'settings have been changed' })
        }
    }
)