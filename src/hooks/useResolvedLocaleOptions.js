import { Intl } from '@js-temporal/polyfill' // eslint-disable-line
import { useMemo } from 'react'

export const useResolvedLocaleOptions = ({
    calendar,
    locale,
    numberingSystem,
    timeZone,
}) =>
    useMemo(() => {
        /**
         * If no options are provided this will use the values of the user browser
         * If a locale identifier is provided it will use that to populate options
         * If any options are provided these will override the options for the
         * specified locale identifier or browser settings
         */
        const { locale: resolvedLocale, ...resolvedOptions } =
            new Intl.DateTimeFormat(locale, {
                calendar,
                timeZone,
                numberingSystem,
            }).resolvedOptions()

        return {
            resolvedLocale,
            resolvedOptions,
        }
    }, [calendar, locale, numberingSystem, timeZone])
