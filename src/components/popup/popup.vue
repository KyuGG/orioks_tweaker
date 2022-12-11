<template>
    <div
        class="popup"
        :style="`--opacity: ${opacity};`"
        v-if="settings && version">
        <h2>ORIOKS tweaker {{ version }}</h2>
        <div class="switcher">
            <Switcher
                label="All Settings"
                id="allSettings"
                :checked="allChecked"
                @update="onUpdate">
            </Switcher>
        </div>
        <h3>Basic Settings</h3>
        <div class="switcher">
            <Switcher
                label="Fix Score"
                id="fixScore"
                :checked="settings.fixScore"
                @update="onUpdate">
            </Switcher>
        </div>
        <div class="switcher">
            <Switcher
                label="Fix Download"
                id="fixDownload"
                :checked="settings.fixDownload"
                @update="onUpdate">
            </Switcher>
        </div>
        <div class="switcher">
            <Switcher
                label="Schedule"
                id="schedule"
                :checked="settings.schedule"
                @update="onUpdate">
            </Switcher>
        </div>
        <h3>Customize</h3>
        <div class="switcher">
            <Switcher
                label="Discipline Names"
                id="disciplineNames"
                :checked="settings.disciplineNames"
                @update="onUpdate">
            </Switcher>
        </div>
        <div class="switcher">
            <Switcher
                label="Dark Theme"
                id="darkTheme"
                :checked="settings.darkTheme"
                @update="onUpdate">
            </Switcher>
        </div>
        <div class="buttons">
            <input
                id="bugreport"
                type="button"
                value="Report a Bug"
                @click="bugReport" />
            <input
                id="description"
                type="button"
                value="Description"
                @click="description" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Settings } from '@/interfaces/StorageSettings'

import { onMounted, ref } from 'vue'
import Switcher from './switcher.vue'

import getSettings from '@/helpers/getSettings'
import wakeUpBackground from '@/helpers/wakeUpBackground'


const settings = ref(null as Settings)
const allChecked = ref(false)
const version = ref('')
const opacity = ref('0')

getSettings().then(response => {
    settings.value = response.settings
    version.value = response.version

    allChecked.value = isAllChecked()
})

const isAllChecked = () => {
    let allChecked = true
    for (const key of Object.keys(settings.value))
        allChecked = allChecked && settings.value[key]
    return allChecked
}

const onUpdate = async (evt: InputEvent, checked: boolean) => {
    const slider = evt.target as HTMLInputElement

    if (slider.id === 'allSettings') {
        for (const key of Object.keys(settings.value))
            settings.value[key] = !checked
    }
    else
        settings.value[slider.id] = !checked

    allChecked.value = isAllChecked()

    await wakeUpBackground()
    chrome.runtime.sendMessage({ task: 'setSettings', settings: settings.value }, response => {
        console.log(response)
    })
}

onMounted(() => setTimeout(() => (opacity.value = '100%'), 300))

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
    --opacity: 0;
    width: 200px;
    padding: 30px;
    background: #1d1c1c;
    opacity: var(--opacity);
    transition: 1.5s;
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

<style lang="scss">
html,
body {
    margin: 0;
    background: #1d1c1c;
}
</style>
