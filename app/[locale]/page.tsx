
import styles from "./homePage/ui/homePage.module.css"
import UpcomingSec from "./homePage/ui/upcomingSection";
import { theEvents } from "./api/placeholder.data";
import { getMaxDays } from "./helperFunctions/dates_functions";
import EventFlyerSection from "./homePage/ui/eventFlyers";
import HomeCardSection from "./homePage/ui/card_section";
import { useTranslations } from "next-intl";

type PartialEvent = {
  title: string, 
  time?: string,
  description?: string
};


type Event = {
  title: string
  time?: string
  description?: string
  date: string 
}


const current_date: Date = new Date();
let currentWeekDay = current_date.getDay();
let currentDateDay = current_date.getDate();
let currentDateMonth = current_date.getMonth();


const maxDays = getMaxDays(current_date.getFullYear(), currentDateMonth); //edge case for end of year

const staticEvents = new Map<number, PartialEvent>

staticEvents.set(0, {title: "Sunday Service", time: "10:30 AM", description: "Morning Service to Learn"});
staticEvents.set(1, {title: "Prayer Night", time: "7:00 PM", description: "A service of prayer and petitions"});
staticEvents.set(3, {title: "Disciple Service", time: "7:00 PM", description: "Bible Study to Grow in the Word"});


let topThree: Event [] = [];

for (const event of theEvents) {
  const elementDate = Date.parse(event.date);
  const currentTime = current_date.getTime();
  if (topThree.length < 3 && currentTime <= elementDate){
    const {title, description, date, time} = event;
    topThree.push({title, description, date, time});
  }
}


for (let i = 0; i < 7; i ++) {
  if (topThree.length == 3)
    break;
  if (staticEvents.has(currentWeekDay)) {
    const theDate = `${current_date.getFullYear()}-${(currentDateMonth < 10 ? "0": "") + (currentDateMonth + 1)}-${currentDateDay}`
    const fullEvent: Event = {...staticEvents.get(currentWeekDay)!, date: theDate};
    topThree.push(fullEvent);
  }
  if (currentDateDay + 1 > maxDays){
    currentDateMonth ++;
    currentDateDay = 1;
  }
  else {
    currentDateDay ++;
  }
  currentWeekDay = (currentWeekDay + 1) % 7;
}

const sortArray: Event [] = topThree.sort((a, b) => Date.parse(a.date)- Date.parse(b.date));



export default function Start_Page(){
  const t = useTranslations("HomePage");
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
          {sortArray.map((element, index) => {
            return(
              <UpcomingSec key= {`${index}${element.title}`} {...element} />
            )
          })}
        </div>
      </div>
      <HomeCardSection />

    </div> 
  </>
  );
}