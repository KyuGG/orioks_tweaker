const checkboxAll = document.getElementById('checkbox-all')
const checkbox1 = document.getElementById('checkbox-1')
const checkbox2 = document.getElementById('checkbox-2')
const checkbox3 = document.getElementById('checkbox-3')
const checkbox4 = document.getElementById('checkbox-4')
const checkbox5 = document.getElementById('checkbox-5')
const bugreport = document.getElementById('bugreport')
const description = document.getElementById('description')
window.onload = () => document.body.style.opacity = '100%'

chrome.runtime.sendMessage({ data: 'settingsPopup' }, response => {
    if (!chrome.runtime.lastError) {
        checkbox1.checked = response.answer.checkbox1
        checkbox2.checked = response.answer.checkbox2
        checkbox3.checked = response.answer.checkbox3
        checkbox4.checked = response.answer.checkbox4
        checkbox5.checked = response.answer.checkbox5
        checkboxAll.checked = checkbox1.checked && checkbox2.checked && checkbox3.checked && checkbox4.checked && checkbox5.checked
        setTimeout(() => document.documentElement.style.setProperty('--setting-transition', 'all .3s'), 100)
    }
    else location.reload()
})

bugreport.onclick = () => {
    chrome.tabs.create({ url: 'https://orioks.miet.ru/bugreport' })
}

description.onclick = () => {
    chrome.tabs.create({ url: 'https://github.com/KyuGG/orioks_tweaker#функционал' })
}

function onClick () {
    checkboxAll.checked = checkbox1.checked && checkbox2.checked && checkbox3.checked && checkbox4.checked && checkbox5.checked
    const settings = {
        checkbox1: checkbox1.checked,
        checkbox2: checkbox2.checked,
        checkbox3: checkbox3.checked,
        checkbox4: checkbox4.checked,
        checkbox5: checkbox5.checked
    }
    chrome.runtime.sendMessage({ data: 'changeSettings', settings: settings }, response => console.log(response.answer))
}

checkboxAll.onclick = () => {
    const isTurnedOn = checkboxAll.checked
    
    checkbox1.checked = isTurnedOn
    checkbox2.checked = isTurnedOn
    checkbox3.checked = isTurnedOn
    checkbox4.checked = isTurnedOn
    checkbox5.checked = isTurnedOn
    
    const settings = {
        checkbox1: isTurnedOn,
        checkbox2: isTurnedOn,
        checkbox3: isTurnedOn,
        checkbox4: isTurnedOn,
        checkbox5: isTurnedOn
    }
    chrome.runtime.sendMessage({ data: 'changeSettings', settings: settings }, response => console.log(response.answer))
}


checkbox1.onclick = onClick
checkbox2.onclick = onClick
checkbox3.onclick = onClick
checkbox4.onclick = onClick
checkbox5.onclick = onClick