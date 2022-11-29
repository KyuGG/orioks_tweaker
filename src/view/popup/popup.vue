<template>
    <div>
        <h2>ORIOKS tweaker {{ version }}</h2>
        <div class="switcher">
            <input type="checkbox" class="ios8-switch" id="checkbox-all" />
            <label for="checkbox-all">All Settings</label>
        </div>
        <h3>Basic Settings</h3>
        <div class="switcher">
            <input type="checkbox" class="ios8-switch" id="checkbox-1" />
            <label for="checkbox-1">Fix Score</label>
        </div>
        <br />
        <div class="switcher">
            <input type="checkbox" class="ios8-switch" id="checkbox-2" />
            <label for="checkbox-2">Fix Download</label>
        </div>
        <br />
        <div class="switcher">
            <input type="checkbox" class="ios8-switch" id="checkbox-3" />
            <label for="checkbox-3">Schedule</label>
        </div>
        <h3>Customize</h3>
        <div class="switcher">
            <input type="checkbox" class="ios8-switch" id="checkbox-4" />
            <label for="checkbox-4">Discipline Names</label>
        </div>
        <br />
        <div class="switcher">
            <input type="checkbox" class="ios8-switch" id="checkbox-5" />
            <label for="checkbox-5">Dark Theme</label>
        </div>
        <div>
            <input id="bugreport" type="button" value="Report a Bug" />
            <input id="description" type="button" value="Description" />
        </div>
    </div>
</template>

<script setup lang="ts">
const version = ''

const checkboxAll = document.getElementById('checkbox-all')
const checkbox1 = document.getElementById('checkbox-1')
const checkbox2 = document.getElementById('checkbox-2')
const checkbox3 = document.getElementById('checkbox-3')
const checkbox4 = document.getElementById('checkbox-4')
const checkbox5 = document.getElementById('checkbox-5')
const bugreport = document.getElementById('bugreport')
const description = document.getElementById('description')
// window.onload = () => document.body.style.opacity = '100%'
// document.documentElement.style.setProperty('--setting-transition', 'all .3s')
// chrome.runtime.sendMessage({ data: 'settingsPopup' }, response => {
//     if (!chrome.runtime.lastError) {
//         checkbox1.checked = response.answer.checkbox1
//         checkbox2.checked = response.answer.checkbox2
//         checkbox3.checked = response.answer.checkbox3
//         checkbox4.checked = response.answer.checkbox4
//         checkbox5.checked = response.answer.checkbox5
//         checkboxAll.checked = checkbox1.checked && checkbox2.checked && checkbox3.checked && checkbox4.checked && checkbox5.checked
//         setTimeout(() => document.documentElement.style.setProperty('--setting-transition', 'all .3s'), 100)
//     }
//     else location.reload()
// })

// bugreport.onclick = () => {
//     chrome.tabs.create({ url: 'https://orioks.miet.ru/bugreport' })
// }

// description.onclick = () => {
//     chrome.tabs.create({ url: 'https://github.com/KyuGG/orioks_tweaker#функционал' })
// }

// function onClick() {
//     checkboxAll.checked = checkbox1.checked && checkbox2.checked && checkbox3.checked && checkbox4.checked && checkbox5.checked
//     const settings = {
//         checkbox1: checkbox1.checked,
//         checkbox2: checkbox2.checked,
//         checkbox3: checkbox3.checked,
//         checkbox4: checkbox4.checked,
//         checkbox5: checkbox5.checked
//     }
//     chrome.runtime.sendMessage({ data: 'changeSettings', settings: settings }, response => console.log(response.answer))
// }

// checkboxAll.onclick = () => {
//     const isTurnedOn = checkboxAll.checked

//     checkbox1.checked = isTurnedOn
//     checkbox2.checked = isTurnedOn
//     checkbox3.checked = isTurnedOn
//     checkbox4.checked = isTurnedOn
//     checkbox5.checked = isTurnedOn

//     const settings = {
//         checkbox1: isTurnedOn,
//         checkbox2: isTurnedOn,
//         checkbox3: isTurnedOn,
//         checkbox4: isTurnedOn,
//         checkbox5: isTurnedOn
//     }
//     chrome.runtime.sendMessage({ data: 'changeSettings', settings: settings }, response => console.log(response.answer))
// }


// checkbox1.onclick = onClick
// checkbox2.onclick = onClick
// checkbox3.onclick = onClick
// checkbox4.onclick = onClick
// checkbox5.onclick = onClick
</script>

<style scoped lang="scss">
* {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

html {
    width: 100%;
    height: 100%;
    background-color: #1d1c1c;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    --setting-transition: none;
}

body {
    width: 250px;
    padding: 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 2s;
}

h2 {
    margin-top: 0;
    margin-bottom: 15px;
}

.switcher {
    margin-bottom: 10px;
}

.slider {
    display: flex;
    flex-direction: row;
}

.slider .color-show {
    width: 30px;
}

input[type='checkbox'].ios8-switch {
    position: absolute;
    margin: 8px 20 0 16px;
}

input[type='checkbox'].ios8-switch+label {
    position: relative;
    padding: 5px 0 0 50px;
    line-height: 2em;
}

input[type='checkbox'].ios8-switch+label:before {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    width: 40px;
    height: 24px;
    border-radius: 16px;
    background: #1d1c1c;
    border: 1px solid #3b3b3b;
    -webkit-transition: var(--setting-transition);
    transition: var(--setting-transition);
}

input[type='checkbox'].ios8-switch+label:after {
    content: '';
    position: absolute;
    display: block;
    left: 0px;
    top: 0px;
    width: 24px;
    height: 24px;
    border-radius: 16px;
    background: #fff;
    border: 1px solid #d9d9d9b0;
    -webkit-transition: var(--setting-transition);
    transition: var(--setting-transition);
}

input[type='checkbox'].ios8-switch+label:hover:after {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

input[type='checkbox'].ios8-switch:checked+label:after {
    margin-left: 16px;
}

input[type='checkbox'].ios8-switch:checked+label:before {
    background: #5581d3;
}

label {
    transition: var(--setting-transition);
}

label:hover {
    color: #5581d3;
}

#bugreport,
#description {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid;
    background: #1d1c1c;
    color: #fff;
    transition: 0.3s;
    cursor: pointer;
}

#bugreport:hover,
#description:hover {
    background: #5581d3;
    color: black;
}
</style>
