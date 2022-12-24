/** Функция определяет тип пары исходя из пометки в названии */
export default function getLessonType(lesson: string) {
    const type = lesson.split(' ')
    switch (type[type.length - 1]) {
        case '[Лек]':
            return 'lecture'

        case '[Лаб]':
            return 'lab'

        case '':
            return 'holiday'

        default:
            return 'sem'
    }
}
