_ini()

function _ini() {

    document.getElementsByTagName('html')[0].style.display = 'none'

    window.onload = function () {

        //делаем запрос к настройкам, хранящимся в background.js
        chrome.runtime.sendMessage({ data: 'settings' }, (response) => {
            //всевозможные сценарии работы плагина
            if (response.answer.checkbox1 == 'true') {
                removeTrash()
            }
            if (response.answer.checkbox2 == 'true') {
                darkTheme()
            }
        })

        document.getElementsByTagName('html')[0].style.display = 'block'

    }

}


//функционал плагина
function removeTrash() {
    //добавление лого
    let logo = document.createElement('img')
    logo.src = 'https://lordmyrnya.ru/orioks/resources/img/logo3.png'
    logo.width = 50
    logo.className = 'navbar-header'
    let orioks = document.getElementsByClassName('container')[0]
    orioks.prepend(logo)
    if (document.location.pathname == '/student/student') {
        //смена балл на сум
        let span = document.getElementById('bp')
        let clack = new Event('click')
        span.dispatchEvent(clack)
        span.dispatchEvent(clack)
        span.remove()
        //удаление красных точек
        document.querySelectorAll('.bad').forEach(el => el.remove())
        //удаление надписей типа "из 100"
        document.querySelectorAll('.mvb').forEach(el => el.remove())
    }
}

