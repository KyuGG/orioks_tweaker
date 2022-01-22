let checkbox1 = document.getElementById('checkbox-1')
let checkbox2 = document.getElementById('checkbox-2')
let checkbox3 = document.getElementById('checkbox-3')

//load settings from background.js
chrome.runtime.sendMessage({ data: 'settings' }, (response) => {
    checkbox1.checked = (response.answer.checkbox1 === 'true')
    checkbox2.checked = (response.answer.checkbox2 === 'true')
    checkbox3.checked = (response.answer.checkbox3 === 'true')
})


if (checkbox1.checked == true) {
    //activate script
}

const onClick = () => {
    //меняем настройки в background.js
    let settings = {
        'checkbox1': checkbox1.checked,
        'checkbox2': checkbox2.checked,
        'checkbox3': checkbox3.checked
    }
    chrome.runtime.sendMessage({ data: 'changeSettings', settings: settings }, (response) => {
        console.log(response.answer)
    })
}

function test() {
    //добавление лого
    let logo = document.createElement('img')
    logo.src = 'https://lordmyrnya.ru/orioks/resources/img/logo3.png'
    logo.width = 50
    logo.className = 'navbar-header'
    let orioks = document.getElementsByClassName("container")[0]
    orioks.prepend(logo)

    if (document.location.pathname == '/student/student') { // && соответствующий пункт активирован в меню плагина
        //смена "балл" на "сум"
        try {
            let span = document.getElementById("bp")
            let clack = new Event('click')
            span.dispatchEvent(clack)
            span.dispatchEvent(clack)
            span.remove()
            //delete red buttons
            let redButtons = document.getElementsByClassName("mini_circle bad ng-scope")
            let buttonsLength = redButtons.length
            for (let i = 0; i < buttonsLength; i++) {
                redButtons[0].remove()
            }
            //удаление надписей типа "из 100"
            let from100 = document.getElementsByClassName("mvb")
            let from100Length = from100.length
            for (let i = 0; i < from100Length; i++) {
                from100[0].remove()
            }
        }
        catch (err) {
            console.log('already activated')
        }
    }
}

checkbox1.onclick = () => onClick()
checkbox2.onclick = () => onClick()
checkbox3.onclick = () => onClick()
