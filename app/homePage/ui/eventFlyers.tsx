"use client"

import Image from "next/image"
import centerbible from "../../../public/flyers/center_bible.jpg"
import prayerHands from "../../../public/flyers/groupPrayer.jpg"
import sundayImage from "../../../public/flyers/sunday_service.jpg"
import prayerImage from "../../../public/flyers/prayer.jpg"
import { useState, useEffect } from "react"
import clsx from "clsx"


function MissionFlyer() {
    return (
        <>
            <Image className="w-full object-cover object-bottom absolute"
            src={"/bible_open.jpg"}
            fill
            alt = "bible open cross"
            />
            <div className="absolute bg-gray-100/30 h-full w-full"/>
            <div className="absolute top-50 left-25 w-2/5 text-center">
            <div className="text-5xl font-bold">
                Our Mission
            </div>
            <div className="flex justify-center w-full mt-7">
                <div className="w-2/3">
                <div className="font-semibold italic text-2xl">
                    Go therefore and make disciples of all the nations, 
                    baptizing them in the name of the  
                    Father and of the Son and of the Holy Spirit. -Matthew 28:19 (NKJV)
                </div>
                </div> 
            </div>
            </div>
        </>
    )
}

function DiscpleFlyer(){
    return(
        <>
            <Image className="object-cover object-bottom" src={centerbible} alt = "bible open" fill />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300/40"/>
            <div className="absolute top-1/3 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center">
                <div className="text-6xl font-extrabold italic">
                    Disciple Service
                </div>
                <div className="my-7 text-4xl">
                    Every Wednesday
                </div>
                <div className="text-2xl font-bold">
                    7:00 PM
                </div>
            </div> 
        </>
    )
}


function PrayerWorshipNight() {
    return (
        <>
            <Image className="object-cover object-top" src={prayerHands} alt = "prayer group" fill />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300/60"/>
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center">
                <div className="text-6xl font-extrabold italic">
                    Prayer and Worship Night
                </div>
                <div className="my-7 text-3xl">
                    Join Us in Prayer and Worship of Our Awesome God!
                </div>
                <div className="text-2xl font-bold">
                    Every First Monday of Month
                </div>
                <div className="text-2xl font-bold">
                    7:00 PM
                </div>
            </div> 
        </>
    )
}

function PrayerService(){
    return (
        <>
            <Image className="object-cover"
            src ={prayerImage}
            fill
            alt = "sunday image"
            />
            <div className="absolute bg-gray-100/30 h-full w-full"/>
            <div className="absolute top-50 right-25 w-2/5 text-center">
                <div className="text-6xl font-bold">
                    Prayer Night
                </div>
                <div className="text-xl my-3">
                    A night filled with prayer and petitions
                </div>
                <div className="text-2xl font-bold">
                    Every Monday (Except for First Monday of Every Month)
                </div>
                <div className="text-2xl font-bold italic">
                    7:00PM
                </div>
            </div>
        </>
    )
}

function SundayService(){
    return (
        <>
            <Image className="object-cover object-top"
            src ={sundayImage}
            fill
            alt = "sunday image"
            />
            <div className="absolute bg-gray-100/30 h-full w-full"/>
            <div className="absolute top-50 left-25 w-2/5 text-center">
                <div className="text-6xl font-bold">
                    Sunday Service
                </div>
                <div className="text-xl my-3">
                    Join us every morning for preaching for the family that would help your life
                </div>
                <div className="text-2xl font-bold">
                    Every Sunday
                </div>
                <div className="text-2xl font-bold italic">
                    10:30 AM
                </div>
            </div>
        </>
    )
}


export default function EventFlyerSection(){

    const arrayFlyers = [MissionFlyer(), DiscpleFlyer(), PrayerWorshipNight(), SundayService(), PrayerService()];

    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);


    function changePhoto(increase= false){
        if (increase)
            setIndex((i) => i + 1);
    }

    useEffect(() => {  
    const id = setInterval(() => { 
        changePhoto(true); }, 10000); 
    return () => clearInterval(id); 
}   , []);

    useEffect(()=> {
        if (index === arrayFlyers.length){
            setTimeout(()=> {
                setIsAnimating(false);
                setIndex(0);
            }, 700);
        }
        else {
            setIsAnimating(true);
        }
    }, [index, arrayFlyers.length]);

    return(
        <>    
            <div className={clsx("flex w-full h-full", {"transition-all duration-700 ease-out": isAnimating})} style={{ transform: `translateX(-${index * 100}%)` }}>
                {arrayFlyers.map((element, mapindex) => (
                    <div key={(mapindex + 1) * 7} className="w-full h-full flex-shrink-0 relative">
                        {element}
                    </div>
                ))}
                <div className= "w-full h-full flex-shrink-0 relative">
                    {arrayFlyers[0]}
                </div>
            </div> 
            <div className="absolute right-0 bottom-0">
                <div className="flex pr-3 pb-2">
                    {arrayFlyers.map((s, mapIndex) => {
                        return (
                            <div key={mapIndex * 2000} className={clsx("rounded-full h-8 w-8 mr-2", {"bg-gray-500/50": index != mapIndex,  "bg-blue-700/50": index == mapIndex})}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}