function darkTheme() {
    let black = '#353535'
    let purple = '#b63dd2'
    let white = '#fff'
    document.body.style.backgroundColor = black
    document.body.style.color = white
    let path = document.location.pathname

    changeRule('color', 'rgb(0, 82, 110)', purple)

    //колокольчик
    document.styleSheets[3].cssRules[37].style.background = '#007196'
    document.styleSheets[3].cssRules[38].style.background = black
    changeRule('backgroundColor', 'rgb(247, 247, 247)', 'rgb(30, 30, 30)')

    //инструкции
    changeRule('backgroundColor', 'rgb(255, 255, 255)', 'rgb(30, 30, 30)')
    //(DONE)! темная тема для корневой страницы
    if (path == '/') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        changeRule("backgroundColor", "rgb(255, 255, 255)", "rgb(30, 30, 30)")
        changeRule("backgroundColor", "rgb(238, 238, 238)", "rgb(30, 30, 30)")
    }
    //(DONE)! темная тема для страницы ЧаВо
    if (path == '/faq' || path == '/faq/index') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('select').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('input').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        //если нажата кнопка искать
        if (document.querySelectorAll('.newColor').length > 0) {
            document.querySelectorAll('.panel-heading').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })

            document.getElementById('collapse_cat1').style.backgroundColor = black

            document.styleSheets[2].cssRules[1329].style.removeProperty('color')
            document.styleSheets[0].cssRules[0].style.removeProperty('color')
        }

    }
    //(DONE)! темная тема для страницы с баллами
    if (path == '/student/student') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('select').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('ul')[5].style.backgroundColor = black

        document.styleSheets[1].cssRules[7].style.background = '#1FA5F7'
        document.styleSheets[1].cssRules[6].style.background = '#71C0F0'
        document.styleSheets[1].cssRules[5].style.background = '#7D919E'
        document.styleSheets[1].cssRules[4].style.background = '#fff'
        document.styleSheets[1].cssRules[3].style.background = '#C49068'
        document.styleSheets[1].cssRules[2].style.color = 'black'

        //динамические блоки
        document.styleSheets[3].cssRules[1324].style.backgroundColor = black
        document.styleSheets[3].cssRules[1288].style.backgroundColor = black

        document.querySelectorAll('.list-group-item').forEach(el => el.style.backgroundColor = black)

        document.querySelectorAll('.panel-heading').forEach(el => el.style.color = white)

        changeRule('backgroundColor', 'rgb(245, 245, 245)', 'rgb(30, 30, 30)')
        changeRule('backgroundColor', 'rgb(217, 237, 247)', 'rgb(30, 30, 30)')
        changeRule('backgroundColor', 'rgb(196, 227, 243)', 'rgb(30, 30, 30)')
        changeRule('backgroundColor', 'rgb(223, 240, 216)', 'rgb(41, 67, 43)')
        changeRule('backgroundColor', 'rgb(208, 233, 198)', 'rgb(30, 30, 30)')

        //колокольчик fix для некоторых страниц
        changeRule('backgroundColor', 'rgb(221, 221, 221)', 'rgb(0, 113, 150)')
        changeRule('backgroundColor', 'rgb(238, 238, 238)', black)
    }
    //(DONE)! темная тема для страницы практика
    if (path == '/student/practice/index') {
        document.querySelectorAll('td').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('ul')[5].style.backgroundColor = black
    }
    //(DONE)! темная тема для страницы отдельной новости
    if (path == '/main/view-news') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('li.active')[1].style.color = purple
        document.querySelectorAll('ul')[5].style.backgroundColor = black
        document.querySelectorAll('span').forEach((el) => {
            if (el.style.color == 'rgb(51, 51, 51)' || el.style.color == 'black') el.style.color = white
        })
    }
    //(DONE)! темная тема для страницы портфолио
    if (path == '/portfolio/view-project') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('li.active')[1].style.color = purple
        document.querySelectorAll('td').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('ul')[5].style.backgroundColor = black
        document.querySelectorAll('.alert')[1].style.color = 'black'
    }
    //(DONE)! темная тема для страницы учебное портфолио
    if (path == '/portfolio/list-uchebnie-project' || path == '/portfolio/list-uchebnie-project/index') {
        document.querySelectorAll('select').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('input').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })

        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('li.active')[1].style.color = purple
        document.querySelectorAll('td').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('ul')[5].style.backgroundColor = black
    }
    //(DONE)! темная тема для страницы внеучебное портфолио
    if (path == '/portfolio/list-vneuchebnie-project') {
        document.querySelectorAll('li.active')[1].style.color = purple
        document.querySelectorAll('td').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('ul')[5].style.backgroundColor = black
    }
    //(DONE)!темная тема для страницы заявки
    if (path.split('/')[1] == 'request') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('li.active')[2].style.color = purple
        document.querySelectorAll('select').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('ul')[5].style.backgroundColor = black
        //темная тема для страниц добавления заявок
        if (path == '/request/doc/create' || path == '/request/reference/create') {
            document.querySelectorAll('li.active')[1].style.color = purple
        }
        //темная тема для страницы добавления справки
        if (path == '/request/reference/create') {
            let input = document.getElementById('referencethreadform-place')
            input.style.backgroundColor = black
            input.style.color = white

            let textarea = document.getElementById('referencethreadform-message')
            textarea.style.backgroundColor = black
            textarea.style.color = white

            let dragnDrop = document.querySelector('.resumable-drop')
            dragnDrop.style.backgroundColor = black
            dragnDrop.style.color = white
        }
    }
    //(DONE)! темная тема для страницы домашние задания
    if (path == '/student/homework/list') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('select').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('input').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('ul')[5].style.backgroundColor = black
    }
    //(DONE)! темная тема для конкретного ДЗ
    if (path == '/student/homework/view') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('li.active')[1].style.color = purple

        let textarea = document.getElementById('comment-text')
        textarea.style.backgroundColor = black
        textarea.style.color = white

        let dragnDrop = document.querySelector('.resumable-drop')
        dragnDrop.style.backgroundColor = black
        dragnDrop.style.color = white

        document.querySelectorAll('.author').forEach(el => el.style.color = white)
        document.querySelectorAll('.list-group-item').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('ul')[5].style.backgroundColor = black
    }
    //(DONE)! темная тема для страницы проекта из вкладки портфолио
    if (path == '/portfolio/view-project') {
        document.querySelectorAll('input').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('select').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('li.active')[2].style.color = '#b63dd2'

        let textarea = document.getElementById('add_comment')
        textarea.style.backgroundColor = black
        textarea.style.color = white
    }
    //(DONE)! темная тема для страницы проектная работа
    if (path == '/social/project_work/project-list' || path == '/social/project_work/project-list/index') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('select').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('input').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('ul')[5].style.backgroundColor = black

        //колокольчик fix для некоторых страниц
        changeRule('backgroundColor', 'rgb(221, 221, 221)', 'rgb(0, 113, 150)')
        changeRule('backgroundColor', 'rgb(238, 238, 238)', black)
    }
    //(DONE)! темная тема для страницы помощь
    if (path == '/support/list') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('select').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('ul')[5].style.backgroundColor = black
    }
    //(DONE)! темная тема для страницы электронные библиотеки
    if (path == '/other/libraries') {
        document.querySelectorAll('ul')[5].style.backgroundColor = black
    }
    //(DONE)! темная тема для страницы профиль
    if (path == '/user/profile') {
        document.querySelector('.panel').style.backgroundColor = black
        document.querySelector('.panel-footer').style.backgroundColor = black
        document.querySelector('h3').style.color = 'black'
        document.querySelectorAll('img')[1].src = 'https://lordmyrnya.ru/orioks/resources/img/logo3.png'
    }
    //(DONE)! темная тема для страницы личные файлы
    if (path == '/personal/files' || path == '/personal/files/index') {
        document.querySelectorAll('ul')[5].style.backgroundColor = black
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)

        let li = document.querySelectorAll('li.active')
        li[2].style.color = purple
        li[3].style.color = purple

        let dragnDrop = document.querySelector('.resumable-drop')
        dragnDrop.style.backgroundColor = black
        dragnDrop.style.color = white
    }
    //(DONE)! темная тема для страницы ресурсы
    if (path == '/student/ir/') {
        document.querySelectorAll('ul')[5].style.backgroundColor = black
        document.querySelectorAll('li.active')[1].style.color = purple
        document.querySelectorAll('.list-group-item').forEach(el => el.style.backgroundColor = black)
        changeRule('backgroundColor', 'rgb(245, 245, 245)', 'rgb(30, 30, 30)')
    }
    //темная тема для страницы результата теста
    if (path == '/student/student/testresult') {
        document.querySelectorAll('ul')[5].style.backgroundColor = black
        //changeRule('backgroundColor', 'rgb(250, 250, 250)', 'rgb(30, 30, 30)')
    }
    //TODO: страница с тестами, РК (структура полностью одинаковая)
}


