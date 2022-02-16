let globalRules
let globalActualRules
let currentRule
let globalTo
let globalProperty
let globalFrom
let rulesCount

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
                if (document.styleSheets[i].cssRules[j].style[property] == value) {
                    let href = document.styleSheets[i].href
                    if(!results[href]) results[href] = []
                    results[href].push(j);
                }
            }
        }
    }
    return results;
}

function next(steps = 1){
    setById(currentRule, globalFrom)
    currentRule+=steps
    setById(currentRule, globalTo)
}

function success(steps = 1){
    globalActualRules[currentRule] = true
    next(steps)
}

function fail(steps = 1){
    globalActualRules[currentRule] = false
    next(steps)
}

function previous(steps = 1){
    return next(-steps)
}

function setById(id, value){
    let rule = asNumber(globalRules, id)
    let a = {}
    a[rule[0]] = [rule[1]]
    setRules(a, globalProperty, value)
}

function getRulesPrecise(property, value, toTest) {
    globalRules = getRules(property, value)
    globalActualRules = {}
    currentRule = 0;
    globalFrom = value;
    globalTo = toTest;
    globalProperty = property;
    rulesCount = countAll(globalRules)
    setById(currentRule, globalTo)
}

function setRules(rules, property, value){
    for(let i in document.styleSheets){
        if(rules[document.styleSheets[i].href]){
            console.log(rules)
            for(let j in rules[document.styleSheets[i].href]) {
                document.styleSheets[i].cssRules[rules[document.styleSheets[i].href][j]].style[property] = value
                console.log(document.styleSheets[i].cssRules[rules[document.styleSheets[i].href][j]].style[property])
            }
            

        }
    }
}

function asNumber(rules, id){
    let count = 0
    for(let i in rules){
        if(rules[i].length+count>=id+1){
            return [i, rules[i][id-count]]
        } else count+=rules[i].length
    }
}

function countAll(rules){
    let count = 0
    for(let i in rules){
        count+=rules[i].length
    }
    return count
}

//      RULE-SETS

rulesets = {
    mainBg: {"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[296,736,939,942,990,1092,1166,1195,1216,1266,1299,1365,1536,1548],"https://orioks.miet.ru/controller/orioks.css?v=1622198733":[8]},
    mainBgHvr: {"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[297,737,940,1171,1172,1178,1217,1538]},
    mainTxt: {"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[247,286,687,726,943,964,1191,1231,1367]},
    mainTxtHvr: {"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[248,688,967,1194]},
    scndBg:{"https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854":[307,316,470,500,569,574,582,589,596,603,610,632,727,826,839,844,853,857,879,890,941,976,1023,1062,1093,1136],"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[245,254,404,434,685,694,844,873,943,948,953,958,963,985,1053,1080,1157,1176,1196,1231,1240,1288,1324,1367,1372,1377,1382,1387,1406,1479]},
    redbell:{"https://orioks.miet.ru/controller/orioks.css?v=1622198733":[34]},
    bg250:{"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[1233,1393]},


    plashka:{"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836": [850]},
    hvrdisc:{"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836": [1185]},


    deftxt: {"https://orioks.miet.ru/controller/orioks.css?v=1622198733":[0]},
    notificationBg: {"https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854":[503,700,717,720,840,854,883,944],"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[437,876,989,1070,1073,1194,1206,1296],"https://orioks.miet.ru/controller/orioks.css?v=1622198733":[36,38]},
    notificationBgHvr: {"https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854":[1109],"https://orioks.miet.ru/controller/orioks.css?v=1622198733":[39,41]},
    notificationTxt: {"https://orioks.miet.ru/controller/orioks.css?v=1622198733": [46]},
    notificationTxtDays: {"https://orioks.miet.ru/controller/orioks.css?v=1622198733": [47]},
    notificationTitle: {"https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854":[596],"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[290,730,953,1307,1308,1310,1377]},
    activePath: {"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[332,425,772,865,930,931,936,1188,1294,1360,1546,1586]},
    scoreButton: {"https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854":[801,803],"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[930,933,1226,1545,1586],"https://orioks.miet.ru/controller/orioks.css?v=1622198733":[19]},
    injuryNoteBg: {"https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854":[360,479,540,901,954,1026],"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[298,415,738,855,908,1302]},
    injuryNoteTxt: {"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[288,728,905,908,909,948,1302,1303,1305,1372]},
    gradesHvr: {"https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854":[480,957],"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[416,856,1305]},
    discChosenBg: {"https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854":[362,481,904,959,1031],"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[300,417,740,857,1307]},
    discChosenBgHvr: {"https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854":[482,962],"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[418,858,1310]},
    profileFrame: {"https://orioks.miet.ru/assets/331678d7/css/bootstrap.css?v=1635897854":[590,595,868,921],"https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836":[949,952,1220,1254,1273,1311,1375,1554]}
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

//TODO
/*
РАМКИ
ПУНКТ С ДЗ (поправить выделение имён)
ЧЕКНУТЬ ДРУГИЕ РАЗДЕЛЫ

НАПИСАТЬ КОД, КОТОРЫЙ САМ ОБНАРУЖИТ НЕОБХОДИМЫЕ RULESETS
НАПИСАТЬ УСЛОВИЯ ПРИ КОТОРОМ МОЖНО НАЙТИ ЭТОТ RULESET

написать less precisious функцию замены (сейчас идёт сравнение вплоть до версии)
*/