import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import clsx from "clsx"


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

    console.log(temp.title)

    return (
      <div className="w-full h-full relative">
        <Image className="object-cover"
        src = {clsx(temp.title == "Sunday Service" ? "/flyers/sunday_service.jpg":
                    temp.title == "Wednesday Service" ? "/flyers/center_bible.png" :
                    temp.title === "Prayer Service" ? "/prayer_hands.jpg":
                    "/bible_open.jpg")} 
        alt = "testing"
        fill
        />
        <div className="absolute w-full top-0 h-full bg-gray-600/60"/>
        <div className ="absolute top-3/5 w-full grid grid-cols-10">
          <div className="col-span-3 w-full flex justify-center">
            <div className="w-9/10 border-3 border-sky-600/70 flex flex-col items-center text-center text-white py-2">
              <div className="text-xl lg:text-3xl">
                {formattedDate}
              </div>
              <div className="w-1/2 h-1 bg-gray-400"/>
              <div className="text-sm lg:text-base">
                {days[temp.date.getDay()]}
              </div>
              <div className="text-sm lg:text-base">
                {temp.time}
              </div>
            </div>
          </div>
          <div className="px-1 col-span-7 flex flex-col">
            <div className="text-lg lg:text-2xl font-bold text-white">
              {temp.title}
            </div>
            <div className="text-sm lg:text-base text-gray-200">
              {locale == 'en' ? temp.summary: temp.summary_es}
            </div>
          </div>
        </div>
      </div>
        // <div className="grid grid-rows-5 items-center px-2 lg:px-10 gap-2 items-start justify-center">
        //   <div className="text-4xl lg:text-5xl font-bold place-self-center">
        //     {formattedDate}
        //   </div>
        //   <div className=" text-center w-full">
        //     <div className="text-md lg:text-2xl font-semibold">
        //         <div>
        //             {locale == 'en' ? temp.title: temp.title_es}
        //         </div>
        //     </div>
        //   </div>
        //   <div className="text-center w-full text-lg lg:text-2xl">
        //       <div>
        //         {days[temp.date.getDay()]}
        //       </div>
        //   </div>
        //   <div className="text-center w-full text-xl lg:text-3xl italic">
        //       <div>
        //         {temp.time}
        //       </div>
        //   </div>
        //   <div className=" text-center w-full">
        //     <div className="text-sm lg:text-lg">
        //         {locale == 'en' ? temp.summary: temp.summary_es}
        //     </div>
        //   </div>    
        // </div>
    )
}