/*функция смены правил css
допустимые аргументы:

(свойство, знач1, знач2, дебаг)
([свойство, знач1, знач2, дебаг])
(
    {
        rule: свойство,
        from: знач1,
        to: знач2,
        debug: дебаг
    }
)

(возможно, стоит убрать дебаг мод, но он может быть полезен при создании рулесета)
*/
function changeRule(rule, from, to, debug) {
    if (Array.isArray(rule)) {
        from = rule[1] || rule.from
        to = rule[2] || rule.to
        debug = rule[3] || rule.debug
        rule = rule[0] || rule.rule
    }
    for (let i = 0; i < document.styleSheets.length; i++) {
        if (debug) console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~\ni" + i + "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        try {
            document.styleSheets[i].cssRules
        }
        catch (e) {
            document.styleSheets[i].disabled = true;
        }

        if (!document.styleSheets[i].disabled) for (let j = 0; j < document.styleSheets[i].cssRules.length; j++) {


            if (document.styleSheets[i].cssRules[j].style) {
                if ((document.styleSheets[i].cssRules[j].style[rule]) && debug) {
                    console.log("j" + j)
                    console.log(document.styleSheets[i].cssRules[j].style[rule])
                }
                if (document.styleSheets[i].cssRules[j].style[rule] == from) document.styleSheets[i].cssRules[j].style[rule] = to;
            }
        }
    }
}

//неоконченный рулесет для демонического орокса. можно попробовать ради шутки или теста. подтверждена работа новостей, остальные блоки хз
let rules = [
    ["backgroundColor", "rgb(0, 140, 186)", "#353535"],
    ["backgroundColor", "rgb(255, 255, 255)", "#353535"],
    ["color", "rgb(79, 79, 79)", "rgb(176, 176, 176)"],
    ["backgroundColor", "rgb(0, 102, 135)", "#353535"],
    ["backgroundColor", "rgb(0, 102, 135)", "#353535"],
    ["backgroundColor", "rgb(238, 238, 238)", "#353535"],
    ["color", "rgb(0, 140, 186)", "#353535"],
    ["color", "rgb(0, 82, 110)", "#353535"],
    ["backgroundColor", "rgb(238, 238, 238)", "#353535"],
    ["backgroundColor", "rgb(245, 245, 245)", "#353535"]
]
