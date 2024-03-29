export type LessonClassname = 'lecture' | 'sem' | 'lab' | 'holiday'

/** Массив, содержащий информацию о паре
 * @param 0 - Номер дня недели [1-6]
 * @param 1 - Название предмета
 * @param 2 - Номер пары
 * @param 3 - Номер аудитории
 */
export type LessonParsed = [string, string, string, string] | []

/** Интерфейс, описывающий пару, передаваемую в компонент scheduleLesson*/
export interface LessonObject {
    name: string
    type: LessonClassname
}

export type CurrentLesson = 'current-lesson' | ''

export type MobileHidden = 'mobile-hidden' | ''