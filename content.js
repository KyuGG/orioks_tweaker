//logo
let logo = document.createElement('img')
logo.src = 'https://lordmyrnya.ru/orioks/resources/img/logo3.png'
logo.width = 50
logo.className = 'navbar-header'
let orioks = document.getElementsByClassName("container")[0]
orioks.prepend(logo)

if (document.location.pathname == '/student/student') { // && соответствующий пункт активирован в меню плагина
    //switch score to normal mode
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
        //delete from 100
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
