document.documentElement.style.visibility = 'hidden'

getSettings().then(settings => {
    changeTheme()

    window.onload = async () => {
        await sleep(100)
        if (settings.answer.checkbox1) fixScore()
        if (settings.answer.checkbox2) runDownload()
        if (settings.answer.checkbox3) await schedule()
        if (settings.answer.checkbox4) discNameChanger()
        if (settings.answer.checkbox5) coloredElements()
        logo()
        discNameLoader()
        bugReport()
        document.documentElement.style.visibility = 'visible'
        await sleep(500)
        document.documentElement.style.setProperty('--transition', '.3s')
    }
})


function getSettings() {
    return new Promise(resolve => {
        chrome.runtime.sendMessage({ data: 'settings' }, response => {
            if (!chrome.runtime.lastError)
                resolve(response)
            else location.reload()
        })
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}