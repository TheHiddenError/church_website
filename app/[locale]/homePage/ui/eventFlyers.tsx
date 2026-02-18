"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import clsx from "clsx"
import { useLocale } from "next-intl"
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const flyers_en = en.HomePage.flyers;
const flyers_es = es.HomePage.flyers;


const isLaptop = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;



function MissionFlyer(sizeFull: boolean, sLocale: string) {
    const t = sLocale == "en" ? flyers_en.mission: flyers_es.mission;
    return (
        <>
            <Image className="w-full object-cover object-bottom absolute"
            src={"/bible_open.jpg"}
            fill
            alt = "bible open cross"
            />
            <div className="absolute bg-gray-100/30 h-full w-full"/>
            <div className={clsx("absolute w-3/5 md:w-2/5 text-center", {"top-1/10 left-1/20 md:top-1/5 lg:top-1/5 lg:left-1/10": !sizeFull, "lg:top-1/10 lg:left-1/10": sizeFull})}>
                <div className={clsx("font-bold text-4xl lg:text-5xl", {"lg:text-7xl": sizeFull})}>
                    {t.heading}
                </div>
                <div className="flex justify-center w-full mt-7">
                    <div className={clsx("w-full lg:w-2/3", {"lg:w-full": sizeFull})}>
                        <div className={clsx("font-semibold italic text-md md:text-lg lg:text-2xl", {"lg:text-5xl": sizeFull})}>
                            {t.text} - {t.verse}
                        </div>
                    </div> 
                </div>
            </div>
        </>
    )
}

function DiscpleFlyer(sizeFull:boolean, sLocale: string){
    const t = sLocale == "en" ? flyers_en.disciple : flyers_es.disciple;

    return(
        <>
            <Image className="object-cover object-bottom" src={"/flyers/center_bible.jpg"} alt = "bible open" fill />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300/40"/>
            <div className="absolute top-1/3 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center w-full">
                <div className={clsx("text-5xl lg:text-6xl font-extrabold italic", {"lg:text-8xl": sizeFull})}>
                    {t.heading}
                </div>
                <div className={clsx("my-7 text-3xl lg:text-4xl", {"lg:text-7xl": sizeFull})}>
                    {t.text}
                </div>
                <div className={clsx("text-xl lg:text-2xl font-bold italic", {"lg:text-6xl": sizeFull})}>
                    7:00 PM
                </div>
            </div> 
        </>
    )
}


function PrayerWorshipNight(sizeFull: boolean, sLocale: string) {
    const t = sLocale == "en" ? flyers_en.worship : flyers_es.worship;
    return (
        <>
            <Image className="object-cover object-top" src={"/flyers/groupPrayer.jpg"} alt = "prayer group" fill />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300/60"/>
            <div className={clsx("absolute text-center top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2")}>
                <div className={clsx("text-4xl lg:text-7xl font-extrabold italic w-screen", {"lg:text-9xl": sizeFull})}>
                    {t.heading}
                </div>
                <div className={clsx("my-7 text-2xl lg:text-3xl", {"lg:text-6xl": sizeFull})}>
                    {t.subheading}
                </div>
                <div className={clsx("text-xl lg:text-2xl font-bold", {"lg:text-6xl": sizeFull})}>
                    <div>
                        {t.text}
                    </div>
                    <div className="italic">
                        7:00 PM
                    </div>
                </div>
            </div> 
        </>
    )
}

function PrayerService(sizeFull: boolean, sLocale: string){
    const t = sLocale == "en" ? flyers_en.prayer : flyers_es.prayer;

    return (
        <>
            <Image className="object-cover"
            src ={"/flyers/prayer.jpg"}
            fill
            alt = "sunday image"
            />
            <div className="absolute bg-gray-100/30 h-full w-full"/>
            <div className={clsx("absolute w-1/2 md:w-2/5 text-center", {"top-1/10 right-1/20 md:top-1/5 lg:top-50 lg:right-25": !sizeFull, "lg:top-1/10 lg:right-1/10": sizeFull})}>
                <div className={clsx("text-4xl lg:text-6xl font-bold", {"lg:text-8xl": sizeFull})}>
                    {t.heading}
                </div>
                <div className={clsx("text-2xl lg:text-3xl my-3", {"lg:text-6xl": sizeFull})}>
                    {t.subheading}
                </div>
                <div className={clsx("text-xl lg:text-2xl font-bold", {"lg:text-5xl": sizeFull})}>
                    <div>
                        {t.text}
                    </div>
                    <div className="italic">
                        7:00PM
                    </div>
                </div>
            </div>
        </>
    )
}

