/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Subscript for theming
Just paste it into console browser

Author: lordmyrnya
Last update: 17.02.22
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

let globalRules             // кэш правил для использования в precise
let globalActualRules       // кэш выделенных пользователем правил
let currentRule             // кэш номера правила
let globalTo                // кэш состояния свойства на которое необходимо менять
let globalProperty          // кэш названия свойства
let globalFrom              // кэш изначального состояния свойства
let rulesCount              // количество правил в globalRules
let globalGUIInit           // bool показывающие, инициализацию GUI
let GUI                     // объект с элементами GUI
let globalSkip = true       // при true функции success и fail автоматически переходят на следующее правило

/*
Функции Precise режима

- Ищет правила в связи с входящими данными
- getRulesPrecise(
    property,       - свойство по которому осуществляется поиск
    value,          - значение свойства, по которому осуществляется поиск
    toTest,         - значение свойства, которое будет заменять то, что использовалось по умолчанию. Рекомендуется брать контрастный цвет.
    GUI = true      - включает или отключает вспомогательное GUI
)

- Подгружает ruleset и готовит Precise режим (скорее всего потом будет deprecated)
- loadRulesetPrecise(
    ruleset,        - готовый рулесет
    property,       - свойство по которому осуществляется поиск
    value,          - значение свойства, по которому осуществляется поиск
    toTest,         - значение свойства, которое будет заменять то, что использовалось по умолчанию. Рекомендуется брать контрастный цвет.
    GUI = true      - включает или отключает вспомогательное GUI
)

- автоматически переключает правило со временем
- automod(
    timeout = 3000  - timeout (хаха)
)

- next, previous - переходит вперёд или назад по списку

- success - ставит метку true на правиле и переходит дальше (если стоит globalSkip=true)
- fail - ставит метку false на правиле и переходит дальше (если стоит globalSkip=true)

- set(id) - переходит на определённое правило под номером id

- outputNeededRules - выводит правила с меткой true в двух режимах
*/

function getRules(property, value) {
    let results = {}
    for (let i = 0; i < document.styleSheets.length; i++) {
        try {
            document.styleSheets[i].cssRules
        }
        catch (e) {
            document.styleSheets[i].disabled = true
        }
        if (!document.styleSheets[i].disabled) for (let j = 0; j < document.styleSheets[i].cssRules.length; j++) {


            if (document.styleSheets[i].cssRules[j].style) {
                if(property.toLowerCase()!="selector"){
                    if (document.styleSheets[i].cssRules[j].style[property] == value) {
                        let href = document.styleSheets[i].href
                        if(!results[href]) results[href] = []
                        results[href].push(j);
                    }
                }
                else{
                    if(document.styleSheets[i].cssRules[j].selectorText){
                        let selectors = document.styleSheets[i].cssRules[j].selectorText.split(", ")
                        for(let k of selectors) {
                            if(k==value){
                                let href = document.styleSheets[i].href
                                if(!results[href]) results[href] = []
                                results[href].push(j);
                            }
                        }
                    }
                }
            }
        }
    }
    return results;
}

function next(steps = 1){
    setById(currentRule, globalFrom)
    currentRule+=steps
    if(currentRule>=rulesCount-1) currentRule = rulesCount-1
    else if(currentRule<0) currentRule = 0
    
    setById(currentRule, globalTo)

    updateGUI()
}

function set(id){
    setById(currentRule, globalFrom)
    currentRule = id
    if(currentRule>=rulesCount-1) currentRule = rulesCount-1
    else if(currentRule<0) currentRule = 0
    
    setById(currentRule, globalTo)

    updateGUI()
}

function success(steps = 1){
    globalActualRules[currentRule] = true
    if(globalSkip) next(steps)
}

function fail(steps = 1){
    globalActualRules[currentRule] = false
    if(globalSkip) next(steps)
}

function previous(steps = 1){
    return next(steps*-1)
}

function setById(id, value){
    let rule = asNumber(globalRules, id)
    //console.log(rule)
    setRules(rule, globalProperty, value)
}

