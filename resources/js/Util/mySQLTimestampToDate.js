export default function mySQLTimestampToDate(timestamp) {
    const isoTimestamp = timestamp.replace(' ', 'T')
    return new Date(isoTimestamp)
}
