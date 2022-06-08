import React from 'react'
import { DatePickerWithPropsSummary } from './DatePickerWithPropsSummary.jsx'

export const App = () => (
    <>
        <DatePickerWithPropsSummary />
        <DatePickerWithPropsSummary
            calendar="iso8601"
            timeZone="Europe/Amsterdam"
            locale="nl-NL"
            dir="rtl"
        />
        <DatePickerWithPropsSummary
            calendar="islamic-civil"
            timeZone="Europe/Amsterdam"
            locale="nl-NL"
        />
        <DatePickerWithPropsSummary calendar="gregory" locale="nb-NO" />
        <DatePickerWithPropsSummary
            calendar="iso8601"
            timeZone="Europe/Amsterdam"
            locale="fr"
        />
        <DatePickerWithPropsSummary
            calendar="ethiopic"
            timeZone="Africa/Addis_Ababa"
            locale="am"
        />
        <DatePickerWithPropsSummary
            calendar="buddhist"
            numberingSystem="lana"
            timeZone="Asia/Bangkok"
            locale="th"
        />
        <DatePickerWithPropsSummary
            calendar="indian"
            timeZone="Asia/Calcutta"
            locale="hi-IN"
        />
        <DatePickerWithPropsSummary
            calendar="islamic-civil"
            timeZone="Asia/Riyadh"
            locale="ar-SA"
        />
    </>
)
