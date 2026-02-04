"use client"

import clsx from "clsx";
import {getFirstWeekday, getGridRows} from "../../helperFunctions/dates_functions"
import { useState } from "react";
import { EventDef } from "@/app/lib/placeholder_data";
import Image from "next/image";

type Event = {
    date?: string,
    title?: string, 
    time?: string,
    importance?: boolean,
    summary?: string,
    location?: string
}

const current: Date = new Date();

const firstDay = getFirstWeekday(current.getFullYear(), current.getMonth());

// const firstDay = getFirstWeekday(2024, testingMonth);

// console.log(firstDay);

const {maxDays, gridRows} = getGridRows(current.getFullYear(),current.getMonth(), firstDay);

const calendarCols: number [] = Array.from({length: 7}, () => 0);
const calendarRows: number [] = Array.from({length: gridRows}, () => 0);


// const dummyEvents: Event [] = [
//     {date: "01-10-26", time: "5:00 PM", title: "Church Anniversary"},
//     {date: "01-14-26", time: "", title: "No Church"},
//     {date: "01-24-26", time: "10:00 AM", title: "Chicken Plate Sale", importance: true},
//     {date: "01-5-26", time: "7:00 PM ", title: "Prayer and Worship", importance: true}
// ]

// const regexEx = /(?<=-)\d+(?=-)/


// const datesDummyEvents = new Map<number, Event>();

// for (const event of dummyEvents){
//     const regexMatch = event.date?.match(regexEx);
//     if (regexMatch == null)
//         continue;
//     datesDummyEvents.set(Number(regexMatch[0]), {time: event.time, title: event.title, importance: event.importance ?? false})
// }



const constantEvents: Event [] = Array.from({length: 7}, () => ({}));

constantEvents[0] = {title: "Sunday Service", time: "10:30 AM"}
constantEvents[1] = {title: "Prayer Night", time: "7:00 PM"}
constantEvents[3] = {title: "Disciple Service", time: "7:00 PM"}


const current_day: number = current.getDate();

const the_month: number = current.getMonth();

