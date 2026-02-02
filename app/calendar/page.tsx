

import ScriptureSec from "./ui/scriptureSection"
import clsx from "clsx";
import {getFirstWeekday, getGridRows} from "../helperFunctions/dates_functions"





type Event = {
    date?: string,
    title?: string, 
    time?: string,
    importance?: boolean

}

const current: Date = new Date();

const firstDay = getFirstWeekday(current.getFullYear(), current.getMonth());

// const firstDay = getFirstWeekday(2024, testingMonth);

// console.log(firstDay);

const {maxDays, gridRows} = getGridRows(current.getFullYear(),current.getMonth(), firstDay);

const placeHolder: number [] = Array.from({length: 7}, () => 0);
const placeHolder2: number [] = Array.from({length: gridRows}, () => 0);



const dummyEvents: Event [] = [
    {date: "01-10-26", time: "5:00 PM", title: "Church Anniversary"},
    {date: "01-14-26", time: "", title: "No Church"},
    {date: "01-30-26", time: "10:00 AM", title: "Chicken Plate Sale", importance: true},
    {date: "01-5-26", time: "7:00 PM ", title: "Prayer and Worship", importance: true}
]

const regexEx = /(?<=-)\d+(?=-)/


const datesDummyEvents = new Map<number, Event>();

for (const event of dummyEvents){
    const regexMatch = event.date?.match(regexEx);
    if (regexMatch == null)
        continue;
    datesDummyEvents.set(Number(regexMatch[0]), {time: event.time, title: event.title, importance: event.importance ?? false})
}



const constantEvents: Event [] = Array.from({length: 7}, () => ({}));

constantEvents[0] = {title: "Sunday Service", time: "10:30 AM"}
constantEvents[1] = {title: "Prayer Night", time: "7:00 PM"}
constantEvents[3] = {title: "Disciple Service", time: "7:00 PM"}



const current_day: number = current.getDate();

const the_month: number = current.getMonth();

const monthNames: string [] = [
    "January",
    "Feburary",
    "March", 
    "April",
    "May",
    "June", 
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const daysOfWeek: string [] = [
    "Sun", 
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri", 
    "Sat"
]

const current_month: string = monthNames[the_month];


export default async function Calendar(){

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; //for dev portion
    // const apiInformation = await fetch(`${baseUrl}/api/scripture`).then(res => res.json());
    return (
        <>
            {/* <ScriptureSec  {...apiInformation}/> */}
            <div className="w-screen flex flex-col items-center mb-15">
                <div className="text-4xl font-extrabold my-6">
                    {current_month}
                </div>
                <div className="grid grid-rows w-4/5">
                    <div className="grid grid-cols-7">
                        {daysOfWeek.map((elementName) => {
                            return(
                                <div key = {elementName} className="font-semibold text-xl text-center">
                                    {elementName}
                                </div>
                            )
                        })}
                    </div>
                    {placeHolder2.map((some, upperIndex) => {
                        return (
                        <div key={(upperIndex + 1) * 100} className=" grid grid-cols-7">
                            {placeHolder.map((something, index)=> {
                                const iterateDay: number = (index + 1 + (7 * upperIndex)) - firstDay;
                                const eventInformation = datesDummyEvents.get(iterateDay);
                            return <div key={index + (7 * upperIndex)}>
                                <div className={clsx( "border-l-2 border-b-2 border-black w-full h-30 relative",
                                 {"border-t-2": upperIndex === 0, 
                                   "border-r-2": index === 6,
                                   "bg-blue-300": (iterateDay) === current_day,
                                 })}>
                                    {iterateDay > 0 && iterateDay <= maxDays &&
                                        <div>
                                            <div className= {clsx("w-1 h-35 absolute bg-red-600 z-10 top-0 left-20 inset-0 -rotate-45", {"hidden": (iterateDay) >= current_day})}>
                                            </div> 
                                            <div className="absolute top-0 left-0 ml-2 mt-2"> {iterateDay}</div>
                                            <div className={clsx("absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full", {"bg-red-500 text-white rounded-lg" : eventInformation?.importance === true})}>
                                            <div className="">
                                                {eventInformation === undefined ? constantEvents[index]?.title ?? "" : eventInformation.title}
                                            </div>
                                                {eventInformation === undefined? constantEvents[index]?.time ?? "": eventInformation?.time ?? ""}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            })}
                        </div>
                        )
                    })}
                </div>
            </div>
            <div className="fixed inset-0 z-50 bg-gray-600/40 w-screen h-screen hidden">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-3/5 h-3/5 bg-white p-5 relative">
                        <div className="h-2/5">
                            <div className="text-3xl font-bold h-2/5">
                                Title
                            </div>
                            <div className="h-3/5 w-full border-b-1 border-gray-300 pb-2">
                                <div className="h-full w-1/10 bg-gray-200">
                                </div>
                            </div>
                        </div>
                        <div className="h-3/5 mt-2 flex flex-col justify-center gap-5">
                            <div>
                                <div className="font-bold text-xl inline-block">
                                    Description: 
                                </div>
                                <span className="text-md pl-2">
                                    This is the description for the event
                                </span>
                            </div>
                            <div className="">
                                <div className="font-bold text-xl inline-block">
                                    Location: 
                                </div>
                                <span className="text-md pl-2">
                                    This is the location for the event
                                </span>
                            </div>
                            <div className="">
                                <div className="font-bold text-xl inline-block">
                                    Time: 
                                </div>
                                <span className="text-md pl-2">
                                    7:00 PM
                                </span>
                            </div>
                            <div className="">
                                <div className="font-bold text-xl inline-block">
                                    Questions?: 
                                </div>
                                <span className="text-md pl-2">
                                    956-123-4567
                                </span>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-1/20 h-1/10 bg-gray-300 mt-2 mr-2"></div>
                    </div>
                </div>
            </div>
        </>
    )
}