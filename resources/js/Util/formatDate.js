import { format } from 'date-fns'
import config from './config'

export default function formatDate(date) {
    const test = format(date, config.displayDayMonthFormat)
    return test
}
