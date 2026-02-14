import { formatDate } from "@/app/[locale]/helperFunctions/dates_functions"
import { useLocale } from "next-intl"

type Event = {
  title: string,
  title_es: string,
  time?: string
  summary?: string | null,
  summary_es?: string | null,
  date: string 
}

type UpcomingSecProps = {
   temp: Event
}   


export default function UpcomingSec({temp}: UpcomingSecProps){

    const locale = useLocale();

    const regexDate = /\d+\/\d{2}/
    const formattedDate = temp.date.match(regexDate)![0];

    return (
        <div className="flex flex-col items-center px-10">
          <div className="text-5xl font-bold">
            {formattedDate}
          </div>
          <div className="w-4/5 text-center mt-3">
            <div className="text-xl font-semibold">
                <div>
                    {locale == 'en' ? temp.title: temp.title_es}
                </div>
                <div>
                    {temp.time}
                </div>
            </div>
            <div className="text-md">
                {locale == 'en' ? temp.summary: temp.summary_es}
            </div>
          </div>  
        </div>
    )
}