_ini()

function _ini() {
    //плагин не работает в moodle
    if (location.pathname.split('/')[1] != 'moodle') {

        document.getElementsByTagName('html')[0].style.display = 'none'

        window.onload = function () {

            //делаем запрос к настройкам, хранящимся в background.js
            chrome.runtime.sendMessage({ data: 'settings' }, response => {
                if (!chrome.runtime.lastError) {
                    //всевозможные сценарии работы плагина
                    if (response.answer.checkbox1) fixScore()
                    if (response.answer.checkbox2) runDownload()
                    if (response.answer.checkbox3) discNameChanger()
                    if (response.answer.checkbox4 && location.pathname != '/schedule') changeTheme()
                    if (response.answer.checkbox5) schedule()
                }
                else location.reload()
            })

            discNameLoader()

            if (location.pathname == '/bugreport') {
                bugReport()
            }

            document.getElementsByTagName('html')[0].style.display = ''

        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}