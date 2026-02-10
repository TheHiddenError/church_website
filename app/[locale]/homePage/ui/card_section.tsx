"use client"
import { ModalInfo } from "../types/modal"
import { CardBaseProps } from "../types/cards"
import ModalOverlay from "./modal_overly"
import Card from "./cards"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useTranslations } from "next-intl"

export default function HomeCardSection(){
    const t = useTranslations("HomePage");
    const router = useRouter();
    const [componentClicked, setClicked] = useState(false);

    const aboutCard: CardBaseProps = {
        imageSrc:"/church_image.jpg",
        title: t("about"),
        description:`I'm a paragraph. Click here to add  your own text and edit me. 
                I'm a great place for you to tell a story and let your users know a little more about you.`, 
        button_name: t("about_button"),
        button_action: ()=> router.push("/about_us")
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
        description: `I'm a paragraph. Click here to add  your own text and edit me. 
                I'm a great place for you to tell a story and let your users know a little more about you.`,
        button_name: t("prayer_button"),
        button_action: ()=> setClicked((element) => !element)
    }


    return (
        <>
            <div className="mt-20 grid grid-cols-2">
                <Card card_info={aboutCard}
                />
                <Card card_info={prayerCard} />   
            </div>
            {componentClicked &&
                <ModalOverlay info = {prayerModal}/>
            } 
        </>
    )
}