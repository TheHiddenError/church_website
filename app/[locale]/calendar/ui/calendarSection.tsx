"use client"

import clsx from "clsx";
import {getFirstWeekday, getGridRows, getMaxDays, getFirstMonday, change24to12Format } from "../../helperFunctions/dates_functions"
import { useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { EventDef } from "../../lib/types";


type Event = {
    date?: string,
    title?: string, 
    time?: string,
    importance?: boolean,
    summary?: string,
    location?: string
}

const current: Date = new Date();
const current_year = current.getFullYear();

const monthDaysMax: number [] = Array.from({length: 12}, () => 0);
for (let i = 1; i < monthDaysMax.length; i++){
    monthDaysMax[i] = monthDaysMax[i-1] + getMaxDays(current_year, i-1);
}


const current_day: number = current.getDate();
const monthToCompare = current.getMonth();

const the_month: number = current.getMonth();

const monthNames: string [] = [
    "jan",
    "feb",
    "mar", 
    "apr",
    "may",
    "jun", 
    "july",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
]

const eventFor = {
    Men: "bg-blue-500",
    Women: "bg-pink-500",
    Children: "bg-yellow-500",
    Youth: "bg-violet-500",
    Church: "bg-red-500",
    Other: "bg-green-500"
}


export default function CalendarSec({eventData}: {eventData: EventDef []}){

    const locale = useLocale();

    const t = useTranslations("Calendar");

    const daysOfWeek = Object.values(t.raw("days") as Record<string, string>);


    const [calendarTracker, setTracker] = useState(the_month);
    const [eventClick, setEventClick] = useState(false);
    const [eventInfo, setEventInfo] = useState <EventDef | undefined>(undefined);

    const current_month: string = t('months.'+ monthNames[calendarTracker]);
    const firstDay = getFirstWeekday(current_year, calendarTracker);

    const constantEvents: Event [] = Array.from({length: 7}, () => ({}));

    constantEvents[0] = {title: t("events.sun"), time: "10:30 AM"}
    constantEvents[1] = {title: t("events.mon"), time: "7:00 PM"}
    constantEvents[3] = {title: t("events.wed"), time: "7:00 PM"}

    const maxDays = getMaxDays(current_year, calendarTracker);
    const gridRows = getGridRows(current_year,calendarTracker, firstDay);

    
    const calendarCols: number [] = Array.from({length: 7}, () => 0);
    const calendarRows: number [] = Array.from({length: gridRows}, () => 0);


    const regexEx = /(?<month>\d+)\/(?<day>\d+)(?=\/)/
    const eventMap = new Map<number, EventDef []>();
    // const importantMap = new Map<number, EventDef>();

    // for (const imp of ImportantEvents){
    //     const checker = imp.date.match(/[A-z][a-z]/) //Only monday service would be constant. The rest would be a date

    //     if (checker) {
    //         let temp_month = current.getMonth()
    //         for (let i = 0; i < 3; i ++){
    //             const firstMonday = getFirstMonday(current.getFullYear(), temp_month);
    //             const temp_obj =  {...imp, date: `${temp_month < 10 ? `0${temp_month}`: temp_month }-0${firstMonday}-26`}
    //             importantMap.set(monthDaysMax[temp_month], temp_obj);
    //             temp_month ++;
    //         }
    //     }

    // }

    for (const event of eventData){
        const regexMatch = event.date.match(regexEx);
        console.log(regexMatch);
        if (regexMatch == null)
            continue;
        const theDay = Number(regexMatch?.groups?.day);
        const eventMonth = monthDaysMax[Number(regexMatch?.groups?.month) - 1];
        const eventReturn = eventMap.get(theDay + eventMonth);
        if (eventReturn != undefined){
            eventMap.set(theDay + eventMonth, [...eventReturn, event]);
        }
        else {
            if (event.location == undefined)
                eventMap.set(theDay + eventMonth, [{...event, location: "Iglesia Nueva Esperanza"}]);

            else {
                eventMap.set(theDay + eventMonth, [event]);
            }
        }
        
    }

    function changeCalendarMonth(increase=false){
        setTracker((element)=> increase ? element + 1: element -1);
    }



    function eventClickHandler(eInfo: EventDef | undefined = undefined){
        setEventClick((event) => !event);
        setEventInfo(eInfo);
    }

    function PopupPartialSection({title, info}: {title: string, info: string}){

        const properTitle = t("pop_up." + title);
        return (
        <div>
            <div className="font-bold text-xl inline-block">
                {properTitle}:
            </div>
            <span className="text-md pl-2">
                {info}
            </span>
        </div>
        )
    }

    function PopupInfoSection(){
        if (eventInfo == undefined)
            return;
        const valuesToShow = [locale == "en" ? "summary": "summary_es", "date", "time", "location"]
        return (
        <>
            <div className="h-3/5 mt-2 flex flex-col gap-5">
                {Object.entries(eventInfo).map(([key, value]) => {
                    if (!(valuesToShow.includes(key))) 
                        return null;
                    return (
                    <PopupPartialSection
                        key={key}
                        title={key.replace(/_\w*/, "")}
                        info={value == undefined || typeof value == "boolean"? "": value}
                    />
                    );
                })}
                <div className="flex w-full justify-center">
                    <div className="w-1/2 rounded-lg bg-red-400 text-center text-white text-lg cursor-pointer">
                        {t("pop_up.reminder")}
                    </div>
                </div>
            </div>
            <div onClick={()=> eventClickHandler()} className="absolute top-0 right-0 w-1/20 h-1/10 bg-gray-300 mt-2 mr-2 cursor-pointer">
                <Image className="object-cover" src ="/x_icon.jpg"
                fill 
                alt = "x icon" 
                />
            </div>
        </>
        )
    }


    return(
    <>
        <div className="w-screen flex flex-col items-center mb-15">
            <div className="grid grid-cols-3 w-full my-6">
                <div onClick={()=>changeCalendarMonth()} className={clsx("place-self-end cursor-pointer", {"invisible pointer-events-none": calendarTracker == monthToCompare})}>
                    <svg
                    width="40"
                    height="40"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M11 3L5 8L11 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
                </div>
                <div className="text-4xl font-extrabold place-self-center">
                    {current_month}
                </div>
                <div onClick={()=> changeCalendarMonth(true)} className={clsx("place-self-start cursor-pointer", {"invisible pointer-events-none": calendarTracker == monthToCompare + 2})}>
                    <svg
                    width="40"
                    height="40"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M5 3L11 8L5 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
                </div>
            </div>
            <div className={`grid grid-cols-${Object.keys(eventFor).length + 1} w-4/5 my-3`}>
                <div className="justify-self-center font-extrabold text-lg pr-3">
                    {t("legend.name")}:
                </div>
                {Object.entries(eventFor).map(([key, value], index) => {
                    return (
                        <div className="h-full flex items-center" key = {index.toString() + key}>
                            <div className={`w-1/5 inline-block h-full ${value} justify-self-end-safe`}/>   
                            <span className="w-1/2 font-bold text-md pl-2">{t("legend."+key.toLowerCase())}</span>
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
                            // const importEvent = importantMap.get(iterateDay + monthDaysMax[calendarTracker]);
                            const eventsInformation = eventMap.get(iterateDay + monthDaysMax[calendarTracker]);
                        return <div key={index + (7 * upperIndex)}>
                            <div className={clsx( "border-l-2 border-b-2 border-black w-full h-40 relative",
                                {"border-t-2": upperIndex === 0, 
                                "border-r-2": index === 6,
                                "bg-blue-300 font-bold": current.getMonth() == calendarTracker && (iterateDay) === current_day,
                                })}>
                                {/* {importEvent != undefined ?
                                    <div className="w-full" key={importEvent.title}>
                                        <div onClick={importEvent?.summary ? ()=> eventClickHandler(importEvent): undefined} className={clsx("text-center w-full", 
                                            eventFor[importEvent.for as keyof typeof eventFor] ?? "bg-gray-200",
                                            {"text-white rounded-lg cursor-pointer py-1" : importEvent?.summary,
                                            })}>
                                            <div className="">
                                                {importEvent === undefined ? constantEvents[index]?.title : (locale == "en" ?  importEvent.title: importEvent.title_es)}
                                            </div>
                                        </div>
                                    </div>
                                : */}
                                    <>
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
                                                    <div onClick={eve?.summary ? ()=> eventClickHandler(eve): undefined} className={clsx("text-center w-full drop-shadow-md", 
                                                        eventFor[eve.for as keyof typeof eventFor] ?? "bg-gray-200",
                                                        {"text-white rounded-lg cursor-pointer py-1" : eve?.summary,
                                                        })}>
                                                        <div className={clsx("text-md", {"text-sm" : eve.title_es.length > 20})}>
                                                            {eve === undefined ? constantEvents[index]?.title : (locale == "en" ?  eve.title: eve.title_es)}
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                            })}
                                        </div>
                                        <div className= {clsx("w-1 h-35 absolute bg-red-600 z-10 top-0 left-20 inset-0 -rotate-45", {"hidden": (current.getMonth() < calendarTracker) || (current.getMonth() == calendarTracker) && (iterateDay >= current_day)  })} />
                                        <div className="absolute top-0 left-0 ml-2 mt-2"> {iterateDay}</div>
                                    </>
                                    }
                                </>
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
                            {eventInfo ? (locale == "en" ? eventInfo.title : eventInfo.title_es) : ""}
                        </div>
                        <div className="h-3/5 w-full border-b-1 border-gray-300 pb-2">
                            <div className="h-full w-1/8 relative">
                                <Image className="object-cover"
                                    src={eventInfo ? `/eventIcon/${eventInfo.type.toLowerCase()}.png`: "/missingImage.png"}
                                    alt ={"Descriptive Icon"}
                                    fill
                                />
                            </div>
                        </div>
                    </div>
                        <PopupInfoSection/>
                </div>
            </div>
        </div>
    </>
    )
}