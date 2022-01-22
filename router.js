let checkbox1 = document.getElementById('checkbox-1')
let checkbox2 = document.getElementById('checkbox-2')
let checkbox3 = document.getElementById('checkbox-3')

//load settings
checkbox1.checked = (localStorage.getItem('checkbox1') === 'true')
checkbox2.checked = (localStorage.getItem('checkbox2') === 'true')
checkbox3.checked = (localStorage.getItem('checkbox3') === 'true')

if (checkbox1.checked == true) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { file: 'scripts/clear.js' }
        )
    })
}

checkbox1.onclick = () => {
    localStorage.setItem('checkbox1', checkbox1.checked)
    if (checkbox1.checked == true) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                { code: 'alert("Скрипт якобы запущен")' } //code меняем на file в дальнейшем
            )
        })
    }
}

checkbox2.onclick = () => {
    localStorage.setItem('checkbox2', checkbox2.checked)
}

checkbox3.onclick = () => {
    localStorage.setItem('checkbox3', checkbox3.checked)
}
