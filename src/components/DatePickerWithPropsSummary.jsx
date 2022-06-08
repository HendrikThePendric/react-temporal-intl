import PropTypes from 'prop-types'
import { useState } from 'react'
import { calendars } from '../constants/calendars.js'
import { numberingSystems } from '../constants/numberingSystems.js'
import { timeZones } from '../constants/timeZones.js'
import { useResolvedDir } from '../hooks/useResolvedDir.js'
import { useResolvedLocaleOptions } from '../hooks/useResolvedLocaleOptions.js'
import { DatePicker } from './DatePicker.jsx'
import styles from './DatePickerWithPropsSummary.module.css'

export const DatePickerWithPropsSummary = ({
    calendar,
    dir,
    locale,
    numberingSystem,
    timeZone,
}) => {
    const [dateString, setDateString] = useState('')
    const { resolvedLocale, resolvedOptions } = useResolvedLocaleOptions({
        calendar,
        locale,
        numberingSystem,
        timeZone,
    })
    const resolvedDir = useResolvedDir(dir, resolvedLocale)
    const onDateSelect = ({ dateString }) => {
        setDateString(dateString)
    }

    return (
        <div className={styles.wrapper}>
            <table className={styles.summaryTable}>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Provided</th>
                        <th>Resolved</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>calendar</th>
                        <td>{calendar || '-'}</td>
                        <td>{resolvedOptions.calendar}</td>
                    </tr>
                    <tr>
                        <th>dir</th>
                        <td>{dir || '-'}</td>
                        <td>{resolvedDir}</td>
                    </tr>
                    <tr>
                        <th>locale</th>
                        <td>{locale || '-'}</td>
                        <td>{resolvedLocale}</td>
                    </tr>
                    <tr>
                        <th>numberingSystem</th>
                        <td>{numberingSystem || '-'}</td>
                        <td>{resolvedOptions.numberingSystem}</td>
                    </tr>
                    <tr>
                        <th>timeZone</th>
                        <td>{timeZone || '-'}</td>
                        <td>{resolvedOptions.timeZone}</td>
                    </tr>
                    <tr></tr>
                </tbody>
            </table>
            <DatePicker
                calendar={calendar}
                dateString={dateString}
                onDateSelect={onDateSelect}
                dir={dir}
                locale={locale}
                numberingSystem={numberingSystem}
                timeZone={timeZone}
            />
        </div>
    )
}

DatePickerWithPropsSummary.propTypes = {
    calendar: PropTypes.oneOf(calendars),
    dir: PropTypes.oneOf(['ltr', 'rtl']),
    locale: PropTypes.string,
    numberingSystem: PropTypes.oneOf(numberingSystems),
    timeZone: PropTypes.oneOf(timeZones),
}
