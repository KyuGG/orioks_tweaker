<template>
    <div class="popup"
         v-if="(settings && version)">
        <h2>ORIOKS tweaker {{ version }}</h2>
        <div class="switcher">
            <Switcher label="All Settings"
                      id="allSettings"
                      :checked="(settings.fixScore && settings.fixDownload && settings.schedule && settings.disciplineNames && settings.darkTheme)"
                      @update="(checked: boolean) => settings.fixScore = settings.fixDownload = settings.schedule = settings.disciplineNames = settings.darkTheme = !checked">
            </Switcher>
        </div>
        <h3>Basic Settings</h3>
        <div class="switcher">
            <Switcher label="Fix Score"
                      id="fixScore"
                      :checked="settings.fixScore"
                      @update="(checked: boolean) => settings.fixScore = !checked">
            </Switcher>
        </div>
        <div class="switcher">
            <Switcher label="Fix Download"
                      id="fixDownload"
                      :checked="settings.fixDownload"
                      @update="(checked: boolean) => settings.fixDownload = !checked">
            </Switcher>
        </div>
        <div class="switcher">
            <Switcher label="Schedule"
                      id="schedule"
                      :checked="settings.schedule"
                      @update="(checked: boolean) => settings.schedule = !checked">
            </Switcher>
        </div>
        <h3>Customize</h3>
        <div class="switcher">
            <Switcher label="Discipline Names"
                      id="disciplineNames"
                      :checked="settings.disciplineNames"
                      @update="(checked: boolean) => settings.disciplineNames = !checked">
            </Switcher>
        </div>
        <div class="switcher">
            <Switcher label="Dark Theme"
                      id="darkTheme"
                      :checked="settings.darkTheme"
                      @update="(checked: boolean) => settings.darkTheme = !checked">
            </Switcher>
        </div>
        <div class="buttons">
            <input id="bugreport"
                   type="button"
                   value="Report a Bug"
                   @click="bugReport">
            <input id="description"
                   type="button"
                   value="Description"
                   @click="description">
        </div>

        <!-- {{ settings.fixDownload }} -->
        <!-- <div class="switcher">
            <input type="checkbox"
                   class="ios8-switch"
                   id="checkbox-all" />
            <label for="checkbox-all">All Settings</label>
        </div>
        <h3>Basic Settings</h3>
        <div class="switcher">
            <input type="checkbox"
                   class="ios8-switch"
                   id="checkbox-1" />
            <label for="checkbox-1">Fix Score</label>
        </div>
        <br />
        <div class="switcher">
            <input type="checkbox"
                   class="ios8-switch"
                   id="checkbox-2" />
            <label for="checkbox-2">Fix Download</label>
        </div>
        <br />
        <div class="switcher">
            <input type="checkbox"
                   class="ios8-switch"
                   id="checkbox-3" />
            <label for="checkbox-3">Schedule</label>
        </div>
        <h3>Customize</h3>
        <div class="switcher">
            <input type="checkbox"
                   class="ios8-switch"
                   id="checkbox-4" />
            <label for="checkbox-4">Discipline Names</label>
        </div>
        <br />
        <div class="switcher">
            <input type="checkbox"
                   class="ios8-switch"
                   id="checkbox-5" />
            <label for="checkbox-5">Dark Theme</label>
        </div>
        <div>
            <input id="bugreport"
                   type="button"
                   value="Report a Bug" />
            <input id="description"
                   type="button"
                   value="Description" />
        </div> -->
    </div>
</template>

<script setup lang="ts">
import StorageSettings from '../../interfaces/StorageSettings'
import GetSettingsResponse from '../../interfaces/GetSettingsResponse'

import { ref } from 'vue'
import Switcher from './switcher.vue'

document.body.style.margin = '0'

const settings = ref(null as unknown as StorageSettings['settings'])
let version = ''



chrome.runtime.sendMessage({ task: 'getSettings' }, (response: GetSettingsResponse) => {
    settings.value = response.settings
    version = response.version
})








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
const bugReport = () => chrome.tabs.create({ url: 'https://orioks.miet.ru/bugreport' })
const description = () => chrome.tabs.create({ url: 'https://github.com/KyuGG/orioks_tweaker#функционал' })
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

.popup {
    width: 200px;
    padding: 30px;
    background: #1d1c1c;
}

.switcher {
    margin-bottom: 20px;
}

h2 {
    margin-top: 0;
    margin-bottom: 15px;
}

h2,
h3 {
    color: white;
}

.buttons input {
    margin-top: 10px;
    margin-left: 1px;
    margin-right: 1px;
    padding: 10px;
    border: 1px solid;
    background: #1d1c1c;
    color: #fff;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        background: #5581d3;
        color: black;
    }
}
</style>
