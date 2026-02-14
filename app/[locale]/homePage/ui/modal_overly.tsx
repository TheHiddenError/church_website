"use client"

import { ModalInfo } from "../types/modal"
import Image from "next/image"

type ModalInfoProps = {
    info: ModalInfo
}


export default function ModalOverlay({info}: ModalInfoProps){
    return (
        <div className="fixed inset-0 z-10 h-screen w-screen bg-black/80">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-1/3 h-7/10 rounded-lg bg-white p-8">
                        <div className="h-3/10 w-full relative">
                            <div onClick = {info.button_action} className="cursor-pointer absolute top-0 right-0 w-1/10 h-3/10">
                                <Image className="object-cover" src ="/x_icon.jpg"
                                fill 
                                alt = "x icon" 
                                />
                            </div>
                            <div className="flex h-1/2  items-center font-extrabold text-3xl">
                                {info.title}
                            </div>
                            <div className="h-1/2 text-md text-gray-600">
                                {info.description}
                            </div>
                        </div>  
                        <div className="h-7/10 w-full mt-5">
                            <form className="h-full">
                                <input className="h-1/5 w-full border-black border-1 rounded-xl px-3" type="text" placeholder={info.placeholder1}/>
                                <textarea className="my-2 h-1/2 w-full border-black border-1 rounded-xl px-3 pt-3" required placeholder={info.placeholder2}/>
                                <div className="h-1/5 rounded-xl bg-blue-600 flex justify-center items-center text-white font-bold text-xl">
                                {info.button_name}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}