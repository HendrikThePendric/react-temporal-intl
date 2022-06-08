import { Temporal, toTemporalInstant } from '@js-temporal/polyfill' // eslint-disable-line
Date.prototype.toTemporalInstant = toTemporalInstant

export const zdtToIsoDateStr = zdt =>
    zdt.toPlainDate().toString({ calendarName: 'never' })

export const zdtToLocalDateStr = zdt =>
    [
        zdt.year,
        String(zdt.month).padStart(2, '0'),
        String(zdt.day).padStart(2, '0'),
    ].join('-')

export const isoDateStringToZdt = ({ dateString, calendar, timeZone }) =>
    new Date(dateString)
        .toTemporalInstant()
        .toZonedDateTime({ calendar, timeZone })
        .startOfDay()

export const localDateStringToZd = ({ dateString, calendar, timeZone }) => {
    const [year, month, day] = dateString.split('-').map(Number)

    return Temporal.ZonedDateTime.from({
        year,
        month,
        day,
        timeZone,
        calendar,
    }).startOfDay()
}
