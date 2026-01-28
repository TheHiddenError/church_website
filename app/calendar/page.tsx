import ScriptureSec from "./ui/scriptureSection"
import clsx from "clsx";

const placeHolder: number [] = Array.from({length: 7}, () => 0);
const placeHolder2: number [] = Array.from({length: 5}, () => 0);

const current: Date = new Date();

type Event = {
    date?: string,
    title?: string, 
    time?: string,
    importance?: boolean

}

const dummyEvents: Event [] = [
    {date: "01-10-26", time: "5:00 PM", title: "Church Anniversary"},
    {date: "01-14-26", time: "", title: "No Church"},
    {date: "01-30-26", time: "10:00 AM", title: "Chicken Plate Sale", importance: true},
    {date: "01-7-26", time: "7:00 PM ", title: "Prayer and Worship", importance: true}
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

const current_month: string = monthNames[the_month];


export default function Calendar(){
    return (
        <>
            <ScriptureSec />
            <div className="w-screen flex flex-col items-center">
                <div className="text-4xl font-extrabold my-6">
                    {current_month}
                </div>
                <div className="grid grid-rows w-4/5">
                    {placeHolder2.map((some, upperIndex) => {
                        
                        return (
                        <div key={(upperIndex + 1) * 100} className=" grid grid-cols-7 gap-0">
                            {placeHolder.map((something, index)=> {
                                const iterateDay: number = index + 1 + (7 * upperIndex);
                                const eventInformation = datesDummyEvents.get(iterateDay);
                            return <div key={index + (7 * upperIndex)}>
                                <div className={clsx( "border-l-2 border-b-2 border-black w-full h-30 relative",
                                 {"border-t-2": upperIndex === 0, 
                                   "border-r-2": index === 6,
                                   "bg-blue-300": (iterateDay) === current_day,
                                 })}>
                                    <div className= {clsx("w-1 h-35 absolute bg-red-300 top-0 left-20 inset-0 -rotate-45", {"hidden": (iterateDay) >= current_day})}>
                                    </div> 
                                    <div className="absolute top-0 left-0 ml-2 mt-2"> {iterateDay}</div>
                                    <div className={clsx("absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full", {"bg-red-500 text-white rounded-lg" : eventInformation?.importance === true})}>
                                    <div className="">
                                        {eventInformation === undefined ? constantEvents[index]?.title ?? "" : eventInformation.title}
                                    </div>
                                        {eventInformation === undefined? constantEvents[index]?.time ?? "": eventInformation?.time ?? ""}
                                    </div>
                                </div>
                            </div>
                            })}
                        </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}