function initGUI(){
    if(globalGUIInit) return true

    GUI = {}
    
    GUI.backbutt = document.createElement("div")

    GUI.nextbutt = document.createElement("div")

    GUI.counter = document.createElement("div")

    GUI.status = document.createElement("div")

    GUI.approve = document.createElement("div")

    GUI.reject = document.createElement("div")

    for(let i in GUI){
        GUI[i].id = "styler-" + i
        if((i!="counter") && (i!="status")) {
            GUI[i].style.width = "35px"
            GUI[i].style.cursor = "pointer"
        }
        GUI[i].style.userSelect = "none"
        GUI[i].style.height = "35px"
        GUI[i].style.borderRadius = "10px"
        GUI[i].style.position = "fixed"
        GUI[i].style.backgroundColor = "black"
        GUI[i].style.color = "white"
        GUI[i].style.textAlign = "center"
        GUI[i].style.paddingTop = "7px"
        document.body.appendChild(GUI[i])
    }

    GUI.counter.style.bottom = "20px"
    GUI.counter.style.right = "20px"
    GUI.counter.style.width = "70px"

    GUI.backbutt.innerText = "<"
    GUI.backbutt.style.right = "135px"
    GUI.backbutt.style.bottom = "20px"
    GUI.backbutt.addEventListener("click", () => {previous()})

    GUI.nextbutt.innerText = ">"
    GUI.nextbutt.style.right = "95px"
    GUI.nextbutt.style.bottom = "20px"
    GUI.nextbutt.addEventListener("click", () => {next()})

    GUI.approve.innerText = "✅"
    GUI.approve.style.right = "135px"
    GUI.approve.style.bottom = "60px"
    GUI.approve.addEventListener("click", () => {success()})

    GUI.reject.innerText = "❌"
    GUI.reject.style.right = "95px"
    GUI.reject.style.bottom = "60px"
    GUI.reject.addEventListener("click", () => {fail()})

    GUI.status.style.bottom = "60px"
    GUI.status.style.right = "20px"
    GUI.status.style.width = "70px"

    globalGUIInit = true

    updateGUI()
}

function updateGUI(){
    if(!globalGUIInit) return false
    GUI.counter.innerText = currentRule + "/" + (rulesCount-1)
    if(globalActualRules[currentRule]) GUI.status.style.backgroundColor = "rgb(0, 255, 0)"
    else GUI.status.style.backgroundColor = "rgb(255, 0, 0)"
}

function getRulesPrecise(property, value, toTest, GUI = true) {
    globalRules = getRules(property, value)
    globalActualRules = []
    currentRule = 0;
    globalFrom = value;
    globalTo = toTest;
    globalProperty = property;
    rulesCount = countAll(globalRules)

    for(let i=0; i<rulesCount; i++) globalActualRules[i] = false

    setById(currentRule, globalTo)

    if(GUI) initGUI()
}

function loadRulesetPrecise(ruleset, property, value, toTest, GUI = true){
    globalRules = ruleset
    globalActualRules = []
    currentRule = 0;
    globalFrom = value;
    globalTo = toTest;
    globalProperty = property;
    rulesCount = countAll(globalRules)

    for(let i=0; i<rulesCount; i++) globalActualRules[i] = false

    setById(currentRule, globalTo)

    if(GUI) initGUI()
}

