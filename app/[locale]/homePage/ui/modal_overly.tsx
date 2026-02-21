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
    const locale = useLocale();


    const handlePetition = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        e.preventDefault();
        const res = await fetch(`${locale}/api/petition`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(petition),
        });

        const data = await res.json();
        
    }

    return (
        <div className="fixed inset-0 z-10 h-screen w-screen bg-black/80">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-9/10 md:w-4/5 lg:w-2/5 h-4/5 lg:h-7/10 rounded-lg bg-white p-8">
                        <div className="h-3/10 w-full relative">
                            <div onClick = {info.button_action} className="cursor-pointer absolute top-0 right-0 w-1/10 h-1/5 lg:w-1/10 lg:h-3/10">
                                <Image className="object-cover" src ="/x_icon.jpg"
                                fill 
                                alt = "x icon" 
                                />
                            </div>
                            <div className="flex h-1/2  items-center font-extrabold text-2xl md:text-3xl">
                                {info.title}
                            </div>
                            <div className="h-1/2 text-sm md:text-xl lg:text-base text-gray-600">
                                {info.description}
                            </div>
                        </div>  
                        <div className="h-7/10 w-full mt-5">
                            <form className="h-full">
                                <input onChange={(e) => setPetition({...petition, name: e.target.value})} value={petition.name} className="h-1/5 w-full border-black border-1 rounded-xl px-3" type="text" placeholder={info.placeholder1}/>
                                <textarea onChange={(e)=> setPetition({...petition, info: e.target.value})} value = {petition.info} className="my-2 h-1/2 w-full border-black border-1 rounded-xl px-3 pt-3" required placeholder={info.placeholder2}/>
                                <div onClick={(e)=> handlePetition(e)} className="h-1/5 rounded-xl bg-blue-600 flex justify-center items-center text-white font-bold text-xl">
                                {info.button_name}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}