import { useMemo } from 'react'

export const useWeekDayLabels = ({ todayZdt, formatters }) =>
    useMemo(() => {
        const daysInWeek = todayZdt.daysInWeek
        const labels = []
        const daysToWeekStart = todayZdt.dayOfWeek - 1
        let weekDay = 1
        let currentZonedDateTime = todayZdt.subtract({
            days: daysToWeekStart,
        })

        while (weekDay <= daysInWeek) {
            labels.push(
                formatters.weekDayNameShort.format(
                    currentZonedDateTime.toInstant()
                )
            )
            weekDay++
            currentZonedDateTime = currentZonedDateTime.add({ days: 1 })
        }

        return labels
    }, [todayZdt, formatters])
