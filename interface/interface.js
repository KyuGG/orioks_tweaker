let checkbox1 = document.getElementById('checkbox-1')
let checkbox2 = document.getElementById('checkbox-2')
let checkbox3 = document.getElementById('checkbox-3')
let checkbox4 = document.getElementById('checkbox-4')
let checkbox5 = document.getElementById('checkbox-5')
let bugreport = document.getElementById('bugreport')

//загрузка настроек из background.js
chrome.runtime.sendMessage({ data: 'settings' }, response => {
    checkbox1.checked = response.answer.checkbox1
    checkbox2.checked = response.answer.checkbox2
    checkbox3.checked = response.answer.checkbox3
    checkbox4.checked = response.answer.checkbox4
    checkbox5.checked = response.answer.checkbox5
})


const onClick = () => {
    //меняем настройки в background.js
    let settings = {
        checkbox1: checkbox1.checked,
        checkbox2: checkbox2.checked,
        checkbox3: checkbox3.checked,
        checkbox4: checkbox4.checked,
        checkbox5: checkbox5.checked
    }
    chrome.runtime.sendMessage({ data: 'changeSettings', settings: settings }, response => {
        console.log(response.answer)
    })
}

const openBugReport = () => {
    chrome.runtime.sendMessage({ data: 'bugReport' }, response => {
        console.log(response.answer)
    })
}


checkbox1.onclick = () => onClick()
checkbox2.onclick = () => onClick()
checkbox3.onclick = () => onClick()
checkbox4.onclick = () => onClick()
checkbox5.onclick = () => onClick()
bugreport.onclick = () => openBugReport()