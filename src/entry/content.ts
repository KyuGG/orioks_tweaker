import renderTest from './renderTest'
import StorageSettings from '@/interfaces/StorageSettings'

if (location.href === 'https://orioks.miet.ru/test') {
    renderTest()
}

if (location.href === 'https://orioks.miet.ru/student/practice/index') {
    console.log('object')
}

// chrome.runtime.sendMessage(
//     {
//         data: 'changeSettings',
//         settings: {
//             fixScore: true,
//             fixDownload: false,
//             schedule: false,
//             disciplineNames: false,
//             darkTheme: false,
//         } as StorageSettings['settings'],
//     },
//     response => {
//         console.log(response)
//     }
// )
