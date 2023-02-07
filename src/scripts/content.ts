import getSettings from '@/helpers/getSettings'
import sleep from '@/helpers/sleep'

import changeLogo from '@/functions/changeLogo'
import fixScore from '@/functions/fixScore'
import fixDownload from '@/functions/fixDownload'
import bugReport from '@/functions/bugReport'
import schedule from '@/functions/schedule'
import disciplineNames from '@/functions/disciplineNames'
import disciplineEditTools from '@/functions/disciplineEditTools'
import changeTheme from '@/functions/changeTheme'

document.documentElement.style.visibility = 'hidden'

window.onload = async () => {
    changeLogo()
    bugReport()
    changeTheme()

    const { settings } = await getSettings()

    if (settings.fixScore) fixScore()
    if (settings.fixDownload) fixDownload()
    if (settings.schedule) schedule()
    if (settings.disciplineNames) disciplineEditTools()
    
    disciplineNames()
    document.documentElement.style.visibility = 'visible'
    await sleep(500)
    document.documentElement.style.setProperty('--transition', '.3s')
}

