"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import clsx from "clsx"
import { useTranslations } from "next-intl"



function MissionFlyer(sizeFull: boolean) {
    const t = useTranslations("HomePage.flyers.mission");

    return (
        <>
            <Image className="w-full object-cover object-bottom absolute"
            src={"/bible_open.jpg"}
            fill
            alt = "bible open cross"
            />
            <div className="absolute bg-gray-100/30 h-full w-full"/>
            <div className={clsx("absolute w-2/5 text-center", {"top-50 left-25": !sizeFull, "top-3/20 left-1/10": sizeFull})}>
            <div className={clsx("font-bold text-5xl", {"text-7xl": sizeFull})}>
                {t("heading")}
            </div>
            <div className="flex justify-center w-full mt-7">
                <div className={clsx("w-2/3", {"w-full": sizeFull})}>
                    <div className={clsx("font-semibold italic text-2xl", {"text-5xl": sizeFull})}>
                        {t("text")} - {t("verse")}
                    </div>
                </div> 
            </div>
            </div>
        </>
    )
}

function DiscpleFlyer(sizeFull:boolean){
    const t = useTranslations("HomePage.flyers.disciple")

    return(
        <>
            <Image className="object-cover object-bottom" src={"/flyers/center_bible.jpg"} alt = "bible open" fill />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300/40"/>
            <div className="absolute top-1/3 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center">
                <div className={clsx("text-6xl font-extrabold italic", {"text-8xl": sizeFull})}>
                    {t("heading")}
                </div>
                <div className={clsx("my-7 text-4xl", {"text-7xl": sizeFull})}>
                    {t("text")}
                </div>
                <div className={clsx("text-2xl font-bold italic", {"text-6xl": sizeFull})}>
                    7:00 PM
                </div>
            </div> 
        </>
    )
}


function PrayerWorshipNight(sizeFull: boolean) {
    const t = useTranslations("HomePage.flyers.worship")
    return (
        <>
            <Image className="object-cover object-top" src={"/flyers/groupPrayer.jpg"} alt = "prayer group" fill />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300/60"/>
            <div className={clsx("absolute text-center top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2")}>
                <div className={clsx("text-6xl font-extrabold italic", {"text-9xl w-screen": sizeFull})}>
                    {t("heading")}
                </div>
                <div className={clsx("my-7 text-3xl", {"text-6xl": sizeFull})}>
                    {t("subheading")}
                </div>
                <div className={clsx("text-2xl font-bold", {"text-6xl": sizeFull})}>
                    <div>
                        {t("text")}
                    </div>
                    <div className="italic">
                        7:00 PM
                    </div>
                </div>
            </div> 
        </>
    )
}

function PrayerService(sizeFull: boolean){
    const t = useTranslations("HomePage.flyers.prayer")

    return (
        <>
            <Image className="object-cover"
            src ={"/flyers/prayer.jpg"}
            fill
            alt = "sunday image"
            />
            <div className="absolute bg-gray-100/30 h-full w-full"/>
            <div className={clsx("absolute w-2/5 text-center", {"top-50 right-25": !sizeFull, "top-1/5 right-1/10": sizeFull})}>
                <div className={clsx("text-6xl font-bold", {"text-8xl": sizeFull})}>
                    {t("heading")}
                </div>
                <div className={clsx("text-3xl my-3", {"text-6xl": sizeFull})}>
                    {t("subheading")}
                </div>
                <div className={clsx("text-2xl font-bold", {"text-5xl": sizeFull})}>
                    <div>
                        {t("text")}
                    </div>
                    <div className="italic">
                        7:00PM
                    </div>
                </div>
            </div>
        </>
    )
}

function SundayService(sizeFull: boolean){
    const t = useTranslations("HomePage.flyers.sunday")
    return (
        <>
            <Image className="object-cover object-top"
            src ={"/flyers/sunday_service.jpg"}
            fill
            alt = "sunday image"
            />
            <div className="absolute bg-gray-100/30 h-full w-full"/>
            <div className={clsx("absolute w-2/5 text-center", { "top-50 left-25" :!sizeFull,"top-1/10 left-1/10": sizeFull})}>
                <div className={clsx("text-6xl font-bold", {"text-8xl": sizeFull})}>
                    {t("heading")}
                </div>
                <div className={clsx("text-2xl my-3", {"text-4xl": sizeFull})}>
                    {t("subheading")}
                </div>
                <div className={clsx("text-2xl font-bold", {"text-5xl": sizeFull})}>
                    <div>
                        {t("text")}
                    </div>
                    <div className="italic">
                        10:30 AM
                    </div>
                </div>
            </div>
        </>
    )
}


export default function EventFlyerSection(){
    const [fullSize, setFullSize] = useState(false);


    const arrayFlyers = [MissionFlyer(fullSize), DiscpleFlyer(fullSize), PrayerWorshipNight(fullSize), SundayService(fullSize), PrayerService(fullSize)];

    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    const [cooldown, setCooldown] = useState(false);

    const sectionRef = useRef<HTMLDivElement>(null); 

    function changePhoto(increase= false){
        if (increase)
            setIndex((i) => i + 1);
    }

    useEffect(() => {
        function handleFullscreenChange() {
            if (!document.fullscreenElement) {
                setFullSize((current) => !current);
            }
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);


    useEffect(() => {
        console.log(fullSize)
        if (!fullSize) return;
        function handleKey(e: KeyboardEvent) {
            if (cooldown) return;
            if (e.key === "ArrowLeft") {
                changePhoto(true);
                setCooldown(true);
            }
            else if (e.key == "ArrowRight") {
                changePhoto();
                setCooldown(true);
            }
            setTimeout(() => setCooldown(false), 300); // 300ms cooldown

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



    useEffect(() => {  
    const id = setInterval(() => { 
        changePhoto(true);
        setIsAnimating(true);
     }, 5000); 
    return () => clearInterval(id); 
}   , []);


    return(
        <> 
            <div ref={sectionRef} className={clsx("w-full h-full", {" overflow-hidden": fullSize})}>
                <div onClick={fullScreenHandler} onTransitionEnd={()=> {
                    if (index === arrayFlyers.length){
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