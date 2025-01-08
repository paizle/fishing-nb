import { parse } from 'date-fns'
import config from './config'

export default function parseMySqlDate(dateString) {
    const test = parse(dateString, config.mysqlDateFormat, new Date())
    return test
}
