//делаем запрос к настройкам, хранящимся в background.js
chrome.runtime.sendMessage({ data: 'settings' }, (response) => {
    //всевозможные сценарии работы плагина
    if (response.answer.checkbox1 == 'true') {
        removeTrash()
    }
    if (response.answer.checkbox2 == 'true') {
        //
    }
    if (response.answer.checkbox3 == 'true') {
        //
    }
})

//функционал плагина
function removeTrash() {
    //добавление лого
    let logo = document.createElement('img')
    logo.src = 'https://lordmyrnya.ru/orioks/resources/img/logo3.png'
    logo.width = 50
    logo.className = 'navbar-header'
    let orioks = document.getElementsByClassName("container")[0]
    orioks.prepend(logo)
    //смена балл на сум
    if (document.location.pathname == '/student/student') {
        let span = document.getElementById("bp")
        let clack = new Event('click')
        span.dispatchEvent(clack)
        span.dispatchEvent(clack)
        span.remove()
        //удаление красных точек
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
}
