import getSettings from '@/helpers/getSettings'
import changeLogo from '@/functions/changeLogo'
import fixScore from '@/functions/fixScore'
import fixDownload from '@/functions/fixDownload'
import bugReport from '@/functions/bugReport'
import schedule from '@/functions/schedule'

document.documentElement.style.visibility = 'hidden'

const { settings } = await getSettings()
// changeTheme()
window.onload = async () => {
    changeLogo()
    bugReport()

    await sleep(100)

    if (settings.fixScore) fixScore()
    if (settings.fixDownload) fixDownload()
    if (settings.schedule) schedule()
    // if (settings.answer.checkbox4) discNameChanger()
    // if (settings.answer.checkbox5) coloredElements()
    // discNameLoader()
    document.documentElement.style.visibility = 'visible'
    await sleep(500)
    document.documentElement.style.setProperty('--transition', '.3s')
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
