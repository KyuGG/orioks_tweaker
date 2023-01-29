import getSettings from '@/helpers/getSettings'
import changeLogo from '@/functions/changeLogo'
import fixScore from '@/functions/fixScore'
import fixDownload from '@/functions/fixDownload'
import bugReport from '@/functions/bugReport'
import schedule from '@/functions/schedule'
import disciplineNames from '@/functions/disciplineNames'
import disciplineEditTools from '@/functions/disciplineEditTools'

document.documentElement.style.visibility = 'hidden'

// changeTheme()
window.onload = async () => {
    changeLogo()
    bugReport()

    const { settings } = await getSettings()

    if (settings.fixScore) fixScore()
    if (settings.fixDownload) fixDownload()
    if (settings.schedule) schedule()
    if (settings.disciplineNames) disciplineEditTools()
    // if (settings.answer.checkbox5) coloredElements()
    disciplineNames()
    document.documentElement.style.visibility = 'visible'
    await sleep(500)
    document.documentElement.style.setProperty('--transition', '.3s')
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
