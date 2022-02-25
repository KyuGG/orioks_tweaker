let checkbox1 = document.getElementById('checkbox-1')
let checkbox2 = document.getElementById('checkbox-2')
let checkbox3 = document.getElementById('checkbox-3')
let checkbox4 = document.getElementById('checkbox-4')
let bugreport = document.getElementById('bugreport')

//загрузка настроек из background.js
chrome.runtime.sendMessage({ data: 'settings' }, (response) => {
    checkbox1.checked = (response.answer.checkbox1 === 'true')
    checkbox2.checked = (response.answer.checkbox2 === 'true')
    checkbox3.checked = (response.answer.checkbox3 === 'true')
    checkbox4.checked = (response.answer.checkbox4 === 'true')
})


const onClick = () => {
    //меняем настройки в background.js
    let settings = {
        'checkbox1': checkbox1.checked,
        'checkbox2': checkbox2.checked,
        'checkbox3': checkbox3.checked,
        'checkbox4': checkbox4.checked
    }
    chrome.runtime.sendMessage({ data: 'changeSettings', settings: settings }, (response) => {
        console.log(response.answer)
    })
}

const openBugReport = () => {
    chrome.runtime.sendMessage({ data: 'bugReport' }, (response) => {
        console.log(response.answer)
    })
}


checkbox1.onclick = () => onClick()
checkbox2.onclick = () => onClick()
checkbox3.onclick = () => onClick()
checkbox4.onclick = () => onClick()
bugreport.onclick = () => openBugReport()