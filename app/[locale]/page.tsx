
import styles from "./homePage/ui/homePage.module.css"
import UpcomingSec from "./homePage/ui/upcomingSection";
import { change24to12Format } from "../helperFunctions/dates_functions";
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
  date: Date
}


const current_date: Date = new Date(); 

const staticEvents = new Map<number, ConstantEventType>();

for (const constant of constantEvents){ //array that holds sunday, monday and wednesday services
  staticEvents.set(constant.date_index, constant);
}

let topThree: Event [] = []; //This is not the top three from db but comparisions between the static and db values


export default async function Start_Page(){
  const theData = await getTopThree();
  let temp_date = current_date;
  let tracker = 0; //used to check the events in the db call if aplicable
  for (let i = 0; i < 7; i++){ //work on cases where on same day
    if (topThree.length == 3)
      break;
    let temp_day = temp_date.getDay();
    const eventDate = theData.length == 0 || tracker == theData.length ? undefined :theData[tracker].date //either means that nothing was returned in db or we reached all the events in the db for the week
    if (eventDate && eventDate.getDay() == temp_day){
      const eventObj: Event = {
        title: theData[tracker].title,
        title_es: theData[tracker].title_es,
        summary: theData[tracker].summary,
        summary_es: theData[tracker].summary_es,
        date: theData[tracker].date,
        time: change24to12Format(theData[tracker].date),
      }
      topThree.push(eventObj);
      tracker ++; 
    }
    else {
      let checkMap = staticEvents.get(temp_date.getDay())
      if (checkMap != undefined) {
        const staticDate = new Date(`${(temp_date.getFullYear())}-${(temp_date.getMonth() + 1) < 10 ? temp_date.getMonth() + 1 : "0" + (temp_date.getMonth() + 1).toString()}-${temp_date.getDate() > 10 ? temp_date.getDate() : "0" + temp_date.getDate().toString() }`)
        topThree.push({...checkMap, date: staticDate})
      }
    }
    temp_date.setDate(temp_date.getDate() + 1); //going to next date until we either reach end of week or we already got the three closest events
  }
  const t = await getTranslations("HomePage");

  return (
  <>
    <div className="mb-15">
      <div className="w-screen h-110 lg:h-150 relative overflow-hidden">
          <EventFlyerSection/>
      </div>
      <div className={`${styles.upcoming} w-screen flex flex-col justify-center items-center py-10`}>
        <div className="text-4xl lg:text-5xl font-extrabold">
          {t("upcoming_events")}
        </div>
        {/* <div className="flex w-full justify-center">
          <div className="text-4xl italic mt-5">
            Under Maintenance
          </div>
        </div> */}
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