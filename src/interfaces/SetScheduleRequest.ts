import DefaultRequest from './DefaultRequest'
import { LessonParsed } from './Lesson'

export default interface SetScheduleRequest extends DefaultRequest {
    schedule: LessonParsed[][]
    group: string
}
