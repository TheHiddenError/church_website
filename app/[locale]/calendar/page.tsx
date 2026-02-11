import ScriptureSec from "./ui/scriptureSection"
import CalendarSec from "./ui/calendarSection";
import eventList from "../lib/placeholder_data";
import { EventDef } from "../lib/placeholder_data"; //find better way
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";

const currentMonth = (new Date()).getMonth();

const getMonthRegex = /\d{2}(?=-)/

const validData: EventDef []  = []

for (const event of eventList) {
    let month = undefined;
    const temp = event.date.match(getMonthRegex);
    if (temp)
        month = Number(temp[0]) -1;
    if (month && month <= currentMonth + 2){
        validData.push(event);
    }

}


export default async function Calendar(){
    const host = (await headers()).get("host"); 
    const locale = await getLocale();
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https"; 
    const baseUrl = `${protocol}://${host}/${locale}`;


    console.log(baseUrl)
    const {text, verse, translation, link} = await fetch(`${baseUrl}/api/scripture`).then(res => res.json());
    return (
        <>
            <ScriptureSec text={text} verse={verse} translation={translation} link={link}/>
            <CalendarSec eventData={validData}/>
        </>
    )
}