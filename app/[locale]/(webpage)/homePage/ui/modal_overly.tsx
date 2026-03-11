"use client"

import { useState } from "react"
import { ModalInfo } from "../types/modal"
import Image from "next/image"
import { useLocale } from "next-intl"

type ModalInfoProps = {
    info: ModalInfo
}




export default function ModalOverlay({info}: ModalInfoProps){
    const [petition, setPetition] = useState({name: "", info: ""});
    const locale = useLocale()


    const handlePetition = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        e.preventDefault();
        // const res = await fetch(`/api/messaging`, {
        // method: "POST",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body: JSON.stringify(petition),
        // });

        // const data = await res.json();
        
    }

    return (
        <div className="fixed inset-0 z-10 h-screen w-screen bg-black/80 motion-preset-fade">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-9/10 md:w-4/5 lg:w-1/2 h-4/5 lg:h-7/10 rounded-lg bg-white p-8">
                        <div className="h-3/10 w-full">
                            <div className="flex w-full h-1/2 items-center font-extrabold text-2xl md:text-3xl">
                                <div>
                                    {info.title}
                                </div>
                                <div onClick = {info.button_action} className="ml-auto mr-2 cursor-pointer">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="50"
                                    height="50"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </div>
                            </div>
                            <div className="h-1/2 text-sm md:text-xl lg:text-base text-gray-600">
                                {info.description}
                            </div>
                        </div>  
                        <div className="h-7/10 w-full mt-5">
                            <form className="h-full">
                                <input onChange={(e) => setPetition({...petition, name: e.target.value})} value={petition.name} className="h-1/5 w-full border-black border-1 rounded-xl px-3" type="text" placeholder={info.placeholder1}/>
                                <textarea onChange={(e)=> setPetition({...petition, info: e.target.value})} value = {petition.info} className="my-2 h-1/2 w-full border-black border-1 rounded-xl px-3 pt-3" required placeholder={info.placeholder2}/>
                                <div className="h-1/5 rounded-xl bg-gray-600 flex justify-center items-center text-white font-bold text-xl">
                                {locale == "en" ? "Unavailable" : "No Disponible"}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}