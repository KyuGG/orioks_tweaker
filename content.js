document.documentElement.style.visibility = 'hidden'

getSettings().then(settings => {
    if (settings.answer.checkbox4) {
        document.documentElement.style.setProperty('--color1', '#202124')
        document.documentElement.style.setProperty('--color2', '#353535')
        document.documentElement.style.setProperty('--color3', 'rgb(30, 30, 30)')
        document.documentElement.style.setProperty('--color4', 'rgb(20, 33, 41)')
        document.documentElement.style.setProperty('--color5', 'rgb(0, 140, 186)')
        document.documentElement.style.setProperty('--navbar', '#1c1b18')
        document.documentElement.style.setProperty('--text-color', 'white')
    }

    window.onload = () => {
        if (settings.answer.checkbox1) fixScore()
        if (settings.answer.checkbox2) runDownload()
        if (settings.answer.checkbox3) discNameChanger()
        if (settings.answer.checkbox5) schedule()
        discNameLoader()
        bugReport()
        document.documentElement.style.visibility = 'visible'
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