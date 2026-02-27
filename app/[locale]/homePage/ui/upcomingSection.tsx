import { formatDate } from "@/app/[locale]/helperFunctions/dates_functions"
import { useLocale, useTranslations } from "next-intl"

type Event = {
  title: string,
  title_es: string,
  time?: string
  summary?: string | null,
  summary_es?: string | null,
  date: Date
}

type UpcomingSecProps = {
   temp: Event
}   


export default function UpcomingSec({temp}: UpcomingSecProps){

    const locale = useLocale();

    const t = useTranslations("HomePage")

    const formattedDate = `${temp.date.getMonth() + 1}/${temp.date.getDate()}`;

    const days = Object.values(t.raw("upcoming_events_day") as Record<string, string>);

    return (
        <div className="grid grid-rows-5 items-center px-2 lg:px-10 gap-2 items-start justify-center">
          <div className="text-4xl lg:text-5xl font-bold place-self-center">
            {formattedDate}
          </div>
          <div className=" text-center w-full">
            <div className="text-md lg:text-2xl font-semibold">
                <div>
                    {locale == 'en' ? temp.title: temp.title_es}
                </div>
            </div>
          </div>
          <div className="text-center w-full text-lg lg:text-2xl">
              <div>
                {days[temp.date.getDay()]}
              </div>
          </div>
          <div className="text-center w-full text-xl lg:text-3xl italic">
              <div>
                {temp.time}
              </div>
          </div>
          <div className=" text-center w-full">
            <div className="text-sm lg:text-lg">
                {locale == 'en' ? temp.summary: temp.summary_es}
            </div>
          </div>    
        </div>
    )
}