const monthNames: string [] = [
    "January",
    "February",
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

const eventFor = [
    ["Men", "Blue"],
    ["Women", "Violet"],
    ["Children", "Yellow"],
    ["Youth", "Cyan"],
    ["Church", "Red"],
    ["Other", "Green"]
]

const fixedLocation = "Iglesia Nueva Esperanza"

const current_month: string = monthNames[the_month];



export default function CalendarSec({eventData}: {eventData: EventDef []}){

    const [eventClick, setEventClick] = useState(false);
    const [eventInfo, setEventInfo] = useState <EventDef | undefined>(undefined);

    const regexEx = /(?<=-)\d+(?=-)/
    const eventMap = new Map<number, EventDef []>();
    for (const event of eventData){
        const regexMatch = event.date?.match(regexEx);
        if (regexMatch == null)
            continue;
        const theDay = Number(regexMatch[0]);
        const eventReturn = eventMap.get(theDay);
        if (eventReturn != undefined){
            eventMap.set(theDay, [...eventReturn, event]);
        }
        else {
            if (event.location == undefined)
                eventMap.set(theDay, [{...event, location: ""}]);

            else {
                eventMap.set(theDay, [event]);
            }
        }
        
    }



    function eventClickHandler(eInfo: EventDef | undefined = undefined){
        setEventClick((event) => !event);
        setEventInfo(eInfo);
    }

    function PopupPartialSection({title, info}: {title: string, info: string}){
        console.log(info);
        const properTitle = title[0].toUpperCase() + title.slice(1);
        return (
        <div>
            <div className="font-bold text-xl inline-block">
                {properTitle}:
            </div>
            <span className="text-md pl-2">
                {title == "location" && info == "" ? fixedLocation: info}
            </span>
        </div>
        )
    }

    function PopupInfoSection(){
        if (eventInfo == undefined)
            return;
        const valuesToShow = ["summary", "date", "time", "location"]
        return (
        <div className="h-3/5 mt-2 flex flex-col gap-5">
            {Object.entries(eventInfo).map(([key, value]) => {
                if (!(valuesToShow.includes(key))) 
                    return null;
                return (
                <PopupPartialSection
                    key={key}
                    title={key}
                    info={value == undefined || typeof value == "boolean"? "": value}
                />
                );
            })}
            <div className="flex w-full justify-center">
                <div className="w-1/2 rounded-lg bg-red-400 text-center text-white text-lg cursor-pointer">
                    Send a Reminder
                </div>
            </div>
        </div>
        )
    }


    return(
    <>
        <div className="w-screen flex flex-col items-center mb-15">
            <div className="text-4xl font-extrabold my-6">
                {current_month}
            </div>
            <div className={`grid grid-cols-${eventFor.length + 1} w-4/5 my-3`}>
                <div className="justify-self-center font-extrabold text-lg pr-3">
                    Legend:
                </div>
                {eventFor.map((element, index) => {
                    return (
                        <div className="h-full flex items-center" key = {index.toString() + element[0]}>
                            <div className={`w-1/5 inline-block h-full bg-${element[1].toLowerCase()}-500 justify-self-end-safe`}/>   
                            <span className="w-1/2 font-bold text-md pl-2">{element[0]}</span>
                        </div>
                    )
                })}
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
                {calendarRows.map((some, upperIndex) => {
                    return (
                    <div key={(upperIndex + 1) * 100} className=" grid grid-cols-7">
                        {calendarCols.map((something, index)=> {
                            const iterateDay: number = (index + 1 + (7 * upperIndex)) - firstDay;
                            const eventsInformation = eventMap.get(iterateDay);
                        return <div key={index + (7 * upperIndex)}>
                            <div className={clsx( "border-l-2 border-b-2 border-black w-full h-40 relative",
                                {"border-t-2": upperIndex === 0, 
                                "border-r-2": index === 6,
                                "bg-blue-300": (iterateDay) === current_day,
                                })}>
                                {iterateDay > 0 && iterateDay <= maxDays &&
                                <>
                                    <div className="w-full h-full flex flex-col justify-center items-center text-center gap-2">
                                        <div>
                                            <div className="">
                                                {constantEvents[index]?.title ?? ""}
                                            </div>
                                            <div>
                                                {constantEvents[index]?.time ?? ""}
                                            </div>
                                        </div>
                                        {eventsInformation?.map((eve) => {
                                            return (
                                            <div className="w-full" key={eve.title}>
                                                <div onClick={eve?.summary ? ()=> eventClickHandler(eve): undefined} className={clsx("text-center w-full", 
                                                    {"text-white rounded-lg cursor-pointer py-1" : eve?.summary,
                                                      "bg-red-500" : eve.for == "Church",
                                                      "bg-yellow-500": eve.for == "Children",
                                                      "bg-blue-500": eve.for == "Men",
                                                      "bg-violet-500": eve.for == "Women",
                                                      "bg-green-500": eve.for == "Open" 
                                                    })}>
                                                    <div className="">
                                                        {eve === undefined ? constantEvents[index]?.title ?? "" : eve.title}
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                        })}
                                    </div>
                                    <div className= {clsx("w-1 h-35 absolute bg-red-600 z-10 top-0 left-20 inset-0 -rotate-45", {"hidden": (iterateDay) >= current_day})} />
                                    <div className="absolute top-0 left-0 ml-2 mt-2"> {iterateDay}</div>
                                </>
                                }
                            </div>
                        </div>
                        })}
                    </div>
                    )
                })}
            </div>
        </div>
        <div className={clsx("fixed inset-0 z-50 bg-gray-600/40 w-screen h-screen", {"hidden": !eventClick})}>
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-1/2 h-3/5 bg-white p-5 relative">
                    <div className="h-2/5">
                        <div className="text-3xl font-bold h-2/5">
                            {eventInfo ? eventInfo.title : ""}
                        </div>
                        <div className="h-3/5 w-full border-b-1 border-gray-300 pb-2">
                            <div className="h-full w-1/8 relative">
                                <Image className="object-cover"
                                    src={eventInfo ? `/eventIcon/${eventInfo.type}.png`: "/missingImage.png"}
                                    alt ={"Descriptive Icon"}
                                    fill
                                />
                            </div>
                        </div>
                    </div>
                        <PopupInfoSection/>
                    <div onClick={()=> eventClickHandler()} className="absolute top-0 right-0 w-1/20 h-1/10 bg-gray-300 mt-2 mr-2 cursor-pointer"/>
                </div>
            </div>
        </div>
    </>
    )
}