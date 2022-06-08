import { Intl, toTemporalInstant } from '@js-temporal/polyfill' // eslint-disable-line
Date.prototype.toTemporalInstant = toTemporalInstant
import { useMemo } from 'react'

export const useFormatters = ({
    locale,
    options,
    temporalCalendar,
    temporalTimeZone,
}) =>
    useMemo(
        () => ({
            testNativeIntl: zdt => {
                console.log(zdt, locale, options)
                const formatter = new window.Intl.DateTimeFormat(locale, {
                    dateStyle: 'full',
                    numberingSystem: options.numberingSystem,
                    calendar: options.calendar,
                    timeZone: options.timeZone,
                })
                const nativeDate =
                    zdt && new Date(zdt.toInstant().epochMilliseconds)

                return nativeDate ? formatter.format(nativeDate) : '---'
            },
            longFullDate: new Intl.DateTimeFormat(locale, {
                dateStyle: 'full',
                numberingSystem: options.numberingSystem,
                calendar: temporalCalendar,
                timeZone: temporalTimeZone,
            }),
            yearNumeric: new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                calendar: temporalCalendar,
                timeZone: temporalTimeZone,
                numberingSystem: options.numberingSystem,
            }),
            monthLong: new Intl.DateTimeFormat(locale, {
                month: 'long',
                calendar: temporalCalendar,
                timeZone: temporalTimeZone,
            }),
            // daysAgo.format(0, 'day') => 'today'
            daysAgoNonNumeric: new window.Intl.RelativeTimeFormat(locale, {
                numeric: 'auto',
            }),
            dayNumber: new Intl.DateTimeFormat(locale, {
                day: 'numeric',
                calendar: temporalCalendar,
                timeZone: temporalTimeZone,
                numberingSystem: options.numberingSystem,
            }),
            weekDayNameShort: new Intl.DateTimeFormat(locale, {
                weekday: 'short',
                calendar: temporalCalendar,
                timeZone: temporalTimeZone,
            }),
        }),
        [locale, options, temporalCalendar, temporalTimeZone]
    )
