"use client"
import { ModalInfo } from "../types/modal"
import { CardBaseProps } from "../types/cards"
import ModalOverlay from "./modal_overly"
import Card from "./cards"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useTranslations } from "next-intl"
import Image from "next/image"

type serviceTimes = {
    title: string, 
    imageSrc: string,
    alt: string
}

export default function HomeCardSection(){
    const t = useTranslations("HomePage");
    const router = useRouter();
    const [componentClicked, setClicked] = useState(false);

    const aboutCard: CardBaseProps = {
        imageSrc:"/church_image.jpg",
        title: t("about"),
        description: t("about_text"), 
        button_name: t("about_button"),
        button_action: ()=> router.push("/about_us"),
        reverse: false
    }

    const prayerModal: ModalInfo = {
        title: t("prayer"),
        description: t("prayer_description"),
        placeholder1: t("prayer_p1"),
        placeholder2: t("prayer_p2"),
        button_name: t("prayer_send"),
        button_action: ()=>setClicked((element) => !element)
    }

    const prayerCard: CardBaseProps = {
        imageSrc: "/prayer_hands.jpg",
        title: t("prayer"),
        description: t("prayer_text"),
        button_name: t("prayer_button"),
        button_action: ()=> setClicked((element) => !element), 
        reverse: true
    }

    const theServices: serviceTimes [] = [
        {title: t("info_sunday"), imageSrc: "/icons/church_icon.png", alt: "Church icon"},
        {title: t("info_monday"), imageSrc: "/icons/prayer_icon.png", alt: "Prayer icon"},
        {title: t("info_wednesday"), imageSrc: "/icons/bible_icon.png", alt: "Bible icon"},
        {title: t("info_prayer"), imageSrc: "/icons/worship_icon.png", alt: "Worship icon"},
        {title: "3100 Billman Rd, Donna TX 78537", imageSrc: "/icons/map_icon.png", alt: "Map icon"}
    ] 


    return (
        <>
            <div className="mt-10 lg:mt-20 w-full h-[70vh] h-md:h-[90vh] flex lg:items-center lg:justify-center">
                <Card card_info={aboutCard}
                />
            </div>
            <div className=" lg:my-20 w-full h-[120vh] h-lg:h-[100vh] lg:h-[60vh] flex justify-center items-center lg:py-10 relative bg-slate-700">
                <div className="grid lg:grid-cols-2 w-9/10 justify-items-center">
                    <div className="flex flex-col gap-4 w-9/10 lg:w-3/4">
                        <div className="text-sky-500 font-semibold">
                            {t("information_heading")}
                        </div>
                        <div className="font-semibold text-3xl text-white">
                            {t("information_subheading")}
                        </div>
                        <div className="text-gray-200 text-lg/10">
                            {t("information_summary")}
                        </div>
                        <div className="bg-sky-600 rounded-xl text-white text-base lg:text-sm font-bold p-2 w-2/5 lg:w-1/4 text-center self-center lg:self-start">
                            {t("info_button")}
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full mt-10 lg:mt-0">
                        {theServices.map((element, index)=> {
                            return (
                            <div key={element.alt} className={`w-full h-1/5 flex items-center ${index != 4 ? "border-b-1 border-gray-400": ""}  py-4 lg:py-2`}>
                                <div className="h-full w-1/5 relative">
                                    <Image className="object-contain"
                                    src = {element.imageSrc}
                                    alt = {element.alt}
                                    fill
                                    />
                                </div>
                                <div className="w-4/5 ml-3 text-gray-200 text-sm ">
                                    {element.title}
                                </div>
                            </div>)
                            })}
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 lg:mt-20 w-full h-[70vh] h-md:h-[80vh] flex items-center justify-center mb-20">
                <Card card_info={prayerCard} />   
            </div>
            {componentClicked &&
                <ModalOverlay info = {prayerModal}/>
            } 
        </>
    )
}