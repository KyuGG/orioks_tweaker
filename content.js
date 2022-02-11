_ini()

function _ini() {
    //плагин не работает в moodle
    if (document.location.pathname.split('/')[1] != 'moodle') {

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

            if (document.location.pathname == '/bugreport') {
                bugReport()
            }

            document.getElementsByTagName('html')[0].style.display = 'block'

        }
    }
}

function bugReport() {
    document.getElementsByClassName('row')[0].remove()
    let myDiv = document.createElement('div')
    let h1 = document.createElement('h1')
    h1.innerText = 'Orioks Tweaker'
    let h2 = document.createElement('h2')
    h2.innerText = 'Напишите об ошибке'

    let gitHub = document.createElement('a')
    gitHub.href = 'https://github.com/KyuGG/orioks_tweaker/issues'
    gitHub.innerText = 'GitHub'
    gitHub.style.fontSize = '22pt'

    let vk = document.createElement('a')
    vk.href = 'https://vk.me/kyugg'
    vk.innerText = 'VK'
    vk.style.fontSize = '22pt'

    let br = document.createElement('br')

    myDiv.append(gitHub)
    myDiv.append(br)
    myDiv.append(vk)
    document.getElementsByClassName('site-error')[0].append(h1)
    document.getElementsByClassName('site-error')[0].append(h2)
    document.getElementsByClassName('site-error')[0].append(myDiv)

}

