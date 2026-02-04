import ScriptureSec from "./ui/scriptureSection"
import CalendarSec from "./ui/calendarSection";
import eventList from "../lib/placeholder_data";
import { EventDef } from "../lib/placeholder_data"; //find better way

const currentMonth = (new Date()).getMonth();

const getMonthRegex = /\d{2}(?=-)/

const validData: EventDef []  = []

for (const event of eventList) {
    let month = undefined;
    const temp = event.date.match(getMonthRegex);
    if (temp)
        month = Number(temp[0]) -1;
    if (month && month == currentMonth){
        validData.push(event);
    }

}


export default async function Calendar(){

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; //for dev portion
    const apiInformation = await fetch(`${baseUrl}/api/scripture`).then(res => res.json());
    return (
        <>
            <ScriptureSec  {...apiInformation}/>
            <CalendarSec eventData={validData}/>
        </>
    )
}