import { Temporal, toTemporalInstant } from '@js-temporal/polyfill' // eslint-disable-line
Date.prototype.toTemporalInstant = toTemporalInstant
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isoDateStringToZdt, zdtToIsoDateStr } from '../utils/conversions.js'
import { useCalendarWeekDays } from './useCalendarWeekDays.js'
import { useFormatters } from './useFormatters.js'
import { useNavigation } from './useNavigation.js'
import { useWeekDayLabels } from './useWeekDayLabels.js'

export const useDatePicker = ({
    onDateSelect,
    dateString,
    locale,
    options,
}) => {
    const prevDateStringRef = useRef(dateString)
    const temporalCalendar = useMemo(
        () => Temporal.Calendar.from(options.calendar),
        [options]
    )
    const temporalTimeZone = useMemo(
        () => Temporal.TimeZone.from(options.timeZone),
        [options]
    )
    const formatters = useFormatters({
        locale,
        options,
        temporalCalendar,
        temporalTimeZone,
    })
    const todayZdt = useMemo(
        () =>
            Temporal.Now.zonedDateTime(temporalCalendar)
                .withTimeZone(temporalTimeZone)
                .startOfDay(),
        [temporalCalendar, temporalTimeZone]
    )
    const selectedDateZdt = useMemo(
        () =>
            dateString
                ? isoDateStringToZdt({
                      dateString,
                      calendar: temporalCalendar,
                      timeZone: temporalTimeZone,
                  })
                : null,
        [dateString, temporalCalendar, temporalTimeZone]
    )
    const [firstZdtOfVisibleMonth, setFirstZdtOfVisibleMonth] = useState(() => {
        const zdt = selectedDateZdt || todayZdt
        const daysToMonthStart = zdt.day - 1
        return zdt.subtract({ days: daysToMonthStart })
    })
    const weekDayLabels = useWeekDayLabels({ todayZdt, formatters })
    const navigation = useNavigation({
        firstZdtOfVisibleMonth,
        formatters,
        setFirstZdtOfVisibleMonth,
    })
    const selectDate = useCallback(
        zdt => {
            const dateString = zdtToIsoDateStr(zdt)
            onDateSelect({ dateString, zdt })
        },
        [onDateSelect]
    )
    const calendarWeekDaysZdts = useCalendarWeekDays(firstZdtOfVisibleMonth)

    useEffect(() => {
        if (dateString === prevDateStringRef.current) {
            return
        }

        prevDateStringRef.current = dateString

        if (!dateString) {
            return
        }

        const zdt = isoDateStringToZdt({
            dateString,
            calendar: temporalCalendar,
            timeZone: temporalTimeZone,
        })
        if (
            (firstZdtOfVisibleMonth.year !== zdt.year ||
                firstZdtOfVisibleMonth.month !== zdt.month) &&
            !calendarWeekDaysZdts.some(week =>
                week.some(day => day.equals(zdt))
            )
        ) {
            setFirstZdtOfVisibleMonth(zdt.subtract({ days: zdt.day - 1 }))
        }
    }, [
        dateString,
        firstZdtOfVisibleMonth,
        calendarWeekDaysZdts,
        temporalCalendar,
        temporalTimeZone,
    ])

    return {
        selectedDate: {
            zdt: selectedDateZdt,
            label:
                selectedDateZdt &&
                formatters.longFullDate.format(selectedDateZdt.toInstant()),
        },
        today: {
            label: formatters.daysAgoNonNumeric.format(0, 'day'),
            navigateTo: () =>
                setFirstZdtOfVisibleMonth(
                    todayZdt.subtract({ days: todayZdt.day - 1 })
                ),
        },
        calendarWeekDays: calendarWeekDaysZdts.map(week =>
            week.map(zdt => ({
                zdt,
                label: formatters.dayNumber.format(zdt.toInstant()),
                onClick: () => selectDate(zdt),
                isSelected: selectedDateZdt && zdt.equals(selectedDateZdt),
                isToday: todayZdt && zdt.equals(todayZdt),
                isInCurrentMonth:
                    firstZdtOfVisibleMonth &&
                    zdt.month === firstZdtOfVisibleMonth.month,
            }))
        ),
        ...navigation,
        weekDayLabels,
    }
}
