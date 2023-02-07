<template>
    <img
        :src="path"
        @click="changeName"
    />
</template>

<script setup lang="ts">
import { setName, checkName } from '@/functions/disciplineNames'

const path = chrome.runtime.getURL('assets/marker.png')

function changeName(evt: MouseEvent) {
    evt.stopPropagation()
    let newName = prompt('Новое название дисциплины')
    switch (checkName(newName)) {
        case -1:
            alert('Название не может быть пустым!')
            break

        case 1:
            alert(
                'Слова в названии дисциплины слишком длинные.\n' +
                'Расширение не гарантирует корректность работы в таком случае'
            )
            break
    }

    newName = newName as string
    newName.trim()

    const marker = evt.target as HTMLImageElement
    const disc = marker?.parentElement?.parentElement
    if (!disc) return
    const prevNameEl = disc.querySelector(':nth-child(2)')
    if (!prevNameEl) return
    let prevName = prevNameEl.getAttribute('prevname')
    if (!prevName) return

    setName(prevName, newName)
}
</script>