function asNumber(rules, id){
    let count = 0
    for(let i in rules){
        if(rules[i].length+count>=id+1){
            let rule = {}
            rule[i] = [rules[i][id-count]]
            return rule
        } else count+=rules[i].length
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function automod(timeout = 3000){
    set(0)
    let skipCache = globalSkip
    globalSkip = false
    while(currentRule<rulesCount-1){
        await sleep(timeout)
        next()
    }
    console.log("automod stopped")
    globalSkip = skipCache
    return true
}

function countAll(rules){
    let count = 0
    for(let i in rules){
        count+=rules[i].length
    }
    return count
}

function outputNeededRules(){
    console.log("~~~~~~ splitted list: ~~~~~~")
    let output = {}
    let rule
    let key
    for(let i in globalActualRules){
        
        if(globalActualRules[i]) {
            rule = asNumber(globalRules, Number(i))
            key = Object.keys(rule)
            console.log(rule)
            if(!output[key]) output[key] = rule[key]
            else output[key].push(rule[key][0])
        }
    }
    console.log("~~~~~~ splitted list end ~~~~~~")
    return output
}

function addRule(selector, params){
    if(!document.getElementById("styler")) document.head.appendChild(document.createElement("style")).id = "styler"
    let styler = document.styleSheets[document.styleSheets.length-1]
    let rule
    for(let i of styler.cssRules){
        if(i.selectorText==selector) {rule = i; break;}
    }
    if(!rule) {
        //document.getElementById("styler").innerHTML = document.getElementById("styler").innerHTML += selector + "{} "
        styler.insertRule(selector + "{}")
        //styler = ghostStylesheet
        styler = document.styleSheets[document.styleSheets.length-1]
        rule = styler.cssRules[0]
    }

    for(let i in params){
        if(!Array.isArray(params[i])) params[i] = [params[i]]
        if(params[i][1]) params[i][1] = "important"
        rule.style.setProperty(i, params[i][0], params[i][1])
    }
}


//      PRODUCTION SCRIPTS

function setRules(rules, property, value){
    for(let i in document.styleSheets){
        if(rules[document.styleSheets[i].href]){
            for(let j in rules[document.styleSheets[i].href]) {document.styleSheets[i].cssRules[rules[document.styleSheets[i].href][j]].style[property] = value}
        }
    }
}

function addRules(rules){
    if(!document.getElementById("styler")) document.head.appendChild(document.createElement("style")).id = "styler"
    let styler = document.styleSheets[document.styleSheets.length-1]
    let cssrule
    for(let rule of rules){
        for(let i of styler.cssRules){
            if(i.selectorText==rule[0]) {cssrule = i; break;}
        }
        if(!cssrule) {
            styler.insertRule(rule[0] + "{}")
            styler = document.styleSheets[document.styleSheets.length-1]
            cssrule = styler.cssRules[0]
        }
    
        for(let i in rule[1]){
            if(!Array.isArray(rule[1][i])) rule[1][i] = [rule[1][i]]
            if(rule[1][i][1]) rule[1][i][1] = "important"
            cssrule.style.setProperty(i, rule[1][i][0], rule[1][i][1])
        }
    }
}

//      RULE-SETS

rulesets = {
    mainBg: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [296, 736, 939, 942, 990, 1092, 1166, 1195, 1216, 1266, 1299, 1365, 1536, 1548], 'https://orioks.miet.ru/controller/orioks.css?v=1622198733': [8] },
    mainBgHvr: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [297, 737, 940, 1171, 1172, 1178, 1217, 1538] },
    mainTxt: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [247, 286, 687, 726, 943, 964, 1191, 1231, 1367] },
    mainTxtHvr: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [248, 688, 967, 1194] },
    scndBg: { 'https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854': [307, 316, 470, 500, 569, 574, 582, 589, 596, 603, 610, 632, 727, 826, 839, 844, 853, 857, 879, 890, 941, 976, 1023, 1062, 1093, 1136], 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [245, 254, 404, 434, 685, 694, 844, 873, 943, 948, 953, 958, 963, 985, 1053, 1080, 1157, 1176, 1196, 1231, 1240, 1288, 1324, 1367, 1372, 1377, 1382, 1387, 1406, 1479] },
    redbell: { 'https://orioks.miet.ru/controller/orioks.css?v=1622198733': [34] },
    bg250: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [1233, 1393] },


    hvrdisc: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [850], 'https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854': [476] },
    plashka: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [1185] },


    deftxt: { 'https://orioks.miet.ru/controller/orioks.css?v=1622198733': [0] },
    notificationBg: { 'https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854': [503, 700, 717, 720, 840, 854, 883, 944], 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [437, 876, 989, 1070, 1073, 1194, 1206, 1296], 'https://orioks.miet.ru/controller/orioks.css?v=1622198733': [36, 38] },
    notificationBgHvr: { 'https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854': [1109], 'https://orioks.miet.ru/controller/orioks.css?v=1622198733': [39, 41] },
    notificationTxt: { 'https://orioks.miet.ru/controller/orioks.css?v=1622198733': [46] },
    notificationTxtDays: { 'https://orioks.miet.ru/controller/orioks.css?v=1622198733': [47] },
    notificationTitle: { 'https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854': [596], 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [290, 730, 953, 1307, 1308, 1310, 1377] },
    activePath: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [332, 425, 772, 865, 930, 931, 936, 1188, 1294, 1360, 1546, 1586] },
    scoreButton: { 'https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854': [801, 803], 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [930, 933, 1226, 1545, 1586], 'https://orioks.miet.ru/controller/orioks.css?v=1622198733': [19] },
    injuryNoteBg: { 'https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854': [360, 479, 540, 901, 954, 1026], 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [298, 415, 738, 855, 908, 1302] },
    injuryNoteTxt: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [288, 728, 905, 908, 909, 948, 1302, 1303, 1305, 1372] },
    gradesHvr: { 'https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854': [480, 957], 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [416, 856, 1305] },
    discChosenBg: { 'https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854': [362, 481, 904, 959, 1031], 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [300, 417, 740, 857, 1307] },
    discChosenBgHvr: { 'https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854': [482, 962], 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [418, 858, 1310] },
    profileFrame: { 'https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854': [590, 595, 868, 921], 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [949, 952, 1220, 1254, 1273, 1311, 1375, 1554] },

    trPortfolio: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [849] },
    tdPractice: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [853] },
    printedTxt: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [321, 433, 434, 761, 872, 873, 1053, 1080, 1563, 1565] },
    profileFooter: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [1330] },
    dragNDrop: { 'https://orioks.miet.ru/widgets/filePicker.css?v=1619569307': [1] },
    invisibleGrades: { 'https://orioks.miet.ru/controller/student/student.css?v=1571396836': [8] },
    visibleGrades: { 'https://orioks.miet.ru/controller/student/student.css?v=1571396836': [2] },
    author: { 'https://orioks.miet.ru/controller/comment.css?v=1571396836': [0] },
    dzItem: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [1293] },
    dzItemHvr: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [1295] },
    grayHvr: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [931] },
    notificationEmpty: { 'https://orioks.miet.ru/controller/orioks.css?v=1622198733': [37] },
    faqPlashki: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [1360] },
    faqBlackLinks: { 'https://orioks.miet.ru/controller/faq/index.css?v=1571396836': [0] },
    resource: { 'https://orioks.miet.ru/controller/orioks.css?v=1622198733': [15] },
    resourceHvr: { null: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },

    debt: {"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836": [861]},
    debtHvr: {"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836": [862]}

}

