"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { redirect } from "@/i18n/navigation"
import { useState } from "react"
import clsx from "clsx"

const donation_values: number [] = [5,10,25,50,100, 0]

export default function Donate(){
    const [typeClicked, setType] = useState(0);
    const [numberClicked, setNumber] = useState(donation_values[0]);

    // redirect({href: '/under_construction', locale: locale});

    const t = useTranslations("Donate");
    console.log("I rain")

    return(
        <div className="">
            <div className="w-screen h-[50vh] h-md:h-[30vh] relative">
                <Image className="object-cover object-center" src={"/donation.png"} alt="donation image" fill />
                <div className="absolute top-0 left-0 bg-gray-200/70 w-full h-[50vh] h-md:h-[30vh]"/>
                <div className="absolute top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  w-full text-center text-2xl lg:text-3xl/12 h-md:text-lg italic">
                    <div className="w-3/4">
                        <div className="mb-3">
                            {t("bible_text")}
                        </div>
                        <div className="font-bold">
                            -{t("bible_verse")}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center mt-5 h-[20vh]">
                <div className="text-md h-md:text-sm w-3/5 h-md:w-4/5 text-center">
                    {t("note")}
                </div>
            </div>
            <div className=" flex flex-col items-center bg-gray-300/20 pb-15">
                <div className="text-3xl h-md:text-2xl font-bold">
                    {t("heading")}
                </div>
                <div className="my-3 text-lg h-md:text-base">
                    {t("subheading")}
                </div>
                <div className="w-9/10 lg:w-3/4">
                    <div className="grid grid-cols-2 text-center h-md:text-xl text-2xl gap-2 text-gray-700">
                        <div onClick={()=> typeClicked != 0 && setType(0)} className={clsx("p-4 drop-shadow-sm rounded-sm", {"bg-sky-500/80 text-gray-100": typeClicked === 0, "bg-white": typeClicked != 0})}>
                            {t("one_time")}
                        </div>
                        <div onClick={()=> typeClicked != 1 && setType(1)} className={clsx("p-4 drop-shadow-sm rounded-sm flex items-center justify-center h-full", {"bg-sky-500/80 text-gray-100": typeClicked === 1, "bg-white": typeClicked != 1} )}>
                            {t("monthly")}
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2 place-items-center h-10 my-5">
                        {donation_values.map((value) => {
                            return(
                                <div onClick={()=> setNumber(value)} key={value} className={clsx("text-md lg:text-lg  drop-shadow-sm rounded-sm w-full py-3 text-center", {"bg-sky-500/80 text-gray-100 ": value == numberClicked, "bg-white": value != numberClicked})}>{value == 0 ? "Other" : "$" + value.toString()}</div>
                            )
                        })}
                    </div>
                    <div className="w-full mt-7 flex justify-center bg-gray-600 rounded-xl mx py-7 text-2xl text-white">
                        {t("repair")}
                    </div>
                </div>
            </div>
        </div>
    )
}