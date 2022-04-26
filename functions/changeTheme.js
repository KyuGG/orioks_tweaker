//вспомогательные функции для тем
function setRules(rules, property, value) {
    for (const styleSheet of document.styleSheets)
        if (rules[styleSheet.href])
            for (const rule of rules[styleSheet.href]) styleSheet.cssRules[rule].style[property] = value
}

function shadeColor(color, percent) {

    let R = parseInt(color.substring(1, 3), 16)
    let G = parseInt(color.substring(3, 5), 16)
    let B = parseInt(color.substring(5, 7), 16)

    R = parseInt(R * (100 + percent) / 100)
    G = parseInt(G * (100 + percent) / 100)
    B = parseInt(B * (100 + percent) / 100)

    R = (R < 255) ? R : 255
    G = (G < 255) ? G : 255
    B = (B < 255) ? B : 255

    const RR = ((R.toString(16).length == 1) ? '0' + R.toString(16) : R.toString(16))
    const GG = ((G.toString(16).length == 1) ? '0' + G.toString(16) : G.toString(16))
    const BB = ((B.toString(16).length == 1) ? '0' + B.toString(16) : B.toString(16))

    return '#' + RR + GG + BB
}

function changeTheme(bg = '#202124', bg2 = 'rgb(30, 30, 30)', links = '#b63dd2') {
    setRules(rulesets.mainBg, 'backgroundColor', bg2)
    setRules(rulesets.mainBgHvr, 'backgroundColor', bg)
    setRules(rulesets.mainBgHvr, 'transition', 'background-color 0.25s linear')
    setRules(rulesets.mainTxtHvr, 'color', links)
    setRules(rulesets.scndBg, 'backgroundColor', bg)
    setRules(rulesets.bg250, 'backgroundColor', bg)
    setRules(rulesets.activePath, 'color', links)
    setRules(rulesets.scoreButton, 'backgroundColor', bg2)
    setRules(rulesets.discChosenBg, 'backgroundColor', bg2)
    setRules(rulesets.discChosenBgHvr, 'backgroundColor', bg2)
    setRules(rulesets.gradesHvr, 'backgroundColor', bg2)
    setRules(rulesets.profileFrame, 'color', 'black')
    setRules(rulesets.injuryNoteBg, 'backgroundColor', 'rgb(0, 36, 52)')

    //NOTIFICATION
    setRules(rulesets.notificationBg, 'backgroundColor', bg)
    setRules(rulesets.notificationBg, 'transition', 'background-color 0.15s linear')
    setRules(rulesets.notificationBgHvr, 'backgroundColor', bg2)
    setRules(rulesets.notificationTxt, 'color', 'white')
    setRules(rulesets.notificationTxtDays, 'color', 'white')

    setRules(rulesets.plashka, 'backgroundColor', bg)
    setRules(rulesets.hvrdisc, 'backgroundColor', bg2)
    setRules(rulesets.redbell, 'backgroundColor', 'rgb(0, 140, 186)')
    setRules(rulesets.deftxt, 'color', 'white')

    setRules(rulesets.trPortfolio, 'backgroundColor', bg)
    setRules(rulesets.tdPractice, 'backgroundColor', bg)
    setRules(rulesets.printedTxt, 'color', 'white')
    setRules(rulesets.profileFooter, 'backgroundColor', 'rgb(91, 192, 222)')
    setRules(rulesets.profileFooter, 'borderTop', 'rgb(91, 192, 222)')
    setRules(rulesets.profileFooter, 'color', 'black')
    setRules(rulesets.dragNDrop, 'backgroundColor', bg)
    setRules(rulesets.dragNDrop, 'color', 'white')
    setRules(rulesets.invisibleGrades, 'color', 'white')
    setRules(rulesets.visibleGrades, 'color', 'black')
    setRules(rulesets.author, 'color', 'white')
    setRules(rulesets.dzItem, 'color', 'rgb(91, 192, 222)')
    setRules(rulesets.dzItemHvr, 'color', links)
    setRules(rulesets.dzItemHvr, 'backgroundColor', bg2)
    setRules(rulesets.grayHvr, 'backgroundColor', bg)
    setRules(rulesets.notificationEmpty, 'backgroundColor', 'rgb(91, 192, 222)')
    setRules(rulesets.notificationEmpty, 'color', 'black')
    setRules(rulesets.faqPlashki, 'backgroundColor', bg)
    setRules(rulesets.faqBlackLinks, 'color', 'rgb(91, 192, 222)')
    setRules(rulesets.resource, 'backgroundColor', bg)
    setRules(rulesets.debt, 'backgroundColor', bg2)
    setRules(rulesets.debtHvr, 'backgroundColor', bg2)
    setRules(rulesets.spravkiTxt, 'color', 'rgb(0, 140, 186)')
    setRules(rulesets.dragNDropDragOver, 'backgroundColor', bg2)
    setRules(rulesets.dragNDropDragOver, 'color', links)
    setRules(rulesets.resourceHvr, 'backgroundColor', bg2)

    if (location.pathname == '/user/profile') {
        document.querySelector('img').src = 'https://user-images.githubusercontent.com/47709593/152651901-fa62c8c3-b8a2-42ee-99ca-6de646746a9e.png'
    }

    if (location.pathname == '/student/student') {
        //цвета баллов
        document.styleSheets[1].cssRules[7].style.background = '#007ECB'
        document.styleSheets[1].cssRules[6].style.background = '#71C0F0'
        document.styleSheets[1].cssRules[5].style.background = '#7D919E'
        document.styleSheets[1].cssRules[4].style.background = '#fff'
        document.styleSheets[1].cssRules[3].style.background = '#C49068'

        // добираемся с помощью листнеров до кликов по новостям

        const tbody = document.querySelector('.table tbody')
        tbody.onclick = () => {
            const infoTable = document.querySelectorAll('.list-group')[1]
            infoTable.onclick = async evt => {
                if (evt.target.tagName == 'A' && evt.target.className == 'ng-binding') {
                    await sleep(100)
                    let paragraphs = document.querySelectorAll('.modal-body div.ng-binding *')
                    while (paragraphs.length == 0) {
                        await sleep(1000)
                        paragraphs = document.querySelectorAll('.modal-body div.ng-binding *')
                    }
                    paragraphs.forEach(p => p.style.color = shadeColor(p.style.color, 1))
                }
            }
        }

        document.querySelectorAll('input[type=image]').forEach(input => input.style.filter = 'invert(1)')
    }
    if (location.pathname == '/student/student/test' || location.pathname == '/student/student/test/') {
        document.querySelectorAll('img').forEach(img => img.style.filter = 'invert(1)')
    }



    if (location.pathname == '/main/view-news') {
        document.querySelectorAll('.well *').forEach(el => {
            el.style.color = shadeColor(el.style.color, 1)
            el.style.background = bg
        })
    }
    if (location.pathname == '/student/news/view') {
        document.querySelectorAll('.container div.margin-top *').forEach(el => {
            el.style.color = shadeColor(el.style.color, 1)
            el.style.background = bg
        })
    }

}

//ссылки на правила, относящиеся к некоторым элементам
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
    resourceHvr: { null: [1] },
    debt: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [861] },
    debtHvr: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [862] },
    spravkiTxt: { 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [1302] },
    dragNDropDragOver: { 'https://orioks.miet.ru/widgets/filePicker.css?v=1619569307': [2] }
}