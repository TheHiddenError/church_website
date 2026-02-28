import clsx from "clsx"
import styles from "./calendar.module.css"
import { formatDate } from "@/app/helperFunctions/dates_functions"
import { useTranslations } from "next-intl";

/*

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


    let information = dailyReading.apiInformation;
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
                                <div className={clsx("text-sm font-bold absolute -top-1", {"-left-3": element.number >=100, "-left-2": element.number < 100})}>
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

*/

export default function ScriptureSec({text, verse, translation, link}: {text: string, verse: string, translation: string, link: string}){
    const temp = new Date();
    const todays_date = `${temp.getMonth() + 1 }/${temp.getDate()}`
    const t = useTranslations("Calendar");
    let successful = false;
    if (text != "")
        successful = true;

    return (
        <div className={`${styles.calendarBG} mt-4 py-7 w-screen flex justify-center`}>
            <div className="w-9/10">
                <div className="font-extrabold text-3xl border-b-2 border-b-black pb-3 text-center w-full">
                    {t("verse_day")}: {todays_date}
                </div>
                {successful == true ?
                <>
                    <div className={`${styles.wrapper} flex w-full justify-center`}>
                        <div className="text-xl py-3" dangerouslySetInnerHTML={{ __html: text }} >
                        </div>
                    </div>
                    <div className="text-center font-bold text-2xl">
                        - {verse} ({translation})
                    </div>
                    <div className="text-center text-lg underline text-blue-600 hover:text-blue-400 my-2">
                        <a className="" href={link} target="_blank" rel="noopener noreferrer">
                            {t("full_chapter")}
                        </a>
                    </div>
                    <div className = "text-center text-base">
                        {"Powered by "}
                        <a className="text-blue-600 underline hover:text-blue-400" href = "https://www.biblegateway.com/"  target="_blank" rel="noopener noreferrer">
                            Bible Gateway
                        </a>
                    </div>
                </>
                    :
                    <div className="text-center text-2xl my-5">
                        {t("error_message")}
                    </div>    
                }
            </div>
        </div>
    )
    
}