//функционал плагина
function removeTrash() {
    //добавление лого
    let logo = document.createElement('img')
    logo.src = 'https://user-images.githubusercontent.com/47709593/152651901-fa62c8c3-b8a2-42ee-99ca-6de646746a9e.png'
    logo.width = 50
    logo.className = 'navbar-header'
    let orioks = document.getElementsByClassName('container')[0]
    orioks.prepend(logo)
    if (document.location.pathname == '/student/student') {
        let black = '#353535'
        //смена балл на сум
        let span = document.getElementById('bp')
        let clack = new Event('click')
        span.dispatchEvent(clack)
        span.dispatchEvent(clack)
        span.remove()

        document.styleSheets[1].cssRules[8].style.color = black
        document.styleSheets[1].cssRules[8].style.display = 'block'
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

    //колокольчик fix для некоторых страниц
    changeRule('backgroundColor', 'rgb(221, 221, 221)', 'rgb(0, 113, 150)')
    changeRule('backgroundColor', 'rgb(238, 238, 238)', black)

    //инструкции
    changeRule('backgroundColor', 'rgb(255, 255, 255)', 'rgb(30, 30, 30)')
    switch (path) {
        //(DONE)! темная тема для главной страницы
        case '/':
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            changeRule("backgroundColor", "rgb(255, 255, 255)", "rgb(30, 30, 30)")
            changeRule("backgroundColor", "rgb(238, 238, 238)", "rgb(30, 30, 30)")
            changeRule("color", "rgb(111, 111, 111)", white)
            break
        //(DONE)! темная тема для страницы с баллами
        case '/student/student':
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('select').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            document.querySelectorAll('ul')[5].style.backgroundColor = black

            document.styleSheets[1].cssRules[7].style.background = '#007ECB'
            document.styleSheets[1].cssRules[6].style.background = '#71C0F0'
            document.styleSheets[1].cssRules[5].style.background = '#7D919E'
            document.styleSheets[1].cssRules[4].style.background = '#fff'
            document.styleSheets[1].cssRules[3].style.background = '#C49068'
            document.styleSheets[1].cssRules[2].style.color = 'black'

            document.styleSheets[1].cssRules[8].style.color = white
            document.styleSheets[1].cssRules[8].style.display = 'block'

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
            changeRule('backgroundColor', 'rgb(242, 222, 222)', black)
            changeRule('backgroundColor', 'rgb(235, 204, 204)', black)
            break
        //(DONE)! темная тема для страницы практика
        case '/student/practice/index':
            document.querySelectorAll('td').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            break
        //(DONE)! темная тема для страницы отдельной новости
        case '/main/view-news':
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('li.active')[1].style.color = purple
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('span').forEach((el) => {
                if (el.style.color == 'rgb(51, 51, 51)' || el.style.color == 'black') el.style.color = white
            })
            break
        //(DONE)! темная тема для страницы новости через уведомления
        case '/student/news/view':
            document.querySelectorAll('li.active')[1].style.color = purple
            document.querySelectorAll('li.active')[2].style.color = purple
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.getElementById('commentform-body').style.backgroundColor = black
            document.getElementById('commentform-body').style.color = white
            document.querySelectorAll('div').forEach((el) => {
                if (el.style.color == 'rgb(79, 79, 79)') el.style.color = white
            })
            document.querySelectorAll('p').forEach((el) => {
                if (el.style.color == 'rgb(79, 79, 79)') el.style.color = white
            })
            document.querySelectorAll('span').forEach((el) => {
                if (el.style.color == 'rgb(79, 79, 79)') el.style.color = white
            })
            document.querySelectorAll('font').forEach((el) => {
                if (el.style.color == '') el.style.color = white
            })
            document.querySelectorAll('b').forEach((el) => {
                if (el.style.color == 'rgb(79, 79, 79)') el.style.color = white
            })
            break
        //(DONE)! темная тема для страницы новости дисциплины
        case '/student/news/index':
            document.querySelectorAll('li.active')[1].style.color = purple
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('.post_footer').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('div').forEach((el) => {
                if (el.style.color == 'rgb(79, 79, 79)') el.style.color = white
            })
            document.querySelectorAll('p').forEach((el) => {
                if (el.style.color == 'rgb(79, 79, 79)') el.style.color = white
            })
            document.querySelectorAll('span').forEach((el) => {
                if (el.style.color == 'rgb(79, 79, 79)') el.style.color = white
            })
            document.querySelectorAll('font').forEach((el) => {
                if (el.style.color == '') el.style.color = white
            })
            document.querySelectorAll('b').forEach((el) => {
                if (el.style.color == 'rgb(79, 79, 79)') el.style.color = white
            })
            break
        //(DONE)! темная тема для страницы портфолио
        case '/portfolio/view-project':
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('li.active')[1].style.color = purple
            document.querySelectorAll('li.active')[2].style.color = purple
            document.querySelectorAll('td').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('.alert')[1].style.color = 'black'
            document.getElementById('add_comment').style.backgroundColor = black
            document.querySelectorAll('.author').forEach(el => el.style.color = white)
            document.querySelectorAll('select').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            document.querySelectorAll('input').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            break
        //(DONE)! темная тема для страницы внеучебное портфолио
        case '/portfolio/list-vneuchebnie-project':
            document.querySelectorAll('li.active')[1].style.color = purple
            document.querySelectorAll('td').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            break
        //(DONE)! темная тема для страницы домашние задания
        case '/student/homework/list':
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
            break
        //(DONE)! темная тема для конкретного ДЗ
        case '/student/homework/view':
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('li.active')[1].style.color = purple

            let textarea = document.getElementById('comment-text')
            textarea.style.backgroundColor = black
            textarea.style.color = white

            document.querySelector('.resumable-drop').style.backgroundColor = black
            document.querySelector('.resumable-drop').style.color = white

            document.querySelectorAll('.author').forEach(el => el.style.color = white)
            document.querySelectorAll('.list-group-item').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            break
        case '/student/homework/create':
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('li.active')[1].style.color = purple
            document.querySelectorAll('select').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            document.querySelectorAll('input').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })

            document.getElementById('homeworktreadform-message').style.backgroundColor = black
            document.getElementById('homeworktreadform-message').style.color = white
            document.querySelector('.resumable-drop').style.backgroundColor = black
            document.querySelector('.resumable-drop').style.color = white
            break
        //(DONE)! темная тема для страницы проекта из вкладки портфолио
        case '/portfolio/view-project':
            document.querySelectorAll('input').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            document.querySelectorAll('select').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            document.querySelectorAll('li.active')[2].style.color = '#b63dd2'

            textarea = document.getElementById('add_comment')
            textarea.style.backgroundColor = black
            textarea.style.color = white
            break
        //(DONE)! темная тема для страницы помощь
        case '/support/list':
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('select').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            break
        //(DONE)! конкретная заявка в разделе помощь
        case '/support/view':
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('li.active')[1].style.color = purple
            document.querySelectorAll('.author').forEach(el => el.style.color = white)
            document.querySelector('.resumable-drop').style.backgroundColor = black
            document.querySelector('.resumable-drop').style.color = white
            document.getElementById('comment-text').style.backgroundColor = black
            document.getElementById('comment-text').style.color = white
            break
        //(DONE)! темная тема для страницы электронные библиотеки
        case '/other/libraries':
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            break
        //(DONE)! темная тема для страницы профиль
        case '/user/profile':
            document.querySelector('.panel').style.backgroundColor = black
            document.querySelector('.panel-footer').style.backgroundColor = black
            document.querySelector('h3').style.color = 'black'
            document.querySelectorAll('img')[1].src = 'https://user-images.githubusercontent.com/47709593/152651901-fa62c8c3-b8a2-42ee-99ca-6de646746a9e.png'
            break
        //(DONE)! темная тема для страницы ресурсы
        case '/student/ir/':
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('li.active')[1].style.color = purple
            document.querySelectorAll('.list-group-item').forEach(el => el.style.backgroundColor = black)
            changeRule('backgroundColor', 'rgb(245, 245, 245)', 'rgb(30, 30, 30)')
            break
        //(DONE)! темная тема для страницы результата теста
        case '/student/student/test':
        case '/student/student/test/':
        case '/student/student/testresult':
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            break
        //(DONE)! темная тема для страницы ЧаВо
        case '/faq':
        case '/faq/index':
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
            break
        //(DONE)! темная тема для страницы учебное портфолио
        case '/portfolio/list-uchebnie-project':
        case '/portfolio/list-uchebnie-project/index':
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
            break
        //(DONE)! темная тема для страницы проектная работа
        case '/social/project_work/project-list':
        case '/social/project_work/project-list/index':
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
            break
        //(DONE)! темная тема для страницы личные файлы
        case '/personal/files':
        case '/personal/files/index':
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)

            let li = document.querySelectorAll('li.active')
            li[2].style.color = purple
            li[3].style.color = purple

            document.querySelector('.resumable-drop').style.backgroundColor = black
            document.querySelector('.resumable-drop').style.color = white
            changeRule('backgroundColor', 'rgb(245, 245, 245)', 'rgb(30, 30, 30)')
            break
        //темная тема для страниц обходной лист
        case '/request/questionnaire/list':
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('li.active')[2].style.color = purple
            document.querySelectorAll('select').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            break
        //темная тема для страниц добавления заявлений
        case '/request/doc/list':
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('li.active')[2].style.color = purple
            document.querySelectorAll('select').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            break
        case '/request/doc/create':
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('li.active')[2].style.color = purple
            document.querySelectorAll('select').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('li.active')[1].style.color = purple
            break
        //темная тема для страниц справки
        case '/request/reference/list':
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('li.active')[2].style.color = purple
            document.querySelectorAll('select').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            break
        case '/request/reference/create':
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('li.active')[1].style.color = purple
            document.querySelectorAll('li.active')[2].style.color = purple
            document.querySelectorAll('select').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            document.querySelectorAll('ul')[5].style.backgroundColor = black

            let input = document.getElementById('referencethreadform-place')
            input.style.backgroundColor = black
            input.style.color = white

            document.getElementById('referencethreadform-message').style.backgroundColor = black
            document.getElementById('referencethreadform-message').style.color = white

            document.querySelector('.resumable-drop').style.backgroundColor = black
            document.querySelector('.resumable-drop').style.color = white
            break
        //темная тема для страниц последипломный отпуск
        case '/request/holiday/create':
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('li.active')[2].style.color = purple
            break
        //темная тема для помощь заявка
        case '/support/create':
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('li.active')[1].style.color = purple
            document.querySelectorAll('select').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            document.querySelectorAll('input').forEach((el) => {
                el.style.backgroundColor = black
                el.style.color = white
            })
            document.getElementById('supportthreadform-message').style.backgroundColor = black
            document.getElementById('supportthreadform-message').style.color = white
            document.querySelector('.resumable-drop').style.backgroundColor = black
            document.querySelector('.resumable-drop').style.color = white
            break
        //темная тема для страницы списка уведомлений
        case '/notification':
        case '/notification/index':
            document.querySelectorAll('ul')[5].style.backgroundColor = black
            document.querySelectorAll('li.active')[1].style.color = purple
            document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
            document.querySelectorAll('td').forEach(el => el.style.backgroundColor = black)
            break
    }
}

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
