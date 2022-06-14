import { useState } from 'react'
import { calendars } from '../constants/calendars.js'
import { numberingSystems } from '../constants/numberingSystems.js'
import { timeZones } from '../constants/timeZones.js'
import { useResolvedDir } from '../hooks/useResolvedDir.js'
import { useResolvedLocaleOptions } from '../hooks/useResolvedLocaleOptions.js'
import styles from './App.module.css'
import { DatePicker } from './DatePicker.jsx'

export const App = () => {
    const [dateString, setDateString] = useState(undefined)
    const [locale, setLocale] = useState(undefined)
    const [dir, setDir] = useState(undefined)
    const [calendar, setCalendar] = useState(undefined)
    const [numberingSystem, setNumberingSystem] = useState(undefined)
    const [timeZone, setTimeZone] = useState(undefined)
    const { resolvedLocale, resolvedOptions, error } = useResolvedLocaleOptions(
        {
            calendar,
            locale,
            numberingSystem,
            timeZone,
        }
    )
    const resolvedDir = useResolvedDir(dir, resolvedLocale)
    const onDateSelect = ({ dateString }) => {
        setDateString(dateString)
    }

    return (
        <div className={styles.wrapper}>
            <form>
                <div className={styles.field}>
                    <label htmlFor="dateString">dateString: </label>
                    <input
                        type="date"
                        id="dateString"
                        name="dateString"
                        value={dateString || ''}
                        onChange={e => setDateString(e.target.value)}
                    />
                </div>
                <div className={styles.info}>
                    A string with <pre>year-month-day</pre>, either an iso8601
                    date string or local calendar string depending on the
                    datepicker <pre>local</pre> prop.
                </div>
                <div className={styles.field}>
                    <label htmlFor="locale">locale: </label>
                    <input
                        type="text"
                        id="locale"
                        name="locale"
                        value={locale || ''}
                        onChange={e => setLocale(e.target.value)}
                    />
                </div>
                <div className={styles.info}>
                    A valid locale string as defined in the <pre>Intl</pre>{' '}
                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument">
                        API docs
                    </a>
                </div>
                <div className={styles.field}>
                    <label htmlFor="dir">dir: </label>
                    <select
                        type="text"
                        id="dir"
                        name="dir"
                        value={dir || ''}
                        onChange={e => setDir(e.target.value)}
                    >
                        <option value="" disabled>
                            Select an option
                        </option>
                        <option value="ltr">ltr</option>
                        <option value="rtl">rtl</option>
                    </select>
                </div>
                <div className={styles.field}>
                    <label htmlFor="calendar">calendar: </label>
                    <select
                        type="text"
                        id="calendar"
                        name="calendar"
                        value={calendar || ''}
                        onChange={e => setCalendar(e.target.value)}
                    >
                        <option value="" disabled>
                            Select an option
                        </option>
                        {calendars.map(calendar => (
                            <option key={calendar} value={calendar}>
                                {calendar}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.info}>
                    Not all calendars in the dropdown seem to work, perhaps not
                    implemented in the polyfill, or invalid.
                </div>
                <div className={styles.field}>
                    <label htmlFor="numberingSystem">numberingSystem: </label>
                    <select
                        type="text"
                        id="numberingSystem"
                        name="numberingSystem"
                        value={numberingSystem || ''}
                        onChange={e => setNumberingSystem(e.target.value)}
                    >
                        <option value="" disabled>
                            Select an option
                        </option>
                        {numberingSystems.map(numberingSystem => (
                            <option
                                key={numberingSystem}
                                value={numberingSystem}
                            >
                                {numberingSystem}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.info}>
                    Not all numbering systems in the dropdown seem to work,
                    perhaps not implemented in the polyfill, or invalid.
                </div>
                <div className={styles.field}>
                    <label htmlFor="timeZone">timeZone: </label>
                    <select
                        type="text"
                        id="timeZone"
                        name="timeZone"
                        value={timeZone || ''}
                        onChange={e => setTimeZone(e.target.value)}
                    >
                        <option value="" disabled>
                            Select an option
                        </option>
                        {timeZones.map(timeZone => (
                            <option key={timeZone} value={timeZone}>
                                {timeZone}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.info}>
                    Not all timezones in the dropdown seem to work, perhaps not
                    implemented in the polyfill, or invalid.
                </div>
            </form>
            {error ? (
                <div>{error.message}</div>
            ) : (
                <>
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
                </>
            )}
        </div>
    )
}
