import ScriptureSec from "./ui/scriptureSection"
import CalendarSec from "./ui/calendarSection";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import { getThreeMonthsEvents } from "@/app/actions/events";
import { EventDef } from "../lib/types";
import { change24to12Format } from "../helperFunctions/dates_functions";

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
    const host = (await headers()).get("host"); 
    const locale = await getLocale();
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https"; 
    const baseUrl = `${protocol}://${host}/${locale}`;

    const {text, verse, translation, link} = await fetch(`${baseUrl}/api/scripture`).then(res => res.json());
    const raw_data = await getThreeMonthsEvents();
    const valid_data: EventDef[] = [];

    for (const row of raw_data ){
        valid_data.push({
            ...row,
            date: row.date.toLocaleDateString(),
            time: change24to12Format(row.date)
        })
    }

    return (
        <>
            <ScriptureSec text={text} verse={verse} translation={translation} link={link}/>
            <CalendarSec eventData={valid_data}/>
        </>
    )
}