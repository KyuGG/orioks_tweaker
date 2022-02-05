let checkbox1 = document.getElementById('checkbox-1')
let checkbox2 = document.getElementById('checkbox-2')

let color1 = [
    document.getElementById('color1_r'),
    document.getElementById('color1_g'),
    document.getElementById('color1_b')
]
let color1t = [
    document.getElementById('color1_rt'),
    document.getElementById('color1_gt'),
    document.getElementById('color1_bt')
]

let color = document.getElementById("color")

let applybutt = document.getElementById("applybutt")

//загрузка настроек из background.js
chrome.runtime.sendMessage({ data: 'settings' }, (response) => {
    checkbox1.checked = (response.answer.checkbox1 === 'true')
    checkbox2.checked = (response.answer.checkbox2 === 'true')
    color1[0].value = response.answer.color1_r
    color1t[0].value = color1[0].value
    color1[1].value = response.answer.color1_g
    color1t[1].value = color1[1].value
    color1[2].value = response.answer.color1_b
    color1t[2].value = color1[2].value
    changeColor()
})


const onClick = () => {
    //меняем настройки в background.js
    let settings = {
        'checkbox1': checkbox1.checked,
        'checkbox2': checkbox2.checked,
        'color1_r': color1[0].value,
        'color1_g': color1[1].value,
        'color1_b': color1[2].value
    }
    console.log(settings)
    chrome.runtime.sendMessage({ data: 'changeSettings', settings: settings }, (response) => {
        console.log(response.answer)
    })
}

function changeColor() {
    color.style.backgroundColor = "rgb(" + color1[0].value + ", " + color1[1].value + ", " + color1[2].value + ")"
    console.log(color.style.backgroundColor)
}


checkbox1.onclick = () => onClick()
checkbox2.onclick = () => onClick()


//  БЛОК НИЖЕ НАДО БЫ КАК-НИБУДЬ ПОЛУЧШЕ СДЕЛАТЬ

color1[0].addEventListener("input", () => {
    color1t[0].value = color1[0].value
    changeColor()
})

color1t[0].addEventListener("input", () => {
    color1[0].value = color1t[0].value
    changeColor()
})
color1[1].addEventListener("input", () => {
    color1t[1].value = color1[1].value
    changeColor()
})

color1t[1].addEventListener("input", () => {
    color1[1].value = color1t[1].value
    changeColor()
})
color1[2].addEventListener("input", () => {
    color1t[2].value = color1[2].value
    changeColor()
})

color1t[2].addEventListener("input", () => {
    color1[2].value = color1t[2].value
    changeColor()
})

applybutt.addEventListener("change")