/** Заменяет css переменные для смены темы*/
export default function changeTheme() {
    document.documentElement.style.setProperty('--color1', '#0f1010')
    document.documentElement.style.setProperty('--color2', 'black')
    document.documentElement.style.setProperty('--color3', '#0b0c0c')
    document.documentElement.style.setProperty('--color4', 'rgb(20, 33, 41)')
    document.documentElement.style.setProperty('--color5', 'rgb(0, 140, 186)')
    document.documentElement.style.setProperty('--navbar', '#0e0e0c')
    document.documentElement.style.setProperty('--text-color', 'rgba(255, 255, 255, 0.8)')
    document.documentElement.style.setProperty('--border-color', '#2f2f33')
}