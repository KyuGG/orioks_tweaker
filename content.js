_ini()

function _ini() {

    document.getElementsByTagName("html")[0].style.display = "none";

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
            if (response.answer.checkbox3 == 'true') {
                //
            }
        })

        document.getElementsByTagName("html")[0].style.display = "block"

    }

}


//функционал плагина
function removeTrash() {
    //добавление лого
    let logo = document.createElement('img')
    logo.src = 'https://lordmyrnya.ru/orioks/resources/img/logo3.png'
    logo.width = 50
    logo.className = 'navbar-header'
    let orioks = document.getElementsByClassName("container")[0]
    orioks.prepend(logo)
    if (document.location.pathname == '/student/student') {
        //смена балл на сум
        let span = document.getElementById("bp")
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

    //темная тема для страницы ЧаВо
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
            document.querySelectorAll('.newColor').forEach(el => el.style.color = white)
        }
    }
    //темная тема для страницы с баллами
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


    }
    //темная тема для страницы практика
    if (path == '/student/practice/index') {
        document.querySelectorAll('td').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('ul')[5].style.backgroundColor = black
    }
    //темная тема для страницы портфолио и страницы отдельной новости
    if (path.split('/')[1] == 'portfolio' || path == '/main/view-news') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('li.active')[1].style.color = purple
        document.querySelectorAll('td').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('ul')[5].style.backgroundColor = black
    }
    //темная тема для страницы учебное портфолио
    if (path == '/portfolio/list-uchebnie-project' || path == '/portfolio/list-uchebnie-project/index') {
        document.querySelectorAll('select').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('input').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
    }
    //темная тема для страницы заявки
    if (path.split('/')[1] == 'request') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('li.active')[2].style.color = purple
        document.querySelectorAll('select').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('ul')[5].style.backgroundColor = black
    }
    //темная тема для страницы домашние задания
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
    //темная тема для конкретного ДЗ
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
    }
    //темная тема для страницы проекта из вкладки портфолио
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
    //темная тема для страницы проектная работа
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
    }
    //темная тема для страницы помощь
    if (path == '/support/list') {
        document.querySelectorAll('.well').forEach(el => el.style.backgroundColor = black)
        document.querySelectorAll('select').forEach((el) => {
            el.style.backgroundColor = black
            el.style.color = white
        })
        document.querySelectorAll('ul')[5].style.backgroundColor = black
    }
    //темная тема для страницы электронные библиотеки
    if (path == '/other/libraries') {
        document.querySelectorAll('ul')[5].style.backgroundColor = black
    }
    //темная тема для страницы профиль
    if (path == '/user/profile') {
        document.querySelector('.panel').style.backgroundColor = black
        document.querySelector('.panel-footer').style.backgroundColor = black
    }
    //темная тема для страницы личные файлы
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
    //темная тема для страницы ресурсы
    if (path == '/student/ir/') {
        document.querySelectorAll('ul')[5].style.backgroundColor = black
        document.querySelectorAll('li.active')[1].style.color = purple
        document.querySelectorAll('.list-group-item').forEach(el => el.style.backgroundColor = black)
    }
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
function changeRule(rule, from, to, debug){
    if(Array.isArray(rule)){
        from = rule[1] || rule.from
        to = rule[2] || rule.to
        debug = rule[3] || rule.debug
        rule = rule[0] || rule.rule
    }
    for(let i=0; i<document.styleSheets.length; i++){
        if(debug) console.log ("~~~~~~~~~~~~~~~~~~~~~~~~~~~\ni" + i + "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        try{
            document.styleSheets[i].cssRules
        }
        catch(e){
            document.styleSheets[i].disabled = true;
        }
        
        if(!document.styleSheets[i].disabled) for(let j=0; j<document.styleSheets[i].cssRules.length; j++){
            
            
            if(document.styleSheets[i].cssRules[j].style) {
                if((document.styleSheets[i].cssRules[j].style[rule]) && debug) {
                    console.log ("j" + j)
                    console.log(document.styleSheets[i].cssRules[j].style[rule])
                }
                if(document.styleSheets[i].cssRules[j].style[rule]==from) document.styleSheets[i].cssRules[j].style[rule] = to;
            }
        }
    }
}

//неоконченный рулесет для демонического орокса. можно попробовать ради шутки или теста. подтверждена работа новостей, остальные блоки хз
rules = [
    ["backgroundColor", "rgb(0, 140, 186)", "rgb(200, 0, 0)"],
    ["backgroundColor", "rgb(255, 255, 255)", "rgb(0, 0, 0)"],
    ["color", "rgb(79, 79, 79)", "rgb(176, 176, 176)"],
    ["backgroundColor", "rgb(0, 102, 135)", "rgb(150, 0, 0)"],
    ["backgroundColor", "rgb(0, 102, 135)", "rgb(150, 0, 0)"],
    ["backgroundColor", "rgb(238, 238, 238)", "rgb(30, 30, 30)"],
    ["color", "rgb(0, 140, 186)", "rgb(135, 0, 0)"],
    ["color", "rgb(0, 82, 110)", "rgb(100, 0, 0)"]
]