function SundayService(sizeFull: boolean, sLocale: string){
    const t = sLocale == "en" ? flyers_en.sunday : flyers_es.sunday;
    return (
        <>
            <Image className="object-cover object-top"
            src ={"/flyers/sunday_service.jpg"}
            fill
            alt = "sunday image"
            />
            <div className="absolute bg-gray-100/30 h-full w-full"/>
            <div className={clsx("absolute w-3/5 md:w-2/5 text-center", { "top-1/10 left-1/20 lg:top-1/5 lg:left-1/10" :!sizeFull,"lg:top-1/10 lg:left-1/10": sizeFull})}>
                <div className={clsx("text-3xl lg:text-6xl font-bold", {"lg:text-8xl": sizeFull})}>
                    {t.heading}
                </div>
                <div className={clsx("text-base md:text-2xl lg:text-4xl my-3", {"lg:text-4xl": sizeFull})}>
                    {t.subheading}
                </div>
                <div className={clsx("text-lg md:text-xl lg:text-3xl font-bold", {"lg:text-5xl": sizeFull})}>
                    <div>
                        {t.text}
                    </div>
                    <div className="italic">
                        10:30 AM
                    </div>
                </div>
            </div>
        </>
    )
}

function ChickenPlate(locale: string){
    return <>
        <Image src ={`/flyers/chicken_plates/${locale}.png`}
        fill 
        alt = "chicken plate flyer"/>
    </>
}

function ChurchFellowship(locale: string){
    return <>
        <Image className="" src ={`/flyers/church_fellowships/${locale}.png`}
        fill 
        alt = "chicken plate flyer"/>
    </>
}




export default function EventFlyerSection(){
    const locale = useLocale();
    const [fullSize, setFullSize] = useState(false);
    const [sliderLocale, setSliderLocale] = useState(locale);

    const arrayFlyers = [MissionFlyer(fullSize, sliderLocale), DiscpleFlyer(fullSize, sliderLocale), 
        PrayerWorshipNight(fullSize, sliderLocale), SundayService(fullSize, sliderLocale), 
        PrayerService(fullSize, sliderLocale), ChurchFellowship(sliderLocale), ChickenPlate(sliderLocale)];

    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    const [cooldown, setCooldown] = useState(false);

    const sectionRef = useRef<HTMLDivElement>(null); 

    function changePhoto(increase= false){
        if (increase)
            setIndex((i) => i + 1);
        else 
            setIndex((i) => i - 1 < 0 ? arrayFlyers.length - 1 : i -1)

    }

    useEffect(() => {
        function handleFullscreenChange() {
            if (!document.fullscreenElement) {
                setSliderLocale(locale);
                setFullSize((current) => !current);
            }
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {  
    intervalRef.current = setInterval(() => { 
        changePhoto(true);
        setIsAnimating(true);
     }, 10000); 
    return () => {
     if (intervalRef.current)
        clearInterval(intervalRef.current)   
    }; 
}   , []);


    useEffect(() => {
        console.log(fullSize)
        if (!fullSize) return;
        function handleKey(e: KeyboardEvent) {
            if (cooldown) return;
            if (e.key === "ArrowRight") {
                changePhoto(true);
                setCooldown(true);
                setIsAnimating(true);
                if (intervalRef.current)
                    clearInterval(intervalRef.current)
            }
            else if (e.key === "ArrowLeft") {
                changePhoto();
                setCooldown(true);
                setIsAnimating(true);
                if (intervalRef.current)
                    clearInterval(intervalRef.current)
            }
            setTimeout(() => setCooldown(false), 500); // 300ms cooldown

        }

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [cooldown, fullSize]);



    function fullScreenHandler() {
        if (fullSize == false)
            sectionRef.current?.requestFullscreen(); 
        else 
            return;
        setFullSize((current) => !current);
    } 


    return(
        <> 
            <div ref={sectionRef} className={clsx("w-full h-full", {" overflow-hidden": fullSize})}>
                <div onClick={isLaptop ? fullScreenHandler: undefined} onTransitionEnd={()=> {
                    if (index === arrayFlyers.length){
                        setSliderLocale(loc => loc == "en" ? "es": "en");
                        setIsAnimating(false);
                        setIndex(0);
                    }}
                } className={clsx("flex w-full h-full", {"transition-all duration-700 ease-out": isAnimating, "cursor-pointer": !fullSize})} style={{ transform: `translateX(-${index * 100}%)` }}>
                    {arrayFlyers.map((element, mapindex) => (
                        <div key={(mapindex + 1) * 7} className="w-full h-full flex-shrink-0 relative">
                            {element}
                        </div>
                    ))}
                    <div key = "clone" className= "w-full h-full flex-shrink-0 relative">
                        {arrayFlyers[0]}
                    </div>
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