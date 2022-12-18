document.documentElement.style.visibility = 'hidden'

getSettings().then(settings => {
    changeTheme()
})

window.addEventListener('load', onloadFunc)

async function onloadFunc(){
    const settings = await getSettings()
    logo()
    bugReport()
    await sleep(100)
    if (settings.answer.checkbox1) fixScore()
    if (settings.answer.checkbox2) runDownload()
    if (settings.answer.checkbox3) await schedule()
    if (settings.answer.checkbox4) discNameChanger()
    if (settings.answer.checkbox5) coloredElements()
    discNameLoader()
    document.documentElement.style.visibility = 'visible'
    await sleep(500)
    document.documentElement.style.setProperty('--transition', '.3s')
}


async function getSettings() {
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