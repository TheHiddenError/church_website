
import styles from "./homePage/ui/homePage.module.css"
import UpcomingSec from "./homePage/ui/upcomingSection";
import { change24to12Format, dbDateChange, getMaxDays } from "./helperFunctions/dates_functions";
import EventFlyerSection from "./homePage/ui/eventFlyers";
import HomeCardSection from "./homePage/ui/card_section";
import { ConstantEventType, constantEvents } from "./lib/placeholder_data";
import { getTopThree } from "../actions/events";
import { getTranslations } from "next-intl/server";


type Event = {
  title: string,
  title_es: string,
  time?: string
  summary: string | null,
  summary_es: string | null,
  date: string 
}


const current_date: Date = new Date();
let currentDateMonth = current_date.getMonth();

const staticEvents = new Map<number, ConstantEventType>

for (const constant of constantEvents){
  staticEvents.set(constant.date_index, constant);
}


let topThree: Event [] = [];





export default async function Start_Page(){

  const theData = await getTopThree();
  let temp_date = current_date;
  let tracker = 0;
  for (let i = 0; i < 7; i++){ //work on cases where on same day
    if (topThree.length == 3)
      break;
    const eventDate = theData[tracker].date
    if (eventDate.getMonth() == temp_date.getMonth() && eventDate.getDate() == temp_date.getDate()){
      const eventObj: Event = {
        title: theData[tracker].title,
        title_es: theData[tracker].title_es,
        summary: theData[tracker].summary,
        summary_es: theData[tracker].summary_es,
        date: theData[tracker].date.toLocaleDateString(),
        time: change24to12Format(theData[tracker].date),
      }
      topThree.push(eventObj);
      tracker ++;
    }
    else {
      let checkMap = staticEvents.get(temp_date.getDay())
      if (checkMap != undefined)
        topThree.push({...checkMap, date: `${temp_date.getMonth() + 1}/${temp_date.getDate()}/${(temp_date.getFullYear()).toString().substring(2)}`})
    }
    temp_date.setDate(temp_date.getDate() +1); 
  }

  const t = await getTranslations("HomePage");
  return (
  <>
    <div className="mb-15">
      <div className="w-screen h-150 relative overflow-hidden">
          <EventFlyerSection />
      </div>
      <div className={`${styles.upcoming} w-screen flex flex-col justify-center items-center py-10`}>
        <div className="text-5xl font-extrabold">
          {t("upcoming_events")}
        </div>
        <div className="grid grid-cols-3 mt-20 divide-x-3 divide-solid divide-black/80">
          {topThree.map((element, index) => {
            return(
              <UpcomingSec key= {`${index}${element.title}`} temp = {element} />
            )
          })}
        </div>
      </div>
      <HomeCardSection />

    </div> 
  </>
  );
}