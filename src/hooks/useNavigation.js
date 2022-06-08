import { Intl, toTemporalInstant } from '@js-temporal/polyfill' // eslint-disable-line
Date.prototype.toTemporalInstant = toTemporalInstant
import { useMemo } from 'react'

export const useNavigation = ({
    firstZdtOfVisibleMonth,
    formatters,
    setFirstZdtOfVisibleMonth,
}) =>
    useMemo(() => {
        const prevYear = firstZdtOfVisibleMonth.subtract({ years: 1 })
        const nextYear = firstZdtOfVisibleMonth.add({ years: 1 })
        const prevMonth = firstZdtOfVisibleMonth.subtract({ months: 1 })
        const nextMonth = firstZdtOfVisibleMonth.add({ months: 1 })

        return {
            prevYear: {
                label: formatters.yearNumeric.format(prevYear.toInstant()),
                navigateTo: () => setFirstZdtOfVisibleMonth(prevYear),
            },
            currYear: {
                label: formatters.yearNumeric.format(
                    firstZdtOfVisibleMonth.toInstant()
                ),
            },
            nextYear: {
                label: formatters.yearNumeric.format(nextYear.toInstant()),
                navigateTo: () => setFirstZdtOfVisibleMonth(nextYear),
            },
            prevMonth: {
                label: formatters.monthLong.format(prevMonth.toInstant()),
                navigateTo: () => setFirstZdtOfVisibleMonth(prevMonth),
            },
            currMonth: {
                label: formatters.monthLong.format(
                    firstZdtOfVisibleMonth.toInstant()
                ),
            },
            nextMonth: {
                label: formatters.monthLong.format(nextMonth.toInstant()),
                navigateTo: () => setFirstZdtOfVisibleMonth(nextMonth),
            },
        }
    }, [firstZdtOfVisibleMonth, formatters, setFirstZdtOfVisibleMonth])
