import getSettings from '../functions/getSettings'

document.documentElement.style.visibility = 'hidden'

const settings = await getSettings()
// changeTheme()
window.onload = async () => {
    // logo()
    // bugReport()
    // await sleep(100)
    // if (settings.answer.checkbox1) fixScore()
    // if (settings.answer.checkbox2) runDownload()
    // if (settings.answer.checkbox3) await schedule()
    // if (settings.answer.checkbox4) discNameChanger()
    // if (settings.answer.checkbox5) coloredElements()
    // discNameLoader()
    document.documentElement.style.visibility = 'visible'
    await sleep(500)
    document.documentElement.style.setProperty('--transition', '.3s')
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
