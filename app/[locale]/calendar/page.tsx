import ScriptureSec from "./ui/scriptureSection"
import CalendarSec from "./ui/calendarSection";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import {getDailyReadings, getThreeMonthsEvents, getThreeMonthsImportant } from "@/app/actions/events";
import { EventDef } from "../lib/types";
import { change24to12Format } from "../../helperFunctions/dates_functions";

const currentMonth = (new Date()).getMonth();

const getMonthRegex = /\d{2}(?=-)/

// const validData: EventDef []  = []

// for (const event of eventList) {
//     let month = undefined;
//     const temp = event.date.match(getMonthRegex);
//     if (temp)
//         month = Number(temp[0]) -1;
//     if (month && month <= currentMonth + 2){
//         validData.push(event);
//     }

// }


export default async function Calendar(){
    const locale = await getLocale();

    const info = await getDailyReadings(locale);
    const raw_important = await getThreeMonthsImportant();

    const {
    text: textV = "",
    verse: verseN = "",
    link: linkV = "",
    translation: translationV = ""
    } = info ?? {};

    const raw_data = await getThreeMonthsEvents();
    const valid_data: EventDef[] = [];
    const valid_important: EventDef[] = [];

    for (const row of raw_important) {
        valid_important.push({
            ...row,
            date: row.date.toLocaleDateString(),
            time: change24to12Format(row.date)
        })
    }

    for (const row of raw_data ){
        valid_data.push({
            ...row,
            date: row.date.toLocaleDateString(),
            time: change24to12Format(row.date)
        })
    }

    return (
        <>
            <ScriptureSec text={textV} verse={verseN} translation={translationV} link={linkV}/>
            <CalendarSec eventData={valid_data} importantEvents={valid_important}/>
        </>
    )
}