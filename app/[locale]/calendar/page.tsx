import ScriptureSec from "./ui/scriptureSection"
import CalendarSec from "./ui/calendarSection";
import { getLocale } from "next-intl/server";
import {getDailyReadings, getImportantMonthEvents, getMonthEvents } from "@/app/actions/events";




export default async function Calendar(){
    const locale = await getLocale();

    const info = await getDailyReadings(locale);

    const {
    text: textV = "",
    verse: verseN = "",
    link: linkV = "",
    translation: translationV = ""
    } = info ?? {};

    const valid_data = await getMonthEvents(0);
    const valid_important = await getImportantMonthEvents(0);

    return (
        <>
            <ScriptureSec text={textV} verse={verseN} translation={translationV} link={linkV}/>
            <CalendarSec eventData={valid_data} importantEvents={valid_important}/>
        </>
    )
}