//    bg245:{"https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854":[393,476,477,636,833,915,952,982,1016,1049],"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[332,410,413,772,850,853,1185,1265,1295,1330,1360],"https://orioks.miet.ru/controller/orioks.css?v=1622198733":[15]},


function test(){
    setRules(rulesets.mainBg, "backgroundColor", "rgb(255, 0, 0)")
    setRules(rulesets.mainBgHvr, "transition", "background-color 0.25s linear")
    setRules(rulesets.mainBgHvr, "backgroundColor", "rgb(150, 0, 0)")
    setRules(rulesets.mainTxt, "color", "rgb(200, 0, 0)")
    setRules(rulesets.mainTxtHvr, "color", "rgb(150, 0, 0)")

    setRules(rulesets.scndBg, "backgroundColor", "rgb(0, 0, 0)")

    setRules(rulesets.bg250, "backgroundColor", "rgb(10, 10, 10)")

    setRules(rulesets.activePath, "color", "rgb(130, 0, 0)")

    setRules(rulesets.scoreButton, "backgroundColor", "rgb(10, 10, 10)")

    setRules(rulesets.discChosenBg, "backgroundColor", "rgb(50, 0, 0)")
    setRules(rulesets.discChosenBgHvr, "backgroundColor", "rgb(75, 0, 0)")

    setRules(rulesets.gradesHvr, "backgroundColor", "rgb(75, 0, 0)")

    setRules(rulesets.injuryNoteBg, "backgroundColor", "rgb(50, 0, 0)")
    setRules(rulesets.injuryNoteTxt, "color", "rgb(200, 200, 200)")

    setRules(rulesets.profileFrame, "backgroundColor", "rgb(150, 0, 0)")

    //NOTIFICATION
    setRules(rulesets.notificationBg, "backgroundColor", "rgb(10, 10, 10)")
    setRules(rulesets.notificationBg, "transition", "background-color 0.15s linear")
    setRules(rulesets.notificationBgHvr, "backgroundColor", "rgb(20, 20, 20)")
    setRules(rulesets.notificationTxt, "color", "rgb(200, 200, 200)")
    setRules(rulesets.notificationTxtDays, "color", "rgb(200, 200, 200)")
    setRules(rulesets.notificationTitle, "color", "rgb(200, 0, 0)")

    //setRules(rulesets.bg245, "backgroundColor", "rgb(10, 10, 10)")
    setRules(rulesets.plashka, "backgroundColor", "rgb(255, 255, 0)")
    setRules(rulesets.hvrdisc, "backgroundColor", "rgb(0, 255, 255)")
    setRules(rulesets.redbell, "backgroundColor", "rgb(0, 0, 255)")
    setRules(rulesets.deftxt, "color", "rgb(200, 200, 200)")
}

// работает только в обычном ороксе без тёмных тем. требуется заменять background-color для поддержки разных тем
function hover(){
    //хитрый способ. просто добавляет транзишн на все элементы, вроде работает как надо
    addRules([
        ["*", {"transition": "background-color linear 0.3s"}]
    ])
}


function oldHover(){
    //дисциплины оценки и тд
    addRules("tr.ng-scope td", {
        "background-color": "white",
        "transition": "background-color linear 0.3s"
    })

    //кнопки в навбаре
    addRules(".navbar-inverse .navbar-nav>li>a", {
        "background-color": "#008cba",
        "transition": "background-color linear 0.3s"
    })

    //выпадающие списки в навбаре
    addRules(".navbar-inverse .dropdown-menu>li>a", {
        "background-color": "#008cba",
        "transition": "background-color linear 0.3s"
    })

    //кнопки
    addRules("button", {
        "transition": "background-color linear 0.3s"
    })

    addRules(".notification-more", {
        "transition": "background-color linear 0.3s"
    })
}

//TODO
/*
НАПИСАТЬ КОД, КОТОРЫЙ САМ ОБНАРУЖИТ НЕОБХОДИМЫЕ RULESETS
НАПИСАТЬ УСЛОВИЯ ПРИ КОТОРОМ МОЖНО НАЙТИ ЭТОТ RULESET

написать less precisious функцию замены (сейчас идёт сравнение вплоть до версии)
*/