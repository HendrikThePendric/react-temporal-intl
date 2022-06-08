import { useMemo } from 'react'

const getPriorZdts = currentZdt => {
    const priorZdts = []
    let previousZdt = currentZdt
    let firstWeekDayReached = false
    let firstDayOfTheMonthReached = false
    let startReached

    while (!startReached) {
        firstWeekDayReached = previousZdt.dayOfWeek === 1
        firstDayOfTheMonthReached =
            firstDayOfTheMonthReached || previousZdt.day === 1
        startReached = firstWeekDayReached && firstDayOfTheMonthReached

        if (previousZdt !== currentZdt) {
            priorZdts.unshift(previousZdt)
        }

        previousZdt = previousZdt.subtract({ days: 1 })
    }

    return priorZdts
}

const getSubsequentZdts = currentZdt => {
    const subsequentZdts = []
    let nextZdt = currentZdt
    let lastWeekdayReached = false
    let lastDayOfMonthReached = false
    let endReached

    while (!endReached) {
        lastWeekdayReached = nextZdt.dayOfWeek === currentZdt.daysInWeek
        lastDayOfMonthReached =
            lastDayOfMonthReached || nextZdt.day === currentZdt.daysInMonth
        endReached = lastWeekdayReached && lastDayOfMonthReached

        if (nextZdt !== currentZdt) {
            subsequentZdts.push(nextZdt)
        }

        nextZdt = nextZdt.add({ days: 1 })
    }

    return subsequentZdts
}

const groupByWeek = (acc, day) => {
    if (day.dayOfWeek === 1) {
        acc.push([])
    }
    const currentWeekArray = acc[acc.length - 1]
    currentWeekArray.push(day)
    return acc
}

export const useCalendarWeekDays = dayZdt =>
    useMemo(
        () =>
            [
                ...getPriorZdts(dayZdt),
                dayZdt,
                ...getSubsequentZdts(dayZdt),
            ].reduce(groupByWeek, []),
        [dayZdt]
    )
