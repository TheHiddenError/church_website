import Image from "next/image";
import styles from "./ui/homePage/homePage.module.css";
import UpcomingSec from "./ui/homePage/upcomingSection";
import Card from "./ui/homePage/cards";
import { theEvents } from "./api/placeholder.data";
import { getGridRows } from "./helperFunctions/dates_functions";

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


const {maxDays} = getGridRows(current_date.getFullYear(), currentDateMonth, currentDateDay); //edge case for end of year

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
  return (
  <div className="mb-15">
    <div className="w-screen h-125 relative">
      <Image className="w-full object-cover object-bottom h-125 absolute"
        src={"/bible_open.jpg"}
        width={0}
        height={0}
        sizes="100vw"
        alt = "bible open"
      />
      <div className="absolute bg-gray-100/30 h-125 w-full"/>
      <div className="absolute top-25 left-25 w-2/5 text-center">
        <div className="text-5xl font-bold">
          Our Mission
        </div>
        <div className="flex justify-center w-full mt-7">
          <div className="w-2/3">
            <div className="font-semibold italic text-xl">
              Go therefore and make disciples of all the nations, 
              baptizing them in the name of the  
              Father and of the Son and of the Holy Spirit. -Matthew 28:19 (NKJV)
            </div>
            <div className="flex justify-center w-full mt-3">
              <div className="bg-blue-600/80 rounded-xl text-white w-1/2 text-xl p-3 font-semibold">
                Learn More
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
    <div className={`${styles.upcoming} w-screen flex flex-col justify-center items-center py-10`}>
      <div className="text-5xl font-extrabold">
        Upcoming Events
      </div>
      <div className="grid grid-cols-3 mt-20 divide-x-3 divide-solid divide-black/80">
        {sortArray.map((element, index) => {
          return(
            <UpcomingSec key= {`${index}${element.title}`} {...element} />
          )
        })}
      </div>
    </div>
    <div className="mt-20 grid grid-cols-2">
      <Card 
        imageSrc="/church_image.jpg"
        title="About Our Church" 
        description="I'm a paragraph. Click here to add  your own text and edit me. 
              I'm a great place for you to tell a story and let your users know a little more about you." 
        button_name="Learn More"
      />
      <Card 
        imageSrc="/prayer_hands.jpg"
        title="Prayer Request"
        description="I'm a paragraph. Click here to add  your own text and edit me. 
              I'm a great place for you to tell a story and let your users know a little more about you."
        button_name="Make a Prayer"
        />
    </div>
  </div> 
  );
}