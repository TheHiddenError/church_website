import clsx from "clsx"
import styles from "./calendar.module.css"
import { formatDate } from "@/app/helperFunctions/dates_functions"

type readingType = {
    text?: string
    poem?: number
}

type Info = {
    type: string,
    number: number,
    content: Array<string> | Array<readingType>
}

type Props ={
    title: string,
    apiInformation: Info[],
    dateReading: string
    reading: string
}

export default function ScriptureSec(dailyReading: Props){
    let information = dailyReading.apiInformation;
    // for (const testing of information) {
    //     console.log(testing.content[0]);
    // }
    let theDate = formatDate(dailyReading.dateReading);
    return (
        <div className={`${styles.calendarBG} mt-4 py-7 w-screen flex justify-center`}>
            <div className="w-9/10 text-center">
                <div className="font-extrabold text-3xl border-b-2 border-b-black pb-3">
                    Daily Bible Reading: {theDate}
                </div>
                <div className="font-bold text-2xl my-5">
                    {dailyReading.title}
                </div>
                <div>
                    <div>
                        {information.map((element) => { return (
                            <div key={element.number * 1000} className={`inline text-lg relative px-${element.number >=100 ? 4 : element.number >= 10 ? 3 : 2}`}>
                                {`${element.content}`} 
                                <div className={clsx("text-sm font-bold absolute -top-1", {"-left-3": element.number >=100, "-left-1": element.number < 100})}>
                                    {`${element.number}`} 
                                </div>
                            </div>
                            ) })}
                    </div> 
                    <div className="mt-3 font-semibold">
                        - {dailyReading.reading} (KJV)
                    </div>
                </div>
            </div>
        </div>
    )
}