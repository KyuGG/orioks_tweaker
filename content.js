document.documentElement.style.visibility = 'hidden'

getSettings().then(settings => {
    loadTheme()

    const navItems = [
        {
            name: 'Расписание',
            href: '/schedule',
            condition: settings.answer.checkbox3,
            position: 1
        },
        {
            name: 'Стиль',
            href: '/customization',
            condition: true,        //TODO: add actual checkbox
            position: 1
        }
    ]
    
    window.onload = async () => {
        logo()
        bugReport()
        await sleep(100)
        await appendNavItems(navItems)
        if (settings.answer.checkbox1) fixScore()
        if (settings.answer.checkbox2) runDownload()
        if (settings.answer.checkbox3) await schedule()
        //if (settings.answer.checkbox3) await customThemePage()
        if (settings.answer.checkbox4) discNameChanger()
        if (settings.answer.checkbox5) coloredElements()
        discNameLoader()
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