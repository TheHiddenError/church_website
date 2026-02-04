"use client"

import Image from "next/image";
import styles from "./ui/homePage/homePage.module.css";
import UpcomingSec from "./ui/homePage/upcomingSection";
import Card from "./ui/homePage/cards";
import { theEvents } from "./api/placeholder.data";
import { getGridRows } from "./helperFunctions/dates_functions";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import EventFlyerSection from "./ui/homePage/eventFlyers";

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
  const [prayerClicked, setClicked] = useState(false);
  const router = useRouter();

  return (
  <>
    <div className="mb-15">
      <div className="w-screen h-150 relative">
        <EventFlyerSection />
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
          button_action={()=> router.push("/about_us#churchInfo")}
        />
        <Card 
          imageSrc="/prayer_hands.jpg"
          title="Prayer Request"
          description="I'm a paragraph. Click here to add  your own text and edit me. 
                I'm a great place for you to tell a story and let your users know a little more about you."
          button_name="Make a Prayer"
          button_action={()=> setClicked((element) => !element)}
          />
      </div>
    </div> 
    <div className={clsx("fixed inset-0 z-10 h-screen w-screen bg-black/80", {"hidden": !prayerClicked})}>
      <div className="w-full h-full flex justify-center items-center">
          <div className="w-1/3 h-7/10 rounded-lg bg-white p-8">
            <div className="h-3/10 w-full relative">
              <div onClick={()=> setClicked((element) => !element)} className="cursor-pointer absolute top-0 right-0 w-1/10 h-3/10 bg-gray-400">
              </div>
              <div className="flex h-1/2  items-center font-extrabold text-3xl">
                Make a Prayer
              </div>
              <div className="h-1/2 text-md text-gray-600">
                We would love to pray for you. Please put your petition before and we will pray for you. You can choose to make it anonymous if you like as well.
              </div>
            </div>  
            <div className="h-7/10 w-full mt-5">
              <form className="h-full">
                <input className="h-1/5 w-full border-black border-1 rounded-xl px-3" type="text" placeholder="Name (optional)"/>
                <textarea className="my-2 h-1/2 w-full border-black border-1 rounded-xl px-3 pt-3" required placeholder="Enter your petition here (required)"/>
                <div className="h-1/5 rounded-xl bg-blue-600 flex justify-center items-center text-white font-bold text-xl">
                  Send Prayer
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
  </>
  );
}