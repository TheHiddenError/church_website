"use client"

import clsx from "clsx";
import {getFirstWeekday, getGridRows, getMaxDays, calenderMaps } from "../../../../helperFunctions/dates_functions"
import { useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { EventDef } from "../../../lib/types";


type Event = {
    date?: string,
    title?: string, 
    time?: string,
    importance?: boolean,
    summary?: string,
    location?: string
}


const timeConverter = (time: string) => {
    if (time == "0")
        return 0;
    let [hours, x] = time.split(":");
    const [minutes, modifier] = x.split(" ");
    if (modifier == "PM" && hours != "12")
        hours += 12;
    return (Number(hours) * 60) + minutes;

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


export default function CalendarSec({eventData, importantEvents}: {eventData: EventDef [], importantEvents: EventDef []}){

    const locale = useLocale();

    const t = useTranslations("Calendar");

    const daysOfWeek = Object.values(t.raw("days") as Record<string, string>);
    const [loading, setLoading] = useState<Boolean>(false)

    const [eventMap, setEventMap] = useState<Map<Number, EventDef[]>>(calenderMaps(eventData, monthDaysMax));
    const [importantMap, setImportantMap] = useState<Map<Number, EventDef[]>>(calenderMaps(importantEvents, monthDaysMax));
    const [calendarTracker, setTracker] = useState(the_month);
    const [dbTracker, setDBTracker] = useState(1);
    const [eventClick, setEventClick] = useState(false);
    const [eventInfo, setEventInfo] = useState <EventDef | undefined>(undefined);

    const current_month: string = t('months.'+ monthNames[calendarTracker]);
    const firstDay = getFirstWeekday(current_year, calendarTracker);

    const maxDays = getMaxDays(current_year, calendarTracker);
    const gridRows = getGridRows(current_year,calendarTracker);

    
    const calendarCols: number [] = Array.from({length: 7}, () => 0);
    const calendarRows: number [] = Array.from({length: gridRows}, () => 0);



    async function changeCalendarMonth(increase=false){
        setTracker((element)=> increase ? element + 1: element -1);
        if (increase && dbTracker < 3 && (calendarTracker-the_month+ 1) == dbTracker ){
            setLoading(true);
            try {
                const data = await fetch(`/api/month?adv=${dbTracker}`).then(res=> res.json());
                console.log(data)
                if (data){
                    setEventMap(element => new Map([
                        ...element, 
                        ...calenderMaps(data.regular, monthDaysMax)
                    ]))
                    setImportantMap(element=> new Map([
                        ...element,
                        ...calenderMaps(data.important, monthDaysMax)
                    ]))
                }
            }catch(error){
                console.log(error)

            }finally {
                setDBTracker(element=> element + 1);
                setLoading(false);
            }
        }
    }
    
    function eventClickHandler(eInfo: EventDef | undefined = undefined){
        setEventClick((event) => !event);
        setEventInfo(eInfo);
    }

    function PopupPartialSection({title, info}: {title: string, info: string}){

        const properTitle = t("pop_up." + title);
        return (
        <div>
            <div className="font-bold text-lg md:text-xl lg:text-2xl xl:text-2xl inline-block">
                {properTitle}:
            </div>
            <span className="text-sm md:text-xl lg:text-xl xl:text-lg pl-2">
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
            <div className="h-7/10 mt-2 flex flex-col gap-5">
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
                {/* <div className="flex w-full justify-center">
                    <div className="w-3/4 lg:w-1/2 rounded-lg bg-red-400 text-center text-white text-lg cursor-pointer">
                        {t("pop_up.reminder")}
                    </div>
                </div> */}
            </div>
            {/* <div onClick={()=> eventClickHandler()} className="absolute top-0 right-0 w-1/10 h-1/20 lg:w-1/10 lg:h-1/10 bg-gray-300 mt-2 mr-2 cursor-pointer">
                <Image className="object-cover" src ="/x_icon.jpg"
                fill 
                alt = "x icon" 
                />
            </div> */}
        </>
        )
    }

    function PopUp(){
        return (
        <div className={clsx("fixed inset-0 z-50 bg-gray-600/40 w-screen h-screen motion-preset-fade", {"hidden": !eventClick})}>
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-4/5 h-7/10 md:w-3/5 md:h-3/5 lg:h-2/5 lg:w-3/5 xl:w-1/2 xl:h-3/5 bg-white p-5 relative rounded-lg">
                    <div className="h-3/10">
                        <div className="text-2xl md:text-3xl lg:text-4xl font-bold h-1/2 lg:h-2/5 w-full flex">
                            <div>
                                {eventInfo ? (locale == "en" ? eventInfo.title : eventInfo.title_es) : ""}
                            </div>  
                            <div onClick={()=> eventClickHandler()} className="ml-auto mr-1 cursor-pointer">
                                    <svg className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 "
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                            </div>                      
                        </div>
                        <div className="h-1/2 lg:h-3/5 w-full border-b-1 border-gray-300 pb-2">
                            <div className="h-full w-1/4 lg:w-1/8 relative">
                                <Image className="object-contain"
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
        )
    }

    return(
    <>
        <div className="w-screen flex flex-col items-center mb-15">
            <div className="grid grid-cols-3 w-full my-6 gap-5">
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
                <div className="text-3xl lg:text-4xl font-extrabold place-self-center">
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
            <div className="w-4/5 flex">
                <div className = "w-1/10">
                    <div className="flex justify-center items-center h-full font-extrabold text-lg pr-3">
                        {t("legend.name")}:
                    </div>
                </div>
                <div className="w-9/10">
                    <div className={`grid grid-cols-2 lg:grid-cols-6 w-4/5 my-3 ml-10 gap-2`}>
                        {Object.entries(eventFor).map(([key, value], index) => {
                            return (
                                <div className="h-full flex items-center" key = {index.toString() + key}>
                                    <div className={`w-1/5 inline-block h-full ${value} justify-self-end-safe`}/>   
                                    <span className="w-1/2 font-bold text-md pl-2">{t("legend."+key.toLowerCase())}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {loading === true ?
            <div className="w-full flex flex-col items-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold my-5">
                    {t("loading_events")}
                </div>
                <svg className="motion-rotate-loop-[1turn]/reset motion-ease-linear motion-duration-800" width="80" height="80" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#e0e0e0"
                        strokeWidth="10"
                    />
                    <circle 
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#3f6ef1"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="78.5 314" 
    
                    />
                </svg>
            </div>
            :
            <div className="grid grid-rows w-full lg:w-4/5 ">
                <div className="grid grid-cols-7">
                    {daysOfWeek.map((elementName) => {
                        return(
                            <div key = {elementName} className="font-semibold text-md lg:text-xl text-center">
                                {elementName}
                            </div>
                        )
                    })}
                </div>
                {calendarRows.map((some, upperIndex) => {
                    return (
                    <div key={(upperIndex + 1) * 100} className="grid grid-cols-7">
                        {calendarCols.map((something, index)=> {
                            const iterateDay: number = (index + 1 + (7 * upperIndex)) - firstDay;
                            const importEventInfo = importantMap.get(iterateDay + monthDaysMax[calendarTracker]);
                            let importEvent;
                            if (importEventInfo)
                                importEvent = importEventInfo[0];
                            const eventsInformation = eventMap.get(iterateDay + monthDaysMax[calendarTracker]);
                        return <div key={index + (7 * upperIndex)}>
                            <div className={clsx( "border-l-2 border-b-2 border-black w-full h-40 relative",
                                {"border-t-2": upperIndex === 0, 
                                "border-r-2": index === 6,
                                
                                "bg-blue-300 font-bold": current.getMonth() == calendarTracker && (iterateDay) === current_day,
                                })}>
                                <>
                                    {iterateDay > 0 && iterateDay <= maxDays &&
                                    <>
                                    {importEvent != undefined ?
                                    <div className="w-full h-full justify-center flex items-center">
                                        <div className="w-full" key={importEvent.title}>
                                            <div onClick={importEvent?.summary ? ()=> eventClickHandler(importEvent): undefined} className={clsx("text-center w-full", 
                                                eventFor[importEvent.for as keyof typeof eventFor] ?? "bg-gray-200",
                                                {"text-white rounded-lg cursor-pointer py-1" : importEvent?.summary,
                                                })}>
                                                <div className={clsx("text-sm lg:text-base line-clamp-1 lg:text-clamp-none", {"text-xs lg:text-sm" : importEvent.title_es.length > 20})}>
                                                    {(locale == "en" ?  importEvent.title: importEvent.title_es)}
                                                </div>
                                                <div className="text-xs lg:text-base">   
                                                    {importEvent.time}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        
                                        <div className="w-full h-full flex flex-col justify-center items-center text-center gap-2">
                                       
                                        {eventsInformation?.map((eve) => {
                                            return (
                                            <div className="w-full" key={eve.title}>
                                                    <div onClick={eve?.summary ? ()=> eventClickHandler(eve): undefined} className={clsx("text-center w-full drop-shadow-md", 
                                                        eventFor[eve.for as keyof typeof eventFor] ?? "bg-white drop-shadow-none text-[10px] md:text-base",
                                                        {"text-white rounded-lg cursor-pointer py-1" : eve?.summary,
                                                        })}>
                                                        <div className={clsx("text-sm lg:text-base line-clamp-1 lg:text-clamp-none", {"text-xs lg:text-sm" : eve.title_es.length > 20})}>
                                                            {locale == "en" ?  eve.title: eve.title_es}
                                                        </div>
                                                        <div className="text-xs lg:text-base">
                                                            {eve.time}
                                                        </div>
                                                    </div>
                                                </div>
                                            )})}
                                        </div>
                                    </>
                                    }
                                        <div className= {clsx("w-1 h-15 lg:h-35 absolute bg-red-600 z-10 left-1/2 top-1/3 lg:left-1/2 lg:top-0 inset-0 -rotate-45", {"hidden": (current.getMonth() < calendarTracker) || (current.getMonth() == calendarTracker) && (iterateDay >= current_day)  })} />
                                        <div className="absolute top-0 left-0 pt-1 px-1"> {iterateDay}</div>
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
            }
        </div>
        <PopUp />
    </>
    )
}