// https://lingohub.com/academy/best-practices/rtl-language-list
const rtlLocales = new Set([
    'ar', // Arabic
    'arc', // Aramaic
    'dv', // Divehi
    'fa', // Persian
    'ha', // Hausa
    'he', // Hebrew
    'khw', // Khowar
    'ks', // Kashmiri
    'ku', // Kurdish
    'ps', // Pashto
    'ur', // Urdu
    'yi', // Yiddish
])

export const useResolvedDir = (dir, localeStr) => {
    if (dir) {
        return dir
    }

    const isRtlLocale =
        localeStr && localeStr.includes('-')
            ? rtlLocales.has(localeStr.split('-')[0])
            : rtlLocales.has(localeStr)

    return isRtlLocale ? 'rtl' : 'ltr'
}
