type LessonClassname =
    | 'lecture'
    | 'lecture current-lesson'
    | 'sem'
    | 'sem current-lesson'
    | 'lab'
    | 'lab current-lesson'
    | 'holiday'
    | 'holiday current-lesson'

/** Массив, содержащий информацию о паре
 * @param 0 - Номер дня недели [1-6]
 * @param 1 - Название предмета
 * @param 2 - Номер пары
 * @param 3 - Номер аудитории
 */
type LessonParsed = [string, string, string, string] | []

/** Интерфейс, описывающий пару, передаваемую в компонент scheduleLesson*/
interface LessonObject {
    name: string
    type: LessonClassname
}

export { LessonClassname, LessonParsed, LessonObject }
