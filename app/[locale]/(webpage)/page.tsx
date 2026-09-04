
import styles from "./homePage/ui/homePage.module.css"
import UpcomingSec from "./homePage/ui/upcomingSection";
import { change24to12Format } from "../../helperFunctions/dates_functions";
import EventFlyerSection from "./homePage/ui/eventFlyers";
import HomeCardSection from "./homePage/ui/card_section";
import { ConstantEventType, constantEvents } from "../lib/placeholder_data";
import { getTopThree } from "../../actions/events";
import { getTranslations } from "next-intl/server";
import { milisecondsConvert } from "../../helperFunctions/dates_functions";
import { toZonedTime } from "date-fns-tz";
import Image from "next/image";
import {Tangerine} from "next/font/google"

const tang = Tangerine({weight:"700"});


type Event = {
  title: string,
  title_es: string,
  time?: string
  summary: string | null,
  summary_es: string | null,
  date: Date
}


// console.log("The current before temp ", current_date)
const current_date = toZonedTime(new Date(), "America/Chicago");
const staticEvents = new Map<number, ConstantEventType>();

for (const constant of constantEvents){ //array that holds sunday, monday and wednesday services
  staticEvents.set(constant.date_index, constant);
}

let topThree: Event [] = []; //This is not the top three from db but comparisions between the static and db value

export default async function Start_Page(){
    const theData = await getTopThree();
    let temp_date = new Date(current_date.getTime());
    let tracker = 0; //used to check the events in the db call if applicable
    while (topThree.length != 3){ //work on cases where on same day
      let temp_day = temp_date.getDate();
      const eventDate = theData.length == 0 || tracker == theData.length ? undefined :theData[tracker].date //either means that nothing was returned in db or we reached all the events in the db for the week
      if (eventDate && eventDate.getDate() == temp_day){
        const eventObj: Event = {
          title: theData[tracker].title,
          title_es: theData[tracker].title_es,
          summary: theData[tracker].summary,
          summary_es: theData[tracker].summary_es,
          date: theData[tracker].date,
          time: change24to12Format(theData[tracker].date),
        }
        topThree.push(eventObj);
        if (theData[tracker].importance == true)
          temp_date.setDate(temp_date.getDate() + 1);
        tracker ++; 
      }
      else {
        let checkMap = staticEvents.get(temp_date.getDay())
        if (checkMap != undefined){
          if (temp_date.getDate() === current_date.getDate() && (milisecondsConvert(current_date.getHours(), current_date.getMinutes()) > checkMap.miliseconds)){
          }
          else {
            const staticDate = new Date(`${(temp_date.getFullYear())}-${(temp_date.getMonth() + 1) < 10 ? temp_date.getMonth() + 1 : "0" + (temp_date.getMonth() + 1).toString()}-${temp_date.getDate() > 10 ? temp_date.getDate() : "0" + temp_date.getDate().toString() }`)
            topThree.push({...checkMap, date: staticDate})
          }
        }
        temp_date.setDate(temp_date.getDate() + 1); //going to next date until we either reach end of week or we already got the three closest events
      }
    }
  const t = await getTranslations("HomePage");

  return (
  <>
    <div className="">
      {/* <div className="w-screen h-110 lg:h-150 relative overflow-hidden">
          <EventFlyerSection/>
      </div> */}
      <div className = "w-screen h-screen relative">
        <Image className="object-cover object-bottom"
        src = "/church_background_ig.jpg"
        alt = "Church Background"
        fill
        />
        <div className = "absolute top-0 w-screen h-screen bg-gradient-to-b from-sky-600/40 to-[#1a1919]/90"/>
        <div className="absolute top-1/4 left-1/2"></div>
        <div className = "absolute top-1/4 lg:top-1/6 left-0 flex flex-col items-center w-screen">
          <div className="italic text-gray-200 text-xl">
            Welcome to
          </div>
          <div className="text-white text-5xl lg:text-8xl font-bold">
            Iglesia Nueva
          </div>
          <div className={`${tang.className} text-white text-7xl lg:text-9xl`}>
            Esperanza
          </div>
          <div className="text-white italic my-3 text-2xl w-4/5 lg:w-1/3 text-center">
            Una iglesia donde se hacen discipulos y se imparte el amor de Cristo a cada persona y familia. 
          </div>
          <div className="py-3 px-5 bg-sky-600 text-white text-lg font-bold">
            Learn More
          </div>
        </div>
      </div>
      <div className={`bg-gray-300/20 w-screen h-[135vh] lg:h-[90vh] flex flex-col items-center py-8 relative`}>
        <div className="w-20 h-20 relative">
          <Image className="object-cover"
          src = "/events_icon_blue.png"
          alt = "events icon"
          fill
          />
        </div>
        <div className="text-4xl lg:text-5xl font-extrabold text-gray-600">
          {t("upcoming_events")}
        </div>
        {/* <div className="flex w-full justify-center">
          <div className="text-4xl italic mt-5">
            Under Maintenance
          </div>
          <div>
            {current_date.getHours()}:{new Date().getHours()}
          </div>
        </div> */}
        <div className="w-full flex justify-center h-3/4 lg:h-1/2">
          <div className="grid lg:grid-cols-3 mt-20 w-3/4 h-full gap-5">
            {topThree.map((element, index) => {
              return(
                <UpcomingSec key= {`${index}${element.title}`} temp = {element} />
              )
            })}
          </div>
        </div>
        <div className = "text-lg absolute bottom-1/50 lg:bottom-1/20 bg-sky-600 py-3 px-3 text-white font-bold">
            View All Events
        </div>
      </div>
      <HomeCardSection />
    </div>
  </>
  );
}