import Image from "next/image";
import styles from "./ui/homePage/homePage.module.css";
import UpcomingSec from "./ui/homePage/upcomingSection";
import Card from "./ui/homePage/cards";

export default function Start_Page(){
  return (
  <div>
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
          <UpcomingSec date="9/10" title="Wednesday Disciple Service. 7:00 PM" description="Bible Study to Grow in the Word." />
          <UpcomingSec date="9/12" title="Thtishtigangongoah  go johoaghoang owahobwgog nw ghaogheownago gowh aog waohg" description="large text" />
          <UpcomingSec date="9/14" title="ganoanobhoganw" description="small text" />
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