import ScriptureSec from "./ui/scriptureSection"
import CalendarSec from "./ui/calendarSection";
import eventList from "../lib/placeholder_data";
import { EventDef } from "../lib/placeholder_data"; //find better way
import { getLocale } from "next-intl/server";

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

    const locale = await getLocale();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/" + locale ; //for dev portion
    console.log(baseUrl)
    const {text, verse, translation, link} = await fetch(`${baseUrl}/api/scripture`).then(res => res.json());
    return (
        <>
            <ScriptureSec text={text} verse={verse} translation={translation} link={link}/>
            <CalendarSec eventData={validData}/>
        </>
    )
}