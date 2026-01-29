"use client"

import Image from "next/image"
import bible_other from "../../public/bible_open.jpg"
import center_bible from "../../public/flyers/center_bible.jpg"
import prayerHands from"../../public/flyers/groupPrayer.jpg"
import { useState } from "react"
import clsx from "clsx"
import { useRef } from "react"



export default function Event(){

    const [index, setIndex] = useState(0);
    const [fullSize, setFullSize] = useState(false);

    const sectionRef = useRef<HTMLDivElement>(null); 
    function fullScreenHandler() { 
        if (fullSize == false)
            sectionRef.current?.requestFullscreen(); 
        else 
            document.exitFullscreen();
        setFullSize((current) => !current)
    } 

    function changePhoto(increase= false){
        if (increase)
            setIndex((i) => (i + 1) % 3);
        else 
            setIndex((i) => (i - 1) < 0 ? 2 : i-1);

    }


    return(
        <div className="w-screen flex flex-col items-center">
            <div className="font-extrabold text-3xl mb-10 hidden">
                Event Flyer Page
            </div>
            <div ref={sectionRef} id="flyer" className={clsx("mb-15 relative", {"h-[70vh] w-[70vw]" : fullSize == false, "h-screen w-screen": fullSize == true } )}>
                <div className="h-full relative">
                    <div className={clsx({"block" : index == 0, "hidden": index != 0})}>
                        <Image className="object-cover object-bottom" src={center_bible} alt = "bible open" fill />
                        <div className="absolute top-0 left-0 w-full h-full bg-gray-300/40"/>
                        <div className="absolute top-1/3 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center">
                            <div className="text-6xl font-extrabold italic">
                                Women's Bible Study
                            </div>
                            <div className="my-7 text-4xl">
                                Thursday, January 1
                            </div>
                            <div className="text-2xl font-bold">
                                7:00 PM
                            </div>
                        </div> 
                    </div>   
                    <div className={clsx({"block" : index == 1, "hidden": index != 1})}>
                        <Image className="object-cover object-bottom" src={bible_other} alt = "bible open" fill />
                        <div className="absolute top-0 left-0 w-full h-full bg-gray-300/40"/>
                        <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 -translate-x-1/2 text-center">
                            <div className="text-6xl font-extrabold italic">
                                Our Mission
                            </div>
                            <div className="my-7 text-3xl">
                                Go therefore and make disciples of all the nations, 
                                baptizing them in the name of the  
                                Father and of the Son and of the Holy Spirit.
                            </div>
                            <div className="text-2xl font-bold">
                                -Matthew 28:19 (NKJV)
                            </div>
                        </div> 
                    </div>
                    <div className={clsx({"block" : index == 2, "hidden": index != 2})}>
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
                                September 6
                            </div>
                            <div className="text-2xl font-bold">
                                7:00 PM
                            </div>
                        </div> 
                    </div>
                </div>
                <div onClick={()=> changePhoto(true)} className="absolute bottom-0 right-0 rounded-full w-10 h-10 m-2 bg-green-300 z-10"></div>
                <div onClick={()=> changePhoto()} className="absolute bottom-0 right-15 rounded-full w-10 h-10 m-2 bg-red-600 z-10"></div>
                <a href="#flyer">
                    <div onClick={fullScreenHandler} className="absolute top-0 right-0 rounded-lg w-10 h-10 m-2 bg-blue-300 z-10"></div>                
                </a>            
            </div>
        </div>
    )
}