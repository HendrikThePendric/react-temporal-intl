import cx from 'classnames'
import PropTypes from 'prop-types'
import { calendars } from '../constants/calendars.js'
import { numberingSystems } from '../constants/numberingSystems.js'
import { timeZones } from '../constants/timeZones.js'
import { useDatePicker } from '../hooks/useDatePicker.js'
import { useResolvedDir } from '../hooks/useResolvedDir.js'
import { useResolvedLocaleOptions } from '../hooks/useResolvedLocaleOptions.js'
import styles from './DatePicker.module.css'

/**
 * TODO:
 * Add iso prop
 * Add classes to calendar days
 */

export const DatePicker = ({
    onDateSelect,
    calendar,
    dateString,
    dir,
    locale,
    numberingSystem,
    timeZone,
}) => {
    const { resolvedLocale, resolvedOptions } = useResolvedLocaleOptions({
        calendar,
        locale,
        numberingSystem,
        timeZone,
    })
    const resolvedDir = useResolvedDir(dir, resolvedLocale)
    const {
        calendarWeekDays,
        currMonth,
        currYear,
        nextMonth,
        nextYear,
        prevMonth,
        prevYear,
        selectedDate,
        today,
        weekDayLabels,
    } = useDatePicker({
        onDateSelect,
        dateString,
        locale: resolvedLocale,
        options: resolvedOptions,
    })

    return (
        <div className={styles.wrapper} dir={resolvedDir}>
            <div className={styles.navGridContainer}>
                <div className={styles.prev}>
                    <button onClick={prevYear.navigateTo}>
                        {prevYear.label}
                    </button>
                </div>
                <div className={styles.curr}>
                    <span className={styles.label}>{currYear.label}</span>
                </div>
                <div className={styles.next}>
                    <button onClick={nextYear.navigateTo}>
                        {nextYear.label}
                    </button>
                </div>
                <div className={styles.prev}>
                    <button onClick={prevMonth.navigateTo}>
                        {prevMonth.label}
                    </button>
                </div>
                <div className={styles.curr}>
                    <span className={styles.label}>{currMonth.label}</span>
                </div>
                <div className={styles.next}>
                    <button onClick={nextMonth.navigateTo}>
                        {nextMonth.label}
                    </button>
                </div>
                <div className={styles.today}>
                    <button className={styles.today} onClick={today.navigateTo}>
                        {today.label}
                    </button>
                </div>
            </div>
            <table className={styles.calendarTable}>
                <thead>
                    <tr>
                        {weekDayLabels.map((label, i) => (
                            <th key={`weekday-${i + 1}`}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {calendarWeekDays.map((week, weekIndex) => (
                        <tr key={`week-${weekIndex + 1}`}>
                            {week.map(day => (
                                <td
                                    key={`${day.zdt.monthCode}-${day.zdt.day}`}
                                    onClick={day.onClick}
                                    className={cx('day', {
                                        [styles.isSelected]: day.isSelected,
                                        [styles.isToday]: day.isToday,
                                        [styles.otherMonth]:
                                            !day.isInCurrentMonth,
                                    })}
                                >
                                    <span>{day.label}</span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.selectedDate}>
                <span className={styles.label}>{selectedDate.label}</span>
            </div>
            <div className={styles.selectedDate}>
                <span className={styles.label}>
                    {selectedDate.nativeDateLabel}
                </span>
            </div>
        </div>
    )
}

DatePicker.propTypes = {
    onDateSelect: PropTypes.func.isRequired,
    calendar: PropTypes.oneOf(calendars),
    dateString: PropTypes.string,
    dir: PropTypes.oneOf(['ltr', 'rtl']),
    locale: PropTypes.string,
    numberingSystem: PropTypes.oneOf(numberingSystems),
    timeZone: PropTypes.oneOf(timeZones),
}
